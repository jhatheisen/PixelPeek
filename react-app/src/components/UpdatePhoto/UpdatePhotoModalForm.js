import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { thunkUpdatePhoto } from "../../store/photos";
import { useModal } from "../../context/Modal";
import "./UpdatePhotoModal.css";

function UpdatePhotoModalForm() {
  const sessionUser = useSelector((state) => state.session.user);
  const photo = useSelector((state) => state.photos.photoDetails);

  const dispatch = useDispatch();
  const history = useHistory();

  const [title, setTitle] = useState(photo.title);
  const [description, setDescription] = useState(photo.description);
  const [city, setCity] = useState(photo.city);
  const [state, setState] = useState(photo.state);
  const [country, setCountry] = useState(photo.country);
  const [imageUrl, setImageUrl] = useState(photo.img_url);
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const { id, user_id } = photo;

    const photoDetails = {
      id,
      user_id,
    };
    const editedPhotoBody = {
      title,
      description,
      city,
      state,
      country,
      imageUrl,
    };

    try {
      const res = await dispatch(
        thunkUpdatePhoto(editedPhotoBody, photoDetails)
      );

      closeModal();
      history.push(`/photos/${res.id}`);
    } catch (error) {
      let errorObject = JSON.parse(error.message);
      const result = errorObject.errors.map((error) => {
        return error.split(": ")[1];
      });
      if (errorObject) setErrors(result);
    }
  };

  //add a redirect or to place to read new group

  return (
    <div className="create-group-outer-most-div">
      <div className="create-group-text-div">Update Photo</div>
      <form onSubmit={handleSubmit} className="outerCreateEventFormDiv">
        <ul>
          {errors.map((error, idx) => (
            <li key={idx} className="updatePhotoErrors">
              {error}
            </li>
          ))}
        </ul>
        <label className="label">Title</label>
        <input
          className="inputClass"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label className="label">Description</label>
        <textarea
          className="inputClass createGroupTextArea"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <label className="label">City</label>
        <input
          className="inputClass"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <label className="label">State</label>
        <input
          className="inputClass"
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        />
        <label className="label">Country</label>
        <input
          className="inputClass"
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
        <label className="label">Image</label>
        <input
          className="inputClass"
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />
        <button type="submit" className="submitCreateGroupButton">
          Submit
        </button>
      </form>
    </div>
  );
}

export default UpdatePhotoModalForm;
