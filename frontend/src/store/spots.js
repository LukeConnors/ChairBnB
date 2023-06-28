// constants

import { csrfFetch } from "./csrf"

export const SET_SPOT_DETAILS = "spots/SET_SPOT_DETAILS"
export const SET_SPOTS = "spots/SET_SPOTS"
export const NEW_SPOT = "spots/NEW_SPOT"
export const UPDATE_SPOT = "spots/UPDATE_SPOT"
export const DELETE_SPOT = "spots/DELETE_SPOT"

// selectors
export const allSpotsSelector = (state) => state.spots;
export const spotDetailsSelector = (state, spotId) => state.spots[spotId];


// action creators
// set all spots
const setSpots = (spots) => ({
    type: SET_SPOTS,
    spots
})

const setSpotDetails = (spot) => ({
    type: SET_SPOT_DETAILS,
    spot

})

// thunks
// fetch all spots
export const fetchSpots = () => async (dispatch) => {
const res = await csrfFetch('/api/spots')
const data = await res.json();

dispatch(setSpots(data.Spots))
return data
}


export const fetchSpotDetails = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`)
    if(res.ok){
        const spot = await res.json();
        console.log(spot)
        dispatch(setSpotDetails(spot))
        return spot
    }
}


// reducer
const spotsReducer = (state={}, action) => {
    switch(action.type){
        case SET_SPOTS:
            const newState = {...state}
            action.spots.forEach(spot => newState[spot.id] = spot)
            return newState

        case SET_SPOT_DETAILS:
            return {
                ...state,
                [action.spot.id]: action.spot
            }

        default:
            return state;
    }
}

export default spotsReducer
