from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Album, album_photos
from .auth_routes import validation_errors_to_error_messages

album_routes = Blueprint('album', __name__)


#Return all albums
@album_routes.route('/')
def get_all_albums():
    all_albums = Album.query.all()
    print(all_albums)
    output = {
        "Albums":[]
    }

    for album in all_albums:
        tempAlbum = album.to_dict()
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
#   form = CreateAlbumForm()
#   form['csrf_token'].data = request.cookies['csrf_token']
#   if form.validate_on_submit():
#     data = form.data

#     newAlbum = Album(
#         album_name= data["album_name"],
#     )

#     db.session.add(newPhoto)
#     db.session.commit()
#     print("-------------------<SUCCESS")

#     allPhotos = Photo.query.all()


#     return {
#         "id": allPhotos[len(allPhotos)-1].id,
#         "user_id": user_id,
#         "title": data["title"],
#         "description": data["description"],
#         "city": data["city"],
#         "state": data["state"],
#         "country": data["country"],
#         "img_url": data["img_url"],
#         "createdAt": allPhotos[len(allPhotos)-1].createdAt
#     }
#   return {'errors': validation_errors_to_error_messages(form.errors)}, 401



# @comment_routes.route('/<int:comment_id>', methods=['DELETE'])
# @login_required
# def delete_comments(comment_id):
#     comment = Comment.query.get(comment_id)

#     if comment is None:
#         return {
#             "message": "Comment couldn't be found",
#             "statusCode": 404
#         }, 404

#     if comment.user_id != current_user.id:
#         return {'errors': ['Unauthorized']}, 401

#     if comment is not None:
#         db.session.delete(comment)
#         db.session.commit()
#         return {
#             "message": "Successfully deleted",
#             "statusCode": 200
#         }, 200
