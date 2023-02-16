from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Album, album_photos, Photo
from .auth_routes import validation_errors_to_error_messages
from ..forms.album_form import CreateAlbumForm

album_routes = Blueprint('album', __name__)


#Return all albums
@album_routes.route('/')
def get_all_albums():
    all_albums = Album.query.all()
    output = {
        "Albums":[]
    }

    for album in all_albums:
        tempAlbum = album.to_dict()

        photoInfo = []
        #pull photo info out of albums
        if(len(album.photos) > 0):
            for photo in album.photos:
                photoInfo.append({
                    "id": photo.id,
                    "img_url": photo.img_url
                })
            tempAlbum["photos"] = photoInfo
        output["Albums"].append(tempAlbum)

    return output

#return single albums
@album_routes.route('/<int:albumId>')
def get_single_album(albumId):
    single_album = db.session.query(Album).get(int(albumId))
    print(single_album)

    #pull photo info out albums
    photoInfo = []
    for photo in single_album.photos:
        tempPhoto = photo.to_dict()
        tempPhoto.pop("user")
        tempPhoto.pop("comments")
        tempPhoto.pop("albums")
        tempPhoto.pop("tags")
        photoInfo.append(tempPhoto)

    return {
        "id": single_album.id,
        "album_name" : single_album.album_name,
        "photos": photoInfo
    }

@album_routes.route('/', methods=["POST"])
@login_required
def create_album():
  print("-------------------<ROUTEHIT FOUND")
  user_id = current_user.id
  print(user_id)
  print("-------------------<USER_ID FOUND")
  form = CreateAlbumForm()
  form['csrf_token'].data = request.cookies['csrf_token']


  if form.validate_on_submit():
    data = form.data

    newAlbum = Album(
        album_name= data["album_name"],
        user_id = current_user.id
    )


    db.session.add(newAlbum)
    db.session.commit()
    print("-------------------<SUCCESS")

    return {
        "album_name": newAlbum.album_name
    }
  return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@album_routes.route('/<int:albumId>', methods=['PUT'])
@login_required
def add_photo_to_album(albumId):
    #Check if current user is owner of album and owner of photoId
    data = request.get_json()
    photoId = data["photoId"]

    print(photoId)

    singlePhoto = db.session.query(Photo).get(photoId)
    singleAlbum = db.session.query(Album).get(albumId)

    if singlePhoto is None:
        return {
            "message": "Photo couldn't be found",
            "statusCode": 404
        }, 404

    if singleAlbum.user_id != current_user.id:
        return {'errors': ['Unauthorized']}, 401

    if current_user.id != singlePhoto.user_id:
        return {'errors': ['Unauthorized']}, 401

    #execute update
    print("photos before here=================>",singleAlbum.photos)
    singleAlbum.photos.append(singlePhoto)
    print("photos after here=================>",singleAlbum.photos)
    db.session.commit()

    return {
        "message": "successfully added"
    }


@album_routes.route('/<int:albumId>', methods=["DELETE"])
@login_required
def delete_album(albumId):
    album = db.session.query(Album).get(albumId)

    if album is None:
        return {
            "message": "Comment couldn't be found",
            "statusCode": 404
        }, 404

    if album.user_id != current_user.id:
        return {'errors': ['Unauthorized']}, 401

    if album is not None:
        db.session.delete(album)
        db.session.commit()
        return {
            "message": "Successfully deleted",
            "statusCode": 200
        }, 200
