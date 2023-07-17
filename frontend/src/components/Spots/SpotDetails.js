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
  const { spotId } = useParams();
  const user = useSelector(userSelector)
  const spot = useSelector(state => state.spots.detailedSpot)
  const { setModal } = useModalContext();


  useEffect(() => {
    dispatch(spotActions.fetchSpotDetails(spotId))
  }, [dispatch, spotId])


  const handleReserve = () => {
    window.alert('Feature coming soon.')
  }

  const handleEditSpot = (e) => {
    history.push('/editSpot')

  }

  if (!spot?.name) {
    return <div className="loading">Loading spot details...</div>;
  }


  const { name, city, state, country, SpotImages, Owner, description, price, avgStarRating, numReviews } = spot;

  const handleReviewCount = () => {
    if (+numReviews === 0) {
      return null
    } else if (+numReviews === 1) {
      return (
        <>
          <p className="dot">·</p>
          <p>
            {numReviews} review
          </p>
        </>
      )
    } else if (+numReviews > 1) {
      return (
        <>
          <p className="dot">·</p>
          <p>
            {numReviews} reviews
          </p>
        </>

      )
    }
  }

  // if (!user || user?.id === spot?.ownerId) {

    return (
      <div className="details">
        <h1>{name}</h1>
        <h2 className="location">{city}, {state}, {country}</h2>
        <div className="img-container">
          {SpotImages && SpotImages.length > 0 ? (
            <>
              <img className='main-img' key={SpotImages[0]?.id} src={SpotImages[0]?.url} alt={name} />
              <div className="small-images">
                {SpotImages?.slice(1).map(image => (
                  <img className='secondary-img' key={image?.id} src={image?.url} alt={name} />
                ))}
              </div>
            </>
          ) : (
            <p>No images available</p>
          )}
        </div>

        <div className="chair-details">
          <div className="chair-info">
            {Owner && <p className="host">Hosted by: {Owner?.firstName} {Owner?.lastName}</p>}
            <p className="des">{description}</p>
          </div>

          <div className="star-cont">
            <div className="boxy">
              <div className="price">
                <p>${price} per day</p>
              </div>
              <div className="rating-div">
              <i className="fa-solid fa-star" style={{ color: "#b00c0c" }}></i>
            <p>{!avgStarRating ? 'New' : avgStarRating?.toFixed(2)}</p>
                {/* <p className="dot">·</p> */}
                <p className="rev-count">{handleReviewCount()}</p>
              </div>
            </div>
            <div>
              {user && user.id === spot.ownerId ? (
                <div>
                  <button className="ed-spot" onClick={handleEditSpot}>
                    Edit Spot
                  </button>
                  <button className="del-spot" onClick={(e) => {
                    e.preventDefault();
                    setModal('deleteSpot')
                  }}>
                    Delete Spot
                  </button>
                </div>
              ) : (
                <div className="jerry">
                  <button className='reserve' onClick={handleReserve}>Reserve</button>
                </div>
              )}
            </div>
          </div>
        </div>


        <div className="reviews">
          <div className="rev-info">
            <i className="fa-solid fa-star" style={{ color: "#b00c0c" }}></i>
            <p>{!avgStarRating ? 'New' : avgStarRating?.toFixed(2)}</p>
            <p className="rev-count"> {handleReviewCount()}</p>
          </div>
          <SpotReviews />
        </div>
      </div>
    );

  // }
  // else if(user){

  //   return (
  //     <div className="details">
  //       <h1>{name}</h1>
  //       <h2 className="location">{city}, {state}, {country}</h2>
  //       <div className="img-container">
  //         {SpotImages && SpotImages.length > 0 ? (
  //           <>
  //             <img className='main-img' key={SpotImages[0]?.id} src={SpotImages[0]?.url} alt={name} />
  //             <div className="small-images">
  //               {SpotImages?.slice(1).map(image => (
  //                 <img className='secondary-img' key={image?.id} src={image?.url} alt={name} />
  //               ))}
  //             </div>
  //           </>
  //         ) : (
  //           <p>No images available</p>
  //         )}
  //       </div>

  //       <div className="chair-details">
  //         <div className="chair-info">
  //           {Owner && <p className="host">Hosted by: {Owner?.firstName} {Owner?.lastName}</p>}
  //           <p className="des">{description}</p>
  //         </div>

  //         <div className="star-cont">
  //           <div className="boxy">
  //             <div className="price">
  //               <p>${price} per day</p>
  //             </div>
  //             <div className="rating-div">
  //             <i className="fa-solid fa-star" style={{ color: "#b00c0c" }}></i>
  //           <p>{!avgStarRating ? 'New' : avgStarRating?.toFixed(2)}</p>
  //               {/* <p className="dot">·</p> */}
  //               <p className="rev-count">{handleReviewCount()}</p>
  //             </div>
  //           </div>
  //           <div>
  //             {user && user.id === spot.ownerId ? (
  //               <div>
  //                 <button className="ed-spot" onClick={handleEditSpot}>
  //                   Edit Spot
  //                 </button>
  //                 <button className="del-spot" onClick={(e) => {
  //                   e.preventDefault();
  //                   setModal('deleteSpot')
  //                 }}>
  //                   Delete Spot
  //                 </button>
  //               </div>
  //             ) : (
  //               <div className="jerry">
  //                 <button className='reserve' onClick={handleReserve}>Reserve</button>
  //               </div>
  //             )}
  //           </div>
  //         </div>
  //       </div>


  //       <div className="reviews">
  //         <div className="rev-info">
  //         <i className="fa-solid fa-star" style={{ color: "#b00c0c" }}></i>
  //           <p>{!avgStarRating ? 'New' : avgStarRating?.toFixed(2)}</p>
  //           {/* <p className="dot">·</p> */}
  //           <p className="rev-count"> {handleReviewCount()}</p>
  //         </div>
  //         <SpotReviews />
  //       </div>
  //     </div>
  //   );

  // }
}

export default SpotDetails
