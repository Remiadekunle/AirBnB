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
