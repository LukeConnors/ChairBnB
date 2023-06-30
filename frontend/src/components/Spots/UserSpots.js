import React from 'react';
import {useHistory} from 'react-router-dom'
import {useEffect} from 'react'
import { userSelector } from '../../store/session';
import {useSelector, useDispatch} from 'react-redux'
import {userSpotsSelector} from '../../store/spots';
import * as spotActions from '../../store/spots'


function UserSpots(){
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(userSelector)
    const userSpots = useSelector(userSpotsSelector)
    const spotIds = Object.keys(userSpots || {});

    useEffect(() => {
        dispatch(spotActions.fetchUserSpots())
    }, [dispatch])
    return(
        <div>
            <h1>Your Spots:</h1>
        {spotIds.map(spotId => {
            const spot = userSpots[spotId];
            const redirectToSpot = async (e) => {
                history.push(`/spots/${spot.id}`)
              }
              return (
                <div className='tile-container' key={spot?.id}>
                <div className='image-container'>
                <img className="spot-img" onClick={redirectToSpot} src={spot?.previewImg} alt={`No image set for ${spot.name}`} />
                </div>
                <h2>{spot?.name}</h2>
                <div>
                <h3>${`${spot?.price} per night`}</h3>
                <h3>{spot?.city}, {spot?.state}</h3>
                </div>
                  <h3>{spot?.avgStarRating ? spot?.avgStarRating : 'No'} stars</h3>
              </div>
            );

        })}


        </div>

    )
}

export default UserSpots;
