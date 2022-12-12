import './homePage.css';

export function SpotIndex( {spot} ){
    const { city, state, price, name, avgRating} = spot

    // if (typeof avgRating !== 'number'){
    //     avgRating = 'NEW'
    // }

    return (
        <div className="home-Card">
            <div className='img-border' >
                <img alt='' className='preview-img'  src={`${spot.previewImage}` }></img>
            </div>
            <div className='spot-contents'>
                <div className='rating-location'>
                    <span> {`${city}, ${state}`}</span>
                    <div className='rating'>{avgRating}</div>
                </div>
                <span className='card-info'>
                {name}
                </span>
                <span>
                {`$${price} night`}
                </span>
            </div>
        </div>
    )
}

export default SpotIndex
