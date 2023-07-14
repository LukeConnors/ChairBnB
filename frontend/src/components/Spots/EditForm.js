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

const handleCancelClick = (e) => {
    history.push(`/spots/${spot.id}`)
};

    return (
        <div className="ns-form">
      <h1 className="create-title">Edit your spot</h1>
      <form onSubmit={handleSubmit}>
        <h3>Where's your chair located?</h3>
        <p>Guests will only get your exact address one they have booked a reservation:</p>
        <div className="form-tag">
          <h2>Street Address</h2>
        </div>
        <div className="errors">{errors?.address}</div>
        <input
          type="text"
          className="form-input"
          placeholder="Street Address"
          value={address}
          onChange={updateAddress}
        />
        <div className="titles-container">
          <div className="city-title">
            <h2>City</h2>
            <div className="errors">{errors?.city}</div>
          </div>
          <div className="state-title">
            <h2 className="state-tag">State</h2>
            <div className="errors">{errors?.state}</div>
          </div>
        </div>
        <div className="city-state">
          <input
            type="text"
            className="city-form-input"
            placeholder="City"
            value={city}
            onChange={updateCity}
          />
          <input
            type="text"
            className="state-form-input"
            placeholder="State"
            value={state}
            onChange={updateState}
          />
        </div>
        <div className="form-tag">
          <h2>Country</h2>
        </div>
        <div className="errors">{errors?.country}</div>
        <input
          type="text"
          className="form-input"
          placeholder="Country"
          value={country}
          onChange={updateCountry}
        />

        <div className="titles-container">
          <div className="city-title">
            <h2>Latitude</h2>
            <div className="errors">{errors?.lat}</div>
          </div>
          <div className="state-title">
            <h2 className="state-tag">Longitude</h2>
            <div className="errors">{errors?.lng}</div>
          </div>
        </div>
        <div className="city-state">
          <input
            type="number"
            className="city-form-input"
            placeholder="Latitude"
            value={lat}
            onChange={updateLat}
          />
          <input
            type="number"
            className="form-input"
            placeholder="Longitude"
            value={lng}
            onChange={updateLng}
          />
        </div>
        <h3>Describe your place to guests</h3>
        <p>Mention the best features of your chair, any special amenities like fast wifi or comfortable rear parking:</p>
        <div className="form-tag">
          <h2>Description</h2>
        </div>
        <div className="errors">{errors?.description}</div>
        <textarea
          className="des-form-input"
          placeholder="Description (Please write at least 30 characters)"
          value={description}
          onChange={updateDescription}
        />
        <h3>Create a title for your spot</h3>
        <p>Catch guests' attention with a spot title that highlights what makes your place special:</p>
        <div className="form-tag">
          <h2>Name</h2>
        </div>
        <div className="errors">{errors?.name}</div>
        <input
          type="text"
          className="form-input"
          placeholder="Name of your spot"
          value={name}
          onChange={updateName}
        />
        <h3>Set a base price for your spot</h3>
        <p>Competitive pricing can help your listing stand out and rank higher in search results:</p>
        <div className="form-tag">
          <h2>Price</h2>
        </div>
        <div className="errors">{errors?.price}</div>
        <input
          type="number"
          className="form-input"
          placeholder="Price"
          value={price}
          onChange={updatePrice}
        />
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
