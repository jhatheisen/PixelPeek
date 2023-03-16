import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { thunkGetAllPhotos } from "../../store/photos";
import AllPhotoCards from "./AllPhotoCards";
import "./AllPhotoCards.css";

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const AllPhotosPage = () => {
  const dispatch = useDispatch();

  const [loadedPage, setLoadedPage] = useState(false);

  //get all photo data via thunk
  const allPhotos = useSelector((state) => state.photos.allPhotos);
  useEffect(() => {
    dispatch(thunkGetAllPhotos()).then(() => setLoadedPage(true));
  }, [dispatch]);

  if (!loadedPage) return null;

  function pickSizes(numSizes) {
    if (numSizes == 4) {
      // pick 4 numbers that are kinda close and add up to 95
      let maxSize = 95
      let size1 = getRandomInt(18, 27);
      maxSize -= size1;
      let size2 = getRandomInt(18, 27);
      maxSize -= size2;
      let size3 = getRandomInt(18, 27);
      maxSize -= size3;
      let size4 = maxSize
      // console.log(`size 1 ${size1}, size2 ${size2}, size3 ${size3}, size4 ${size4} =` , size1 + size2 + size3 + size4)
      return [size1, size2, size3, size4]
    }
  }

  const listPhotos = Object.values(allPhotos);

  let groupedPhotos = [];
  for (let i = 0; i < listPhotos.length; i += 4) {
    groupedPhotos.push(listPhotos.slice(i, i+4))
  }
  // console.log(groupedPhotos)


  return (
    <div className="allPhotosContainer">
        {
          groupedPhotos.map(fourPics => {
            let sizes = pickSizes(4)
            return (
            <div className="imgRow">
              {
                fourPics.map((photo, index) => {
                  return (
                    <NavLink exact to={`/photos/${photo.id}`}>
                      <div className="outerBox">
                        <div
                        className="imgBox"
                        style={{backgroundImage: `url(${photo.img_url})`, width: `${sizes[index]}vw`, height: "25vh"}}
                        >
                          <div className="infoDiv">
                            <div>{photo.city}</div>
                            <div>{photo.state}</div>
                            <div>{photo.country}</div>
                          </div>
                        </div>
                    </div>
                    </NavLink>
                  )
                })
              }
            </div>
            )
          })
        }
    </div>
  )

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
