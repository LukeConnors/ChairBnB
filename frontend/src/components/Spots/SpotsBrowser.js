import React from 'react';
import {useHistory} from 'react-router-dom'
import {useEffect} from 'react'
import { userSelector } from '../../store/session';
import {useSelector, useDispatch} from 'react-redux'
import { allSpotsSelector} from '../../store/spots';
import * as spotActions from '../../store/spots'
import './SpotsBrowser.css'

function SpotsBrowser() {
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(userSelector)
    const spots = useSelector(allSpotsSelector)
    const spotIds = Object.keys(spots || {});


    useEffect(() => {
      dispatch(spotActions.fetchSpots())
    }, [dispatch])

    return (
      <div className='tile-container'>
      {spotIds.map(spotId => {
          const spot = spots[spotId];
          const redirectToSpot = async (e) => {
            history.push(`/spots/${spot.id}`)
          }


          if (!spot) {
            // Handle cases where spot is undefined
            return null;
          }


          if(!user){
            return (
              <div>
              <div className='image-container'>
              <img className="spot-img" onClick={redirectToSpot} src={spot?.previewImg} alt={`No image set for ${spot?.name}`} />
              </div>
              <h2>{spot?.name}</h2>
              <div>
              <h3>${`${spot?.price} per night`}</h3>
              <h3>{spot?.city}, {spot?.state}</h3>
              </div>
                <h3>{spot?.avgStarRating} stars</h3>
            </div>
          );
          } else if(spot?.ownerId === user?.id){
          return null
        } else {
          return (
            <div>
            <div className='image-container'>
            <img className="spot-img" onClick={redirectToSpot} src={spot?.previewImg} alt={`No image set for ${spot.name}`} />
            </div>
            <h2>{spot?.name}</h2>
            <div>
            <h3>${`${spot?.price} per night`}</h3>
            <h3>{spot?.city}, {spot?.state}</h3>
            </div>
            <h3>{spot?.avgStarRating} stars</h3>
          </div>
        );
        }
      })}
    </div>
  );
}

export default SpotsBrowser;
