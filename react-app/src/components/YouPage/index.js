import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllAlbums } from "../../store/albums";
import { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { thunkDeleteAlbum } from "../../store/albums";
import CreateAlbumModal from "../CreateAlbumModal";
import "./YouPage.css";

const YouPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loadedPage, setLoadedPage] = useState(false);

  const allAlbums = useSelector((state) => state.albums.allAlbums);
  const currUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(thunkGetAllAlbums());
    return () => {
      setLoadedPage(false);
    };
  }, [dispatch, loadedPage]);

  // if (!loadedPage) return null;

  //loop through all albums, put albums user owns into userAlbums array

  const userAlbums = [];
  if (currUser) {
    for (const key in allAlbums) {
      if (allAlbums[key].user_id === currUser.id) {
        userAlbums.push(allAlbums[key]);
      }
    }
  }
  // console.log(userAlbums);

  //error should not hit this route when you are logged in and own the spot
  if (userAlbums.length === 0) {
    return (
      <div>
        <h2>You currently do not own any albums</h2>
        {currUser && <CreateAlbumModal />}
      </div>
    );
  }

  const handleAlbumDelete = async (albumId) => {
    dispatch(thunkDeleteAlbum(albumId)).then(() => {
      setLoadedPage(true);

      // fix redirect !!!!!!!!!!!!!!!!!!!!!!!!
      // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    });
  };

  return (
    <div className="AllAlbums-Container">
      {userAlbums && userAlbums[0].photos.length ? (
        <img
          src={userAlbums[0].photos[0].img_url}
          className="backGroundPhoto"
        ></img>
      ) : (
        <img
          src="https://images.pexels.com/photos/302769/pexels-photo-302769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          className="backGroundPhoto"
        ></img>
      )}
      <div className="youUserDetails">
        <i className="fa-solid fa-circle-user fa-4x youUserIcon"></i>
        <p className="youUsername">{currUser.username},</p>
        <p className="youEmail">{currUser.email}</p>
      </div>
      <div className="albumsBar">
        <div className="leftAlbumBar">
          <NavLink to="/photos" className="backYou">
            <i
              className="fa-solid fa-arrow-left fa-xl"
              style={{ color: "black" }}
            ></i>
            Back to explore
          </NavLink>
          <h1 className="albums-title">Albums</h1>
        </div>
        {currUser && <CreateAlbumModal />}
      </div>
      <hr />
      <div className="albums">
        {userAlbums.map((album) => {
          return (
            <div className="album-card">
              <NavLink exact to={`/you/album/${album.id}`} key={album.id}>
                {album.photos.length ? (
                  <div className="albumContainer">
                    <img
                      src={album.photos[0].img_url}
                      alt={"Image of album"}
                      className="albumPhoto"
                    />
                    <p>{album.album_name}</p>
                  </div>
                ) : (
                  <div className="albumContainer">
                    <img
                      src={process.env.PUBLIC_URL + "/EmptyAlbum.jpeg"}
                      alt={"Image not Found"}
                      className="albumPhoto"
                      id="empty-card"
                    />
                    <p>{album.album_name}</p>
                  </div>
                )}
              </NavLink>
              <button
                onClick={() => {
                  handleAlbumDelete(album.id);
                }}
                className="cleanButtonDel"
              >
                Delete Album
              </button>
            </div>
          );
        })}
      </div>
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
