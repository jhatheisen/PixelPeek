import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink, useHistory } from "react-router-dom";
import { thunkGetOnePhoto } from "../../store/photos";
import * as photoActions from '../../store/photos'
import './SinglePhotoPage.css'

const SinglePhotoPage = () => {

    //get photo data via thunk
    useEffect(()=>{
        dispatch(thunkGetOnePhoto(photoId))
    }, [])

    const dispatch = useDispatch();
    const { photoId } = useParams();
    const history = useHistory();

    const photo = useSelector(state => state.photos.photoDetails)
    const currUser = useSelector(state => state.session.user)

    const [comment, setComment] = useState('');
    const [errors, setErrors] = useState([]);

    let alreadyCommented = false;

    if (!photo) return null;

    const { user, title, description, img_url, city, state, country, comments, tags, createdAt, id} = photo;

    if (comments) {
        comments.forEach(comment => {
            const commentOwner = comment.user_id;
            if (currUser) {
                if (commentOwner == currUser.id) alreadyCommented = true
            }
        })
    }

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        const newComment = {
          comment
        }

        const response = await dispatch(photoActions.thunkCreatePhotoComment(id, newComment));
        history.go(0);
    }

    const handleCommentDelete = async (commentId) => {

        const deleting = window.confirm("Are you sure you want to delete this Comment?");
        if (deleting) {
            dispatch(photoActions.thunkDeletePhotoComment(commentId));
            history.go(0);
        }
    }
    console.log('have we already commented? : ' + alreadyCommented)

    return (
        <>
            <div className="pageBox">
                <NavLink to='/photos' className='backLink'>Back to explore</NavLink>

                <div className="photoBox">
                    <img src={img_url} alt={'image of '+ description}></img>
                </div>

                <div className="userBox">
                    <NavLink exact to={`/users/${user.id}`}><i className="fa-solid fa-user"></i></NavLink>
                    <NavLink exact to={`/users/${user.id}`}>{user.username}</NavLink>
                    <p>{title}</p>
                    <p>{description}</p>
                </div>
                <hr/>

                <div className="commentBox">
                    { photo &&
                        comments.map(comment => {
                            let isUser = false
                            if (currUser) isUser = true;
                            return (
                                <>
                                    <i className="fa-solid fa-user"></i>
                                    <NavLink exact to={`/users/${comment.id}`}>{comment.username}</NavLink>
                                    { isUser && comment.user_id == currUser.id &&
                                        <button onClick={() => handleCommentDelete(comment.id)}><i className="fa-regular fa-trash-can"></i></button>
                                    }
                                    <p>{comment.comment}</p>
                                    <p>{comment.createdAt}</p>
                                </>
                            )
                        })
                    }

                {
                    <div className="makeCommentBox">
                        <form onSubmit={handleCommentSubmit} className="commentForm">
                            <div className="commentInput">
                                <label for="comment">
                                    <i className="fa-solid fa-camera-retro"></i>
                                    <textarea
                                        type="textarea"
                                        id="comment"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        maxlength={255}
                                        placeholder="Add a comment"
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
                {/* { alreadyCommented &&
                    <h2>Please delete your existing comment to post a new one</h2>
                } */}
                </div>


                <hr/>
                <div className="detailsBox">
                    <p>{`${city}, ${state}, ${country}`}</p>
                    <p>{comments.length + ' comment(s)'}</p>
                </div>

                <hr/>
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
