// constants
import { csrfFetch } from "./csrf"

export const SET_SPOT_DETAILS = "spots/SET_SPOT_DETAILS"
export const SET_USER_SPOTS = "spots/SET_USER_SPOTS"
export const SET_SPOTS = "spots/SET_SPOTS"
export const NEW_SPOT = "spots/NEW_SPOT"
export const UPDATE_SPOT = "spots/UPDATE_SPOT"
export const DELETE_SPOT = "spots/DELETE_SPOT"

// selectors
export const allSpotsSelector = (state) => {
    const allSpots = state.spots;
    delete allSpots.detailedSpot;
    return allSpots;
};
export const spotDetailsSelector = () => state => state.spots.detailedSpot;
export const userSpotsSelector = (state) => {
   return state.spots.userSpots
}
export const updateSpotSelector = () => {}

// action creators
// set all spots
const setSpots = (spots) => ({
    type: SET_SPOTS,
    spots
})

const setUserSpots = (spots) => ({
    type: SET_USER_SPOTS,
    spots
})

const updateSpot = (spot) => ({
type: UPDATE_SPOT,
payload: spot
})

const setSpotDetails = (spot) => ({
    type: SET_SPOT_DETAILS,
    payload: spot

})


// thunks
// fetch all spots
export const fetchSpots = () => async (dispatch) => {
const res = await csrfFetch('/api/spots')
const data = await res.json();
dispatch(setSpots(data.Spots))
return data
}

// fetch spots by the logged in user
export const fetchUserSpots = () => async (dispatch, getState) => {
    const state = getState()
    const res = await csrfFetch(`/api/spots/current`)
    const data = await res.json();
    dispatch(setUserSpots(data.Spots))
    return data;
}

// update a spot owner by the user
export const editSpot = (spotId, payload) => async (dispatch) => {
const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: "PUT",
    body: JSON.stringify(payload)
    });
    if(res.ok){
        const editedSpot = await res.json();
        dispatch(updateSpot(editedSpot))
    }
}

// fetch a spot by its id
export const fetchSpotDetails = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`)
    if(res.ok){
        const spot = await res.json();
        dispatch(setSpotDetails(spot))
        return spot
    }
}


// reducer
const spotsReducer = (state = {}, action) => {
    const newState = {...state}

    switch(action.type){
        case SET_SPOTS:
            action.spots.forEach(spot => newState[spot.id] = spot)
            return newState

            case SET_SPOT_DETAILS:
                return {
                  ...state,
                  detailedSpot: action.payload
                };

            case UPDATE_SPOT:
                const spotId = action.payload.id
                newState[spotId] = {...state[spotId], ...action.payload}
                newState.detailedSpot = {...state.detailedSpot, ...action.payload}
                return newState

        case SET_USER_SPOTS:
            const userSpots = {};
            const spots = action.spots
            spots.forEach((spot) => {
                userSpots[spot.id] = spot
            })
            return {
                ...state,
                userSpots
            }
        default:
            return state;
    }
}

export default spotsReducer
