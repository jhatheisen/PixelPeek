from flask import Blueprint, jsonify, session, request
from app.models import Photo, db

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

    print(info, '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> info here')
    output["Photos"].append(info)

  print(output, "output here >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")

  return output
  #[<Photo1>, <Photo2>]
#     {
#     "Photos": [
#        {
#         "id": 1,
#         "user_id": 1,
#         "title": "DogsAndCats",
#         "description": "nice animals",
#         "city": "Los Angeles",
#         "state": "California",
#         "country": "United States"
#         "img_url": "!!REPLACE WITH S3 BUCKET!!",
#         "created_at": "02/02/2023"
#       }
#     ]
#   }
