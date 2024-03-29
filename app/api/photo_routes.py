from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import Photo, db, Comment, Tag
from ..forms.photo_form import CreatePhotoForm, EditPhotoForm
from ..forms.comments_form import CommentForm
from ..forms.tags_form import TagsForm
from .auth_routes import validation_errors_to_error_messages
from ..awsS3 import (
    upload_file_to_s3, allowed_file, get_unique_filename)


photo_routes = Blueprint('photo', __name__)

# blueprint is registered with a url prefix of /api/photos  already

@photo_routes.route('/')
def get_all_photos():
  all_photos = Photo.query.all()

  output = {
    "allPhotos":[]
  }

  for photo in all_photos:
    info = photo.to_dict()
    info.pop("user")
    info.pop("albums")
    info.pop("tags")
    info.pop("comments")
    output["allPhotos"].append(info)

  return output

@photo_routes.route('/<int:photoId>')
def get_photo_detail(photoId):
    single_photo = db.session.query(Photo).get(int(photoId))

    if not single_photo:
        return {"message": "Photo couldn't be found"}, 404

    info = single_photo.to_dict()

    #get tag info out of photo
    tagInfo = []
    for tag in info["tags"]:
        tempTag = tag.to_dict()
        tempTag.pop("photos")
        tagInfo.append(tempTag)

    #get comments info out of photo
    commentInfo = []
    for comment in info["comments"]:
        commentInfo.append({
            "id": comment.id,
            "comment": comment.comment,
            "commentDate": comment.createdAt,
            "username": comment.user.username,
            "user_id": comment.user.id,
            "createdAt": comment.createdAt
        })

    return {
        "id": info["id"],
        "user_id": info["user_id"],
        "title": info["title"],
        "description": info["description"],
        "city": info["city"],
        "state": info["state"],
        "country": info["country"],
        "img_url": info["img_url"],
        "createdAt": info["createdAt"],
        "user": {
            "id": info["user"].id,
            "username": info["user"].username
        },
        "tags": tagInfo,
        "comments": commentInfo
    }

@photo_routes.route("/upload", methods=["POST"])
@login_required
def upload_image():
    if "image" not in request.files:
        return {"errors": "image required"}, 400

    image = request.files["image"]

    if not allowed_file(image.filename):
        return {"errors": "file type not permitted"}, 400
    
    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)

    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400

    url = upload["url"]
    # flask_login allows us to get the current user from the request
    # new_image = Image(user=current_user, url=url)
    # db.session.add(new_image)
    # db.session.commit()
    return {"url": url}

@photo_routes.route('/', methods=["POST"])
@login_required
def create_photo():
  user_id = current_user.id
  form = CreatePhotoForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    data = form.data

    newPhoto = Photo(
        title= data["title"],
        description = data["description"],
        city = data["city"],
        state = data["state"],
        country = data['country'],
        img_url = data['img_url'],
        user_id = user_id
    )

    db.session.add(newPhoto)
    db.session.commit()

    allPhotos = Photo.query.all()


    return {
        "id": allPhotos[len(allPhotos)-1].id,
        "user_id": user_id,
        "title": data["title"],
        "description": data["description"],
        "city": data["city"],
        "state": data["state"],
        "country": data["country"],
        "img_url": data["img_url"],
        "createdAt": allPhotos[len(allPhotos)-1].createdAt
    }
  return {'errors': validation_errors_to_error_messages(form.errors)}, 401


#Update photo route

@photo_routes.route('/<int:photoId>', methods=["PUT"])
@login_required
def update_photo(photoId):
    #find photo
    edit_photo = db.session.query(Photo).get(int(photoId))

    if not edit_photo:
        return {"message": "Photo couldn't be found"}, 404

    if edit_photo.user_id != current_user.id:
        return {'errors': ['Unauthorized']}, 401

    form = EditPhotoForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data

        edit_photo.title = data["title"]
        edit_photo.description = data["description"]
        edit_photo.city = data["city"]
        edit_photo.state = data["state"]
        edit_photo.country = data['country']
        edit_photo.img_url = data['img_url']

        db.session.commit()


        return {
            "id": edit_photo.id,
            "user_id": edit_photo.user_id,
            "title": data["title"],
            "description": data["description"],
            "city": data["city"],
            "state": data["state"],
            "country": data["country"],
            "img_url": data["img_url"],
            "createdAt": edit_photo.createdAt
        }
    #Error handling
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@photo_routes.route('/<int:photoId>', methods=["DELETE"])
@login_required
def delete_photo(photoId):
    #find photo
    delete_photo = db.session.query(Photo).get(int(photoId))

    if not delete_photo:
      return {"message": "Photo couldn't be found"}, 404

    if delete_photo.user_id != current_user.id:
        return {'errors': ['Unauthorized']}, 401

    db.session.delete(delete_photo)
    db.session.commit()

    return {"message": "Successfully deleted"}

@photo_routes.route('/<int:photoId>/comments', methods=["POST"])
@login_required
def create_comment(photoId):
  user_id = current_user.id
  form = CommentForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    data = form.data
    newComment = Comment(
        comment = data["comment"],
        user_id = user_id,
        photo_id = int(photoId)
    )

    db.session.add(newComment)
    db.session.commit()

    allComments = Comment.query.all()

    return {
        "id": allComments[len(allComments)-1].id,
        "user_id": user_id,
        "photo_id": photoId,
        "comment": data["comment"],
        "createdAt": allComments[len(allComments)-1].createdAt
    }

@photo_routes.route('/<int:photoId>/tags/<int:tagId>', methods=['DELETE'])
@login_required
def delete_tag(photoId, tagId):
    photo = Photo.query.get(photoId)

    if photo is None:
      return {
        "message": "Photo couldn't be found",
        "statusCode": 404
      }, 404

    tag = Tag.query.get(tagId)

    if tag is None:
        return {
            "message": "Tag couldn't be found",
            "statusCode": 404
        }, 404

    if photo.user_id != current_user.id:
        return {'errors': ['Unauthorized']}, 401

    if tag not in photo.tags:
      return {
        "message": "Tag not attatched to photo",
        "statusCode": 400
      }, 400

    photo.tags.remove(tag)
    db.session.commit()

    return {
        "message": "Successfully deleted",
        "statusCode": 200
    }, 200

@photo_routes.route('/<int:photoId>/tags/<int:tagId>', methods=['POST'])
@login_required
def add_tag(photoId, tagId):
    photo = Photo.query.get(photoId)

    if photo is None:
      return {
        "message": "Photo couldn't be found",
        "statusCode": 404
      }, 404

    if photo.user_id != current_user.id:
        return {'errors': ['Unauthorized']}, 401

    tag = Tag.query.get(tagId)

    if tag is None:
        return {
            "message": "Tag couldn't be found",
            "statusCode": 404
        }, 404

    if tag in photo.tags:
        return {
          "message": "Tag already attached to photo",
          "statusCode": 500
        }, 500

    photo.tags.append(tag)
    db.session.commit()

    return {
        "message": "Tag Successfully added",
        "statusCode": 200
    }, 200

@photo_routes.route('/<int:photoId>/tags', methods=["GET"])
def get_all_photo_tags(photoId):
    photo = Photo.query.get(photoId)

    if photo is None:
      return {
        "message": "Photo couldn't be found",
        "statusCode": 404
      }, 404

    # if no tags, come back to finish
    photo = photo.to_dict()
    tags = photo['tags']
    tagsList = []
    for tag in tags:
      tempTag = tag.to_dict()
      tempTag.pop("photos")
      tagsList.append(tempTag)

    return {
      "PhotoId": photo['id'],
      "Tags":tagsList
    }
