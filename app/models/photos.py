from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

today = datetime.now()

class Photo(db.Model):
  __tablename__ = 'photos'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  title = db.Column(db.String(50), nullable=False)
  description = db.Column(db.String(500), nullable=False)
  city = db.Column(db.String(100), nullable=False)
  state = db.Column(db.String(100), nullable=False)
  img_url = db.Column(db.String(1000), nullable=False)
  createdAt = db.Column(db.DateTime, nullable=False, default=today)

  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)

  user = db.relationship("User", back_populates="photos")
  comments = db.relationship("Comment", back_populates="photo")

  #Many-To-Many betweeen Photos and Albums
  albums = db.relationship(
    "Album",
    secondary="album_photos",
    back_populates="photos"
  )

  #Many-To-Many betweeen Photos and Tags
  tags = db.relationship(
    "Tag",
    secondary="photo_tags",
    back_populates="photos"
  )