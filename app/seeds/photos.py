from app.models import db, Photo, environment, SCHEMA

# Adds a demo user, you can add other users here if you want
photo1 = Photo(
    title= "Sunset Skyscrapers"
    ,description= "Iconic Skyscraper in New York City"
    ,country="USA"
    ,city= "Manhattan"
    ,state= "New York"
    ,img_url= "https://images.pexels.com/photos/692102/pexels-photo-692102.jpeg?auto=compress&cs=tinysrgb&w=800"
    ,user_id=3
)
photo2 = Photo(
    title= "Stunning Views"
    ,description= "Newly built towers in Mid City"
    ,country="USA"
    ,city= "Los Angeles"
    ,state= "California"
    ,img_url= "https://images.pexels.com/photos/1091210/pexels-photo-1091210.jpeg?auto=compress&cs=tinysrgb&w=800"
    ,user_id=1
)
photo3 = Photo(
    title= "Waterfront Views"
    ,description= "Beautiful Horizon"
    ,city= "Chicago"
    ,state= "Illinois"
    ,country="USA"
    ,img_url= "https://images.pexels.com/photos/302831/pexels-photo-302831.jpeg?auto=compress&cs=tinysrgb&w=800"
    ,user_id=1
)
photo4 = Photo(
    title= "City Under The Purple Wheel"
    ,description= "A beautifully lit ferris wheel on the water"
    ,city= "Farringdon"
    ,state= "London"
    ,country="United Kingdom"
    ,img_url= "https://images.pexels.com/photos/230794/pexels-photo-230794.jpeg?auto=compress&cs=tinysrgb&w=800"
    ,user_id=2
)
photo5 = Photo(
    title= "Chrysler Building"
    ,description= "Distinctive Art Deco Skyscraper in New York City"
    ,city= "Burj Al-arab"
    ,state= "Dubai"
    ,country="United Arab Emirates"
    ,img_url= "https://images.pexels.com/photos/3763190/pexels-photo-3763190.jpeg?auto=compress&cs=tinysrgb&w=800"
    ,user_id=1
)
photo6 = Photo(
    title= "City Skyline"
    ,description= "Skyscraper over the horizon displaying the beautiful lights of the city"
    ,city= "Chicago"
    ,state= "Illinois"
    ,country="USA"
    ,img_url= "https://images.pexels.com/photos/1398003/pexels-photo-1398003.jpeg?auto=compress&cs=tinysrgb&w=800"
    ,user_id=3
)
photo7 = Photo(
    title= "Cloud Covered Skyscrapers"
    ,description= "Skyscrapers emerged over cloud cover"
    ,city= "Dubai"
    ,state= "Dubai"
    ,country= "United Arab Emirates"
    ,img_url= "https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ,user_id=1
)
photo8 = Photo(
    title= "Azul Bodega"
    ,description= "Rustic pastel blue sqaure building on a plaza's corner"
    ,city= "Santa Fe"
    ,state= "New Mexico"
    ,country= "USA"
    ,img_url= "https://images.pexels.com/photos/208560/pexels-photo-208560.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ,user_id=2
)
photo9 = Photo(
    title= "Blue and Brown Concrete Building"
    ,description= "Colorful corner building "
    ,city= "Brooklyn"
    ,state= "New York"
    ,country= "USA"
    ,img_url= "https://images.pexels.com/photos/8155/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ,user_id=2
)
photo10 = Photo(
    title= "90's Modern Office Building"
    ,description= "Californian white deco building"
    ,city="Fullerton"
    ,state="California"
    ,country="United States"
    ,img_url= "https://images.pexels.com/photos/123027/pexels-photo-123027.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ,user_id=3
)
photo11 = Photo(
    title="One Tower"
    ,description="Picture of New York Street"
    ,city="New York City"
    ,state="New York City"
    ,country="United States"
    ,img_url="https://images.pexels.com/photos/1389339/pexels-photo-1389339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1%22"
    ,user_id=2
)
photo12 = Photo(
    title="Picture of Temple"
    ,description="Picture of Temple in the night"
    ,city="New York City"
    ,state="New York"
    ,country="United States"
    ,img_url="https://images.pexels.com/photos/315403/pexels-photo-315403.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1%22"
    ,user_id=1
)
photo13 = Photo(
    title= "Columbia Center"
    ,description= "Tall Skyscraper in Seattle"
    ,city= "Seattle"
    ,state= "Washington"
    ,country="USA"
    ,img_url= "https://images.pexels.com/photos/1703807/pexels-photo-1703807.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ,user_id=2
)
photo14 = Photo(
    title= "Parliament Building"
    ,description= "Skyline of Budapest"
    ,city= "Budapest"
    ,state= "Pest"
    ,country="Hungary"
    ,img_url= "https://images.pexels.com/photos/2422461/pexels-photo-2422461.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ,user_id=3
)
photo15 = Photo(
    title= "Liberty Tower"
    ,description= "Tall Skyscraper in Miami"
    ,city= "Miami"
    ,state= "Florida"
    ,country="USA"
    ,img_url= "https://images.pexels.com/photos/8431136/pexels-photo-8431136.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ,user_id=1
)
photo16 = Photo(
    title= "One Atlantic Center"
    ,description= "Tall Skyscraper in Atlanta"
    ,city= "Atlanta"
    ,state= "Georgia"
    ,country="USA"
    ,img_url= "https://images.pexels.com/photos/2419320/pexels-photo-2419320.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ,user_id=2
)
photo17 = Photo(
    title= "The Emerald City's Urban Adventure"
    ,description= "Immerse yourself in the eclectic mix of art, music, and food in Seattle, the birthplace of grunge and home to the iconic Space Needle."
    ,city= "Seattle"
    ,state= "Washington"
    ,country="United States"
    ,img_url= "https://images.pexels.com/photos/837908/pexels-photo-837908.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ,user_id= 3
)
photo18 = Photo(
    title= "Venice: A Canalside Stroll in Amsterdam"
    ,description= "Marvel at the picturesque canals, gabled houses, and colorful flower markets in Amsterdam, the vibrant capital of the Netherlands."
    ,city= "Amsterdam"
    ,state= "Amsterdam"
    ,country="Netherlands"
    ,img_url= "https://images.pexels.com/photos/830994/pexels-photo-830994.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ,user_id= 2
)
photo19 = Photo(
    title= "Hong Kong's Dazzling Skyscraper Skyline"
    ,description= "Be dazzled by the towering skyscrapers, bustling street markets, and exquisite cuisine in Hong Kong, one of the most vibrant and cosmopolitan cities in Asia."
    ,city= "Hong Kong"
    ,state= "Hong Kong"
    ,country="China"
    ,img_url= "https://images.pexels.com/photos/373912/pexels-photo-373912.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ,user_id= 1
)
photo20 = Photo(
    title= "Experience the Magic of the Eternal City"
    ,description= "Step back in time and experience the awe-inspiring architecture, art, and culture of Rome, one of the most iconic cities in the world."
    ,city= "Rome"
    ,state= "Rome"
    ,country="Italy"
    ,img_url= "https://images.pexels.com/photos/2422461/pexels-photo-2422461.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ,user_id= 2
)
photo21 = Photo(
    title= "The City that Never Sleeps: New York"
    ,description= "From the bright lights of Times Square to the soaring skyscrapers of Manhattan, experience the excitement and energy of New York City after dark."
    ,city= "New York"
    ,state= "New York"
    ,country="United States"
    ,img_url= "https://images.pexels.com/photos/934539/pexels-photo-934539.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2%22"
    ,user_id= 3
)
photo22 = Photo(
    title= "Chicago Square"
    ,description= "Picture of city square Chicago"
    ,city= "Chicago"
    ,state= "Illnois"
    ,country="United States"
    ,img_url= "https://images.pexels.com/photos/96427/pexels-photo-96427.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ,user_id= 1
)
photo23 = Photo(
    title= "The Fullerton Hotel at night"
    ,description= "A picture of the Fullerton Hotel at night"
    ,city= "Fullerton"
    ,state= "California"
    ,country="United States"
    ,img_url= "https://images.pexels.com/photos/949406/pexels-photo-949406.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ,user_id= 2
)
photo24 = Photo(
    title= "Photo of Sea Harbor"
    ,description= "See the amazing sea side view of the city scape."
    ,city= "Long Beach"
    ,state= "California"
    ,country="United States"
    ,img_url= "https://images.pexels.com/photos/787630/pexels-photo-787630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ,user_id= 3
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
    db.session.add(photo17)
    db.session.add(photo18)
    db.session.add(photo19)
    db.session.add(photo20)
    db.session.add(photo21)
    db.session.add(photo22)
    db.session.add(photo23)
    db.session.add(photo24)
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
