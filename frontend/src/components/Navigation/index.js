import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import * as sessionActions from '../../store/session';
import './Navigation.css';

function Navigation({ isLoaded }){
    const sessionUser = useSelector(state => state.session.user);
    // const dispatch = useDispatch();

    // const removeUser = (e) => {
    //   e.preventDefault();
    //   dispatch(sessionActions.removeUser());
    // };

    let sessionLinks;
    if (sessionUser) {
      sessionLinks = (
      <div className='user'>
        <div>
        <h3>Create a new spot</h3>
        </div>
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      </div>
      );
    } else {
      sessionLinks = (
      <div className='no-user'>
        <li className='login'>
          <NavLink to="/login">Log In</NavLink>
        </li>
        <li className='signup'>
          <NavLink to="/signup">Sign Up</NavLink>
        </li>
      </div>
      );
    }

    return (
  <div className='nav-container'>
      <div className='logo'>
      <a>logo</a>
      </div>
    <div className='home'>
      <ul>
        <li>
          <NavLink exact to="/">Home</NavLink>
        </li>
        {isLoaded && sessionLinks}
      </ul>
    </div>
  </div>
    );
  }

  export default Navigation;
