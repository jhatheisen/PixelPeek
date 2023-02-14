// Basic actions
const GET_ALL_PHOTOS = "photos/get_all_photos";
const GET_SINGLE_PHOTO = "photos/get_single_photo";
const CREATE_NEW_PHOTO = "photos/create_new_photo";
const UPDATE_PHOTO = "photos/update_photo";
const DELETE_PHOTO = "photos/delete_photo";
const DELETE_PHOTO_COMMENT = "photos/delete_photo_comment";
const CREATE_PHOTO_COMMENT = "photos/create_photo_comment";
const EDIT_PHOTO_COMMENT = "photos/edit_photo_comment";


// Action creators here
const getAllPhotos = (photos) => ({
    type: GET_ALL_PHOTOS,
    payload: photos
});

const getSinglePhoto = (photo) => ({
    type: GET_SINGLE_PHOTO,
    payload: photo
})

const createPhoto = (data) => ({
    type: CREATE_NEW_PHOTO,
    payload: data
})

const deletePhotoComment = (stateI) => ({
    type: DELETE_PHOTO_COMMENT,
    payload: stateI
})

const createPhotoComment = (comment) => ({
    type: CREATE_PHOTO_COMMENT,
    payload: comment
})

const editPhotoComment = (stateI, comment) => ({
    type: EDIT_PHOTO_COMMENT,
    payload: {stateI, comment}
})


// Photo Feature Thunks Here
const initialState = { user: null };

export const thunkGetAllPhotos = () => async (dispatch) => {
    const response = await fetch("/api/photos", {
        method: "GET",
    });
    console.log("REQUEST SENT ====================>")
    if (response.ok) {
        const data = await response.json();
        dispatch(getAllPhotos(data));
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

export const thunkGetOnePhoto = (photoId) => async (dispatch) => {
    const response = await fetch(`/api/photos/${photoId}`, {
        method: "GET",
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(getSinglePhoto(data));
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

export const thunkCreatePhotoComment = (photoId, comment) => async (dispatch) => {
    const response = await fetch(`/api/photos/${photoId}/comments`, {
        method: "POST",
        headers: {
			"Content-Type": "application/json",
		},
        body: JSON.stringify(comment)
    });

    if (response.ok) {
            const data = await response.json();
            return null;
    } else if (response.status < 500) {
            const data = await response.json();
            if (data.errors) {
                    return data.errors;
            }
    } else {
            return ["An error occurred. Please try again."];
    }
}

export const thunkDeletePhotoComment = (commentId) => async(dispatch) => {
    const response = await fetch(`/api/comments/${commentId}`, {
        method: "DELETE",
    })

    if (response.ok) {
            const data = await response.json();
            dispatch(editPhotoComment(stateI, data.Comments[0]))
            return null;
    } else if (response.status < 500) {
            const data = await response.json();
            if (data.errors) {
                    return data.errors;
            }
    } else {
            return ["An error occurred. Please try again."];
    }

}

export const thunkCreatePhoto = (body, imageUrl) => async (dispatch) => {
    const { title, description, city, state, country } = body
    console.log("reaches fetch request ======================>")
    const response = await fetch(`/api/photos/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "title": title,
            "description": description,
            "city": city,
            "state": state,
            "country": country,
            "img_url": imageUrl
        }),
    });
    if (response.ok) {
        console.log("======================>request successful ")
        const data = await response.json();
        dispatch(createPhoto(data));
        console.log("======================>request successful ", data)
        return data;
    } else if (response.status < 500) {
        const data = await response.json();
        console.log("======================>error response in thunk ", data)
        throw new Error(JSON.stringify(data))
    }
};

export const thunkDeletePhoto = (photoId) => async (dispatch) => {
    console.log("fetch request reached ==============> ")
    
    const response = await fetch(`/api/photos/${photoId}`, {
        method: "DELETE",
    });
    console.log("fetch request completed ==============>", response)
    if(response.ok) dispatch(deletePhoto(photoId))
    return response
}



// Comment Feature Thunks Here

export const thunkCreatePhotoComment = (photoId, comment) => async (dispatch) => {
    const response = await fetch(`/api/photos/${photoId}/comments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(comment)
    });

    if (response.ok) {
            const data = await response.json();
            dispatch(createPhotoComment(data));
            return null;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ["An error occurred. Please try again."];
    }
}

export const thunkDeletePhotoComment = (commentId, stateI) => async(dispatch) => {
    const response = await fetch(`/api/comments/${commentId}`, {
        method: "DELETE",
    })

    if (response.ok) {
            dispatch(deletePhotoComment(stateI))
            return null;
    } else if (response.status < 500) {
            const data = await response.json();
            if (data.errors) {
                    return data.errors;
            }
    } else {
            return ["An error occurred. Please try again."];
    }
}

export const thunkEditPhotoComment = (commentId, stateI, comment) => async(dispatch) => {
    const response = await fetch(`/api/comments/${commentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
            body: JSON.stringify(comment)
    });

    if (response.ok) {
            dispatch(deletePhotoComment(stateI))
            return null;
    } else if (response.status < 500) {
            const data = await response.json();
            if (data.errors) {
                    return data.errors;
            }
    } else {
            return ["An error occurred. Please try again."];
    }
}

// export const thunkEditPhotoComment = (commentId, stateI, comment) => async(dispatch) => {
//     const response = await fetch(`/api/comments/${commentId}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//             body: JSON.stringify(comment)
//     });

//     if (response.ok) {
//             const data = await response.json();
//             return null;
//     } else if (response.status < 500) {
//         const data = await response.json();
//         if (data.errors) {
//             return data.errors;
//         }
//     } else {
//         return ["An error occurred. Please try again."];
//     }
// }



//Reducers go here
export default function photoReducer(state = initialState, action) {
    let newState
    switch (action.type) {
        case GET_ALL_PHOTOS:
            return { ...action.payload };
        case GET_SINGLE_PHOTO:
            return { ...state.photos, photoDetails: action.payload }
        case CREATE_NEW_PHOTO:
            newState = Object.assign({}, state)
            newState[action.payload.id] = action.payload
            return newState
        case UPDATE_PHOTO:
            return
        case DELETE_PHOTO:
            return
        case DELETE_PHOTO_COMMENT: {
          let nState = {...state};
          nState.photoDetails.comments.splice(action.payload, 1)
          return nState;
        }
        case CREATE_PHOTO_COMMENT: {
          let nState = {...state};
          nState.photoDetails.comments.push(action.payload)
          return nState;
        }
        case EDIT_PHOTO_COMMENT: {
          let nState = {...state};
          nState.photoDetails.comments[action.payload.stateI] = action.payload.comment;
          return nState
        }
        default:
            return state;
    }
}
