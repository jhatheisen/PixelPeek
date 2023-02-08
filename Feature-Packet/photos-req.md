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

* Error response: Couldn't find a Photo with the specified id
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


### - Get tag by id

Returns the Tag by the associated Tag Id

- Require Authentication: false
- Request
  - Method: GET
  - URL: /api/tags/:tagId
  - Body: none
- Successful Response
  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:
  ```
  {
    "id": 1,
    "name": "Funny",
  }
  ```

* Error response: Coulnd't find a Tag with the specified id
  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  * Body:
  ```
  {
    "message": "Tag couldn't be found",
    "statusCode": 404
  }
  ```

### - Create a new tag

Creates a new tag

- Require Authentication: True
- Request
  - Method: POST
  - URL: /api/tags
  - Body:
  ```
  {
    "name": "Stunning",
  }
  ```
- Successful Response
  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:
  ```
  {
    "id": 3,
    "name": "Stunning",
  }
  ```

* Error response: That tag already exists
  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  * Body:
  ```
  {
    "message": "That Tag already exists",
    "statusCode": 400
  }
  ```
### - Add a tag to a photo

Adds a tag to a photo

- Require Authentication: True
- Require proper authorization: Photo must belong to the current user
- Request
  - Method: POST
  - URL: /api/photos/:photoId/tags
  - Body:
  ```
  {
    "tagId": 1,
  }
  ```

- Successful Response
  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:
  ```
  {
    "message": "Tag successfully added",
    "statusCode": 200
  }
  ```


* Error response: Couldn't find a Tag with the specified id
  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  * Body:
  ```
  {
    "message": "Tag couldn't be found",
    "statusCode": 404
  }
  ```

* Error response: Couldn't find a Photo with the specified id
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

### - Delete a tag from a photo

Deletes a tag from a photo

- Require Authentication: True
- Require proper authorization: Photo must belong to the current user
- Request
  - Method: DELETE
  - URL: /api/photos/:photoId/tags
  - Body:
  ```
  {
    "tagId": 1,
  }
  ```

- Successful Response
  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:
  ```
  {
    "message": "Tag successfully deleted",
    "statusCode": 200
  }
  ```

* Error response: Couldn't find a Tag with the specified id
  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  * Body:
  ```
  {
    "message": "Tag couldn't be found",
    "statusCode": 404
  }
  ```

* Error response: Couldn't find a Photo with the specified id
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

## Frontend endpoints

## Wireframe
