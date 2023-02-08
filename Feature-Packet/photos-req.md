# PixelPeek

---

## DB Schema

![dbschema](images/DB-Schema.png)

---

## Backend endpoints

## Photos

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
        "country": "United States"
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

test

asdasdasdasdasdasdadasd

---

## Albums

### - Album endpoint

test additions

## Comments

## Tags

### - Get all tags

Returns all the Tags

- Require Authentication: false
- Request
  - Method: GET
  - URL: /api/tags
  - Body: none
- Successful Response
  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:
  ```
  {
    "Tags": [
      {
        "id": 1,
        "name": "Funny",
      },
      {
        "id": 2,
        "name": "Romantic",
      }
    ]
  }
  ```

### - Get all tags attatched to an photo

Returns all the Tags for one photo

- Require Authentication: false
- Request
  - Method: GET
  - URL: /api/photos/:photoId/tags
  - Body: none
- Successful Response
  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:
  ```
  {
    "PhotoId": 5
    "Tags": [
      {
        "id": 1,
        "name": "Funny",
      },
      {
        "id": 2,
        "name": "Romantic",
      }
    ]
  }

### - Add a tag to a spot

### - Delete a tag from a photo





## Frontend endpoints

## Wireframe
