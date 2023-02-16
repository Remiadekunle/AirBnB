import { csrfFetch } from "./csrf"

const LOAD_REVIEWS = 'reviews/loadReviews'

const ADD_REVIEW = 'reviews/addReview'

const DELETE_REVIEW = 'reviews/deleteReview'

const SET_REVIEWED = 'reviews/setReviewed'
const SET_REVIEWED_FALSE = 'reviews/setReviewedFalse'

export const loadReviews = (reviews) => {
    return {
        type: LOAD_REVIEWS,
        reviews
    }
}

export const addReview = (review) => {
    return {
        type: ADD_REVIEW,
        review
    }
}

export const deleteReview = (review) => {
    return {
        type: DELETE_REVIEW,
        review
    }
}

export const setReviewed = () => {
    return{
        type: SET_REVIEWED
    }
}
export const setReviewedFalse = () => {
    return{
        type: SET_REVIEWED_FALSE
    }
}

export const checkIfReviewed = (id, reviews, dispatch) => {
    console.log('yyyyyyyyyyyyyyyyyyyyy we ran')
    console.log('what are the reviews here plz again', reviews, id)
    reviews.Reviews.forEach(review => {
        // console.log('MMMMMMMMMMMMMMMMMMMMMMMMMMMMM', review, user)
        if (review.userId === id){
            // setReviewdd(true)
            console.log(' Ummmmmmmmmmmmmmmmmmmmmmmmmmmmmm',review.userId,  id)
            dispatch(setReviewed())
        }
    })
}

export const fetchreviews = (spotId, userId) => async dispatch => {
    const res = await fetch(`/api/spots/${spotId}/reviews`)
    // console.log('we are dispatching')
    if (res.ok){
        const reviews = await res.json()
        // reviews.Reviews.forEach(review => {
        //     // console.log('MMMMMMMMMMMMMMMMMMMMMMMMMMMMM', review, user)
        //     if (review.userId === userId){
        //         // setReviewdd(true)
        //         // console.log(' Ummmmmmmmmmmmmmmmmmmmmmmmmmmmmm',review.userId,  user.id)
        //         dispatch(setReviewed())
        //     }
        // })
        checkIfReviewed(userId, reviews, dispatch)
        await dispatch(loadReviews(reviews))
    } else if (res.status === 404){
        console.log('hi we hit this spot')
        console.log(res.status)
        const dummy = {Reviews : []}
        await dispatch(loadReviews(dummy))
    }
}

export const createReview = (review, spotId, user) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review)
    })
    console.log('testing if we are here')
    console.log(res)
    if (res.ok){
        console.log('hello we are here')
        const body = await res.json();
        body.User = user
        await dispatch(addReview(body))
        return res
    } else {
        console.log('not good we are here')
        // const errorList = await res.JSON()
        // return res
    }
}

export const removeReview = ( spotId, review) => async dispatch => {
    const res = await csrfFetch(`/api/reviews/${review.id}`, {
        method: 'DELETE'
    })

    let body;

    if (res.ok){
        await dispatch(deleteReview(review))
    }
}

const initialState = { reviewed: false};

const reviewReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_REVIEWS:
            newState = Object.assign({}, state);
            newState.spot = {}
            const reviews = action.reviews.Reviews
            reviews.forEach((review) => {
                newState.spot[review.id] = review
            })
            return newState;
        case ADD_REVIEW:
            newState = Object.assign({}, state);
            newState.spot = {...state.spot}
            const review = action.review
            newState.spot[review.id] = review
            return newState;
        case DELETE_REVIEW:
            newState = Object.assign({}, state);
            newState.spot = {...state.spot}
            const review2 = action.review
            delete newState.spot[review2.id]
            return newState
        case SET_REVIEWED:
            newState = Object.assign({}, state);
            newState.reviewed = true
            return newState
        case SET_REVIEWED_FALSE:
            newState = Object.assign({}, state);
            newState.reviewed = false
            return newState
      default:
        return state;
    }
};

export default reviewReducer;
