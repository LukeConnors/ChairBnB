import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userSelector } from '../../store/session';
import * as spotActions from '../../store/spots'
import * as reviewActions from '../../store/reviews'


function SpotReviews(){
const {spotId} = useParams()
const dispatch = useDispatch()
const userReviews = useSelector(reviewActions.spotReviewsSelector)
const reviews = Object.values(userReviews || {});
const user = useSelector(userSelector)
const history = useHistory()




useEffect(() => {
    dispatch(reviewActions.getSpotReviews(spotId))
}, [dispatch])

return (
    <div className="reviews-container">
      {reviews.map((review) => {
        if(user === null){
          return (
          <div key={review.id}>
            <h3>{review?.User?.firstName}</h3>
            <p>{review?.review}</p>
          </div>
          )
        } else if(review.userId === user.id){
          const handleDeleteReview = async () => {
            await dispatch(reviewActions.removeReview(review.id))
            dispatch(reviewActions.getSpotReviews(spotId))
            history.push(`/spots/${spotId}`)
            }
        return (
          <div key={review.id}>
          <div className="userReview-name">
          <h3>{review?.User?.firstName}</h3>
          </div>
          <div className="userReview-review">
          <p>{review?.review}</p>
          <button onClick={handleDeleteReview}>Delete review</button>
          <button>Edit Review</button>
          </div>
        </div>
          );
        } else {
          return (
            <div key={review.id}>
              <h3>{review?.User?.firstName}</h3>
              <p>{review?.review}</p>
            </div>
            )
        }
      })}
    </div>
)

}

export default SpotReviews
