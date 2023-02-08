# PixelPeek

---

## DB Schema

![dbschema](images/DB-Schema.png)

---

## Backend endpoints:

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

```json
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

```json
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

- Error response: Couldn't find a Photo with the specified id
  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  * Body:

```json
{
  "message": "Photo couldn't be found",
  "statusCode": 404
}
```

### - Create a new photo

Creates and returns a new photo image

- Require Authentication: true
- Request

  - Method: POST
  - URL:/api/photos
  - Headers:
    - Content-Type: application/json
  - Body:

```json
{
  "title": "DogsAndCats",
  "description": "nice animals",
  "city": "Los Angeles",
  "state": "California"
}
```

- Successful Response
  - Status Code: 201
  - Headers:
    - Content-Type: application/json
  - Body:

```json
{
  "id": 1,
  "user_id": 1,
  "title": "DogsAndCats",
  "description": "nice animals",
  "city": "Los Angeles",
  "state": "California",
  "created_at": "02/02/2023"
}
```

- Error Response Body validation error

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

```json
{
  "message": "Validation Error",
  "statusCode": 400,
  "errors": {
    "title": "Photo title must be less than 50 characters",
    "city": "City is required",
    "state": "State is required",
    "country": "Country is required",
    "description": "Description is required"
  }
}
```

### - Update/Edit Photo

Updates and returns an existing photo.

- Require Authentication: true
- Require proper authorization: Spot must belong to the current user
- Request
  - Method: PUT
  - URL: /api/photos/:photoId
  - Headers:
    - Content-Type: application/json
  - Body:

```json
{
  "title": "DogsAndCats",
  "description": "nice animals",
  "city": "Los Angeles",
  "state": "California"
}
```

- Successful Response
  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

```json
{
  "id": 1,
  "user_id": 1,
  "title": "DogsAndCats",
  "description": "nice animals",
  "city": "Los Angeles",
  "state": "California",
  "created_at": "02/02/2023"
}
```

- Error Response Body validation error

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

```json
{
  "message": "Validation Error",
  "statusCode": 400,
  "errors": {
    "title": "Photo title must be less than 50 characters",
    "city": "City is required",
    "state": "State is required",
    "country": "Country is required",
    "description": "Description is required"
  }
}
```

- Error response: Couldn't find a photo with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

  ```json
  {
    "message": "Photo couldn't be found",
    "statusCode": 404
  }
  ```

### - Delete a Photo

Deletes an existing photo.

- Require Authentication: true
- Require proper authorization: Photo must belong to the current user
- Request
  - Method: DELETE
  - URL:/api/photos/:photoId
  - Body: none
- Successful Response

  - Status Code: 200
  - Headers:

    - Content-Type: application.json
    - Body:

    ```json
    {
      "message": "Successfully deleted",
      "statusCode": 200
    }
    ```

- Error response: Couldn't find a Photo with the specified id
  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:
  ```json
  {
    "message": "Photo couldn't be found",
    "statusCode": 404
  }
  ```

---

## Albums

### - Get details from album by album id

Returns photos from an album by album Id

- Require Authentication: false
- Request
  - Method: GET
  - URL: /api/album/:albumId
  - Body: none
- Successful Response
  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:
  ```
  {
    {
      "id": 1,
      "album_id": 1,
      "album_name": "DogsAndCats"
    }
  }
  ```

* Error response: Couldn't find an Album with the specified id
  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  * Body:
  ```
  {
    "message": "Album couldn't be found",
    "statusCode": 404
  }
  ```

### - Get all photos from an album

Returns photos from an album by album Id

- Require Authentication: false
- Request
  - Method: GET
  - URL: /api/album/:albumId/photos
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

### - Create an album

Creates an empty album

- Require Authentication: true
- Request

  - Method: POST
  - URL: /api/album
  - Body:

  ```
  {
    "album_name": "DogsAndCats"
  }
  ```

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

  ```
  {
    message: "Successfully Created"
  }
  ```

- Error Response: Body validation error
  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:
  ```
  {
    "message": "Validation Error",
    "statusCode": 400,
    "errors": {
      "name": "Name must be 60 characters or less"
    }
  }
  ```

### - Add photo(s) to album

Add photo(s) to an album by photo id

- Require Authentication: true
- Require proper authorization: Current User must be the owner of album and owner of photos
- Request

  - Method: PUT
  - URL: /api/album/:albumId
  - Body:

  ```
  {
    "Photos": [
      {
        photoId: 1
      },
      {
        photoId: 2
      }
    ]
  }
  ```

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

  ```
  {
    "message": "Successfully Added
  }
  ```

- Error Response

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

  ```
  {
    message: "Couldn't find photo with the specified id"
  }
  ```

- Authentication Error Response
  - Status Code: 403
  - Headers:
    - Content-Type: application/json
  - Body:
  ```
  {
    message: "Forbidden"
  }
  ```

### - Delete an album

Delete an album by id

- Require Authentication: true
- Require proper authorization: Current User must be the owner of album
- Request

  - Method: DELETE
  - URL: /api/album/:albumId
  - Body: none

  ```
  {
    "album_name": "DogsAndCats"
  }
  ```

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

  ```
  {
    message: "Successfully Deleted"
  }
  ```

- Error Response

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

  ```
  {
    message: "Couldn't find album with the specified id"
  }
  ```

- Authentication Error Response
  - Status Code: 403
  - Headers:
    - Content-Type: application/json
  - Body:
  ```
  {
    message: "Forbidden"
  }
  ```

## Comments

## Tags

## Frontend endpoints

## Wireframe
