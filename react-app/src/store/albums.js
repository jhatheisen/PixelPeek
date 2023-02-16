const GET_ALL_ALBUMS = "albums/get_all_ablums";
const GET_SINGLE_ALBUM = "albums/get_single_ablum";
const CREATE_ALBUM = "albums/create_album";
const ADD_ALBUM_PHOTO = "albums/add_album_photo";
const DELETE_ALBUM = "albums/delete_album";

const getAllAlbums = (albums) => ({
  type: GET_ALL_ALBUMS,
  payload: albums,
});

const getSingleAlbum = (album) => ({
  type: GET_SINGLE_ALBUM,
  payload: album,
});

const createAlbum = (album) => ({
  type: CREATE_ALBUM,
  payload: album,
});

const addAlbumPhoto = (photo) => ({
  type: ADD_ALBUM_PHOTO,
  payload: photo,
});

const deleteAlbum = (albumId) => ({
  type: DELETE_ALBUM,
  payload: albumId,
});

export const thunkGetAllAlbums = () => async (dispatch) => {
  const response = await fetch("/api/albums/", {
    method: "GET",
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(getAllAlbums(data));
    return data;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  }
};

export const thunkGetSingleAlbum = (albumId) => async (dispatch) => {
  const response = await fetch(`/api/albums/${albumId}`, {
    method: "GET",
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(getSingleAlbum(data));
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const thunkCreateAlbum = (data) => async (dispatch) => {
  const response = await fetch(`/api/albums/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(createAlbum(data));
    return data;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  }
};

export const thunkAddAlbumPhoto = (albumId, photo) => async (dispatch) => {
  const response = await fetch(`/api/albums/${albumId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      photoId: photo.id,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addAlbumPhoto(photo));
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const thunkDeleteAlbum = (albumId) => async (dispatch) => {
  const response = await fetch(`/api/albums/${albumId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(deleteAlbum(albumId));
    return data;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  }
};

const initialState = { singleAlbum: null, albums: null };

export default function albumReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GET_ALL_ALBUMS:
      let result = {};
      action.payload.Albums.forEach((album) => {
        result[album.id] = album;
      });
      return { allAlbums: result };
    case GET_SINGLE_ALBUM:
      newState = { ...state };
      newState.singleAlbum = action.payload;
      return newState;
    case ADD_ALBUM_PHOTO:
      newState = { ...state };
      newState.singleAlbum.photos.push(action.payload);
      return newState;
    case DELETE_ALBUM:
      newState = Object.assign({}, state);
      console.log(newState, "newState");
      delete newState.allAlbums[action.payload];

      return newState;
    default:
      return state;
  }
}
