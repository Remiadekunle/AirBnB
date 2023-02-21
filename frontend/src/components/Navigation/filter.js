import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import OpenModalMenuItem from "./OpenModalMenuItem";
import CreateSpotModal from "../CreateSpotModal";
import { getSearch } from "../../store/search";
import { filterSpot, loadCache, loadSpots, validateAddress } from "../../store/spots";


function FilterComponent({setSearch, setIsFiltered}){
    const [selected, setSelected] = useState('')
    const dispatch = useDispatch();
    let filterStyle
    useEffect(() => {
        filterStyle = document.body.scrollTop ? {borderBottom: '0.1px solid #EBEBEB'}: {}

    });

    const handleFilter = (filter, reverse) => {


        dispatch(filterSpot(filter, reverse));
        setIsFiltered(true);
    };

    return(
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
              onClick={() => {
                handleFilter("price", true)
                setSelected('priceDecr')
            }}
              className="search-filter-buttons"
              style={{borderBottom: selected === 'priceDecr' ? '1px solid black' : '0px'}}
            >
              <div>
                {/* <i class="fa-solid fa-dollar-sign fa-2xl"></i> */}
                <i class="fa-solid fa-money-bill-wave fa-2xl"></i>
              </div>
              <div>Highest Price</div>
            </button>
            <button
              onClick={() => {
                handleFilter("price", false)
                setSelected('priceIncr')
            }}
              className="search-filter-buttons"
              style={{borderBottom: selected === 'priceIncr' ? '1px solid black' : '0'}}
            >
              <div>
                {/* <i class="fa-solid fa-dollar-sign fa-2xl"></i> */}
                <i class="fa-solid fa-money-bill-wave fa-2xl"></i>
              </div>
              <div>Lowest Price</div>
            </button>
            <button
              onClick={() => {
                handleFilter("avgRating", true)
                setSelected('ratings')
            }}
              className="search-filter-buttons"
              style={{borderBottom: selected === 'ratings' ? '1px solid black' : '0'}}
            >
              <div>
                <i class="fa-solid fa-star fa-2xl filter-star"></i>
              </div>
              <div>Ratings</div>
            </button>
            <button
              onClick={() => {
                handleFilter("isTrendy", true)
                setSelected('trendy')
            }}
              className="search-filter-buttons"
              style={{borderBottom: selected === 'trendy' ? '1px solid black' : '0'}}
            >
              <div>
                <i class="fa-solid fa-fire fa-2xl"></i>
              </div>
              <div>Trendy</div>
            </button>
            <button
              onClick={() => {
                handleFilter("createdAt", true)
                setSelected('create')
            }}
              className="search-filter-buttons stars-special"
              style={{borderBottom: selected === 'create' ? '1px solid black' : '0'}}
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
              onClick={() => {
                handleFilter("createdAt", false)
                setSelected('oldest')
            }}
              className="search-filter-buttons"
              style={{borderBottom: selected === 'oldest' ? '1px solid black' : '0'}}
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
                setSearch('')
                setSelected('')
            }}
            className="search-filter-buttons"
            >
            <div>
                {/* <i class="fa-solid fa-shuffle fa-2xl"></i> */}
                <i class="fa-solid fa-arrows-spin fa-2xl"></i>
            </div>
            <div>Reset</div>
            </button>

            <a style={{ borderBottom: '0.1px solid #EBEBEB', textDecoration: 'none' }}  className="about-links-a" href="https://github.com/Remiadekunle">
                <button
                onClick={() => {

                }}
                className="search-filter-buttons"
                >
                <div>
                    {/* <i class="fa-solid fa-shuffle fa-2xl"></i> */}
                    <i class="fa-brands fa-github fa-2xl"></i>
                </div>
                <div>Github</div>
                </button>
            </a>
            <a style={{ borderBottom: '0.1px solid #EBEBEB', textDecoration: 'none' }} className="about-links-a" href="https://www.linkedin.com/in/remi-adekunle-28b989138/">
                <button
                onClick={() => {
                }}
                className="search-filter-buttons"
                >
                <div>
                    {/* <i class="fa-solid fa-shuffle fa-2xl"></i> */}
                    <i class="fa-brands fa-linkedin fa-2xl"></i>
                </div>
                <div>LinkedIn</div>
                </button>
            </a>
          </div>
        </div>
    )
}

export default FilterComponent
