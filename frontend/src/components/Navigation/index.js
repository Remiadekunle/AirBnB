import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import OpenModalMenuItem from "./OpenModalMenuItem";
import CreateSpotModal from "../CreateSpotModal";
import { getSearch } from "../../store/search";
import { filterSpot, loadCache, loadSpots } from "../../store/spots";


function Navigation({ isLoaded, isHome, setIsHome, setIsFiltered }) {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const [isModal, setIsModal] = useState(false);
  const [search, setSearch] = useState("");
  const toggleNav = () => {
    console.log("clicked");
    setIsHome(true);
  };
  let filterStyle
  useEffect(() => {
    filterStyle = document.body.scrollTop ? {borderBottom: '0.1px solid #EBEBEB'}: {}
    console.log('we are running indeed', filterStyle, document.body.scrollTop)
  });
  const placeholder = !isHome
    ? isModal
      ? "header4"
      : "header2"
    : isModal
    ? "header3"
    : "header";
  console.log(placeholder);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (search.trim().length < 1) return
    const body = await dispatch(getSearch(search));
    dispatch(loadSpots({"Spots": body}))
  };

  const handleFilter = (filter, reverse) => {
    console.log("clicked");

    dispatch(filterSpot(filter, reverse));
    setIsFiltered(true);
  };

  console.log('this is the windown heigh', window.screenTop)
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
          <form className="search-form" onSubmit={handleSearch}>
            <input
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
              placeholder="Search for your dream spot"
              value={search}
            ></input>
            <button className="search-input-button" type="submit"><i class="fa-solid fa-magnifying-glass search-input-icon"></i></button>
          </form>
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
        <div style={filterStyle} className="search-filter-container">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "30px",
              padding: "0px 4.5%",
              height: '100%',
              width: '100%',
              justifyContent: 'space-between'
            }}
          >
            <button
              onClick={() => handleFilter("price", true)}
              className="search-filter-buttons"
            >
              <div>
                {/* <i class="fa-solid fa-dollar-sign fa-2xl"></i> */}
                <i class="fa-solid fa-money-bill-wave fa-2xl"></i>
              </div>
              <div>Highest Price</div>
            </button>
            <button
              onClick={() => handleFilter("price", false)}
              className="search-filter-buttons"
            >
              <div>
                {/* <i class="fa-solid fa-dollar-sign fa-2xl"></i> */}
                <i class="fa-solid fa-money-bill-wave fa-2xl"></i>
              </div>
              <div>Lowest Price</div>
            </button>
            <button
              onClick={() => handleFilter("guests", true)}
              className="search-filter-buttons"
            >
              <div>
                <i class="fa-solid fa-people-group fa-2xl"></i>
              </div>
              <div>Guests</div>
            </button>
            <button
              onClick={() => handleFilter("baths", true)}
              className="search-filter-buttons"
            >
              <div>
                <i class="fa-solid fa-bath fa-2xl"></i>
              </div>
              <div>Baths</div>
            </button>
            <button
              onClick={() => handleFilter("beds", true)}
              className="search-filter-buttons"
            >
              <div>
                <i class="fa-solid fa-bed fa-2xl"></i>
              </div>
              <div>Beds</div>
            </button>
            <button
              onClick={() => handleFilter("avgRating", true)}
              className="search-filter-buttons"
            >
              <div>
                <i class="fa-solid fa-star fa-2xl filter-star"></i>
              </div>
              <div>Ratings</div>
            </button>
            <button
              onClick={() => handleFilter("isTrendy", true)}
              className="search-filter-buttons"
            >
              <div>
                <i class="fa-solid fa-fire fa-2xl"></i>
              </div>
              <div>Trendy</div>
            </button>
            <button
              onClick={() => handleFilter("createdAt", true)}
              className="search-filter-buttons stars-special"
            >
              <div className="stars-contianer-search">
                {/* <i class="fa-solid fa-clock fa-2xl"></i> */}
                <div style={{display: 'flex', justifyContent: 'space-around', marginBottom: '10px', width: '100%'}}>
                  <i class="fa-solid fa-star fa-2xs filter-star"></i>
                  <i class="fa-solid fa-star fa-2xs filter-star"></i>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '5px', width: '100%'}}>
                  <i class="fa-solid fa-star fa-2xs filter-star"></i>
                  <i class="fa-solid fa-star fa-2xs filter-star"></i>
                  <i class="fa-solid fa-star fa-2xs filter-star"></i>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-around', marginTop: '5px', width: '100%'}}>
                  <i class="fa-solid fa-star fa-2xs filter-star"></i>
                  <i class="fa-solid fa-star fa-2xs filter-star"></i>
                </div>
              </div>
              <div>Newest</div>
            </button>
            <button
              onClick={() => handleFilter("createdAt", false)}
              className="search-filter-buttons"
            >
              <div>
              <i class="fa-solid fa-clock fa-2xl"></i>
              </div>
              <div>Oldest</div>
            </button>

            <button
              onClick={() => {
                setIsFiltered(false)
                dispatch(loadCache())
                console.log('what is the search length', search)
                setSearch('')
              }}
              className="search-filter-buttons"
            >
              <div>
                {/* <i class="fa-solid fa-shuffle fa-2xl"></i> */}
                <i class="fa-solid fa-arrows-spin fa-2xl"></i>
              </div>
              <div>Reset</div>
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Navigation;
