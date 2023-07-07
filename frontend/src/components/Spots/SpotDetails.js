import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userSelector } from '../../store/session';
import * as spotActions from '../../store/spots'
import EditSpotForm from "./EditForm";
import SpotReviews from "./SpotReviews";
import NewReviewForm from "./NewReviewForm"
import './SpotDetails.css'
import { useModalContext } from "../../context/modalContext";

const SpotDetails = () => {
    const history = useHistory()
    const dispatch = useDispatch();
    const {spotId} = useParams();
    const user = useSelector(userSelector)
    const spot = useSelector(spotActions.spotDetailsSelector())
    const [showEditSpotForm, setShowEditSpotForm] = useState(false)
    const [showReviewForm, setShowReviewForm] = useState(false)
    const { setModal } = useModalContext();


    useEffect(() => {
    dispatch(spotActions.fetchSpotDetails(spotId))
    setShowEditSpotForm(false)
    setShowReviewForm(false)
    }, [dispatch, spotId])



    const handleDeleteSpot = async () => {
     await dispatch(spotActions.removeSpot(spotId))
     history.push('/spots/current')
    }
    const handleNewReview = () => {
      setShowReviewForm(!showEditSpotForm)
    }

    const handleEditSpot = () => {
        setShowEditSpotForm(!showEditSpotForm)
    }
    if (!spot.name) {
        return <div className="loading">Loading spot details...</div>;
      }


      const { name, city, state, country, SpotImages, Owner, description, price, avgStarRating, numReviews } = spot;

  if(!user || user.id === spot.ownerId){

    return (
      <div>
        <h1>{name}</h1>
        <h2>{city}, {state}, {country}</h2>
        {SpotImages && SpotImages.length > 0 ? (
          SpotImages.map(image => (
            <img className='detail-img'key={image.id} src={image.url} alt={name} />
          ))
        ) : (
          <p>No images available</p>
        )}
        <div>
          {Owner && <p>Hosted by: {Owner?.firstName} {Owner?.lastName}</p>}
        </div>
        <div>
          <p>{description}</p>
        </div>
        <div>
          <p>${price} per day</p>
        </div>
        <div className="stars-div">
        <i className="fa-solid fa-star" style={{ color: "#b00c0c" }}></i>
          <p>{avgStarRating?.toFixed(2)}</p>
        </div>
        <div>
          <p>{numReviews} {numReviews === 1 ? 'review' : 'reviews'}</p>
        </div>
        <div>
          {user && user.id === spot.ownerId ? (
            <div>
              <button onClick={handleEditSpot}>
                {showEditSpotForm ? "Cancel" : "Edit Spot"}
              </button>
              <button onClick={handleDeleteSpot}>
                Delete Spot
              </button>
              {showEditSpotForm && (
                <EditSpotForm spot={spot} hideForm={() => setShowEditSpotForm(false)} />
              )}
            </div>
          ) : (
            <button>Reserve</button>
          )}
          <div className="reviews">
          <div className="rev-info">
          <i className="fa-solid fa-star" style={{ color: "#b00c0c" }}></i>
          <p>{avgStarRating?.toFixed(2)} {numReviews} {numReviews === 1 ? 'review' : 'reviews'}</p>
        </div>
        <SpotReviews />
          </div>
        </div>
      </div>
    );
  } else {

    return (
      <div>
        <h1>{name}</h1>
        <h2>{city}, {state}, {country}</h2>
        {SpotImages && SpotImages.length > 0 ? (
          SpotImages.map(image => (
            <img className='detail-img'key={image.id} src={image.url} alt={name} />
          ))
        ) : (
          <p>No images available</p>
        )}
        <div>
          {Owner && <p>Hosted by: {Owner?.firstName} {Owner?.lastName}</p>}
        </div>
        <div>
          <p>{description}</p>
        </div>
        <div>
          <p>${price} per day</p>
        </div>
        <div className="stars-div">
        <i className="fa-solid fa-star" style={{ color: "#b00c0c" }}></i>
          <p>{avgStarRating?.toFixed(2)}</p>
        </div>
        <div>
          <p>{numReviews} {numReviews === 1 ? 'review' : 'reviews'}</p>
        </div>
        <div>
          {user && user.id === spot.ownerId ? (
            <div>
              <button onClick={handleEditSpot}>
                {showEditSpotForm ? "Cancel" : "Edit Spot"}
              </button>
              <button onClick={handleDeleteSpot}>
                Delete Spot
              </button>
              {showEditSpotForm && (
                <EditSpotForm spot={spot} hideForm={() => setShowEditSpotForm(false)} />
              )}
            </div>
          ) : (
            <button>Reserve</button>
          )}
          <div className="reviews">
          <div className="rev-info">
          <i className="fa-solid fa-star" style={{ color: "#b00c0c" }}></i>
          <p>{avgStarRating?.toFixed(2)} {numReviews} {numReviews === 1 ? 'review' : 'reviews'}</p>
        </div>
        <div>
          <button onClick={(e) => {
            e.preventDefault();
            setModal('reviewForm')
          }}>Post a review</button>
        </div>
        <SpotReviews />
          </div>
        </div>
      </div>
    );

  }
  }

export default SpotDetails
