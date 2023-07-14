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
    const [disabled, setDisabled] = useState(true)

    useEffect(() => {
        if(review.length >= 10 && stars >= 1 && stars <= 5){
          setDisabled(false)
        } else {
          setDisabled(true)
        }
      }, [review, stars])

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
            if(newReview.status >= 500){
            setErrors({server: 'Server error, please try again later'})
            } else{
             setErrors(res.errors)
            }
        }
    }
    return (
        <div className="form-cont">
            <form onSubmit={handleSubmit}>
            <div className="errors">{errors?.server}</div>
                <h2 className="review-title">How was your stay?</h2>
                <div className="errors">{errors?.review}</div>
                <textarea
                className="rev-box"
                type="text"
                placeholder="Leave your review here..."
                // required
                value={review}
                onChange={updateReview}
                />
                <div className="errors">{errors?.stars}</div>
                <div className="rev-stars">
                <input
                className="rating"
                type="number"
                placeholder="Stars"
                // required
                value={stars}
                onChange={updateStars}
                >
                </input>
                <h4> &#160;Stars</h4>
                </div>
                <div>
                <button className="sub" type="submit" >Submit your review</button>
                <button className="canc" type="cancel" onClick={handleCancelClick}>
                    Cancel
                </button>
                </div>
            </form>
        </div>
    )

    }
    export default NewReviewForm;
