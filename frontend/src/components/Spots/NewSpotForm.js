import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as spotActions from '../../store/spots'
import {useHistory} from 'react-router-dom'
import './NewSpotForm.css'
import { useModalContext } from "../../context/modalContext";

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
const [url, setUrl] = useState('')
const [preview, setPreview] = useState(true)
const [errors, setErrors] = useState({})
const {setModal} = useModalContext()

const updateAddress = (e) => setAddress(e.target.value)
const updateCity = (e) => setCity(e.target.value)
const updateState = (e) => setState(e.target.value)
const updateCountry = (e) => setCountry(e.target.value)
const updateLat = (e) => setLat(e.target.value)
const updateLng = (e) => setLng(e.target.value)
const updateName = (e) => setName(e.target.value)
const updateDescription = (e) => setDescription(e.target.value)
const updatePrice = (e) => setPrice(e.target.value)
const updateUrl = (e) => setUrl(e.target.value)

const handleCancelClick = (e) => {
history.push('/')
};
const handleSubmit = async (e) => {
    e.preventDefault();

    const previewImagePayload = {
      url,
      preview: true
    }

    const imagePayload1 = {
      url,
      preview: false
    }
    const imagePayload2 = {
      url,
      preview: false
    }
    const imagePayload3 = {
      url,
      preview: false
    }
    const imagePayload4 = {
      url,
      preview: false
    }

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
    if(newSpot && newSpot.id){
        history.push(`/spots/${newSpot.id}`)
    } else {
      const res = await newSpot.json()
      setErrors(res.errors)
    }
    };
    return (
      <div className="form">
          <h1>Create a New Spot</h1>
          <form onSubmit={handleSubmit}>
          <h3>Where's your chair located?</h3>
            <p>Guests will only get your exact address one they have booked a reservation:</p>
          <div className="errors">{errors?.address}</div>
            <input
              type="text"
              className="form-input"
              placeholder="Street Address"
              value={address}
              onChange={updateAddress}
            />
            <div className="errors">{errors?.city}</div>
            <input
              type="text"
              className="form-input"
              placeholder="City"
              value={city}
              onChange={updateCity}
            />
            <div className="errors">{errors?.state}</div>
            <input
              type="text"
              className="form-input"
              placeholder="State"
              value={state}
              onChange={updateState}
            />
            <div className="errors">{errors?.country}</div>
            <input
              type="text"
              className="form-input"
              placeholder="Country"
              value={country}
              onChange={updateCountry}
            />
            <div className="errors">{errors?.lat}</div>
            <input
              type="number"
              className="form-input"
              placeholder="Latitude"
              value={lat}
              onChange={updateLat}
            />
            <div className="errors">{errors?.lng}</div>
            <input
              type="number"
              className="form-input"
              placeholder="Longitude"
              value={lng}
              onChange={updateLng}
            />
            <h3>Describe your place to guests</h3>
            <p>Mention the best features of your chair, any special amenities like fast wifi or comfortable rear parking:</p>
            <div className="errors">{errors?.description}</div>
            <textarea
            className="form-input"
             placeholder="Description (Please write at least 30 characters)"
             value={description}
            onChange={updateDescription}
            />
            <h3>Create a title for your spot</h3>
            <p>Catch guests' attention with a spot title that highlights what makes your place special:</p>
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
            <div className="errors">{errors?.price}</div>
            <input
              type="number"
              className="form-input"
              placeholder="Price"
              value={price}
              onChange={updatePrice}
            />
          <div className="errors"></div>
          <input
            type="text"
            className="form-input"
            placeholder="PreviewImageURL"
          />

            <div className="form-buttons">
      <button type="submit" className="submit">Create Spot</button>
      <button type="cancel"  className="cancel" onClick={handleCancelClick}>Cancel</button>
    </div>
  </form>
</div>
    )
}
export default NewSpotForm
