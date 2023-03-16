import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams, NavLink, useHistory } from "react-router-dom";
import { thunkGetSingleAlbum, thunkAddAlbumPhoto } from "../../store/albums";
import { thunkGetAllPhotos } from "../../store/photos";
import AllPhotoCards from "../AllPhotosPage/AllPhotoCards";
import "./SingleAlbumPhotoPage.css";

const SingleAlbumPhotoPage = () => {
  const dispatch = useDispatch();
  const { albumId } = useParams();
  const history = useHistory();

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
  if (!currUser) return null;
  if (!loadedPage) return null;

  if (yourPhotos) {
    // console.log("yourPhotos: ", yourPhotos);
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
      {album && album.photos.length ? (
        <img src={album.photos[0].img_url} className="backGroundPhoto"></img>
      ) : (
        <img
          src="https://images.pexels.com/photos/302769/pexels-photo-302769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          className="backGroundPhoto"
        ></img>
      )}
      <div className="albumsPage">
        <h1 className="albumName">{album.album_name}</h1>
        <div className="addPhotoBox">
          <NavLink to="/you" className="backYou">
            <i
              className="fa-solid fa-arrow-left fa-xl"
              style={{ color: "black", padding: "0px 10px" }}
            ></i>
            Back to you
          </NavLink>
          <button
            onClick={() => setPhotosOpen(!photosOpen)}
            className="cleanButton"
          >
            Add photo to album
          </button>
          <hr />
          {photosOpen && (
            <div className="photosList">
              <h2 className="selectText"> Select a photo</h2>
              {yourPhotos.map((photo) => (
                <button
                  onClick={() => handleAddPhoto(photo)}
                  className="normalPhoto"
                >
                  <img src={photo.img_url} className="normalPhoto" />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="AllPhotos-Container">
          {album.photos.map((photo) => (
            <AllPhotoCards
              photo={photo}
              key={photo.id}
              className="AllPhotos-Container"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default SingleAlbumPhotoPage;
