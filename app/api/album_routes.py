from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Album, album_photos

album_routes = Blueprint('album', __name__)


#Return all albums
@album_routes.route('/')
def get_all_albums():
    all_albums = Album.query.all()
    print(all_albums)
    output = {
        "albums":[]
    }

    for album in all_albums:
        tempAlbum = album.to_dict()



#return single albums



# @comment_routes.route('/<int:comment_id>', methods=['PUT'])
# @login_required
# def edit_comments(comment_id):
#     editComments = db.session.query(Comment).get(int(comment_id))

#     if editComments is None:
#       return {
#             "message": "Comment couldn't be found",
#             "statusCode": 404
#         }, 404

#     if editComments.user_id != current_user.id:
#         return {'errors': ['Unauthorized']}, 401

#     form = CommentForm()
#     if form.data["comment"] is None:
#       return {
#             "message": "Validation error",
#             "statusCode": 400,
#             "errors": {
#             "comment": "Comment is required"
#             }
#         }, 400

#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit:
#       editComments.comment = form.data["comment"]
#       db.session.commit()

#       return {
#           "Comments": [
#           {
#           "id": comment_id,
#           "user_id": editComments.user_id,
#           "photo_id": editComments.photo_id,
#           "comment": form.data["comment"],
#           "createdAt": editComments.createdAt,
#           }
#           ]
#       }, 200

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
