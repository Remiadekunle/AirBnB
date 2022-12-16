import { NavLink } from 'react-router-dom';
import './homePage.css';


export function SpotIndex( {spot, isHome, setIsHome} ){
    let { id, city, state, price, name, avgRating, previewImage} = spot

    const rounded = (num) => {
        return Number.parseFloat(num).toFixed(1);
    }
    // console.log(rounded(5.333333333333333))
    // console.log(previewImage[0])
    if (previewImage && previewImage[0] === 'N'){
        previewImage = 'https://st.depositphotos.com/1658611/2932/i/950/depositphotos_29329143-stock-photo-street-of-residential-houses.jpg'
    }

    const toggleNav = () => {
        setIsHome(false)
      }

    return (
        <NavLink className={'spot-card-container'} onClick={toggleNav} key={name} to={`/spots/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="home-Card">
                <div className='img-border' >
                    <img  alt='' className='preview-img'  src={`${previewImage}` }></img>
                </div>
                <div className='spot-contents'>
                    <div className='rating-location'>
                        {`${city}, ${state}`}
                        <div className='rating'>
                            <i id='card-stars' class="fa-solid fa-star fa-xs"></i>
                            <div >{typeof avgRating === 'number' ? rounded(avgRating) : 'NEW'}</div>
                        </div>

                    </div>
                    <span className='card-info'>
                    {name}
                    </span>
                    <div className='card-price'>
                    {`$${price} night`}
                    </div>
                </div>
            </div>
        </NavLink>
    )
}

export default SpotIndex
