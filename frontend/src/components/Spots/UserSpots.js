import React from 'react';
import {useHistory} from 'react-router-dom'
import {useEffect} from 'react'
import { userSelector } from '../../store/session';
import {useSelector, useDispatch} from 'react-redux'
import {userSpotsSelector} from '../../store/spots';
import * as spotActions from '../../store/spots'
import './UserSpots.css'


function UserSpots(){
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(userSelector)
    const userSpots = useSelector(userSpotsSelector)
    const spotIds = Object.keys(userSpots || {});

    const handleCreateClick = () => {
        history.push('/newSpot')
    }

    useEffect(() => {
        dispatch(spotActions.fetchUserSpots())
    }, [dispatch])

    if(spotIds.length === 0){
        return (
            <div>
                <h1>No spots created yet!</h1>
                <button onClick={handleCreateClick}>Create a New Spot</button>
            </div>
        )
    } else {
        return(
            <>
                <h1>Manage Spots:</h1>
            <div className='page-container'>
            {spotIds.map(spotId => {
                const spot = userSpots[spotId];
                const redirectToSpot = async (e) => {
                    history.push(`/spots/${spot.id}`)
                  }
          return (
            <div className='t-container' key={spot?.id}  onClick={redirectToSpot}>
                <img
                  className="s-img"
                  src={spot?.previewImg || 'https://res.cloudinary.com/dyt7uoeck/image/upload/v1688189212/download_vnokrd.png'}
                  alt={`No image set for ${spot.name}`}
                />
              <div className='s-info'>
              <div className='l-info'>
                <h3>{spot?.city}, {spot?.state}</h3>
                <h3>${`${spot?.price} per day`}</h3>
              </div>
              <div className='r-info'>
              <i className="fa-solid fa-star" style={{ color: "#b00c0c" }}></i>
                <h3 className='stars-num'>{spot?.avgStarRating ? spot?.avgStarRating.toFixed(2) : 'New'}</h3>
              </div>
              </div>
            </div>
          );

            })}


            </div>
            </>

        )
    }
}

export default UserSpots;
