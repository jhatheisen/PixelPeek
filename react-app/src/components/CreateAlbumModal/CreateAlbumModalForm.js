import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
// import createAlbum thunk here
import { useModal } from "../../context/Modal";
import { thunkCreateAlbum } from "../../store/albums";

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
      album_name: albumName
    };

    const res = await dispatch(thunkCreateAlbum(newAlbum))

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
    <div className="create-group-outer-most-div">
      <div className="create-group-text-div">Create New Album</div>
      <form onSubmit={handleSubmit} className="outerCreateEventFormDiv">
        <ul>
          {errors.map((error, idx) => (
            <li key={idx} className="createGroupErrors">
              {error}
            </li>
          ))}
        </ul>
        <label className="label">Album Name</label>
        <input
          className="inputClass"
          type="text"
          value={albumName}
          onChange={(e) => setAlbumName(e.target.value)}
          required
        />
        <button type="submit" className="submitCreateGroupButton">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateAlbumModalForm;
