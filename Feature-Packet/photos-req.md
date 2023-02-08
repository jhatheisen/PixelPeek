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

### - Get all Comments of the Current User

Returns all comments of the current user

- Require Authentication: true
- Request
  - Method: GET
  - URL: /api/comments/current
  - Body: none
- Successful Response
  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:
  ```json
  {
    "Comments": [
      {
        "id": 1,
        "user_id": 1,
        "photo_id": 1,
        "comment": "What an awesome photo!"
        "created_at": "04/15/2021",
        "User": {
          "id": 1,
          "firstName": "Jane",
          "lastName": "Doe",
        },
        "Photos": {
          "id": 1,
          "user_id": 1,
          "title": "DogsAndCats",
          "description": "nice animals",
          "city": "Los Angeles",
          "state": "California",
          "country": "United States"
          "img_url": "!!REPLACE WITH S3 BUCKET!!",
        },
      }
    ]
  }
  ```

### - Get all Comments by a Photo's id

Returns all comments by photo's id

- Require Authentication: false
- Request
  - Method: GET
  - URL: /api/photos/:photoId/comments
  - Body: none
- Successful Response
  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:
  ```json
  {
    "Comments": [
      {
        "id": 1,
        "user_id": 1,
        "photo_id": 1,
        "comment": "What an awesome photo!"
        "created_at": "04/15/2021",
        "User": {
        "id": 1,
        "firstName": "Jane",
        "lastName": "Doe"
      },
      }
    ]
  }
  ```
Error response: Couldn't find a Photo with the specified id
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

### - Create a Comment for a Photo based on the Photo's id

Create and return a new comment for a photo specified by id.

- Require Authentication: true
- Request
  - Method: POST
  - URL: /api/photos/:photoId/comments
  - Body:
  ```json
  {
    "comments": "What an awesome photo!"
  }
  ```
- Successful Response
  - Status Code: 201
  - Headers:
    - Content-Type: application/json
  - Body:
  ```json
  {
    "Comments": [
      {
        "id": 1,
        "user_id": 1,
        "photo_id": 1,
        "comment": "What an awesome photo!"
        "created_at": "04/15/2021"
      }
    ]
  }
  ```
  Error response: Body validation errors
  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  * Body:
  ```json
  {
    "message": "Validation error",
    "statusCode": 400,
    "errors": {
    "comment": "Comment is required"
    }
  }
  ```

  Error response: Couldn't find a Photo with the specified id
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


### - Edit a Comment

Update and return an existing comment.

- Require Authentication: true
- Require proper authorization: Comment must belong to the current user
- Request
  - Method: PUT
  - URL: /api/comments/:commentId
  - Body:
  ```json
  {
    "comments": "This photo is super cool."
  }
  ```
- Successful Response
  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:
  ```json
  {
    "Comments": [
      {
        "id": 1,
        "user_id": 1,
        "photo_id": 1,
        "comment": "This photo is super cool."
        "created_at": "04/15/2021"
      }
    ]
  }
  ```

  Error response: Body validation errors
  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  * Body:
  ```json
  {
    "message": "Validation error",
    "statusCode": 400,
    "errors": {
    "comment": "Comment is required"
    }
  }
  ```

 Error response: Couldn't find a Comment with the specified id
  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  * Body:
  ```json
  {
    "message": "Comment couldn't be found",
    "statusCode": 404
  }
  ```

### - Delete a Comment

Delete an existing comment.

- Require Authentication: true
- Require proper authorization: Comment must belong to the current user
- Request
  - Method: DELETE
  - URL: /api/comments/:commentId
  - Body: none
- Successful Response
  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:
  ```json
  {
    "message": "Successfully deleted",
    "statusCode": 200
  }
  ```

  Error response: Couldn't find a Comment with the specified id
  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  * Body:
  ```json
  {
    "message": "Comment couldn't be found",
    "statusCode": 404
  }
  ```


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
