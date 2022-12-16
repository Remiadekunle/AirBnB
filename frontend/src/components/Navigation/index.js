import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import OpenModalMenuItem from './OpenModalMenuItem';
import CreateSpotModal from '../CreateSpotModal';

function Navigation({ isLoaded, isHome, setIsHome }){
  const sessionUser = useSelector(state => state.session.user);
  const spot = useSelector(state => state.spots.singleSpot)
  // const [isHome, setIsHome] = useState(true);

  const toggleNav = () => {
    console.log('clicked')
    setIsHome(true)
  }

  return (
    <div className={!isHome? 'header2' :'header'}>
        <div  className='home-logo'>
          <NavLink exact to="/" onClick={toggleNav} style={{ textDecoration: 'none' }}>
          <i className="fa-brands fa-airbnb fa-2xl"></i>
          <span className='home-text'> Fairbnb</span>
          </NavLink>
        </div>
        <div className='profile-container2'>
          <div className='create-spot'>
            {(sessionUser && sessionUser.id) && (<button className='create-spot-button'>
              <OpenModalMenuItem
              itemText="Create New Spot"
              // onItemClick={closeMenu}
              modalComponent={<CreateSpotModal />}/>
            </button>)}
          </div>
          <div>
            {isLoaded && (
              <div className='profile-button'>
                <ProfileButton user={sessionUser} />
              </div>
            )}
          </div>
        </div>
    </div>
  );
}

export default Navigation;
