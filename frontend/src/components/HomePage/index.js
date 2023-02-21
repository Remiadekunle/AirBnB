import { fetchSpots } from "../../store/spots"
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import SpotIndex from "./spotIndex";
import './homePage.css';
import { NavLink } from "react-router-dom";
import Maps from '../Maps/Maps'
import MapContainer from "../Maps";

export function Home({isHome, setIsHome, isFiltered}) {
    const dispatch = useDispatch();
    const initialSpots = useSelector(state => state.spots.allSpots);
    const filteredSpots = useSelector(state => state.spots.filter?.spots)
    useEffect(() => {
        dispatch(fetchSpots())
    }, [dispatch])

    if (Object.keys(initialSpots).length < 1){

        return(
            <div style={{ width: '100%', height: '70vh', display: 'flex', flexDirection: 'column', fontSize: '32px', margin: '0 auto', justifyContent: 'center', alignItems: 'center'}}>
              No spots found
            </div>
          )
    }
    const spots = Object.values(initialSpots)



    return (
        <div style={{width: '100%'}}>
            <div className="home-page-container">
                <div className="home-page">
                    { !isFiltered?
                        spots.map(spot => (
                            <SpotIndex isHome={isHome} setIsHome={setIsHome} spot={spot} />
                        )) : filteredSpots?.map(spot => (
                            <SpotIndex isHome={isHome} setIsHome={setIsHome} spot={spot} />
                        ))
                    }
                </div>
            </div>
            {/* <button>Show map</button> */}
            <div className="footer">
                <div style={{display: 'flex', justifyContent: 'space-between', width: '90%', margin: '0 auto'}}>
                    <div className="app-copyright">
                        <i class="fa-regular fa-copyright fa-xs"></i>
                        <div>
                            {new Date().getFullYear()} Fairbnb,Inc.
                        </div>
                    </div>
                    <div id="coding-components">
                        <span>React</span>
                        <span>{' · '}</span>
                        <span>Redux</span>
                        <span>{' · '}</span>
                        <span>JavaScript</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
