import { csrfFetch } from "./csrf";

export const SET_SPOT_REVIEWS = "reviews/SET_SPOT_REVIEWS"
export const ADD_REVIEW = "reviews/ADD_REVIEW"
export const UPDATE_REVIEW = "reviews/UPDATE_REVIEW"
export const DELETE_REVIEW = "reviews/DELETE_REVIEW"

export const spotReviewsSelector = (state) => state.reviews


// set all reviews by spotId
const setSpotReviews = (reviews) => ({
    type: SET_SPOT_REVIEWS,
    reviews
})


const addReview = (review) => ({
    type: ADD_REVIEW,
    payload: review
})

const updateReview = (review) => ({
    type: UPDATE_REVIEW,
    payload: review
})

const deleteReview = (reviewId) => ({
    type: DELETE_REVIEW,
    payload: reviewId
})

// get all reviews for a spot by spotId
export const getSpotReviews = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`)
    if(res.ok){
        const reviews = await res.json()
            dispatch(setSpotReviews(reviews.Reviews))
            return reviews
    }
}


export const createReview = (spotId, payload) => async (dispatch) => {
    try{
        const res = await csrfFetch(`/api/spots/${spotId}/reviews`,{
            method: "POST",
            body: JSON.stringify(payload)
        });
        if(res.ok){
            const newReview = await res.json();
            dispatch(addReview(newReview))
            return newReview
        }
    } catch(e) {
        return e
    }
}


export const editReview = (reviewId, payload) => async (dispatch) => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: "PUT",
        body: JSON.stringify(payload)
    });
    if(res.ok){
        const editedReview = await res.json();
        dispatch(updateReview(editedReview))
        return editedReview
    }
}

export const removeReview = (reviewId) => async (dispatch) => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: "DELETE"
    });
    if(res.ok){
        const message = await res.json();
        dispatch(deleteReview(reviewId))
        return message
    }
}


const reviewsReducer = (state = {}, action) => {
    let newState = {...state}

    switch(action.type){
        case SET_SPOT_REVIEWS:
        let reviewState = {}
        const spotReview = action.reviews.forEach((review) => {
            reviewState[review.id] = review
        })
            return reviewState


        case ADD_REVIEW:
            const newReview = action.payload;
            return {
                ...state,
                [newReview.id]: newReview
            }

        case UPDATE_REVIEW:
        const reviewId = action.payload.id
        newState[reviewId] = {...state[reviewId], ...action.payload}
        return newState

        case DELETE_REVIEW:
        return state

        default:
            return state
    }
}

export default reviewsReducer
