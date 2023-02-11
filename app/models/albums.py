from .db import db, environment, SCHEMA, add_prefix_for_prod


class Album(db.Model):
    __tablename__ = 'albums'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    album_name = db.Column(db.String(255), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.album_name
        }

    #Many-To-Many betweeen Photos and Albums
    photos = db.relationship(
        "Photo",
        secondary="album_photos",
        back_populates="albums"
    )

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
