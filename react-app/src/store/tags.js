const GET_ALL_TAGS = 'tags/GET_ALL_TAGS';
const CREATE_NEW_TAG = 'tags/CREATE_NEW_TAG';

const getAllTags = (tags) => ({
  type: GET_ALL_TAGS,
  payload: tags
})

const createNewTag = (tag) => ({
  type: CREATE_NEW_TAG,
  payload: tag
});

export const thunkGetAllTags = () => async (dispatch) => {
  const response = await fetch("/api/tags/", {
    method: "GET"
  })

  if (response.ok) {
    const data = await response.json();
    dispatch(getAllTags(data));
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

export const thunkCreateNewTag = (tag) => async (dispatch) => {
  const response = await fetch(`/api/tags/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tag),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(createNewTag(data));
    return data;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

const initialState = { user: null };

export default function tagReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GET_ALL_TAGS:
      newState = {...action.payload}
      return newState
    case CREATE_NEW_TAG:
      newState = {...state};
      newState.Tags.push(action.payload)
      return newState
    default:
      return state;
  }
}
