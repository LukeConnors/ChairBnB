import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import "./Navigation.css";
import {NavLink, useHistory} from 'react-router-dom'
import './ProfileButton.css'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false)
  const ulRef = useRef()
  const history = useHistory()

  const openMenu = () => {
    if(showMenu) return;
    setShowMenu(true)
  }

  const removeUser = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logOut());
    history.push('/')
  };

  useEffect(() => {
    if(!showMenu) return;
    const closeMenu = (e) => {
        if(!ulRef.current.contains(e.target)){
            setShowMenu(false);
        }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <button className="user-drop" id="profile" onClick={openMenu}>
      <i className="fa-solid fa-user"></i>
      </button>
      <ul className={ulClassName} ref={ulRef}>
        <li>Hello, {user?.firstName} {user?.lastName}</li>
        <li>{user?.username}</li>
        <li>{user?.email}</li>
        <NavLink to='/spots/current'>Manage Spots</NavLink>
        <li>
          <button onClick={removeUser}>Log Out</button>
        </li>
      </ul>
    </>
  );
}

export default ProfileButton;
