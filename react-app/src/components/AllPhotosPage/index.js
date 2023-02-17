import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllPhotos } from "../../store/photos";
import AllPhotoCards from "./AllPhotoCards";
import "./AllPhotoCards.css";

const AllPhotosPage = () => {
  const dispatch = useDispatch();

  const [loadedPage, setLoadedPage] = useState(false);

  //get all photo data via thunk
  const allPhotos = useSelector((state) => state.photos.allPhotos);
  useEffect(() => {
    dispatch(thunkGetAllPhotos()).then(() => setLoadedPage(true));
  }, [dispatch]);

  if (!loadedPage) return null;

  return (
    <>
      <div className="AllPhotos-Container">
        {/* <div className="AllPhotos-Inner-Container"> */}
        {Object.values(allPhotos).map((photo) => (
          <AllPhotoCards
            photo={photo}
            key={photo.id}
            className="AllPhotosCards"
          />
        ))}
        {/* </div> */}
      </div>
    </>
  );
};
export default AllPhotosPage;
