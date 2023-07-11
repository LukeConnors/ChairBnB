import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as spotActions from '../../store/spots'
import {useHistory} from 'react-router-dom'
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import './EditForm.css'

const EditSpotForm = () => {
const spot = useSelector(state => state.spots.detailedSpot)
const dispatch = useDispatch();
const history = useHistory()
const [address, setAddress] = useState(spot.address)
const [city, setCity] = useState(spot.city)
const [state, setState] = useState(spot.state)
const [country, setCountry] = useState(spot.country)
const [lat, setLat] = useState(spot.lat)
const [lng, setLng] = useState(spot.lng)
const [name, setName] = useState(spot.name)
const [description, setDescription] = useState(spot.description)
const [price, setPrice] = useState(spot.price)
const [errors, setErrors] = useState({})

const updateAddress = (e) => setAddress(e.target.value)
const updateCity = (e) => setCity(e.target.value)
const updateState = (e) => setState(e.target.value)
const updateCountry = (e) => setCountry(e.target.value)
const updateLat = (e) => setLat(e.target.value)
const updateLng = (e) => setLng(e.target.value)
const updateName = (e) => setName(e.target.value)
const updateDescription = (e) => setDescription(e.target.value)
const updatePrice = (e) => setPrice(e.target.value)

const handleCancelClick = (e) => {
    history.push('/spots/current')
};
const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    }
    let editedSpot = await dispatch(spotActions.editSpot(spot.id, payload))
    dispatch(spotActions.fetchSpotDetails(spot.id))
    if(editedSpot && editedSpot.id){
        history.push(`/spots/${spot.id}`)
    } else {
        const res = await editedSpot.json()
        setErrors(res.errors)
        console.log(errors)
    }
    };


    return (
        <div className="form">
            <h1 className="ed-title">Update your spot:</h1>
            <form onSubmit={handleSubmit}>
            <div className="errors">{errors?.address}</div>
            <input
            type="text"
            className="form-input"
            placeholder="Address"
            min="1"
            value={address}
            onChange={updateAddress}
            >
            </input>
            <div className="errors">{errors?.city}</div>
            <input
            type="text"
            placeholder="City"
            className="form-input"
            min="1"
            value={city}
            onChange={updateCity}
            >
            </input>
            <div className="errors">{errors?.state}</div>
            <input
            type="text"
            className="form-input"
            placeholder="State"
            min="1"
            value={state}
            onChange={updateState}
            >
            </input>
            <div className="errors">{errors?.country}</div>
            <input
            type="text"
            className="form-input"
            placeholder="Country"
            min="1"
            value={country}
            onChange={updateCountry}
            >
            </input>
            <div className="errors">{errors?.lat}</div>
            <input
            type="number"
            className="form-input"
            placeholder="Latitude"
            // min="4"
            // max="12"
            value={lat}
            onChange={updateLat}
            >
            </input>
            <div className="errors">{errors?.lng}</div>
            <input
            type="number"
            className="form-input"
            placeholder="Longitude"
            // min="4"
            // max="12"
            value={lng}
            onChange={updateLng}
            >
            </input>
            <div className="errors">{errors?.name}</div>
            <input
            type="text"
            className="form-input"
            placeholder="Name"
            min="1"
            value={name}
            onChange={updateName}
            >
            </input>
            <div className="errors">{errors?.description}</div>
            <textarea
            type="text"
            className="des-form-input"
            placeholder="Description"
            min="1"
            value={description}
            onChange={updateDescription}
            />
            <div className="errors">{errors?.price}</div>
            <input
            type="number"
            className="form-input"
            placeholder="Price"
            min="1"
            value={price}
            onChange={updatePrice}
            >
            </input>
            <div className="ed-buttons">
            <button type="submit" className="ed-submit">Update Spot</button>
            <button type="cancel" className="ed-cancel" onClick={handleCancelClick}>
                Cancel
            </button>
            </div>
        </form>

        </div>
    )
};

export default EditSpotForm;
