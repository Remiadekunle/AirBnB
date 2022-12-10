import './homePage.css';

export function SpotIndex( {spot} ){
    return (
        <div className="home-Card">
            {spot.id}
            <img alt='' className='preview-img'  src={`${spot.previewImage}` }></img>
        </div>
    )
}

export default SpotIndex
