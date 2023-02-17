import { useSelector } from 'react-redux'
import CreateReviewModal from '../CreateReviewModal'
import DeleteReviewModal from '../DeleteReviewModal'
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem'
import './index.css'
function ReviewIndex({review}){

    console.log(review.User)

    const monthFinder = (num) => {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August'
        , 'September', 'October', 'November', 'December']

        return months[num]
    }


    if (review.id === 'dummy'){
        // return (
        //     <div>
        //         No Reviews
        //     </div>
        // )
        return
    }

    const {createdAt} = review
    const timeStats = createdAt.split('-')
    const testDate = new Date(createdAt)
    const year = testDate.getFullYear()
    const month = monthFinder(testDate.getMonth())
    return (
        <div className='review-container'>
            <div className='profile-container'>
                <img  className="profile-pic" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png"></img>
                <div>
                    <div>{review.User.firstName}</div>
                    <div>{`${month} ${year}`}</div>
                </div>
            </div>
            {review.review}
        </div>
    )
}

export default ReviewIndex


export function AllReviews({ReviewIndex, reviews, reviewed, toggleReviewed, spot, setReviewdd, user}){
    const isReviewed = useSelector(state => state.reviews.reviewed)

   
    console.log('yo whats the reviewed', isReviewed)
    return(
        <div style={{width: '50vw', height: '70vh', display: 'flex', padding: '20px', overflow: 'hidden',}}>
            <div className='all-reviews-container' style={{display: reviews.length < 1 ? 'none' : 'flex'}}>
                {reviews.map(review => (
                    <ReviewIndex review={review}/>
                ))}
            </div>
            <div style={{width: '100%', fontSize: '24px', justifyContent: 'center', height: '60vh', display: reviews.length < 1 ? 'flex' : 'none', padding: '20px', overflow: 'hidden', alignItems: 'center'}}>
                No reviews
            </div>
            <div style={{position: 'absolute', bottom: '2%', right: '2%'}}>
                {!isReviewed? <button className="review-buttons"><OpenModalMenuItem
                            itemText="Create Review"
                            // onItemClick={closeMenu}
                            // onItemClick={toggleReviewed}
                            modalComponent={<CreateReviewModal toggleReviewed={toggleReviewed} spot={spot} />}/></button> : <button className="review-buttons"><OpenModalMenuItem
                            itemText="Delete Your Review"
                            // onItemClick={closeMenu}
                            onModalClose={() => setReviewdd(false)}
                            modalComponent={<DeleteReviewModal toggleReviewed={toggleReviewed} spot={spot} reviews={reviews} user={ user} setReviewdd={setReviewdd} />}/>
                    </button>}
            </div>
        </div>
    )
}
