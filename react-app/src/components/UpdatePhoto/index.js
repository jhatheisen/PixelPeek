import OpenModalButton from "../OpenModalButton";
import UpdatePhotoModalForm from "./UpdatePhotoModalForm";

const UpdatePhotoModal = () => {
  return (
    <div className="main-skybnb-create-container">
      <OpenModalButton
        buttonText="Update Photo"
        modalComponent={<UpdatePhotoModalForm/>}
      />
    </div>
  );
};

export default UpdatePhotoModal;
