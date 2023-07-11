import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as spotActions from '../../store/spots'
import * as reviewActions from '../../store/reviews'
import {useHistory} from 'react-router-dom'
import './NewSpotForm.css'
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useModalContext } from "../../context/modalContext";
import './EditReviewForm.css'

const EditReviewForm = () => {
    const {spotId} = useParams()
    const dispatch = useDispatch();
    const history = useHistory();
    const { options, setModal } = useModalContext();
    const [review, setReview] = useState(options.review)
    const [stars, setStars] = useState(options.stars)
    const [errors, setErrors] = useState({})

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
        let newReview = await dispatch(reviewActions.editReview(options.id, payload))
        if(newReview && newReview.id){
            // dispatch(reviewActions.getSpotReviews(spotId))
            setModal(null)
        } else {
            let res = await newReview.json()
            console.log(res, 'THIS IS THE RESPONSE')
            setErrors(res.errors)
        }
    }
    return (
        <div className="ed-rev-background">
            <h4>Update your review</h4>
        <div className="ed-form-container">
            <form onSubmit={handleSubmit}>
                <div className="errors">{errors?.review}</div>
                <textarea
                type="text"
                className="rev-box"
                placeholder="Your Review Here"
                // required
                value={review}
                onChange={updateReview}
                />
                <div className="errors">{errors?.stars}</div>
                <input
                type="number"
                className="ed-stars"
                placeholder="Stars"
                // required
                value={stars}
                onChange={updateStars}
                >
                </input>
                <div>
                <button type="submit">Update your review</button>
                <button type="cancel" onClick={handleCancelClick}>
                    Cancel
                </button>
                </div>
            </form>
            </div>
        </div>
    )

    }
    export default EditReviewForm;
