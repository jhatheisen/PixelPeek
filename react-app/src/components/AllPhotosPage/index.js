import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { thunkGetAllPhotos } from "../../store/photos";

const AllPhotosPage = () => {
    const dispatch = useDispatch()

    //get all photo data via thunk

    useEffect(()=>{
        dispatch(thunkGetAllPhotos())
    }, [dispatch])

    return (
        <>
            <div>
                <h1>Testing All Photos Route</h1>
            </div>
        </>
    )
}
export default AllPhotosPage;
