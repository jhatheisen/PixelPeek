from .db import db, environment, SCHEMA, add_prefix_for_prod


class Tag(db.Model):
    __tablename__ = 'tags'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    tag_name = db.Column(db.String(255), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.tag_name
        }

    #Many-To-Many betweeen Photos and Tags
    photos = db.relationship(
        "Photo",
        secondary="photo_tags",
        back_populates="tags"
    )

photo_tags = db.Table(
    "photo_tags",
    db.Column(
        "tag_id",
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("tags.id")),
        primary_key=True
    ),
    db.Column(
        "photo_id",
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("photos.id")),
        primary_key=True
    )
)
