# Pixel Peek

This is the starter for the Pixel Peek.

## Live Server Link
https://pixel-peek.onrender.com

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

