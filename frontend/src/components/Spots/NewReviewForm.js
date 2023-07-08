import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as spotActions from '../../store/spots'
import * as reviewActions from '../../store/reviews'
import {useHistory} from 'react-router-dom'
import './NewSpotForm.css'
// import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useModalContext } from "../../context/modalContext";
import './NewReviewForm.css'

const NewReviewForm = () => {
    // const {spotId} = useParams()
    const dispatch = useDispatch();
    const history = useHistory();
    const [review, setReview] = useState('')
    const [stars, setStars] = useState('')
    const [errors, setErrors] = useState({})
    const { setModal } = useModalContext();
    const spot = useSelector(state => state.spots.detailedSpot)

    const updateReview = (e) => setReview(e.target.value)
    const updateStars = (e) => setStars(e.target.value)

    const handleCancelClick = (e) => {
        setModal(null)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
        review,
        stars
        }
        let newReview = await dispatch(reviewActions.createReview(spot.id, payload))
        if(newReview && newReview.id){
            dispatch(reviewActions.getSpotReviews(spot.id))
            setModal(null)
            history.push(`/spots/${spot.id}`)
        } else {
            let res = await newReview.json()
            setErrors(res.errors)
        }
    }
    return (
        <div className="form-cont">
            <form onSubmit={handleSubmit}>
                <div className="errors">{errors?.review}</div>
                <h2 className="review-title">How was your stay?</h2>
                <textarea
                type="text"
                placeholder="Leave your review here..."
                // required
                value={review}
                onChange={updateReview}
                />
                <div className="errors">{errors?.stars}</div>
                <input
                className="rating"
                type="number"
                placeholder="Stars"
                // required
                value={stars}
                onChange={updateStars}
                >
                </input>
                <div>
                <button className="sub" type="submit">Submit your review</button>
                <button className="canc" type="cancel" onClick={handleCancelClick}>
                    Cancel
                </button>
                </div>
            </form>
        </div>
    )

    }
    export default NewReviewForm;
