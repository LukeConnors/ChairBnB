import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import * as sessionActions from '../../store/session';
import './Navigation.css';

function Navigation({ isLoaded }){
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const logOutUser = (e) => {
      e.preventDefault();
      dispatch(sessionActions.logOutUser());
    };

    let sessionLinks;
    if (sessionUser) {
      sessionLinks = (
        <li>
          <ProfileButton user={sessionUser} />
          <button onClick={logOutUser}>Log Out</button>
        </li>
      );
    } else {
      sessionLinks = (
        <li>
          <NavLink to="/login">Log In</NavLink>
          <NavLink to="/signup">Sign Up</NavLink>
        </li>
      );
    }

    return (
      <ul>
        <li>
          <NavLink exact to="/">Home</NavLink>
        </li>
        {isLoaded && sessionLinks}
      </ul>
    );
  }

  export default Navigation;
