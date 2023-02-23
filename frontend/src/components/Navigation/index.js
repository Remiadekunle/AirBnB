import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import OpenModalMenuItem from "./OpenModalMenuItem";
import CreateSpotModal from "../CreateSpotModal";
import { getSearch } from "../../store/search";
import { filterSpot, loadCache, loadSpots, validateAddress } from "../../store/spots";
import FilterComponent from "./filter";
import SearchResultIndex from "./SearchResults";


function Navigation({ isLoaded, isHome, setIsHome, setIsFiltered }) {
  const sessionUser = useSelector((state) => state.session.user);
  const key = useSelector((state) => state.maps.key);
  const dispatch = useDispatch();
  const [isModal, setIsModal] = useState(false);
  const spots = useSelector(state => state.spots.searchArr);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([])
  const [showSearchMenu, setShowSearchMenu] = useState(false)
  const [selected, setSelected] = useState('')
  const searchRef = useRef()
  const toggleNav = () => {

    setIsHome(true);
    setSelected('')
    setSearch('')
    setIsFiltered(false)
    dispatch(loadCache())
  };

  useEffect(() => {
    if(!showSearchMenu) return
    const closeMenu = (e) => {
      // console.log('we ran')
      if (!searchRef.current?.contains(e.target)) {
        setShowSearchMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [showSearchMenu])
  let filterStyle
  useEffect(() => {
    filterStyle = document.body.scrollTop ? {borderBottom: '0.1px solid #EBEBEB'}: {}
  });
  const placeholder = !isHome
    ? isModal
      ? "header4"
      : "header2"
    : isModal
    ? "header3"
    : "header";


  const handleSearch = async (e) => {
    e.preventDefault();
    if (search.trim().length < 1) return
    const body = await dispatch(getSearch(search));
    dispatch(loadSpots({"Spots": body}))
  };

  const handleFilter = (filter, reverse) => {


    dispatch(filterSpot(filter, reverse));
    setIsFiltered(true);
  };
  // const payload = {
  //   address: {
  //       regionCode: 'US',
  //       locality: 'Union City',
  //       addressLines: ['33097 Calistoga']
  //   },
  // }

  // validateAddress(payload, key)

  const handleSearchResults = () => {
    // console.log('we actually got the product here', products)
    const res = spots.filter(spot => {
      if (spot.name?.toLowerCase().includes(search.toLowerCase())){
        return true
      }
      else if (spot.description?.toLowerCase().includes(search.toLowerCase())) return true
      return false
    })
    setSearchResults(res)
  }


  const handleSearchToggle = () => {
    if (search.trim().length < 1) return
    console.log('firing in the handleSearchToggle')
    setShowSearchMenu(true)
  }

  const modalClassName = !isHome ? "header2" : "header";

  return (
    <div className={modalClassName}>
      <div
        className={isHome ? "reg-header-container" : "reg-header-container2"}
      >
        <div
          style={{
            padding: "10px 4.5%",
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
            height: '60px',
          }}
        >
          <div className="home-logo">
            <NavLink
              exact
              to="/"
              onClick={toggleNav}
              style={{ textDecoration: "none" }}
            >
              <i className="fa-brands fa-airbnb fa-2xl"></i>
              <span className="home-text"> Fairbnb</span>
            </NavLink>
          </div>
          <div style={{position: 'relative'}} ref={searchRef}>
            <form className="search-form" onSubmit={handleSearch}>
              <input
              onClick={handleSearchToggle}
                onChange={(e) => {
                  setSearch(e.target.value)
                  handleSearchResults()
                  setShowSearchMenu(true)
                }}
                className="search-input"
                placeholder="Search for your dream spot"
                value={search}
              ></input>
              <button className="search-input-button" type="submit"><i class="fa-solid fa-magnifying-glass search-input-icon"></i></button>
            </form>
              <div className='spot-search'  style={{boxShadow: !showSearchMenu?  'none' : '0px -2px 2px 4px rgba(0, 0, 255, .2)'}}>
                {showSearchMenu ?
                  <div style={{paddingTop: '10px'}}>
                    {searchResults.length < 1 ? <div className='search-menu-results-no-results'>No Results</div> : <></>}
                    {searchResults.map(item => (
                      <SearchResultIndex spot={item} showSearchMenu={showSearchMenu} setSearch={setSearch} setShowSearchMenu={setShowSearchMenu} />
                    ))}
                  </div>

                  : <></> }
              </div>
          </div>
          <div className="profile-container2">
            <div className="create-spot">
                <button className="create-spot-button">
                  <OpenModalMenuItem
                    itemText="Create New Spot"
                    // onItemClick={closeMenu}
                    modalComponent={
                      <CreateSpotModal setIsFiltered={setIsFiltered} sessionUser={sessionUser} />
                    }
                  />
                </button>
            </div>
            <div>
              {isLoaded && (
                <div className="profile-button">
                  <ProfileButton
                    isHome={isHome}
                    setIsHome={setIsHome}
                    user={sessionUser}
                    isModal={isModal}
                    setIsModal={setIsModal}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {isHome ? (
        <FilterComponent setSearch={setSearch} setIsFiltered={setIsFiltered} selected={selected} setSelected={setSelected}/>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Navigation;
