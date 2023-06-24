import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false)
  const ulRef = useRef()

  const openMenu = () => {
    if(showMenu) return;
    setShowMenu(true)
  }

  const logOutUser = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logOutUser());
  };

  useEffect(() => {
    const closeMenu = (e) => {
        if(!ulRef.current.contains(e.target)){
            setShowMenu(!showMenu);
        }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <button onClick={openMenu}>
      <i className="fa-solid fa-user"></i>
      </button>
      <ul className={ulClassName} ref={ulRef}>
        <li>{user?.username}</li>
        <li>{user?.firstName} {user?.lastName}</li>
        <li>{user?.email}</li>
        <li>
          <button onClick={logOutUser}>Log Out</button>
        </li>
      </ul>
    </>
  );
}

export default ProfileButton;
