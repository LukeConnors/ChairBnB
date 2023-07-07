// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import * as spotActions from '../../store/spots'
// import * as reviewActions from '../../store/reviews'
// import {useHistory} from 'react-router-dom'
// import './NewSpotForm.css'
// import { useParams } from "react-router-dom/cjs/react-router-dom.min";
// import { useModalContext } from "../../context/modalContext";

// const EditReviewForm = ({spot, hideForm}) => {
//     const dispatch = useDispatch();
//     const history = useHistory();
//     const [review, setReview] = useState('')
//     const [stars, setStars] = useState('')
//     const [errors, setErrors] = useState({})
//     const { setModal } = useModalContext();

//     const updateReview = (e) => setReview(e.target.value)
//     const updateStars = (e) => setStars(e.target.value)

//     const handleCancelClick = (e) => {
//         setModal(null)
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const payload = {
//         review,
//         stars
//         }
//         let newReview = await dispatch(reviewActions.editReview(reviewId, payload))
//         if(newReview && newReview.id){
//             dispatch(reviewActions.getSpotReviews(spotId))
//             setModal(null)
//             history.push(`/spots/${spotId}`)
//         } else {
//             let res = await newReview.json()
//             setErrors(res.errors)
//         }
//     }
//     return (
//         <div>
//             <form onSubmit={handleSubmit}>
//                 <div className="errors">{errors?.review}</div>
//                 <input
//                 type="text"
//                 placeholder="Your Review Here"
//                 // required
//                 value={review}
//                 onChange={updateReview}
//                 >
//                 </input>
//                 <div className="errors">{errors?.stars}</div>
//                 <input
//                 type="number"
//                 placeholder="Stars"
//                 // required
//                 value={stars}
//                 onChange={updateStars}
//                 >
//                 </input>
//                 <div>
//                 <button type="submit">Post your review</button>
//                 <button type="cancel" onClick={handleCancelClick}>
//                     Cancel
//                 </button>
//                 </div>
//             </form>
//         </div>
//     )

//     }
//     export default EditReviewForm;
