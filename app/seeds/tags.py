from app.models import db, Tag, environment, SCHEMA
from .photos import photo1, photo2, photo3, photo4, photo5, photo6, photo7, photo8, photo9, photo10, photo11, photo12, photo13, photo14, photo15, photo16
import random

photos = [photo1, photo2, photo3, photo4, photo5, photo6, photo7, photo8, photo9, photo10, photo11, photo12, photo13, photo14, photo15, photo16]

# Adds a demo user, you can add other users here if you want
def seed_tags():
    tags = ['Whimsical', 'Gothic', 'Futuristic', 'Artistic', 'Industrial', 'Rustic', 'Eclectic', 'Enormous', "Minimalist", 'Aesthetic', 'Mysterious', 'Eerie', 'Intriguing', 'Imposing', 'Majestic', 'Stunning', 'Striking', 'Daring','Masterful', 'Monumental']
    for tag in tags:
      newTag = Tag(tag_name=tag, photos=[photos[random.randint(0,(len(photos)-1))]])
      db.session.add(newTag)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the tags table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_tags():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.photo_tags RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.tags RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM photo_tags")
        db.session.execute("DELETE FROM tags")

    db.session.commit()
