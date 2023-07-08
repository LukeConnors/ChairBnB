import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userSelector } from '../../store/session';
import * as spotActions from '../../store/spots'
import * as reviewActions from '../../store/reviews'
import { useModalContext } from "../../context/modalContext";
import './SpotReviews.css'


function SpotReviews(){
const {spotId} = useParams()
const dispatch = useDispatch()
const userReviews = useSelector(state => state.reviews)
const spot = useSelector(state => state.spots.detailedSpot)
const reviews = Object.values(userReviews || {});
const sortedReviews = reviews.sort(function(a, b){
  return new Date(b.updatedAt) - new Date(a.updatedAt)
})
const user = useSelector(state => state.session.user)
const history = useHistory()
const { setModal, setOptions } = useModalContext();
let hasReview = false


reviews.forEach(review => {
if(user.id === review.userId){
hasReview = true
}
})

useEffect(() => {
    dispatch(reviewActions.getSpotReviews(spotId))
}, [dispatch])


if(reviews.length === 0){
return (
  <div>
    <h2>Be the first to post a review!</h2>
  </div>
)
} else {
  return (
    <div className="reviews-container">
      { !hasReview &&
            <div>
            <button className="post-rev" onClick={(e) => {
              e.preventDefault();
              setModal('reviewForm')
            }}>Post a review</button>
          </div>
      }
        {sortedReviews.map((review) => {
        const date = new Date(review.updatedAt)
        const stringDate = date.toDateString()
        const month = stringDate.slice(4, 7)
        const year = date.getFullYear()
          if(user === null){
            return (
            <div key={review.id}>
              <h3>{review?.User?.firstName}</h3>
              <h4>{month}{year}</h4>
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
            <h4>{month}  {year}</h4>
            </div>
            <div className="userReview-review">
            <p>{review?.review}</p>
            <button className="del-rev" onClick={handleDeleteReview}>Delete review</button>
            <button className="edit-rev" onClick={(e) => {
              e.preventDefault();
              setModal('editReview')
              setOptions({id: review.id, review: review.review, stars: review.stars })
            }}>Edit Review</button>
            </div>
          </div>
            );
          } else {
            return (
              <div key={review.id}>
                <h3>{review?.User?.firstName}</h3>
                <h4>{month}  {year}</h4>
                <p>{review?.review}</p>
              </div>
              )
          }
        })}
      </div>
  )
}


}

export default SpotReviews
