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

export const signup = (user) => async (dispatch) => {
    const { username, firstName, lastName, email, password } = user;
    const response = await csrfFetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        username,
        firstName,
        lastName,
        email,
        password,
      }),
    });
    const data = await response.json();
    dispatch(logIn(data.user));
    return response;
  };



export const restoreUser = () => async (dispatch) => {
    const res = await csrfFetch("/api/session");
    const data = await res.json();
    dispatch(logIn(data.user));
    return res;
  };


export const logInUser = (user) => async dispatch => {
    const { credential, password } = user;
const res = await csrfFetch(`/api/session`, {
    method: 'POST',
    body: JSON.stringify({
        credential,
        password
    })
    })

    if(res.ok){
    const data = await res.json()
    dispatch(logIn(data.user))
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
