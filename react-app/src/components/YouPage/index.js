import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllAlbums } from "../../store/albums";
import { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { thunkDeleteAlbum } from "../../store/albums";
import CreateAlbumModal from "../CreateAlbumModal";

const YouPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loadedPage, setLoadedPage] = useState(false);

  const allAlbums = useSelector((state) => state.albums.allAlbums);
  const currUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(thunkGetAllAlbums()).then(() => setLoadedPage(true));
  }, [dispatch]);

  if (!loadedPage) return null;

  //loop through all albums, put albums user owns into userAlbums array

  const userAlbums = [];
  for (const key in allAlbums) {
    if (allAlbums[key].user_id === currUser.id) {
      userAlbums.push(allAlbums[key]);
    }
  }

  //error should not hit this route when you are logged in and own the spot
  if (userAlbums.length === 0) {
    return (
      <div>
        <h2>You currently do not own any albums</h2>
      </div>
    );
  }

  const handleAlbumDelete = async (albumId) => {
    console.log(albumId);
    dispatch(thunkDeleteAlbum(albumId)).then(() => {
      history.push("/you");

      // fix redirect !!!!!!!!!!!!!!!!!!!!!!!!
      // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    });
  };

  return (
    <div className="AllAlbums-Container">
      <h1>Your Albums</h1>
      {currUser && <CreateAlbumModal />}
      {userAlbums.map((album) => {
        return (
          <div>
            <NavLink exact to={`/you/album/${album.id}`} key={album.id}>
              {album.photos.length ? (
                <div>
                  <div>{album.album_name}</div>
                  <img src={album.photos[0].img_url} alt={"Image not Found"} />
                </div>
              ) : (
                <img src={process.env.PUBLIC_URL + "/EmptyAlbum.jpeg"} />
              )}
            </NavLink>
            <button
              onClick={() => {
                handleAlbumDelete(album.id);
              }}
            >
              Delete Album
            </button>
          </div>
        );
      })}
    </div>
  );
};

{
  /* <img
        src={process.env.PUBLIC_URL + "/EmptyAlbum.jpeg"}
        className="Navbar-Home-Logo"
      /> */
}

export default YouPage;
