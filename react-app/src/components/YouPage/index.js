import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllAlbums } from "../../store/albums";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const YouPage = () => {
  const dispatch = useDispatch();

  const [loadedPage, setLoadedPage] = useState(false);

  const allAlbums = useSelector((state) => state.albums.allAlbums);
  const currUser = useSelector((state) => state.session.user);

  console.log("allalbums ========>", allAlbums);

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
    console.log("====================>user does not own any albums");
    return (
      <div>
        <h2>You currently do not own any albums</h2>
      </div>
    );
  }

  console.log("====> 1st photo", allAlbums[1].photos[0].img_url);

  return (
    <div className="AllAlbums-Container">
      <h1>Your Albums</h1>
      {userAlbums.map((album) => {
        return (
          <NavLink exact to={`/you/album/${album.id}`} key={album.id}>
            {userAlbums.length ? (
              <div>
                <div>{album.album_name}</div>
                <img src={album.photos[0].img_url} alt={"Image not Found"} />
              </div>
            ) : (
              <img src={process.env.PUBLIC_URL + "/EmptyAlbum.jpeg"} />
            )}
          </NavLink>
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
