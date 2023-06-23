import { csrfFetch } from "./csrf"


const LOGIN = 'session/LOGIN'
const LOGOUT = 'session/LOGOUT'

const logIn = (user) => ({
    type: LOGIN,
    user
})

const logOut = () => ({
    type: LOGOUT
})


export const logInUser = (credential, password) => async dispatch => {
    const resBody = JSON.stringify({credential, password})
const res = await csrfFetch(`/api/session`, {
    method: 'POST',
    body: resBody
    })

    if(res.ok){
    const data = await res.json()
    dispatch(logIn(data))
    }
}

export const logOutUser = () => async dispatch => {
    const res = await csrfFetch ('/api/session', {
        method: 'DELETE',
    })

    if(res.ok){
        dispatch(logOut())
    }
}


const sessionReducer = (state={user: null}, action) => {
switch(action.type){
    case LOGIN:
        return {user: action.user}
    case LOGOUT:
        return {user: null}

        default:
        return state;
    }
}

export default sessionReducer
