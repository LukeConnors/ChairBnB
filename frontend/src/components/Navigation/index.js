import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory();

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className='user'>
        <div className='nav-link'>
          <NavLink to='/newSpot'>Create a new spot</NavLink>
        </div>
        <div className='nav-link'>
        <NavLink exact to="/" className='home-button'>Home</NavLink>
        </div>
        <div className='profile-button'>
          <ProfileButton user={sessionUser} />
        </div>
      </div>
    );
  } else {
    sessionLinks = (
      <div className='no-user'>
        <div className='nav-link'>
          <NavLink to="/login">Log In</NavLink>
        </div>
        <div className='nav-link'>
          <NavLink to="/signup">Sign Up</NavLink>
        </div>
      </div>
    );
  }

  return (
    <div className='nav-container'>
      <div className='logo'>
        <img
          src='https://res.cloudinary.com/dyt7uoeck/image/upload/v1688118546/ChairBnbLogo_gy8gyz.png'
          className='logo'
          onClick={() => history.push('/')}
          alt='Logo'
        />
      </div>
      <div className='home'>
          {isLoaded && sessionLinks}
      </div>
    </div>
  );
}

export default Navigation;
