# PixelPeek

---

## DB Schema

![dbschema](images/DB-Schema.png)

---

## Backend endpoints

## - Photos

### Get all photos

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

---

## Frontend endpoints

## Wireframe
