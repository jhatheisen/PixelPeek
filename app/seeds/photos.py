from app.models import db, Photo, environment, SCHEMA

# Adds a demo user, you can add other users here if you want
photo1 = Photo(
    title= "Empire State Building"
    ,description= "Iconic Art Deco Skyscraper in New York City"
    ,country="USA"
    ,city= "New York"
    ,state= "New York"
    ,img_url= "https://i.pinimg.com/736x/e2/20/75/e22075ef74bc43dc66117f4f4b79f87a.jpg"
    ,user_id=3
)
photo2 = Photo(
    title= "Empire State Building"
    ,description= "Iconic Art Deco Skyscraper in New York City"
    ,country="USA"
    ,city= "New York"
    ,state= "New York"
    ,img_url= "https://i.pinimg.com/736x/e2/20/75/e22075ef74bc43dc66117f4f4b79f87a.jpg"
    ,user_id=1
)
photo3 = Photo(
    title= "Willis Tower"
    ,description= "Tallest Skyscraper in the Western Hemisphere"
    ,city= "Chicago"
    ,state= "Illinois"
    ,country="USA"
    ,img_url= "https://images.pexels.com/photos/2096700/pexels-photo-2096700.jpeg?auto=compress&cs=tinysrgb&w=800"
    ,user_id=1
)
photo4 = Photo(
    title= "One World Trade Center"
    ,description= "Symbolic Skyscraper at the Ground Zero in New York City"
    ,city= "New York"
    ,state= "New York"
    ,country="USA"
    ,img_url= "https://images.pexels.com/photos/2096700/pexels-photo-2096700.jpeg?auto=compress&cs=tinysrgb&w=800"
    ,user_id=2
)
photo5 = Photo(
    title= "Chrysler Building"
    ,description= "Distinctive Art Deco Skyscraper in New York City"
    ,city= "New York"
    ,state= "New York"
    ,country="USA"
    ,img_url= "https://images.pexels.com/photos/457937/pexels-photo-457937.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2 "
    ,user_id=1
)
photo6 = Photo(
    title= "John Hancock Center"
    ,description= "Tall Skyscraper with Observation Deck in Chicago"
    ,city= "Chicago"
    ,state= "Illinois"
    ,country="USA"
    ,img_url= "https://images.pexels.com/photos/457937/pexels-photo-457937.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2 "
    ,user_id=3
)
photo7 = Photo(
    title= "Aon Center"
    ,description= "Tall Skyscraper in Chicago's Business District"
    ,city= "Chicago"
    ,state= "Illinois"
    ,country="USA"
    ,img_url= "https://images.pexels.com/photos/1467300/pexels-photo-1467300.jpeg"
    ,user_id=1
)
photo8 = Photo(
    title= "Citicorp Center"
    ,description= "Distinctive Skyscraper in New York City with Slanted Top"
    ,city= "New York"
    ,state= "New York"
    ,country="USA"
    ,img_url= "https://images.pexels.com/photos/219692/pexels-photo-219692.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ,user_id=2
)
photo9 = Photo(
    title= "Trump International Hotel and Tower"
    ,description= "Luxury Skyscraper in Chicago"
    ,city= "Chicago"
    ,state= "Illinois"
    ,country="USA"
    ,img_url= "https://images.pexels.com/photos/3964406/pexels-photo-3964406.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ,user_id=2
)
photo10 = Photo(
    title= "US Bank Tower"
    ,description= "Tall Skyscraper in Los Angeles"
    ,city= "Los Angeles"
    ,state= "California"
    ,country="USA"
    ,img_url= "https://images.pexels.com/photos/809060/pexels-photo-809060.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ,user_id=3
)
photo11 = Photo(
    title= "Transamerica Pyramid"
    ,description= "Tall, Narrow Skyscraper in San Francisco"
    ,city= "San Francisco"
    ,state= "California"
    ,country="USA"
    ,img_url= "https://images.pexels.com/photos/809060/pexels-photo-809060.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ,user_id=2
)
photo12 = Photo(
    title= "Bank of America Plaza"
    ,description= "Tall Skyscraper in Dallas"
    ,city= "Dallas"
    ,state= "Texas"
    ,country="USA"
    ,img_url= "https://images.pexels.com/photos/809060/pexels-photo-809060.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ,user_id=1
)
photo13 = Photo(
    title= "Columbia Center"
    ,description= "Tall Skyscraper in Seattle"
    ,city= "Seattle"
    ,state= "Washington"
    ,country="USA"
    ,img_url= "https://images.pexels.com/photos/15327176/pexels-photo-15327176.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ,user_id=2
)
photo14 = Photo(
    title= "Renaissance Tower"
    ,description= "Tall Skyscraper in Dallas"
    ,city= "Dallas"
    ,state= "Texas"
    ,country="USA"
    ,img_url= "https://images.pexels.com/photos/3317535/pexels-photo-3317535.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ,user_id=3
)
photo15 = Photo(
    title= "Liberty Tower"
    ,description= "Tall Skyscraper in Miami"
    ,city= "Miami"
    ,state= "Florida"
    ,country="USA"
    ,img_url= "https://images.pexels.com/photos/2065639/pexels-photo-2065639.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ,user_id=1
)
photo16 = Photo(
    title= "One Atlantic Center"
    ,description= "Tall Skyscraper in Atlanta"
    ,city= "Atlanta"
    ,state= "Georgia"
    ,country="USA"
    ,img_url= "https://images.pexels.com/photos/2065639/pexels-photo-2065639.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ,user_id=2
)

def seed_photos():

    db.session.add(photo1)
    db.session.add(photo2)
    db.session.add(photo3)
    db.session.add(photo4)
    db.session.add(photo5)
    db.session.add(photo6)
    db.session.add(photo7)
    db.session.add(photo8)
    db.session.add(photo9)
    db.session.add(photo10)
    db.session.add(photo11)
    db.session.add(photo12)
    db.session.add(photo13)
    db.session.add(photo14)
    db.session.add(photo15)
    db.session.add(photo16)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_photos():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.photos RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM photos")

    db.session.commit()
