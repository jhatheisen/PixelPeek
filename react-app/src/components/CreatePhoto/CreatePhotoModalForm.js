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

    const handleSubmit = async(e) =>{
        e.preventDefault();
        setErrors([]);
        const body = {
            title,
            description,
            city,
            state,
            country
        }
        
        try {
            const res = await dispatch(thunkCreatePhoto(body, imageUrl))
            // const data = await res.json();
    
            console.log('res=============>success', res )
            closeModal()
            history.push(`/photos/${res.id}`)
            
        } catch (error) {
                let errors = JSON.parse(error.message)
                console.log(errors)
                if (errors) setErrors(errors.errors);
                console.log(errors)
        }

        // dispatch(thunkCreatePhoto(body, imageUrl))
        // .then(closeModal)
        // .then((res) => {
        //     console.log(res, '================================>NO ERRORS WERE FOUND')
        //     history.push(`/photos/${res.id}`)
        // })
        // .catch(async (res) => {
        //     console.log('resData', res)
        //     const data = await res.json();
        //     if (data && data.errors) setErrors([data.errors]);
        //     console.log(errors)
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
