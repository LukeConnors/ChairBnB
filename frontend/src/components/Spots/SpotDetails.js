import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as spotActions from '../../store/spots'

const SpotDetails = () => {
    const dispatch = useDispatch();
    const {spotId} = useParams();
    const spot = useSelector(state => spotActions.spotDetailsSelector(state, spotId))


    return (
        <div>
            <h1>{spot?.name}</h1>
            <h2>{spot?.city}, {spot?.state}, {spot?.country}</h2>
            {spot?.SpotImages && spot?.SpotImages.length > 0 ? (
                spot.SpotImages.map(image => (
                    <img key={image.id} src={image.url} alt={spot.name} />
                ))
            ) : (
                <p>No images available</p>
            )}
            <div>
            <p>Hosted by: {spot.Owner.firstName} {spot.Owner.lastName}</p>
            </div>
            <div>
            <p>{spot.description}</p>
            </div>
            <div>
                <p>${spot.price} per day</p>
            </div>
            <div>
                <p>{spot.avgStarRating} stars</p>
            </div>
            <div>
                <p>{spot.numReviews} reviews</p>
            </div>
            <div>
                <button>Reserve</button>
            </div>
        </div>
    )
}

export default SpotDetails
