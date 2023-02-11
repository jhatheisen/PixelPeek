from app.models import db, Comment, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_comments():
    comment1 = Comment(
        comment="This looks sick!", user_id=1, photo_id=2)
    comment2 = Comment(
        comment="I love this photo! Very cool.", user_id=3, photo_id=1)
    comment3 = Comment(
        comment="What a beautiful photo!", user_id=2, photo_id=2)
    comment4 = Comment(
        comment="I've been here before. It was a great place to be.", user_id=1, photo_id=3)
    comment5 = Comment(
        comment="Not impressed.", user_id=2, photo_id=3)

    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.add(comment4)
    db.session.add(comment5)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM comments")

    db.session.commit()
