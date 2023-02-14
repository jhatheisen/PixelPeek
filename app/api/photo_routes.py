from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import Photo, db, Comment
from ..forms.photo_form import CreatePhotoForm, EditPhotoForm
from ..forms.comments_form import CommentForm
from .auth_routes import validation_errors_to_error_messages


photo_routes = Blueprint('photo', __name__)

# blueprint is registered with a url prefix of /api/photos  already

@photo_routes.route('/')
def get_all_photos():
  all_photos = Photo.query.all()
  print(all_photos)

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
    print(info, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>single photo Info here")

    #get tag info out of photo
    tagInfo = []
    for tag in info["tags"]:
        tempTag = tag.to_dict()
        tempTag.pop("photos")
        tagInfo.append(tempTag)

    print(tagInfo, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>tagInfo here")

    #get comments info out of photo
    commentInfo = []
    for comment in info["comments"]:
        commentInfo.append({
            "id": comment.id,
            "comment": comment.comment,
            "createdAt": comment.createdAt
        })

    print(commentInfo, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>tagInfo here")
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

@photo_routes.route('/', methods=["POST"])
@login_required
def create_photo():
  print(request.cookies["session"])
  print("-------------------<ROUTEHIT FOUND")
  user_id = current_user.id
  print(user_id)
  print("-------------------<USER_ID FOUND")
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
    print("-------------------<SUCCESS")

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
    print("=========================>reaches validate on submit")
    print(form.data)
    if form.validate_on_submit():
        print("====================>validate on submit passed")
        data = form.data

        edit_photo.title = data["title"]
        edit_photo.description = data["description"]
        edit_photo.city = data["city"]
        edit_photo.state = data["state"]
        edit_photo.country = data['country']
        edit_photo.img_url = data['img_url']

        db.session.commit()

        print("-------------------<SUCCESS")

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
    print('ERRRRO HERE??????????')
    db.session.delete(delete_photo)
    db.session.commit()

    return {"message": "Successfully deleted"}

@photo_routes.route('/<int:photoId>/comments', methods=["POST"])
@login_required
def create_comment(photoId):
  print("-------------------<ROUTEHIT FOUND")
  user_id = current_user.id
  print(user_id)
  print("-------------------<USER_ID FOUND")
  form = CommentForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    print("validating")
    data = form.data
    newComment = Comment(
        comment = data["comment"],
        user_id = user_id,
        photo_id = int(photoId)
    )
    
    db.session.add(newComment)
    db.session.commit()
    print("-------------------<SUCCESS")

    allComments = Comment.query.all()

    return {
        "id": allComments[len(allComments)-1].id,
        "user_id": user_id,
        "photo_id": photoId,
        "comment": data["comment"],
        "createdAt": allComments[len(allComments)-1].createdAt
    }
