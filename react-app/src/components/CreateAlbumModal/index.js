import OpenModalButton from "../OpenModalButton";
import CreateAlbumModalForm from "./CreateAlbumModalForm";
import "./CreateAlbumModal.css"

const CreateAlbumModal = () => {
  return (
    <div className="createAlbumBox">
      <OpenModalButton
        className="album-create-button"
        buttonText="Create New Album here"
        modalComponent={<CreateAlbumModalForm />}
      />
    </div>
  );
};

export default CreateAlbumModal;
