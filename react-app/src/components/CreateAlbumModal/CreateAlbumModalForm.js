import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
// import createAlbum thunk here
import { useModal } from "../../context/Modal";
import { thunkCreateAlbum } from "../../store/albums";
import "./CreateAlbumModal.css";

function CreateAlbumModalForm() {
  const sessionUser = useSelector((state) => state.session.user);

  const dispatch = useDispatch();
  const history = useHistory();

  const [albumName, setAlbumName] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const newAlbum = {
      album_name: albumName,
    };

    const res = await dispatch(thunkCreateAlbum(newAlbum));

    try {
      // const res = await dispatch(thunkCreatePhoto(body, imageUrl));
      // const data = await res.json();

      closeModal();
      //where should prob send the user back to album/albumid right?..
      history.go(0);
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
    <div className="Global-Modal-Container2">
      <img
        src={process.env.PUBLIC_URL + "/transparentOwl.png"}
        className="Global-Logo"
      />
      <div className="Global-Modal-Header">Create New Album</div>
      <form onSubmit={handleSubmit} className="Global-ModalForm-Container">
        <ul className="Global-Errors-UL">
          {errors.map((error, idx) => (
            <li key={idx} className="Global-Errors-LI">
              {error}
            </li>
          ))}
        </ul>
        <label className="Global-Modal-Label">
          <input
            type="text"
            value={albumName}
            onChange={(e) => setAlbumName(e.target.value)}
            required
            placeholder="Album Name"
            className="Global-Modal-input"
          />
        </label>
        <button type="submit" className="Global-SubmitButton">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateAlbumModalForm;
