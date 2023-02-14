import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { fetchSingleSpot} from '../../store/spots'
import './spotItem.css';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import EditSpotModal from "../EditSpotModal";
import DeleteSpotModal from "../DeleteSpotModal";
import {fetchreviews} from '../../store/reviews'
import ReviewIndex from "../ReviewIndexItem";
import CreateReviewModal from "../CreateReviewModal";
import DeleteReviewModal from "../DeleteReviewModal";
import ComingSoon from "../ComingSoon";
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import CalendarComponent from "../CalendarComponent";
import { fetchBookings } from "../../store/booking";
import ViewReservations from "../CalendarComponent/ViewCalendar";
import MapContainer from "../Maps";

function SpotIndex({isHome, setIsHome}) {
    const { spotId } = useParams()
    const spot = useSelector(state => state.spots.singleSpot)
    let user = useSelector(state => state.session.user)
    const [reviewdd, setReviewdd] = useState(false);
    let reviewed;
    let reviews = useSelector(state => state.reviews.spot)
    const dispatch = useDispatch();
    // console.log('test', SpotImages)
    useEffect(() => {

        dispatch(fetchSingleSpot(spotId))
        dispatch(fetchreviews(spotId))
        dispatch(fetchBookings(spotId))
        // dispatch(fetchSpots())

        // return () => dispatch(offLoadSpot(spot))
    }, [dispatch, spotId])

    if (!spot) return null
    const {name, SpotImages, description, price, Owner, city, state, country} = spot
    console.log('this is the spot',spot)

    console.log('spotImage', SpotImages)
    let mainImage = SpotImages.find(image => {
        return image.preview === true
    })

    const toggleReviewed = () => {
        console.log('clickling for the review')
        setReviewdd(!reviewdd)
    }

    if (!mainImage) mainImage = {url:'https://media.istockphoto.com/photos/beautiful-luxury-home-exterior-at-twilight-picture-id1026205392?b=1&k=20&m=1026205392&s=612x612&w=0&h=wChttFxmS4jrjBGOMWX597lrdVqHQvEqFrRaQi2rObk='}
    console.log('this is new image', mainImage)
    // if (SpotImages.length < 1){
    //     mainImage = 'https://media.istockphoto.com/id/1255835530/photo/modern-custom-suburban-home-exterior.jpg?s=612x612&w=0&k=20&c=0Dqjm3NunXjZtWVpsUvNKg2A4rK2gMvJ-827nb4AMU4='
    // } else {
    //     mainImage = SpotImages.find(spot => spot.preview === true).url
    // }
    if (!reviews) {
        console.log('bye this will stop the render')
        return null
    }
    reviews = Object.values(reviews)
    let totalStars = 0;
    let startCount = 0;
    reviews.forEach(review => {
        console.log('before count', totalStars)
        const star = parseInt(review.stars)
        console.log(star)
        totalStars += star
        startCount++
        console.log('after count' , totalStars)
    })
    console.log(totalStars, 'this', startCount)
    if (user){
        reviews.forEach(review => {
            if (review.userId === +user.id){
                // setReviewdd(true)
                reviewed = true
            }
        })
    }

    const rounded = (num) => {
        return Number.parseFloat(num).toFixed(1);
    }



    // if (!spots.allSpots){
    //     console.log('hello sir')
    //     setIsHome(false)
    // }

    // if (reviewed){
    //     setReviewdd(true)
    // }
    // if (!user) user = {}
    console.log('these are the reviews',reviews)
    console.log(mainImage)
    console.log(Owner)
    return (
        <div className="spot-page">
            <div>
                <div className="basic-info-container">
                    <h1>{name}</h1>
                    <i class="fa-solid fa-star fa-xs"></i>
                    <span>{totalStars ? rounded(totalStars/startCount) : 0}</span>
                    <span>{' · '}</span>
                    <span style={{textDecoration: 'underline'}}>{`${reviews.length} reviews`}</span>
                    <span>{' · '}</span>
                    <span>{`${city}, ${state}, ${country}`}</span>
                </div>
            </div>
            <div className="spot-images">
                <div className="image-border">
                    <img alt="house" className="mainImage" src={mainImage.url}></img>
                    {/* {SpotImages.map(image => (
                        <img alt="house" className="spotImage" src={`${image.url}`}></img>
                    ))} */}
                </div>
            </div>
            <div className="spot-description">


                <div className="spot-left-container">
                    <div className="spot-guests-container">
                        <div className="spot-guests">
                            <div id="picture-hosting">
                                <h2 id="hosting-message">{`Entire vaction spot hosted by ${Owner.firstName}`}</h2>
                                <div id="hosting-image-container">
                                    <img alt="profile" className="profile-picture" src="https://i.pinimg.com/originals/2b/9a/86/2b9a86cd82acb9924d3e80ff8b2201ee.jpg"></img>
                                </div>
                            </div>
                            <span>
                                {`6 guests · ${spot.beds} bedrooms · ${spot.baths} bathrooms`}
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
                            {'Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.'}
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

                        {'The amenities will go here'}
                    </div>
                </div>

                <div className="spot-rigth-container">
                    <div className="reserve-card">
                        <div className="reserve-booking">
                            <div>
                                <div className="reserve-price">
                                    {`$${price} night`}
                                </div>
                            </div>
                            <div className="reserve-stats">
                                <i class="fa-solid fa-star fa-xs"></i>
                                <span>{totalStars ? rounded(totalStars/startCount) : 0}</span>
                                <span>{' · '}</span>
                                <span style={{textDecoration: 'underline'}}>{`${reviews.length} reviews`}</span>
                            </div>
                        </div>
                        <div className="reserve-button-container">

                            <button id="reserve-button">
                                <OpenModalMenuItem itemText="Reserve Now" modalComponent={<CalendarComponent spot={spot} />} />
                            </button>
                            <button id="reserve-button">
                                <OpenModalMenuItem itemText="View Reservations" modalComponent={<ViewReservations spot={spot} />} />
                            </button>
                        </div>
                    </div>
                </div>

                </div>
            <div className="reviews-container">
                <div id="review-continer-stats">
                    <i class="fa-solid fa-star fa-xs"></i>
                    <span>{totalStars ? rounded(totalStars/startCount) : 0}</span>
                    <span>{' · '}</span>
                    <span>{`${reviews.length} reviews`}</span>
                </div>
                <div className="comments-container">
                    {reviews.map(review => (
                        <ReviewIndex review={review}/>
                    ))}
                </div>
                <div className="review-button-container">
                    {!reviewed? <button className="review-buttons"><OpenModalMenuItem
                        itemText="Create Review"
                        // onItemClick={closeMenu}
                        // onItemClick={toggleReviewed}
                        modalComponent={<CreateReviewModal toggleReviewed={toggleReviewed} spot={spot} />}/></button> : <button className="review-buttons"><OpenModalMenuItem
                        itemText="Delete Review"
                        // onItemClick={closeMenu}
                        onModalClose={() => setReviewdd(false)}
                        modalComponent={<DeleteReviewModal toggleReviewed={toggleReviewed} spot={spot} reviews={reviews} user={ user} setReviewdd={setReviewdd} />}/></button>}

                </div>

            </div>
            <div className="maps-container">
                <h2>
                    Where you'll be
                </h2>
                <MapContainer lat={spot.lat} lng={spot.lng} price={spot.price}/>
                <div>
                    {spot.description}
                </div>
            </div>
            <div className="user-container">
                <div>
                    <div className="user-profile-info">
                        <div id="user-profile-container">
                            <img alt="profile" className="profile-picture2" src="https://i.pinimg.com/originals/2b/9a/86/2b9a86cd82acb9924d3e80ff8b2201ee.jpg"></img>
                        </div>
                        <div id="user-name-joined">
                            <h2>{`Hosted by ${Owner.firstName}`}</h2>
                            <div>{'Joined in December 2022'}</div>
                        </div>
                    </div>
                    <div>
                        <div className="user-facts">
                            <i class="fa-solid fa-shield"></i>
                            <span>Identity verified</span>
                        </div>
                        <div id="user-container-buttons">
                            <button className="contact-host"> <OpenModalMenuItem
                            itemText="Contact Host"
                            // onItemClick={closeMenu}
                            modalComponent={<ComingSoon spot={spot} feature={'Contact Host'}/>}/></button>
                        </div>
                    </div>
                </div>

                <div id="protection-info-container">
                    <div id="protection-logo-description">
                        <i class="fa-solid fa-lock fa-xl"></i>
                        <div id="protection-info">
                            To protect your payment, never transfer money or communicate through FairBnB as this is a clone website of AirBnB.
                        </div>
                    </div>
                    <div className="spot-edit-buttons">
                        {user && (user.id === +spot.ownerId) ? <><button className="review-buttons" >
                        <OpenModalMenuItem
                            itemText="Edit Spot"
                            // onItemClick={closeMenu}
                            modalComponent={<EditSpotModal spot={spot} />}/>
                        </button>
                        <button className="review-buttons" >
                        <OpenModalMenuItem
                            itemText="Delete Spot"
                            // onItemClick={closeMenu}
                            // onModalClose={() => setIsHome(true)}
                            modalComponent={<DeleteSpotModal spot={spot} setIsHome={setIsHome} />}/>
                        </button></> : ''}
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <h2>Things to Know</h2>
                </div>
                <div id="spot-rules">
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
            </div>
        </div>
    )
}

export default SpotIndex
