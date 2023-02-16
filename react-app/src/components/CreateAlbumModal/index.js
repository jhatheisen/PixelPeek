import OpenModalButton from "../OpenModalButton";
import CreateAlbumModalForm from "./CreateAlbumModalForm";

const CreateAlbumModal = () => {
  return (
    <div className="createPhotoBox">
      <OpenModalButton
        buttonText="Create New Album here"
        modalComponent={<CreateAlbumModalForm />}
      />
    </div>
  );
};

export default CreateAlbumModal;
