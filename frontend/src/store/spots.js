
import { csrfFetch } from "./csrf"

export const SET_SPOT_DETAILS = "spots/SET_SPOT_DETAILS"
export const SET_USER_SPOTS = "spots/SET_USER_SPOTS"
export const SET_SPOTS = "spots/SET_SPOTS"
export const ADD_SPOT = "spots/ADD_SPOT"
export const UPDATE_SPOT = "spots/UPDATE_SPOT"
export const DELETE_SPOT = "spots/DELETE_SPOT"
export const ADD_SPOT_IMAGE = "spots/ADD_SPOT_IMAGE"

// selectors
export const allSpotsSelector = (state) => {
    const allSpots = state.spots;
    delete allSpots.detailedSpot;
    delete allSpots.userSpots
    delete allSpots.reviews
    return allSpots;
};

export const spotDetailsSelector = () => (state) => state.spots.detailedSpot

export const userSpotsSelector = (state) => {
   return state.spots.userSpots
}

// action creators

// set all spots
const setSpots = (spots) => ({
    type: SET_SPOTS,
    spots
})

// set logged in users spots
const setUserSpots = (spots) => ({
    type: SET_USER_SPOTS,
    spots
})

// update a spot owned by the user
const updateSpot = (spot) => ({
type: UPDATE_SPOT,
payload: spot
})

// set an individual spot
const setSpotDetails = (spot) => ({
    type: SET_SPOT_DETAILS,
    spot

})

// add a new spot
const addSpot = (spot) => ({
    type: ADD_SPOT,
    payload: spot
})

// delete a spot
const deleteSpot = (spotId) => ({
    type: DELETE_SPOT,
    payload: spotId

})

// add images to a spot
const addImage = (image) => ({
    type: ADD_SPOT_IMAGE,
    payload: image
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

// fetch a spot by its id
export const fetchSpotDetails = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`)
    if(res.ok){
        const spot = await res.json();
        dispatch(setSpotDetails(spot))
        return spot
    }
}

// update a spot owned by the user
export const editSpot = (spotId, payload) => async (dispatch) => {
    try{
        const res = await csrfFetch(`/api/spots/${spotId}`, {
            method: "PUT",
            body: JSON.stringify(payload)
            });
            if(res.ok){
                const editedSpot = await res.json();
                dispatch(updateSpot(editedSpot))
                return editedSpot
            }
    } catch(e){
        return e
    }
}

// create a new spot under the logged in user
export const createSpot = (payload) => async (dispatch) => {
    try{
        const res = await csrfFetch('/api/spots', {
            method: "POST",
            body: JSON.stringify(payload)
        });
        if(res.ok){
            const newSpot = await res.json();
            // create a post image fetch
            dispatch(addSpot(newSpot))
            return newSpot
        }
    } catch(e){
        return e
    }
}

export const createImage = (spotId, payload) => async (dispatch) => {
    try{
        const res = await csrfFetch(`/api/spots/${spotId}/images`, {
            method: "POST",
            body: JSON.stringify(payload)
        });
        if(res.ok){
            const newImage = await res.json()
            dispatch(addImage(newImage))
            return newImage
         }

    } catch (e){
        return e
    }
}

// delete a spot owned by the logged in user
export const removeSpot = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: "DELETE"
    });
    if(res.ok){
        const message = await res.json();
        dispatch(deleteSpot(spotId))
        return message
    }
}



const initialState = {
    detailedSpot: {}
}

// reducer
const spotsReducer = (state = initialState, action) => {
    const newState = {...state}

    switch(action.type){
        case SET_SPOTS:
            action.spots.forEach(spot => newState[spot.id] = spot)
            return newState

         case SET_SPOT_DETAILS:
            return {
              ...state,
              detailedSpot: action.spot
            };

        case ADD_SPOT:
            const newSpot = action.payload;
            return {
              ...state,
              [newSpot.id]: newSpot
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

        case DELETE_SPOT:
            const { [action.payload]: deletedSpot, ...updatedSpot } = state;
            return updatedSpot;


        // case ADD_SPOT_IMAGE:
        //     const newImage = action.payload
        //     newState.detailedSpot.spotImages[newImage.id] = newImage
        //     return newState


        default:
            return state;
    }
}

export default spotsReducer
