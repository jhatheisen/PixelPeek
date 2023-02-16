import OpenModalButton from "../OpenModalButton";
import CreatePhotoModalForm from "./CreatePhotoModalForm";

const CreatePhotoModal = () => {
  return (
    <div className="createPhotoBox">
      <OpenModalButton
        buttonText="Create new photo here"
        modalComponent={<CreatePhotoModalForm />}
      />
    </div>
  );
};

export default CreatePhotoModal;
