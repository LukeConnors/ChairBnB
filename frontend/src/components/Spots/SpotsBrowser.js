import React from 'react';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { userSelector } from '../../store/session';
import { useSelector, useDispatch } from 'react-redux';
import { allSpotsSelector } from '../../store/spots';
import * as spotActions from '../../store/spots';
import './SpotsBrowser.css';

function SpotsBrowser() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const spots = useSelector(allSpotsSelector);
  const spotIds = Object.keys(spots || {});

  useEffect(() => {
    dispatch(spotActions.fetchSpots());
  }, [dispatch]);

  return (
    <div className='tile-container'>
      {spotIds.map((spotId) => {
        const spot = spots[spotId];
        const redirectToSpot = async (e) => {
          history.push(`/spots/${spot.id}`);
        };

        if (!spot) {
          // Handle cases where spot is undefined
          return null;
        }


        if (!user) {
          return (
            <div key={spot.id} className='spot-tile'>
              <div className='image-container'>
                <img
                  className='spot-img'
                  onClick={redirectToSpot}
                  src={
                    spot?.previewImg ||
                    'https://res.cloudinary.com/dyt7uoeck/image/upload/v1688189212/download_vnokrd.png'
                  }
                  alt={`No image set for ${spot?.name}`}
                />
              </div>
              <div className='spot-info'>
                <div className='info-text'>
                  <h3>{spot?.city}, {spot?.state}</h3>
                  <h3>${spot?.price} per night</h3>
                </div>
                <div className='info-text'>
                <h3>{spot?.avgStarRating ? spot?.avgStarRating.toFixed(2) : 0}</h3>
                </div>
              </div>
            </div>
          );
        } else if (spot?.ownerId === user?.id) {
          return null;
        } else {
          return (
            <div key={spot.id} className='spot-tile'>
              <div className='image-container'>
                <img
                  className='spot-img'
                  onClick={redirectToSpot}
                  src={
                    spot?.previewImg ||
                    'https://res.cloudinary.com/dyt7uoeck/image/upload/v1688189212/download_vnokrd.png'
                  }
                  alt={`No image set for ${spot?.name}`}
                />
              </div>
              <div className='spot-info'>
                <div className='info-text-left'>
                  <h3 className='text'>
                    {spot?.city}, {spot?.state}
                  </h3>
                    <h3>${spot?.price} per night</h3>
                </div>
                <div className='info-text-right'>
                  <i className="fa-solid fa-star" style={{ color: "#b00c0c" }}></i>
                <h3 className='stars-num'>{spot?.avgStarRating ? spot?.avgStarRating.toFixed(2) : 'No stars'}</h3>
              </div>
            </div>
          </div>
          );
        }
      })}
    </div>
  );
}

export default SpotsBrowser;
