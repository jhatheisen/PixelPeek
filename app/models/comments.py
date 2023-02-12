from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

today = datetime.now()

class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    photo_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("photos.id")), nullable=False)
    createdAt = db.Column(db.DateTime, nullable=False, default=today)

    user = db.relationship("User", back_populates="comments")
    photo = db.relationship("Photo", back_populates="comments")


    def to_dict(self):
        return {
            'id': self.id,
            'comment': self.comment,
            'user_id': self.user_id,
            'photo_id': self.photo_id,
            'createdAt': self.createdAt
        }
