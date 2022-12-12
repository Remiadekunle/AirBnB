import './homePage.css';


export function SpotIndex( {spot} ){
    let { city, state, price, name, avgRating, previewImage} = spot

    if (typeof avgRating === 'string'){
        avgRating = 'NEW'
    }

    console.log(previewImage[0])
    if (previewImage[0] === 'N'){
        previewImage = 'https://st.depositphotos.com/1658611/2932/i/950/depositphotos_29329143-stock-photo-street-of-residential-houses.jpg'
    }

    return (
        <div className="home-Card">
            <div className='img-border' >
                <img alt='' className='preview-img'  src={`${previewImage}` }></img>
            </div>
            <div className='spot-contents'>
                <div className='rating-location'>
                    {`${city}, ${state}`}
                    <div className='rating'>{avgRating}</div>

                </div>
                <span className='card-info'>
                {name}
                </span>
                <div className='card-price'>
                {`$${price} night`}
                </div>
            </div>
        </div>
    )
}

export default SpotIndex
