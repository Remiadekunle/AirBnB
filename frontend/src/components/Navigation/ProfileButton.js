import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { demoLogIn } from "../../store/session";

function ProfileButton({ user, isHome, setIsHome}) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const openMenu = () => {
      if (showMenu) return;
      setShowMenu(true);
    };

    const useDemo = async () => {
      const demo = {
        credential: 'Ultimate Demo',
        password: 'password'
      }

      await dispatch(demoLogIn(demo)).then(() => closeMenu())
    }


    // console.log(typeof dimModal)

    useEffect(() => {
      if (!showMenu) return;

      const closeMenu = (e) => {
        if (!ulRef.current.contains(e.target)) {
          setShowMenu(false);
        }
      };

      document.addEventListener('click', closeMenu);

      return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    const logout = (e) => {
      e.preventDefault();
      dispatch(sessionActions.logout());
      closeMenu();
    };

    const ulClassName = (isHome? "profile-dropdown": "profile-dropdown2") + (showMenu ? "" : " hidden");

    return (
      <>
        <button className="button-container" onClick={openMenu}>
          <i class="fa-solid fa-bars"></i>
          <i className="fas fa-user-circle fa-xl" />
        </button>
        <ul className={ulClassName} ref={ulRef}>
          {user && user.id ? (
            <>

              <li>{user.username}</li>
              <li>{user.firstName} {user.lastName}</li>
              <li>{user.email}</li>
              <>
                <button id="logout-button" onClick={logout}>
                  <div id="logout-text">
                    Log Out
                  </div>
                  </button>
              </>
            </>
          ) : (
            <>
            <button className="auth-buttons">
              <OpenModalMenuItem
                itemText="Log In"
                // onButtonClick={dimModal}
                // onItemClick={dim2}
                // onModalClose={() => dim2}
                modalComponent={<LoginFormModal  />}
              />
            </button>
            <button className="auth-buttons">
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </button>

              <button className="demo-user" onClick={useDemo}>Demo User</button>
            </>
          )}
        </ul>
      </>
    );
}

  export default ProfileButton;
