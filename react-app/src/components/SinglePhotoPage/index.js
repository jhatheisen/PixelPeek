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
    dispatch(thunkGetAllTags());

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
    );
    await setLoadedPage(true);
  };

  const handleTagSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    setTagName(tagName[0].toUpperCase() + tagName.slice(1));

    for (let i = 0; i < allTags.length; i++) {
      let tag = allTags[i];
      if (tag.tag_name == tagName) {
        return window.alert(
          "Tag already exists. Please add the tag from the list, or create a new one!"
        );
      }
    }

    const newTag = {
      tag_name: tagName,
    };

    const response = await dispatch(thunkCreateNewTag(newTag));
    await dispatch(photoActions.thunkAddPhotoTag(photo.id, response));
    await setLoadedPage(true);
  };

  const handleTagDelete = async (tagId) => {
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
        <div className="topPhotoBar">
          <NavLink to="/photos" className="backLink">
            <i className="fa-solid fa-arrow-left fa-l"></i>
            Back to explore
          </NavLink>
        </div>
        <div className="photoBox flexRow">
          <img
            src={img_url}
            alt={"image of " + description}
            id="photoImg"
          ></img>
        </div>

        <div className="topPhotoBar">
          {currUser && photo.user_id == currUser.id && (
            <>
              <button onClick={handlePhotoDelete} className="cleanButton">
                Delete Photo
              </button>
              <UpdatePhotoModal className="cleanButton" user={currUser} />
            </>
          )}
        </div>

        <div className="bottomSection">
          <div className="userBox flexRow">
            <NavLink exact to={`/users/${user.id}`}>
              <i className="fa-solid fa-circle-user fa-4x userIcon"></i>
            </NavLink>
            <div className="userDetails">
              <div className="username">{user.username}</div>
              <p>
                <b>{title}</b>
              </p>
              <p>{description}</p>
              <hr className="firstHr" />
            </div>
          </div>

          <div className="commentBox">
            <h2 className="commentH2">Comments</h2>
            {photo &&
              comments.map((comment) => {
                let isUser = false;
                if (currUser) isUser = true;
                return (
                  <>
                    {editingComment != comment.id && (
                      <div className="commentBox">
                        <div className="comment flexRow">
                          <NavLink exact to={`/users/${comment.id}`}>
                            <i className="fa-solid fa-circle-user fa-2x userIcon"></i>
                          </NavLink>
                          <div className="commentDetails">
                            <a className="commentUser">{comment.username}</a>
                            {isUser && comment.user_id == currUser.id && (
                              <>
                                <button
                                  className="noButton"
                                  onClick={() =>
                                    handleCommentDelete(comment.id)
                                  }
                                >
                                  <i className="fa-regular fa-trash-can fa-xl"></i>
                                </button>
                                <button
                                  className="noButton"
                                  onClick={() => {
                                    setEditingComment(comment.id);
                                    setCommentText(comment.comment);
                                  }}
                                >
                                  <i className="fa-solid fa-pen-to-square fa-xl"></i>
                                </button>
                              </>
                            )}
                            <p>{comment.comment}</p>
                            <p>{comment.createdAt}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {editingComment == comment.id && (
                      <div className="makeCommentBox">
                        <form
                          onSubmit={(e) => handleCommentUpdate(e, comment.id)}
                          className="commentForm"
                        >
                          <div className="commentInput">
                            <label for="comment">
                              <i className="fa-solid fa-camera-retro fa-2x"></i>
                              <textarea
                                type="textarea"
                                id="comment"
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                maxLength={255}
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
                  <div className="commentInput flexRowCenter">
                    <label for="comment">
                      <i className="fa-solid fa-camera-retro fa-2x"></i>
                    </label>
                    <textarea
                      type="textarea"
                      id="comment"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      maxLength={255}
                      placeholder="Add a comment"
                      required
                    />
                    {
                      <button
                        type="submit"
                        className="create-comment-submit-button"
                      >
                        Submit
                      </button>
                    }
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

          <hr className="hr95" />
          <div className="detailsBox">
            <p>Taken in {`${city}, ${state}, ${country}`}</p>
            <p>Taken on {createdAt}</p>
            <p>{comments.length + " comment(s)"}</p>
          </div>

          <hr className="hr95" />
          <div className="tagsBox">
            <h2>Tags</h2>
            {photo && (
              <div className="tagsList">
                {tags.map((tag) => (
                  <>
                    <p className="tag">{tag.tag_name}</p>
                    {currUser && photo.user_id == currUser.id && (
                      <button
                        className="trash-button"
                        onClick={() => handleTagDelete(tag.id)}
                      >
                        <i className="fa-regular fa-trash-can"></i>
                      </button>
                    )}
                  </>
                ))}
              </div>
            )}
            {currUser && photo.user_id == currUser.id && (
              <div className="addTagsBox">
                <button
                  onClick={() => setTagsOpen(!tagsOpen)}
                  className="addTagButton cleanButton"
                >
                  Add tag
                </button>
                {tagsOpen && (
                  <>
                    <div className="allTags">
                      {allTags.map((tag) => (
                        <button
                          className="tagButton cleanButton"
                          onClick={() => handleAddTag(tag)}
                        >
                          {tag.tag_name}
                        </button>
                      ))}
                    </div>
                    <form onSubmit={handleTagSubmit} className="tag-submit">
                      <input
                        type="text"
                        id="tagName"
                        value={tagName}
                        onChange={(e) => setTagName(e.target.value)}
                        maxLength={19}
                        placeholder="Add Tag Name Here"
                        required
                      />
                      <button className="add-tag cleanButton" type="submit">
                        Add custom tag
                      </button>
                    </form>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default SinglePhotoPage;
