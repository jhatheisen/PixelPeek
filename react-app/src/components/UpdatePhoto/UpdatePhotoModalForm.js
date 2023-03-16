import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { thunkUpdatePhoto } from "../../store/photos";
import { useModal } from "../../context/Modal";
import "./UpdatePhotoModal.css";
import "../LoginFormModal/LoginForm.css";

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
  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(photo.img_url);
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    let url;

    if (image) {
      const formData = new FormData();
      formData.append("image", image);
      setImageLoading(true);


      const res = await fetch('/api/photos/upload', {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        url = await res.json();
        url = url["url"]
        setImageLoading(false);
      }
      else {
        setImageLoading(false);
        const errors = await res.json().errors
        setErrors([errors])
      }
    }

    let passingUrl = imageUrl;
    if (url) passingUrl = url;

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
      imageUrl: passingUrl
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

  const updateImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  }

  //add a redirect or to place to read new group

  return (
    <div className="Global-Modal-Container3">
      <img
        src={process.env.PUBLIC_URL + "/transparentOwl.png"}
        className="Global-Logo"
      />
      <div className="Global-Modal-Header">Update Photo</div>
      <form onSubmit={handleSubmit} className="Global-ModalForm-Container">
        <ul className="Global-Errors-UL">
          {errors.map((error, idx) => (
            <li key={idx} className="Global-Errors-LI">
              {error}
            </li>
          ))}
        </ul>
        <label for="title" className="Global-Modal-Label">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Title"
            className="Global-Modal-input"
          />
        </label>
        <label for="description" className="Global-Modal-Label">
          <textarea
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Description"
            className="Global-Modal-input"
          ></textarea>
        </label>
        <label for="city" className="Global-Modal-Label">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            placeholder="City"
            className="Global-Modal-input"
          />
        </label>
        <label for="state" className="Global-Modal-Label">
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
            placeholder="State"
            className="Global-Modal-input"
          />
        </label>
        <label for="country" className="Global-Modal-Label">
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
            placeholder="Country"
            className="Global-Modal-input"
          />
        </label>
        <label for="imageUrl" className="Global-Modal-Label">
          <input
            type="file"
            accept="image/*"
            onChange={updateImage}
            className="Global-Modal-input"
          />
          {(imageLoading) && <p>Loading...</p>}
        </label>
        <button type="submit" className="Global-SubmitButton">
          Update Photo
        </button>
      </form>
    </div>
  );
}

export default UpdatePhotoModalForm;
