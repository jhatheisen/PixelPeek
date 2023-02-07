# PixelPeek

---

## DB Schema

![dbschema](images/DB-Schema.png)

---

## Backend endpoints

## Photos

TESTING

### - Get all photos

Returns all the photos

- Require Authentication: false
- Request
  - Method: GET
  - URL: /api/photos
  - Body: none
- Successful Response
  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:
  ```
  {
    "Photos": [
      {
        "id": 1,
        "user_id": 1,
        "title": "DogsAndCats",
        "description": "nice animals",
        "city": "Los Angeles",
        "state": "California",
        "img_url": "!!REPLACE WITH S3 BUCKET!!",
        "created_at": "02/02/2023"
      }
    ]
  }
  ```

### - Get details of a photo by id

Returns the details of a spot specified by its id.

- Require Authentication: false
- Request
  - Method: GET
  - URL: /api/photos/:photoId
  - Body: none
- Successful Response
  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:
  ```
  {
    "id": 1,
    "user_id": 1,
    "title": "DogsAndCats",
    "description": "nice animals",
    "city": "Los Angeles",
    "state": "California",
    "img_url": "!!REPLACE WITH S3 BUCKET!!",
    "created_at": "02/02/2023"
  }
  ```

* Error response: Coulnd't find a Photo with the specified id
  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  * Body:
  ```
  {
    "message": "Photo couldn't be found",
    "statusCode": 404
  }
  ```

### - Create a new photo

Creates and returns a new photo image

---

## Albums

## Comments

## Tags

## Frontend endpoints

## Wireframe
