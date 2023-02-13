// Basic actions
const GET_ALL_PHOTOS = "photos/get_all_photos";
const GET_SINGLE_PHOTO = "photos/get_single_photo";
const CREATE_NEW_PHOTO = "photos/create_new_photo";
const UPDATE_PHOTO = "photos/update_photo";
const DELETE_PHOTO = "photos/delete_photo";


// Action creators here
const getAllPhotos = (photos) => ({
    type: GET_ALL_PHOTOS,
    payload: photos
});

const getSinglePhoto = (photo) => ({
	type: GET_SINGLE_PHOTO,
	payload: photo
})

const initialState = { user: null };

// Thunks go here
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

//Reducers go here
export default function photoReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_PHOTOS:
            return { photos: action.payload };
        case GET_SINGLE_PHOTO:
            return 
        case CREATE_NEW_PHOTO:
            return
        case UPDATE_PHOTO:
            return
        case DELETE_PHOTO:
			return
		default:
            return state;
    }
}
