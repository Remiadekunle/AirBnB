import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className='header'>
          <NavLink exact to="/" style={{ textDecoration: 'none' }}>
          <i className="fa-brands fa-airbnb fa-2xl"></i>
          <span className='home-text'> Fairbnb</span>
          </NavLink>

        {isLoaded && (
          <div className='profile-button'>
            <ProfileButton user={sessionUser} />
          </div>
        )}

    </div>
  );
}

export default Navigation;
