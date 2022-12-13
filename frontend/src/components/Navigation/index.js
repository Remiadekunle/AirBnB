import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import OpenModalMenuItem from './OpenModalMenuItem';
import CreateSpotModal from '../CreateSpotModal';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className='header'>
        <div className='home-logo'>
          <NavLink exact to="/" style={{ textDecoration: 'none' }}>
          <i className="fa-brands fa-airbnb fa-2xl"></i>
          <span className='home-text'> Fairbnb</span>
          </NavLink>
        </div>
        <div className='create-spot'>
          <button className='create-spot-button'>
            <OpenModalMenuItem
            itemText="Create New Spot"
            // onItemClick={closeMenu}
            modalComponent={<CreateSpotModal />}/>
          </button>
        </div>
        <div>
          {isLoaded && (
            <div className='profile-button'>
              <ProfileButton user={sessionUser} />
            </div>
          )}
        </div>
    </div>
  );
}

export default Navigation;
