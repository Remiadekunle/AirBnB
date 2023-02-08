import { csrfFetch } from "./csrf"

const LOAD_BOOKINGS = 'bookings/loadBookings'

const LOAD_USERBOOKINGS = 'bookings/loadUserBookings'

const ADD_BOOKING = 'bookings/addBooking'

const DELETE_BOOKING = 'bookings/deleteBooking'


export const loadBookings = (bookings) => {
    return{
        type: LOAD_BOOKINGS,
        bookings
    }
}

export const addBooking = (booking) => {
    return{
        type: ADD_BOOKING,
        booking
    }
}

export const loadUserBookings = (bookings) => {
    return{
        type:LOAD_USERBOOKINGS,
        bookings
    }
}

export const deleteBooking = (id) => {
    return{
        type: DELETE_BOOKING,
        id
    }
}

export const fetchBookings = (spotId) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}/bookings`)

    if (res.ok){
        const body = await res.json()
        console.log('these are the bookings', body)
        await dispatch(loadBookings(body.bookings))
    }
}

export const fetchUserBookings = () => async dispatch => {
    const res = await csrfFetch(`/api/bookings/current`)
    if (res.ok){
        const body = await res.json()
        console.log('these are the bookings', body)
        await dispatch(loadUserBookings(body.bookings))
    }
}

export const createBooking = (spotId, startDate, endDate) =>  async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}/bookings`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            startDate,
            endDate
        })
    })
    if (res.ok){
        const body = await res.json()
        console.log('these are the bookings', body)
        await dispatch(addBooking(body))
    } else{
        const body = await res.json()
        console.log('ummmmm we got the body', body)
        return body
    }
}

export const updateBooking = (bookingId, startDate, endDate) => async dispatch => {
    const res = await csrfFetch(`/api/bookings/${bookingId}`,{
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            startDate,
            endDate
        })
    })
    if (res.ok){
        const body = await res.json()
        // console.log('these are the bookings', body)
        await dispatch(addBooking(body))
    } else{
        const body = await res.json()
        // console.log('ummmmm we got the body', body)
        return body
    }
}
export const removeBooking = (bookingId, startDate, endDate) => async dispatch => {
    const res = await csrfFetch(`/api/bookings/${bookingId}`,{
        method: 'DELETE',
        headers: { "Content-Type": "application/json" },
    })
    if (res.ok){
        const body = await res.json()
        await dispatch(deleteBooking(bookingId))
    } else{
        const body = await res.json()
        // console.log('ummmmm we got the body', body)
        return body
    }
}

const initialState = {};

const bookingReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_BOOKINGS:
            newState = Object.assign({}, state);
            newState.spot = {}
            const bookings = action.bookings
            bookings.forEach((booking) => {
                newState.spot[booking.id] = booking
            })
            return newState;
        case ADD_BOOKING:
            newState = Object.assign({}, state);
            newState.spot = {...newState.spot}
            newState.user = {...state.user}
            const booking = action.booking
            newState.spot[booking.id] = booking
            newState.user[booking.id] = booking
            return newState;
        case LOAD_USERBOOKINGS:
            newState = Object.assign({}, state);
            newState.user = {}
            newState.spot = {...state.spot}
            const bookings2 = action.bookings
            bookings2.forEach((booking) => {
                newState.user[booking.id] = booking
            })
            return newState;
        case DELETE_BOOKING:
            newState = Object.assign({}, state);
            newState.spot = {...state.spot}
            newState.user = {...state.user}
            const id = action.id
            delete newState.spot[id]
            delete newState.user[id]
            return newState
      default:
        return state;
    }
};

export default bookingReducer;
