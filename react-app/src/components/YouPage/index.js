import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllAlbums } from "../../store/albums";
import { useEffect, useState } from "react";

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

  for (const album in allAlbums) {
    if (album.user_id === currUser.id) {
      console.log("User owns an album");
      userAlbums.append(album);
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

  return <div></div>;
};

{
  /* <img
        src={process.env.PUBLIC_URL + "/EmptyAlbum.jpeg"}
        className="Navbar-Home-Logo"
      /> */
}

export default YouPage;
