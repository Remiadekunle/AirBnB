import { fetchSpots } from "../../store/spots"
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import SpotIndex from "./spotIndex";
import './homePage.css';

export function Home() {
    const dispatch = useDispatch();
    const initialSpots = useSelector(state => state.spots);

    useEffect(() => {
        dispatch(fetchSpots())
    }, [dispatch])

    if (Object.keys(initialSpots).length < 1){
        return null
    }
    const spots = Object.values(initialSpots.allSpots)

    return (
        <div>
            <div className="home-page">
                {
                    spots.map(spot => (
                        <SpotIndex spot={spot}/>
                    ))
                }
            </div>
            <div className="footer">
                TESTING
                <div>TEST 2</div>
            </div>
        </div>
    )
}

export default Home
