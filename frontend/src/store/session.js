import { csrfFetch } from "./csrf"


const SET_USER = 'session/SET_USER'
const REMOVE_USER = 'session/REMOVE_USER'

export const userSelector = (state) => state.session.user

const setUser = (user) => ({
    type: SET_USER,
    user
})

const removeUser = () => ({
    type: REMOVE_USER
})

export const signup = (user) => async (dispatch) => {
    try{
        const { username, firstName, lastName, email, password } = user;
        const res = await csrfFetch("/api/users", {
          method: "POST",
          body: JSON.stringify({
            username,
            firstName,
            lastName,
            email,
            password,
          }),
        });
        const data = await res.json();
        dispatch(setUser(data.user));
        return res;

    } catch(e) {
        const errors = await e.json();
        return errors;
    }
  };



export const restoreUser = () => async (dispatch) => {
    const res = await csrfFetch("/api/session");
    const data = await res.json();
    dispatch(setUser(data.user));
    return res;
  };


export const logIn = (user) => async dispatch => {
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
    dispatch(setUser(data.user))
    }
}

export const logOut = () => async dispatch => {
    const res = await csrfFetch ('/api/session', {
        method: 'DELETE',
    })

    if(res.ok){
        dispatch(removeUser())
    }
}


const sessionReducer = (state={user: null}, action) => {
switch(action.type){
    case SET_USER:
        return {user: action.user}
    case REMOVE_USER:
        return {user: null}

        default:
        return state;
    }
}

export default sessionReducer
