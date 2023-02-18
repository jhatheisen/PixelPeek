# 🦉Pixel Peek

This is the starter for the Pixel Peek. A platform for uploading and viewing photos from around the world. Take a peek at some beautiful pics!

## Live Server Link
https://pixel-peek.onrender.com

## Photos
![Screenshot_2023-02-17_at_4 32 42_PM](https://user-images.githubusercontent.com/106848904/219821882-27d13a2f-2f84-4f1e-b8d7-18b3b19b1a4b.png)
![Screenshot_2023-02-17_at_4 34 00_PM](https://user-images.githubusercontent.com/106848904/219821886-e4f851a2-42b0-4a5f-b35d-a3de130f5865.png)
![Screenshot 2023-02-17 163833](https://user-images.githubusercontent.com/106848904/219821895-204d0796-7196-48d3-a0d9-395bdd075e04.png)

## Wiki Link
* [API Documentation](https://github.com/jhatheisen/PixelPeek/wiki/API-Routesn)
* [Database Schema](https://github.com/jhatheisen/PixelPeek/wiki/Database-Schema)
* [Feature List](https://github.com/jhatheisen/PixelPeek/wiki/Feature-List)
* [Redux Store Shape](https://github.com/jhatheisen/PixelPeek/wiki/Redux-Store)
* [Feature List](https://github.com/jhatheisen/PixelPeek/wiki/Feature-List)
* [User Stories](https://github.com/jhatheisen/PixelPeek/wiki/User-Stories)
* [Wireframe](https://github.com/jhatheisen/PixelPeek/wiki/Wireframe)

## Tech Stack
* Frameworks, Platforms, and Libraries: 
  * Javascript
  * Python
  * HTML5
  * CSS3
  * Node.js
  * React
  * Redux
  * Flask
  * SQLAlchemy
  * Alembic
* Database
  * Postgres
* Hosting
  * Render
  
## Getting started
1. Clone this repository (only this branch)

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment
   - Example
   
   ```js
   SECRET_KEY=super-secret-key
   FLASK_ENV=development
   FLASK_DEBUG=True
   DATABASE_URL=sqlite:///dev.db
   SCHEMA=pixel_peek_schema
   FLASK_RUN_PORT=5001
   ```

4. Make sure the SQLite3 database connection URL is in the **.env** file

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention**.

6. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

## Additional Photos...
![Screenshot_2023-02-17_at_4 33 27_PM](https://user-images.githubusercontent.com/106848904/219821904-2b16205d-953d-429e-85f7-d07622778ac7.png)
![image4](https://user-images.githubusercontent.com/106848904/219821911-e8637c20-c4cd-4bda-895b-79636b33c8c7.png)
![image3](https://user-images.githubusercontent.com/106848904/219821930-4dcf265c-d539-425b-976f-ffe57bb8ab12.png)
![image](https://user-images.githubusercontent.com/106848904/219821935-8b31d52c-88b0-40ae-bab9-89b21682a268.png)
![imag2](https://user-images.githubusercontent.com/106848904/219821937-415f94eb-57f0-4951-96bc-0c032febfd88.png)







