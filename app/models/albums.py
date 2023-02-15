from .db import db, environment, SCHEMA, add_prefix_for_prod


class Album(db.Model):
    __tablename__ = 'albums'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    album_name = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)

    # Many-To-One between Albums and Users
    user = db.relationship("User", back_populates="albums")

    #Many-To-Many betweeen Photos and Albums
    photos = db.relationship(
        "Photo",
        secondary="album_photos",
        back_populates="albums"
    )

    def to_dict(self):
        return {
            'id': self.id,
            'album_name': self.album_name
        }

album_photos = db.Table(
    "album_photos",
    db.Column(
        "album_id",
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("albums.id")),
        primary_key=True
    ),
    db.Column(
        "photo_id",
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("photos.id")),
        primary_key=True
    )
)

if environment == "production":
    album_photos.schema = SCHEMA
