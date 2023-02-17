import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { thunkGetSingleAlbum, thunkAddAlbumPhoto } from "../../store/albums";
import { thunkGetAllPhotos } from "../../store/photos";
import AllPhotoCards from "../AllPhotosPage/AllPhotoCards";
import './SingleAlbumPhotoPage.css'

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
    <div className="albumsPage">
      {album && album.photos ? (
        <img src={album.photos[0].img_url} className='backGroundPhoto'></img>
      ) :
      (
        <img src="https://images.pexels.com/photos/302769/pexels-photo-302769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className='backGroundPhoto'></img>
      )
      }
      <h1>{album.album_name}</h1>
      <div className="addPhotoBox">
        <button onClick={() => setPhotosOpen(!photosOpen)} className="cleanButton">Add photo to album</button>
        {photosOpen && (
          <div className="photosList">
            {yourPhotos.map((photo) => (
              <button onClick={() => handleAddPhoto(photo)} className="normalPhoto">
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
  );
};

export default SingleAlbumPhotoPage;
