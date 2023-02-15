from app.models import db, Album, environment, SCHEMA
from .photos import photo1, photo2, photo3, photo4, photo5, photo6, photo7, photo8, photo9, photo10, photo11, photo12, photo13, photo14, photo15, photo16

# Adds a demo user, you can add other users here if you want
def seed_albums():
    album1 = Album(
        album_name='Demo_Album', photos=[photo1, photo2, photo3, photo14], user_id=1)
    album2 = Album(
        album_name='Red',photos=[photo6, photo4, photo8, photo13], user_id=3)
    album3 = Album(
        album_name='Thriller', photos=[photo12, photo10, photo9, photo15], user_id=2)
    album4 = Album(
        album_name='Exile on Main St.', photos=[photo5, photo7, photo2, photo11], user_id=3)
    album5 = Album(
        album_name='Blonde on Blonde', photos=[photo4, photo11, photo16, photo14], user_id=1)

    db.session.add(album1)
    db.session.add(album2)
    db.session.add(album3)
    db.session.add(album4)
    db.session.add(album5)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_albums():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.album_photos RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.albums RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM album_photos")
        db.session.execute("DELETE FROM albums")

    db.session.commit()
