from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Comment, Photo, User, db
from app.forms import CommentForm

comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/current')
@login_required
def user_comments(user_id=2):
    comments = Comment.query.all()
    if current_user.is_authenticated:
        comments = Comment.query.filter_by(user_id=user_id).all()
    return {'Comments': [comment.to_dict() for comment in comments]}

@comment_routes.route('<int:comment_id>', methods=['PUT'])
@login_required
def edit_comments(comment_id):
    editComments = db.session.query(Comment).get(int(comment_id))
    data = request.get_json()
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit:
        editComments.comment = form.data["comment"]

        db.session.commit()

    return {
        "id": comment_id,
        "comment": form.data["comment"],
        "user_id": editComments.user_id,
        "photo_id": editComments.photo_id,
        "createdAt": editComments.createdAt,
    }


@comment_routes.route('<int:comment_id>', methods=['DELETE'])
@login_required
def delete_comments(comment_id):
    pass
