import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userSelector } from '../../store/session';
import * as spotActions from '../../store/spots'
import EditSpotForm from "./EditForm";

const SpotDetails = () => {
    const dispatch = useDispatch();
    const {spotId} = useParams();
    const user = useSelector(userSelector)
    const spot = useSelector(spotActions.spotDetailsSelector())
    const [showEditSpotForm, setShowEditSpotForm] = useState(false)


    useEffect(() => {
    dispatch(spotActions.fetchSpotDetails(spotId))
    setShowEditSpotForm(false)
    }, [dispatch, spotId])

    const handleEditSpot = () => {
        setShowEditSpotForm(!showEditSpotForm)
    }
    if (!spot) {
        return <div>Loading spot details...</div>;
      }


      const { name, city, state, country, SpotImages, Owner, description, price, avgStarRating, numReviews } = spot;

      return (
        <div>
          <h1>{name}</h1>
          <h2>{city}, {state}, {country}</h2>
          {SpotImages && SpotImages.length > 0 ? (
            SpotImages.map(image => (
              <img key={image.id} src={image.url} alt={name} />
            ))
          ) : (
            <p>No images available</p>
          )}
          <div>
            {Owner && <p>Hosted by: {Owner.firstName} {Owner.lastName}</p>}
          </div>
          <div>
            <p>{description}</p>
          </div>
          <div>
            <p>${price} per day</p>
          </div>
          <div>
            <p>{avgStarRating} stars</p>
          </div>
          <div>
            <p>{numReviews} reviews</p>
          </div>
          <div>
            {user && user.id === spot.ownerId ? (
              <div>
                <button onClick={handleEditSpot}>
                  {showEditSpotForm ? "Cancel" : "Edit Spot"}
                </button>
                {showEditSpotForm && (
                  <EditSpotForm spot={spot} hideForm={() => setShowEditSpotForm(false)} />
                )}
              </div>
            ) : (
              <button>Reserve</button>
            )}
          </div>
        </div>
      );
    }

export default SpotDetails
