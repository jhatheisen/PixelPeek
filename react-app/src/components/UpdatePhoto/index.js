import OpenModalButton from "../OpenModalButton";
import UpdatePhotoModalForm from "./UpdatePhotoModalForm";

const UpdatePhotoModal = ({className}) => {
  return (
    <div className="main-skybnb-create-container">
      <OpenModalButton
        buttonText="Update Photo"
        className={className}
        modalComponent={<UpdatePhotoModalForm/>}
      />
    </div>
  );
};

export default UpdatePhotoModal;
