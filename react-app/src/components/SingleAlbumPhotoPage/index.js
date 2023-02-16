import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { thunkGetSingleAlbum, thunkAddAlbumPhoto } from "../../store/albums";
import { thunkGetAllPhotos } from "../../store/photos";
import AllPhotoCards from "../AllPhotosPage/AllPhotoCards";

const SingleAlbumPhotoPage = () => {
  const dispatch = useDispatch();
  const { albumId } = useParams();

  const [loadedPage, setLoadedPage] = useState(false);

  const album = useSelector((state) => state.albums.singleAlbum);
  let yourPhotos = useSelector((state) => state.photos.allPhotos);
  const currUser = useSelector((state) => state.session.user);

  const [photosOpen, setPhotosOpen] = useState(false);

  useEffect(() => {
    dispatch(thunkGetAllPhotos());
    dispatch(thunkGetSingleAlbum(albumId)).then(() => setLoadedPage(true));

    return () => {
      setLoadedPage(false);
      setPhotosOpen(false);
    };
  }, [dispatch]);

  if (!album) return null;
  if (!loadedPage) return null;

  if (yourPhotos) {
    yourPhotos = Object.values(yourPhotos).filter(
      (photo) => photo.user_id == currUser.id
    );
  }

  const handleAddPhoto = async (photo) => {
    await dispatch(thunkAddAlbumPhoto(album.id, photo));
    await setLoadedPage(true);
    await setPhotosOpen(false);
  };

  return (
    <>
      <h1>{album.album_name}</h1>
      <div className="addPhotoBox">
        <button onClick={() => setPhotosOpen(!photosOpen)}>Add Photo</button>
        {photosOpen && (
          <>
            {yourPhotos.map((photo) => (
              <button onClick={() => handleAddPhoto(photo)}>
                <img src={photo.img_url} />
              </button>
            ))}
          </>
        )}
      </div>
      <div className="AllPhotos-Container">
        {album.photos.map((photo) => (
          <AllPhotoCards
            photo={photo}
            key={photo.id}
            className="AllPhotosCards"
          />
        ))}
      </div>
    </>
  );
};

export default SingleAlbumPhotoPage;
