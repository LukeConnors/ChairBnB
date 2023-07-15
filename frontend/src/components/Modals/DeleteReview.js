import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useModalContext } from '../../context/modalContext';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector, useDispatch } from "react-redux";
import * as reviewActions from '../../store/reviews'
import * as spotActions from '../../store/spots'
import './DeleteSpot.css'
import { useEffect } from 'react';

const DeleteReview = () => {
    const { setModal } = useModalContext();
    const history = useHistory();
    const dispatch = useDispatch();
    const spot = useSelector(state => state.spots.detailedSpot)
    const reviews = useSelector(state => state.reviews)
    const user = useSelector(state => state.session.user)
    const review = Object.values(reviews).filter((review) => review.userId === user.id)[0]

// useEffect(() => {
//     dispatch(reviewActions.getSpotReviews(spot.id))
// }, [review])

    const handleDeleteReview = async () => {
      await dispatch(reviewActions.removeReview(review.id))
    //   await dispatch(reviewActions.getSpotReviews(spot.id))
      await dispatch(spotActions.fetchSpotDetails(spot.id))
        setModal(null)
    }

    const handleCancelClick = (e) => {
        setModal(null)
        };

    return (
        <div className="del-background">
            <h2 className='del-title'>Confirm Delete</h2>
            <p className="del-message">Are you sure you want to remove this Review?</p>
            <div className='del-container'>
            <button className="yes-button" onClick={handleDeleteReview}>Yes (Delete Review)</button>
            <button className="no-button" onClick={handleCancelClick}>No (Keep Review)</button>
            </div>
        </div>
    )
}

export default DeleteReview
