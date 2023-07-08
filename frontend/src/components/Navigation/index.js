import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { useModalContext } from "../../context/modalContext";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory();
  const { setModal } = useModalContext();


const handleNewSpot = () => {
  history.push('/newSpot')
}

  const handleHomeClick = () => {
    history.push('/');
  }

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className='user'>
          <button className='ns-button' onClick={handleNewSpot}>Create a new spot</button>
          <button className='nav-button home-button' onClick={handleHomeClick}>Home</button>
          <ProfileButton user={sessionUser} />
      </div>
    );
  } else {
    sessionLinks = (
      <div className='no-user'>
          <button className='home-button' onClick={handleHomeClick}>Home</button>
          <button className='uLog' onClick={(e) => {
            e.preventDefault();
            setModal('logInForm')
          }}>Log In</button>
          <button className='uSign' onClick={(e) => {
            e.preventDefault();
            setModal('signUpForm')
          }}>Sign up</button>
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
