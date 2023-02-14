import React from 'react';
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { thunkCreatePhoto } from '../../store/photos';
import { useModal } from '../../context/Modal';

function CreatePhotoModalForm() {
    const sessionUser = useSelector(state => state.session.user);

    const dispatch = useDispatch();
    const history = useHistory();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal()

    function handleSubmit(e) {
        e.preventDefault();
        setErrors([]);
        const body = {
            title,
            description,
            city,
            state,
            country
        }
        return dispatch(thunkCreatePhoto(body, imageUrl))
            .then((res) => {
                if(!res.errors){
                    console.log(res, '================================>NO ERRORS WERE FOUND')
                    history.push(`/photos/${res.id}`)
                }
            })
            .then(closeModal)
            .catch(async(res) => {
                const data = await res.json()
                console.log('resData', data)
                if (data && data.errors) setErrors([data.errors]);
                console.log(data.errors)
            });
            // .catch(async (res) => {
            //     console.log("res=====================================>", res)
            //     const data = await res.json();
            //     if (data && data.errors) setErrors([data.errors]);
            // });
    }; 


    //add a redirect or to place to read new group

    return (
        <div className='create-group-outer-most-div'>
            <div className='create-group-text-div'>Create Group</div>
            <form onSubmit={handleSubmit} className="outerCreateEventFormDiv">
                <ul>
                    {errors.map((error, idx) => (
                        <li key={idx} className="createGroupErrors">{error}</li>
                    ))}
                </ul>
                <label className="label">
                    Title
                </label>
                <input
                    className='inputClass'
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <label className="label">
                    Description
                </label>
                <textarea
                    className='inputClass createGroupTextArea'
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required>

                </textarea>
                <label className="label">
                    City
                </label>
                <input
                    className='inputClass'
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                />
                <label className="label">
                    State
                </label>
                <input
                    className='inputClass'
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                />
                <label className="label">
                    Country
                </label>
                <input
                    className='inputClass'
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                />
                <label className="label">
                    Image
                </label>
                <input
                    className='inputClass'
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    required
                />
                <button type="submit" className='submitCreateGroupButton'>Submit</button>
            </form>
        </div>
    );
}

export default CreatePhotoModalForm;
