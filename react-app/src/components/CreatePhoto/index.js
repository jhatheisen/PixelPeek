import OpenModalButton from "../OpenModalButton";
import CreatePhotoModalForm from "./CreatePhotoModalForm";

const CreatePhotoModal = () => {
  return (
    <div className="main-skybnb-create-container">
      <OpenModalButton
        buttonText="Create new photo here"
        modalComponent={<CreatePhotoModalForm />}
      />
    </div>
  );
};

export default CreatePhotoModal;
