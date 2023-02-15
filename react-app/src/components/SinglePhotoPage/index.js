import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink, useHistory } from "react-router-dom";
import { thunkGetOnePhoto, thunkDeletePhoto, thunkUpdatePhoto } from "../../store/photos";
import * as photoActions from '../../store/photos'
import UpdatePhotoModal from "../UpdatePhoto";
import './SinglePhotoPage.css'


const SinglePhotoPage = () => {

    //get photo data via thunk
    const dispatch = useDispatch();

    const [loadedPage, setLoadedPage] = useState(false);
    const history = useHistory();

    useEffect(()=>{
      dispatch(thunkGetOnePhoto(photoId))

      return () => {
        setLoadedPage(false);
        setCommentText('');
        setEditingComment(false);
      }
    }, [dispatch, loadedPage])

    const { photoId } = useParams();

    const photo = useSelector(state => state.photos.photoDetails)
    const currUser = useSelector(state => state.session.user)

    const [commentText, setCommentText] = useState('');
    const [errors, setErrors] = useState([]);
    const [editingComment, setEditingComment ] = useState(false);

    let alreadyCommented = false;

    if (!photo) return null;


    const { user, title, description, img_url, city, state, country, comments, tags, createdAt, id } = photo;


    //Photos Handlers
    const handlePhotoDelete = async (e) => {
        e.preventDefault();
        dispatch(thunkDeletePhoto(photo.id)).then(() => history.push("/photos"))
    };


    //Comments handlers
    const handleCommentSubmit = async (e) => {
      e.preventDefault();
        setErrors([]);

        const newComment = {
          comment: commentText
        }

        const response = await dispatch(photoActions.thunkCreatePhotoComment(id, newComment));
        await setLoadedPage(true)
    }

    const handleCommentUpdate = async (e, commentId) => {
        e.preventDefault();
        setErrors([]);

        let stateI = null;
        for (let i = 0; i < comments.length; i++) {
          const comment = comments[i];
          if (comment.id == commentId) stateI = i;
        }

        const changedComment = {
          comment: commentText
        }

        // console.log("comment to be changed: ",changedComment, commentId, stateI)
        await dispatch(photoActions.thunkEditPhotoComment(commentId, stateI, changedComment));
        await setLoadedPage(true)
      }

      const handleCommentDelete = async (commentId) => {
        let stateI = null;
        for (let i = 0; i < comments.length; i++) {
          const comment = comments[i];
          if (comment.id == commentId) stateI = i;
        }
        await dispatch(photoActions.thunkDeletePhotoComment(commentId, stateI));
        await setLoadedPage(true)
    }
    console.log('have we already commented? : ' + alreadyCommented)

    console.log("user=------------------>", user)

    if (comments) {
      // console.log(comments)
        comments.forEach(comment => {
            const commentOwner = comment.user_id;
            if (currUser) {
                if (commentOwner == currUser.id) alreadyCommented = true
            }
        })
    }

    return (
      <>
            <div className="pageBox">
                <NavLink to='/photos' className='backLink'>Back to explore</NavLink>

                <div className="photoBox">
                    <img src={img_url} alt={'image of ' + description}></img>
                </div>

                <div className="userBox">
                    <NavLink exact to={`/users/${user.id}`}><i className="fa-solid fa-user"></i></NavLink>
                    <NavLink exact to={`/users/${user.id}`}>{user.username}</NavLink>

                    {currUser && photo.user_id == currUser.id &&
                        <>
                            <button onClick={handlePhotoDelete}>Delete Photo</button>
                            <UpdatePhotoModal user={currUser} />
                        </>
                    }
                    <p>{title}</p>
                    <p>{description}</p>
                </div>
                <hr />

                <div className="commentBox">
                    {photo &&
                        comments.map(comment => {
                            let isUser = false
                            if (currUser) isUser = true;
                            return (
                                <>
                                { editingComment != comment.id &&
                                  <div className="commentBox">
                                      <i className="fa-solid fa-user"></i>
                                      <NavLink exact to={`/users/${comment.id}`}>{comment.username}</NavLink>
                                      { isUser && comment.user_id == currUser.id &&
                                          <>
                                          <button onClick={() => handleCommentDelete(comment.id)}><i className="fa-regular fa-trash-can"></i></button>
                                          <button onClick={() => {
                                            setEditingComment(comment.id)
                                            setCommentText(comment.comment)
                                            console.log(commentText)
                                          }}>
                                          <i className="fa-solid fa-pen-to-square"></i>
                                          </button>
                                          </>
                                      }
                                      <p>{comment.comment}</p>
                                      <p>{comment.createdAt}</p>
                                    </div>
                                }

                                    { editingComment == comment.id &&
                                      <div className="editCommentBox">
                                          <form onSubmit={(e) => handleCommentUpdate(e, comment.id)} className="commentForm">
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
                                                  {comment &&
                                                      <button type="submit" className='create-comment-submit-button'>
                                                          Submit
                                                      </button>
                                                  }
                                                  <ul className="createErrors">
                                                      {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                                                  </ul>
                                              </div>
                                          </form>
                                      </div>
                                  }

                                </>
                            )
                        })
                    }

                { !editingComment &&
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
                                {commentText &&
                                    <button type="submit" className='create-comment-submit-button'>
                                        Submit
                                    </button>
                                }
                                <ul className="createErrors">
                                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                                </ul>
                            </div>
                        </form>
                    </div>
                }
                {/* { alreadyCommented &&
                    <h2>Please delete your existing comment to post a new one</h2>
                } */}
                </div>


                <hr />
                <div className="detailsBox">
                    <p>{`${city}, ${state}, ${country}`}</p>
                    <p>{comments.length + ' comment(s)'}</p>
                </div>

                <hr />
                <div className="tagsBox">
                    {photo &&
                        tags.map(tag =>
                            <p>{tag.tag_name}</p>
                        )
                    }
                </div>
            </div>
        </>
    )
}
export default SinglePhotoPage;
