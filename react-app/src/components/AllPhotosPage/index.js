import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllPhotos } from "../../store/photos";
import AllPhotoCards from "./AllPhotoCards";

const AllPhotosPage = () => {
    const dispatch = useDispatch()

    const [loadedPage, setLoadedPage] = useState(false);

    //get all photo data via thunk
    const allPhotos = useSelector((state) => state.photos.allPhotos)
    console.log(allPhotos)
    useEffect(()=>{
        dispatch(thunkGetAllPhotos()).then(() => setLoadedPage(true))
    }, [dispatch])

    if (!loadedPage) return null;

    return (
        <>
            <div className="AllPhotos-Container">
                {Object.values(allPhotos).map((photo) => (
                <AllPhotoCards photo={photo} key={photo.id} />
            ))}
            </div>
        </>
    )
}
export default AllPhotosPage;
