import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { fetchSingleSpot} from '../../store/spots'
import './spotItem.css';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import CreateSpotModal from '../CreateSpotModal';
import EditSpotModal from "../EditSpotModal";
import DeleteSpotModal from "../DeleteSpotModal";

function SpotIndex() {
    const { spotId } = useParams()
    const spot = useSelector(state => state.spots.singleSpot)
    const dispatch = useDispatch();
    // console.log('test', SpotImages)
    useEffect(() => {

        dispatch(fetchSingleSpot(spotId))
    }, [dispatch, spotId])

    if (!spot) return null
    const {name, SpotImages, description, price, Owner, city, state, country, avgStarRating, numReviews} = spot
    console.log('this is the spot',spot)

    console.log('spotImage', SpotImages)
    let mainImage;
    if (SpotImages.length < 1){
        mainImage = 'https://media.istockphoto.com/id/1255835530/photo/modern-custom-suburban-home-exterior.jpg?s=612x612&w=0&k=20&c=0Dqjm3NunXjZtWVpsUvNKg2A4rK2gMvJ-827nb4AMU4='
    } else {
        mainImage = SpotImages.find(spot => spot.preview === true).url
    }
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
                    <img alt="house" className="mainImage" src={mainImage}></img>
                    {SpotImages.map(image => (
                        <img alt="house" className="spotImage" src={`${image.url}`}></img>
                    ))}
                </div>
            </div>
            <div className="spot-description">
                <div className="reserve-card">
                    <div className="reserve-booking">
                        <div>
                            <div className="reserve-price">
                                {`$${price} night`}
                                <div className="reserve-stats">
                                    <i class="fa-solid fa-star fa-xs"></i>
                                    <span>{avgStarRating}</span>
                                    <span>{' · '}</span>
                                    <span style={{textDecoration: 'underline'}}>{`${numReviews} reviews`}</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                        {'this is where bookings go'}
                    </div>
                </div>
                <div className="spot-guests-container">
                    <div className="spot-guests">
                        <img alt="profile" className="profile-picture" src="https://i.pinimg.com/originals/2b/9a/86/2b9a86cd82acb9924d3e80ff8b2201ee.jpg"></img>
                        <h2 id="hosting-message">{`Entire vaction spot hosted by ${Owner.firstName}`}</h2>
                        <span>
                            {`6 guests 4 bedrooms 3 baths`}
                        </span>
                    </div>
                </div>
                <div className="spot-extra-info">
                    <div className="spot-perks">
                        <i class="fa-solid fa-book"></i>
                        <span>{'Dedicated workspace'}</span>
                    </div>
                    <div className="spot-perks">
                        <i class="fa-solid fa-door-open"></i>
                        <span>{'Self check-in'}</span>
                    </div>
                    <div className="spot-perks">
                        <i class="fa-solid fa-dumbbell"></i>
                        {'Indoor Gym and Pool'}
                    </div>
                </div>
                <div className="description-container">
                    <div>
                        {description}
                    </div>
                </div>
                <div className="amenities-container">
                    <h2> What this place offers</h2>
                    <div>Wifi</div>
                    <div>Free parking on premises</div>
                    <div>Gym</div>
                    <div>Kitchen</div>
                    <div>Patio or balcony</div>
                    <div>Backyard</div>
                    {'The amenities will go here'}
                </div>
            </div>
            <div className="reviews-container">
                    {'The reviews will go here'}
            </div>
            <div className="user-container">
                <div>
                <img alt="profile" className="profile-picture" src="https://i.pinimg.com/originals/2b/9a/86/2b9a86cd82acb9924d3e80ff8b2201ee.jpg"></img>
                <h2>{`Hosted by ${Owner.firstName}`}</h2>
                <span>Identity verified</span>
                <button> Contact Host</button>
                <div> To protect your payment, never transfer money or communicate through FairBnB as this is a clone website of AirBnB.</div>
                {'The user info will go here'}
                </div>
                <button>
                <OpenModalMenuItem
                    itemText="Edit Spot"
                    // onItemClick={closeMenu}
                    modalComponent={<EditSpotModal spot={spot} />}/>
                </button>
                <button>
                <OpenModalMenuItem
                    itemText="Delete Spot"
                    // onItemClick={closeMenu}
                    modalComponent={<DeleteSpotModal spot={spot} />}/>
                </button>
            </div>
            <div>
                <div>
                    <h3>House rules</h3>
                </div>
                <div>
                    <h3>Safety & property</h3>
                </div>
                <div>
                    <h3> Cancellation policy</h3>
                </div>
            </div>
            <div className="footer">
                <div>Placeholder</div>
            </div>
        </div>
    )
}

export default SpotIndex
