from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Comment, Photo, User

comment_routes = Blueprint('comments', __name__)

@comment_routes.route('current')
@login_required
def user_comments(user_id=2):
    comments = Comment.query.all()
    if current_user.is_authenticated:
        comments = Comment.query.filter_by(user_id=user_id).all()
    return {'Comments': [comment.to_dict() for comment in comments]}

# @comment_routes.route('/')
@comment_routes.route('api/photos/<int:photo_id>/comments')
def all_comments(photo_id):
    comments = Comment.query.filter_by(photo_id=photo_id).all()
    return {'Comments': [comment.to_dict() for comment in comments]}


@comment_routes.route('/photos/<int:photo_id>/comments', methods=['POST'])
@login_required
def create_comments(photo_id):
    pass

@comment_routes.route('<int:comment_id>', methods=['PUT'])
@login_required
def edit_comments(comment_id):
    pass

@comment_routes.route('<int:comment_id>', methods=['DELETE'])
@login_required
def delete_comments(comment_id):
    pass
