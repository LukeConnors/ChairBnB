import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as spotActions from '../../store/spots'
import {useHistory} from 'react-router-dom'

const NewSpotForm = () => {
const dispatch = useDispatch();
const history = useHistory()
const [address, setAddress] = useState('')
const [city, setCity] = useState('')
const [state, setState] = useState('')
const [country, setCountry] = useState('')
const [lat, setLat] = useState('')
const [lng, setLng] = useState('')
const [name, setName] = useState('')
const [description, setDescription] = useState('')
const [price, setPrice] = useState('')

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
    history.push('/')
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
    let newSpot = await dispatch(spotActions.createSpot(payload))
    if(newSpot){
        history.push(`/`)
    }
    history.push('/')
    };
    return(

        <div>
                    <form onSubmit={handleSubmit}>
                    <input
                    type="text"
                    placeholder="Address"
                    required
                    min="1"
                    value={address}
                    onChange={updateAddress}
                    >
                    </input>
                    <input
                    type="text"
                    placeholder="City"
                    required
                    min="1"
                    value={city}
                    onChange={updateCity}
                    >
                    </input>
                    <input
                    type="text"
                    placeholder="State"
                    required
                    min="1"
                    value={state}
                    onChange={updateState}
                    >
                    </input>
                    <input
                    type="text"
                    placeholder="Country"
                    required
                    min="1"
                    value={country}
                    onChange={updateCountry}
                    >
                    </input>
                    <input
                    type="number"
                    placeholder="Latitude"
                    required
                    // min="4"
                    // max="12"
                    value={lat}
                    onChange={updateLat}
                    >
                    </input>
                    <input
                    type="number"
                    placeholder="Longitude"
                    required
                    // min="4"
                    // max="12"
                    value={lng}
                    onChange={updateLng}
                    >
                    </input>
                    <input
                    type="text"
                    placeholder="Name"
                    required
                    min="1"
                    value={name}
                    onChange={updateName}
                    >
                    </input>
                    <input
                    type="text"
                    placeholder="Description"
                    required
                    min="1"
                    value={description}
                    onChange={updateDescription}
                    >
                    </input>
                    <input
                    type="number"
                    placeholder="Price"
                    required
                    min="1"
                    value={price}
                    onChange={updatePrice}
                    >
                    </input>
                    <button type="submit">Create Spot</button>
                    <button type="cancel" onClick={handleCancelClick}>
                        Cancel
                    </button>
                </form>

                </div>
    )
}
export default NewSpotForm
