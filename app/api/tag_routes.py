from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Tag, db
from app.forms import TagsForm
from .auth_routes import validation_errors_to_error_messages

tag_routes = Blueprint('tags', __name__)

@tag_routes.route('/', methods=["GET"])
def all_tags():
  tags = Tag.query.all()
  tagInfo = []
  for tag in tags:
    tempTag = tag.to_dict()
    tempTag.pop("photos")
    tagInfo.append(tempTag)
  return {"Tags": tagInfo}


@tag_routes.route('<int:tagId>')
def get_single_tag(tagId):
  single_tag = db.session.query(Tag).get(int(tagId))

  if not single_tag:
    return {"message": "Tag couldn't be found"}, 404

  tag = single_tag.to_dict()

  return {
    "id": tag["id"],
    "name": tag["tag_name"]
  }


@tag_routes.route('/', methods=['POST'])
@login_required
def create_tag():
  print("accessed route")
  form = TagsForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    data = form.data

    allTags = Tag.query.all()

    tagName = data["tag_name"]
    tagName = tagName[0].upper() + tagName[1:]

    for tag in allTags:
      tempTag = tag.to_dict()
      print('temp: ', tempTag)
      if tempTag['tag_name'] == tagName:
        return {
          "message": "That Tag already exists",
          "statusCode": 400
        }, 400

    # newTag = Tag(
    #   tag_name = tagName
    # )

    db.session.add(newTag)
    db.session.commit()


    return {
      "id": allTags[len(allTags)-1].id + 1,
      "name": tagName
    }
  return {'errors': validation_errors_to_error_messages(form.errors)}, 401
