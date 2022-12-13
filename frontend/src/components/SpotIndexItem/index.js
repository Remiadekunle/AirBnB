import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import {loadSpot, fetchSingleSpot} from '../../store/spots'
import './spotItem.css';


function SpotIndex() {
    const { spotId } = useParams()
    const spot = useSelector(state => state.spots.singleSpot)
    const dispatch = useDispatch();
    // console.log('test', SpotImages)
    useEffect(() => {
        dispatch(fetchSingleSpot(spotId))
    }, [dispatch])

    if (!spot) return null
    const {name, SpotImages, description, price, Owner, previewImage, city, state, country} = spot
    console.log(SpotImages)
    const mainImage = SpotImages.find(spot => spot.preview === true).url
    console.log(mainImage)
    console.log(Owner)
    return (
        <div className="spot-page">
            <div>
                <div>
                    <h1>{name}</h1>
                    <span>{`${city}, ${state}, ${country}`}</span>
                </div>
            </div>
            <div className="spot-images">
                <div className="image-border">
                    <img className="mainImage" src={mainImage}></img>
                    {SpotImages.map(image => (
                        <img className="spotImage" src={`${image.url}`}></img>
                    ))}
                </div>
            </div>
            <div className="spot-description">
                <div className="reserve-card">
                    <div className="reserve-booking">
                        <div>
                            <div>
                                {`$${price} night`}
                            </div>
                        </div>
                        {'this is where bookings go'}
                    </div>
                </div>
                <div className="spot-guests-container">
                    <div className="spot-guests">
                        <img className="profile-picture" src="https://i.pinimg.com/originals/2b/9a/86/2b9a86cd82acb9924d3e80ff8b2201ee.jpg"></img>
                        <h2>{`Entire vaction spot hosted by ${Owner.firstName}`}</h2>
                        <span>
                            {`6 guests 4 bedrooms 3 baths`}
                        </span>
                    </div>
                </div>
            </div>
            <div></div>
            <div></div>
        </div>
    )
}

export default SpotIndex
