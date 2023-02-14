from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Tag, db
# from app.forms import TagForm

tags_routes = Blueprint('tags', __name__)

@tags_routes.route('')
def all_tags():
  tags = Tag.query.all()
  # return {"Tags": [tag.to_dict() for tag in tags]}
  return {'message':'hello'}


# @tags_routes.route('<tag:id>')
