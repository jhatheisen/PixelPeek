import OpenModalButton from "../OpenModalButton";
import CreatePhotoModalForm from "./CreatePhotoModalForm";
import "./CreatePhotoModal.css"

const CreatePhotoModal = () => {
  return (
    <div className="createPhotoBox">
      <OpenModalButton
        buttonText="Add a photo"
        modalComponent={<CreatePhotoModalForm />}
        className="CreatePhoto-Button"
      />
    </div>
  );
};

export default CreatePhotoModal;
