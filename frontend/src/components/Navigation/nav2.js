import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import OpenModalMenuItem from "./OpenModalMenuItem";
import CreateSpotModal from "../CreateSpotModal";
import { getSearch } from "../../store/search";
import { filterSpot } from "../../store/spots";
import ProfileButton2 from "./ProfileButton2";

function NavigationSpot({ isLoaded, isHome, setIsHome, setIsFiltered }) {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const [isModal, setIsModal] = useState(false);
  const [search, setSearch] = useState("");
  const toggleNav = () => {

    setIsHome(true);
  };
  const placeholder = !isHome
    ? isModal
      ? "header4"
      : "header2"
    : isModal
    ? "header3"
    : "header";


  const handleSearch = async (e) => {
    e.preventDefault();
    await dispatch(getSearch(search));
  };

  const handleFilter = (filter, reverse) => {

    dispatch(filterSpot(filter, reverse));
    setIsFiltered(true);
  };

  const modalClassName =  "header2";

  return (
    <div className={modalClassName}>
      <div
        className={"reg-header-container2"}
      >
        <div
          style={{
            padding: "10px 4.5%",
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
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
          <div className="profile-container2">
            <div className="create-spot">
              {sessionUser && sessionUser.id && (
                <button className="create-spot-button">
                  <OpenModalMenuItem
                    itemText="Create New Spot"
                    // onItemClick={closeMenu}
                    modalComponent={
                      <CreateSpotModal sessionUser={sessionUser} setIsFiltered={setIsFiltered} />
                    }
                  />
                </button>
              )}
            </div>
            <div>
              {isLoaded && (
                <div className="profile-button">
                  <ProfileButton2
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
    </div>
  );
}

export default NavigationSpot;
