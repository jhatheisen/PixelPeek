import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { thunkGetSingleAlbum } from "../../store/albums";
import AllPhotoCards from "../AllPhotosPage/AllPhotoCards";

const SingleAlbumPhotoPage = () => {
  const dispatch = useDispatch();
  const { albumId } = useParams();

  const [loadedPage, setLoadedPage] = useState(false);

  const album = useSelector((state) => state.albums.singleAlbum);

  useEffect(() => {
    dispatch(thunkGetSingleAlbum(albumId)).then(() => setLoadedPage(true));

    return () => {
      setLoadedPage(false);
    };
  }, [dispatch]);

  if (!loadedPage) return null;

  return (
    <>
      <h1>{album.album_name}</h1>
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
