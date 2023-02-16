import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink, useHistory } from "react-router-dom";
import {
  thunkGetOnePhoto,
  thunkDeletePhoto,
  thunkUpdatePhoto,
} from "../../store/photos";
import * as photoActions from "../../store/photos";
import { thunkGetAllTags, thunkCreateNewTag } from "../../store/tags";
import UpdatePhotoModal from "../UpdatePhoto";
import "./SinglePhotoPage.css";

const SinglePhotoPage = () => {
  //get photo data via thunk
  const dispatch = useDispatch();

  const [loadedPage, setLoadedPage] = useState(false);
  const history = useHistory();

  useEffect(() => {
    dispatch(thunkGetOnePhoto(photoId));
    dispatch(thunkGetAllTags())

    return () => {
      setLoadedPage(false);
      setCommentText("");
      setEditingComment(false);
      setTagsOpen(false);
      setTagName("");
    };
  }, [dispatch, loadedPage]);

  const { photoId } = useParams();

  const photo = useSelector((state) => state.photos.photoDetails);
  const currUser = useSelector((state) => state.session.user);
  const allTags = useSelector((state) => state.tags.Tags);

  const [commentText, setCommentText] = useState("");
  const [tagText, setTagText] = useState("");
  const [tagName, setTagName] = useState("");
  const [errors, setErrors] = useState([]);
  const [editingComment, setEditingComment] = useState(false);
  const [tagsOpen, setTagsOpen] = useState(false);

  let alreadyCommented = false;

  if (!photo) return null;
  if (!allTags) return null;

  const {
    user,
    title,
    description,
    img_url,
    city,
    state,
    country,
    comments,
    tags,
    createdAt,
    id,
  } = photo;

  //Photos Handlers
  const handlePhotoDelete = async (e) => {
    e.preventDefault();
    dispatch(thunkDeletePhoto(photo.id)).then(() => history.push("/photos"));
  };

  //Comments handlers
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const newComment = {
      comment: commentText,
    };

    const response = await dispatch(
      photoActions.thunkCreatePhotoComment(id, newComment)
    );
    await setLoadedPage(true);
  };

  const handleCommentUpdate = async (e, commentId) => {
    e.preventDefault();
    setErrors([]);

    let stateI = null;
    for (let i = 0; i < comments.length; i++) {
      const comment = comments[i];
      if (comment.id == commentId) stateI = i;
    }

    const changedComment = {
      comment: commentText,
    };

    await dispatch(
      photoActions.thunkEditPhotoComment(commentId, stateI, changedComment)
    );
    await setLoadedPage(true);
  };

  const handleCommentDelete = async (commentId) => {
    let stateI = null;
    for (let i = 0; i < comments.length; i++) {
      const comment = comments[i];
      if (comment.id == commentId) stateI = i;
    }
    await dispatch(photoActions.thunkDeletePhotoComment(commentId, stateI));
    await setLoadedPage(true);
  };

  if (comments) {
    // console.log(comments)
    comments.forEach((comment) => {
      const commentOwner = comment.user_id;
      if (currUser) {
        if (commentOwner == currUser.id) alreadyCommented = true;
      }
    });
  }

  // Tags handlers

  const handleAddTag = async (tag) => {
    const response = await dispatch(
      photoActions.thunkAddPhotoTag(photo.id, tag)
    )
    await setLoadedPage(true)
  }

  const handleTagSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    setTagName(tagName[0].toUpperCase() + tagName.slice(1))

    for(let i = 0; i < allTags.length; i++) {
      let tag = allTags[i];
      if (tag.tag_name == tagName) {
        return window.alert('Tag already exists. Please add the tag from the list, or create a new one!')
      }
    }

    const newTag = {
      tag_name: tagName,
    };

    const response = await dispatch(
      thunkCreateNewTag(newTag)
    );
    console.log(response);
    await dispatch(photoActions.thunkAddPhotoTag(photo.id, response))
    await setLoadedPage(true);
  };

  const handleTagDelete = async (tagId) => {
    console.log('tagId:', tagId)
    let stateI = null;
    for (let i = 0; i < tags.length; i++) {
      const tag = tags[i];
      if (tag.id == tagId) stateI = i;
    }
    await dispatch(photoActions.thunkDeletePhotoTag(photoId, tagId));
    await setLoadedPage(true);
  };

  if (tags) {
    tags.forEach((tag) => {
      const tagOwner = tag.user_id;
      if (currUser) {
        if (tagOwner == currUser.id) alreadyCommented = true;
      }
    });
  }

  return (
    <>
      <div className="pageBox">
        <NavLink to="/photos" className="backLink">
          Back to explore
        </NavLink>

        <div className="photoBox">
          <img src={img_url} alt={"image of " + description}></img>
        </div>

        <div className="userBox">
          <NavLink exact to={`/users/${user.id}`}>
            <i className="fa-solid fa-user"></i>
          </NavLink>
          <NavLink exact to={`/users/${user.id}`}>
            {user.username}
          </NavLink>

          {currUser && photo.user_id == currUser.id && (
            <>
              <button onClick={handlePhotoDelete}>Delete Photo</button>
              <UpdatePhotoModal user={currUser} />
            </>
          )}
          <p>{title}</p>
          <p>{description}</p>
        </div>
        <hr />

        <div className="commentBox">
          <h2>Comments</h2>
          <hr/>
          {photo &&
            comments.map((comment) => {
              let isUser = false;
              if (currUser) isUser = true;
              return (
                <>
                  {editingComment != comment.id && (
                    <div className="commentBox">
                      <i className="fa-solid fa-user"></i>
                      <NavLink exact to={`/users/${comment.id}`}>
                        {comment.username}
                      </NavLink>
                      {isUser && comment.user_id == currUser.id && (
                        <>
                          <button
                            onClick={() => handleCommentDelete(comment.id)}
                          >
                            <i className="fa-regular fa-trash-can"></i>
                          </button>
                          <button
                            onClick={() => {
                              setEditingComment(comment.id);
                              setCommentText(comment.comment);
                              console.log(commentText);
                            }}
                          >
                            <i className="fa-solid fa-pen-to-square"></i>
                          </button>
                        </>
                      )}
                      <p>{comment.comment}</p>
                      <p>{comment.createdAt}</p>
                    </div>
                  )}

                  {editingComment == comment.id && (
                    <div className="editCommentBox">
                      <form
                        onSubmit={(e) => handleCommentUpdate(e, comment.id)}
                        className="commentForm"
                      >
                        <div className="commentInput">
                          <label for="comment">
                            <i className="fa-solid fa-camera-retro"></i>
                            <textarea
                              type="textarea"
                              id="comment"
                              value={commentText}
                              onChange={(e) => setCommentText(e.target.value)}
                              maxlength={255}
                              placeholder="Edit your comment"
                              required
                            />
                          </label>
                          {comment && (
                            <button
                              type="submit"
                              className="create-comment-submit-button"
                            >
                              Submit
                            </button>
                          )}
                          <ul className="createErrors">
                            {errors.map((error, idx) => (
                              <li key={idx}>{error}</li>
                            ))}
                          </ul>
                        </div>
                      </form>
                    </div>
                  )}
                </>
              );
            })}

          {!editingComment && (
            <div className="makeCommentBox">
              <form onSubmit={handleCommentSubmit} className="commentForm">
                <div className="commentInput">
                  <label for="comment">
                    <i className="fa-solid fa-camera-retro"></i>
                    <textarea
                      type="textarea"
                      id="comment"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      maxlength={255}
                      placeholder="Add a comment"
                      required
                    />
                  </label>
                  {commentText && (
                    <button
                      type="submit"
                      className="create-comment-submit-button"
                    >
                      Submit
                    </button>
                  )}
                  <ul className="createErrors">
                    {errors.map((error, idx) => (
                      <li key={idx}>{error}</li>
                    ))}
                  </ul>
                </div>
              </form>
            </div>
          )}
          {/* { alreadyCommented &&
                    <h2>Please delete your existing comment to post a new one</h2>
                } */}
        </div>

        <hr />
        <div className="detailsBox">
          <p>{`${city}, ${state}, ${country}`}</p>
          <p>{comments.length + " comment(s)"}</p>
        </div>

        <hr />
        <div className="tagsBox">
          <h2>Tags</h2>
          <hr/>
          {photo &&
            tags.map((tag) => (
              <>
                <p>{tag.tag_name}</p>
                <button onClick={() => handleTagDelete(tag.id)}>Del</button>
              </>
            ))
          }
          { photo.user_id == currUser.id &&
            <div className="addTagsBox">
              <button onClick={() => setTagsOpen(!tagsOpen)} className="addTagButton">Add tag</button>
              { tagsOpen && (
                <>
                  <div className="allTags">
                    { allTags.map(tag => (<button className="tagButton" onClick={() => handleAddTag(tag)}>{tag.tag_name}</button>))}
                  </div>
                  <form onSubmit={handleTagSubmit}>
                    <input
                    type="text"
                    id="tagName"
                    value={tagName}
                    onChange={(e) => setTagName(e.target.value)}
                    maxLength={19}
                    placeholder="Add Tag Name Here"
                    />
                    <button type="submit">Add a new tag</button>
                  </form>
                </>
              )}
            </div>
          }
        </div>
      </div>
    </>
  );
};
export default SinglePhotoPage;
