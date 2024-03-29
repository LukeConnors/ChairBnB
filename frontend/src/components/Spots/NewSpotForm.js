import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as spotActions from '../../store/spots'
import { useHistory } from 'react-router-dom'
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
  const [url1, setUrl1] = useState('')
  const [url2, setUrl2] = useState('')
  const [url3, setUrl3] = useState('')
  const [url4, setUrl4] = useState('')
  const [preview, setPreview] = useState(true)
  const [errors, setErrors] = useState({})
  const [imageErrors, setImageErrors] = useState({})
  const { setModal } = useModalContext()

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
  const updateUrl1 = (e) => setUrl1(e.target.value)
  const updateUrl2 = (e) => setUrl2(e.target.value)
  const updateUrl3 = (e) => setUrl3(e.target.value)
  const updateUrl4 = (e) => setUrl4(e.target.value)

  const handleCancelClick = (e) => {
    history.push('/')
  };

  const handleSpotSubmit = async (e) => {
    e.preventDefault();

    const previewImagePayload = {
      url,
      preview: true
    }

    const imagePayload1 = {
      url: url1,
      preview: false
    }
    const imagePayload2 = {
      url: url2,
      preview: false
    }
    const imagePayload3 = {
      url: url3,
      preview: false
    }
    const imagePayload4 = {
      url: url4,
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

    if (newSpot && newSpot.id) {
      if (url !== '') {
        let mainImage = await dispatch(spotActions.createImage(newSpot.id, previewImagePayload))

          setImageErrors(mainImage.imageErrors)
      }

      if (url1 !== '') {
        let image1 = await dispatch(spotActions.createImage(newSpot.id, imagePayload1))
      }
      if (url2 !== '') {
        let image2 = await dispatch(spotActions.createImage(newSpot.id, imagePayload2))
      }
      if (url3 !== '') {
        let image3 = await dispatch(spotActions.createImage(newSpot.id, imagePayload3))
      }
      if (url4 !== '') {
        let image4 = await dispatch(spotActions.createImage(newSpot.id, imagePayload4))
      }
      history.push(`/spots/${newSpot.id}`)
    } else {
      const res = await newSpot.json()
      setErrors(res.errors)
    }


  };
  return (
    <div className="ns-form">
      <h1 className="create-title">Create a New Spot</h1>
      <form onSubmit={handleSpotSubmit}>
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
        <form onSubmit={handleSpotSubmit} className="photo-form">
          <h3>Liven up your spot with photos</h3>
          <p>Submit a link to at least one photo to publish your spot:</p>
          <div className="form-tag">
            <h2>Preview/Main Image</h2>
          </div>
          <div className="errors">{imageErrors?.url}</div>
          <input
            type="text"
            className="form-input"
            placeholder="Preview/Main Image URL"
            onChange={updateUrl}
          />
          <div className="form-tag">
            <h2>Image #1 URL</h2>
          </div>
          <div className="errors">{imageErrors?.url}</div>
          <input
            type="text"
            className="form-input"
            placeholder="Image #1 URL"
            onChange={updateUrl1}
          />
          <div className="form-tag">
            <h2>Image #2 URL</h2>
          </div>
          <div className="errors">{imageErrors?.url}</div>
          <input
            type="text"
            className="form-input"
            placeholder="Image #2 URL"
            onChange={updateUrl2}
          />
          <div className="form-tag">
            <h2>Image #3 URL</h2>
          </div>
          <div className="errors">{imageErrors?.url}</div>
          <input
            type="text"
            className="form-input"
            placeholder="Image #3 URL"
            onChange={updateUrl3}
          />
          <div className="form-tag">
            <h2>Image #4 URL</h2>
          </div>
          <div className="errors">{imageErrors?.url}</div>
          <input
            type="text"
            className="form-input"
            placeholder="Image #4 URL"
            onChange={updateUrl4}
          />
        </form>

        <div className="form-buttons">
          <button type="submit" className="submit">Create Spot</button>
          <button type="cancel" className="cancel" onClick={handleCancelClick}>Cancel</button>
        </div>
      </form>
    </div>
  )
}
export default NewSpotForm
