from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import Photo, db
from ..forms.create_photo_form import CreatePhotoForm

photo_routes = Blueprint('photo', __name__)

# blueprint is registered with a url prefix of /api/photos  already

@photo_routes.route('/')
def get_all_photos():
  all_photos = Photo.query.all()
  print(all_photos)

  output = {
    "Photos":[]
  }

  for photo in all_photos:
    info = photo.to_dict()
    info.pop("user")
    info.pop("albums")
    info.pop("tags")
    info.pop("comments")
    output["Photos"].append(info)

  return output

@photo_routes.route('/<int:photoId>')
def get_photo_detail(photoId):
    single_photo = db.session.query(Photo).get(int(photoId))

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
  print("-------------------<ROUTEHIT FOUND")
  user_id = current_user
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

    length = len(Photo.query.all())

    return {
        "id": length,
        "user_id": user_id,
        "title": data["title"],
        "description": data["description"],
        "city": data["city"],
        "state": data["state"],
        "country": data["country"],
        "img_url": data["img_url"],
        "createdAt": data["createdAt"]
    }
