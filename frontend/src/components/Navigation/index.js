import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import OpenModalMenuItem from './OpenModalMenuItem';
import CreateSpotModal from '../CreateSpotModal';

function Navigation({ isLoaded, isHome, setIsHome}){
  const sessionUser = useSelector(state => state.session.user);
  const [isModal, setIsModal] = useState(false);
  const toggleNav = () => {
    console.log('clicked')
    setIsHome(true)
  }
  const placeholder = (!isHome? (isModal ? 'header4' : 'header2') :(isModal ? 'header3': 'header'))
  console.log(placeholder)

  const modalClassName = (!isHome? 'header2' :'header')

  return (
    <div className={modalClassName}>
      <div className={isHome ? 'reg-header-container' : 'reg-header-container2'} >
        <div style={{padding: '10px 4.5%', display: 'flex', justifyContent: "space-between", width: '100%', alignItems: 'center'}}>
          <div className='home-logo'>
            <NavLink exact to="/" onClick={toggleNav} style={{ textDecoration: 'none' }}>
            <i className="fa-brands fa-airbnb fa-2xl"></i>
            <span className='home-text'> Fairbnb</span>
            </NavLink>
          </div>
          <form>
            <input className='search-input' placeholder='Search'></input>
          </form>
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
                  <ProfileButton isHome={isHome} setIsHome={setIsHome} user={sessionUser} isModal={isModal} setIsModal={setIsModal} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {isHome? <div className="search-filter-container">
          <div style={{display: 'flex', alignItems: 'center', gap: '30px', padding: '0px 4.5%'}}>
              <button className="search-filter-buttons"><i class="fa-solid fa-dollar-sign fa-2xl"></i></button>
              <button className="search-filter-buttons"><i class="fa-solid fa-people-group fa-2xl"></i></button>
              <button className="search-filter-buttons"><i class="fa-solid fa-fire fa-2xl"></i></button>
              <button className="search-filter-buttons"><i class="fa-solid fa-key fa-2xl"></i></button>
              <button className="search-filter-buttons"><i class="fa-solid fa-shuffle fa-2xl"></i></button>
          </div>
      </div> : <></>}

    </div>
  );
}

export default Navigation;
