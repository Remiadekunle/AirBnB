import { csrfFetch } from "./csrf"

const LOAD_SPOTS = 'spots/loadSpots'

const LOAD_SPOT = 'spots/loadSpot'

const ADD_SPOT = 'spots/addSpot'

const FILTER_SPOT = 'spots/filterSpot'

const EDIT_SPOT = 'spots/editSpot'

const OFFLOAD_SPOT = 'spots/offloadSpot'

const DELETE_SPOT = 'spots/deleteSpot'

export const loadSpots = (spots) => {
    return {
        type: LOAD_SPOTS,
        spots
    }
}

export const loadSpot = (spot) => {
    return {
        type: LOAD_SPOT,
        spot
    }
}

export const addSpot = (spot, url) => {
    return {
        type: ADD_SPOT,
        spot,
        url
    }
}

export const editSpot = (spot) => {
    return {
        type:EDIT_SPOT,
        spot
    }
}

export const filterSpot = (filter, reverse) => {
    return{
        type: FILTER_SPOT,
        filter, 
        reverse
    }
}

export const offLoadSpot = (spot) => {
    return{
        type:OFFLOAD_SPOT,
        spot
    }
}

export const deleteSpot = (spot) => {
    return {
        type: DELETE_SPOT,
        spot
    }
}

export const fetchSpots = () => async dispatch => {
    const res = await fetch('/api/spots')

    if (res.ok){
        const spots = await res.json()
        await dispatch(loadSpots(spots))
    }
}

export const fetchSingleSpot = (spotId) => async dispatch => {
    const res = await fetch(`/api/spots/${spotId}`)
    console.log('we are dispatching')
    if (res.ok){
        const spot = await res.json()
        await dispatch(loadSpot(spot))
    }
}

export const createSpot = (spot, payload) => async dispatch => {
    const res = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(spot)
    })
    let body = await res.json();
    const url = payload.url
    if (res.ok) {
        const res2 = await csrfFetch(`/api/spots/${body.id}/images`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        })
        await dispatch(addSpot(body, url))
    }

    return body
    // else {
    //     body = await res.json();
    //     console.log(('error check'))
    //     const errors = body.errors
    //     return errors
    // }

}


export const removeSpot = (spot) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spot.id}`, {
        method: 'DELETE'
    })

    let body;

    if (res.ok){
        await dispatch(deleteSpot(spot))
        return 'succsessfull'
    } else {
        body = await res.json();
        const errors = body.errors
        return errors
    }
}

export const updateSpot = (spot, oldSpot) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${oldSpot.id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(spot)
    })

    let body;

    if (res.ok){
        body = await res.json();
        console.log('this is the body',body)
        console.log('oldspot b4 the change', oldSpot)

        oldSpot.address = body.address
        oldSpot.city = body.city
        oldSpot.state = body.state
        oldSpot.country = body.country
        oldSpot.lat = body.lat
        oldSpot.lng = body.lng
        oldSpot.name = body.name
        oldSpot.price = body.price
        oldSpot.description = body.description
        console.log('oldspot after the change', oldSpot)
        await dispatch(editSpot(oldSpot))
    }

}

const initialState = {};

function compare( a, b, param, reverse ) {
    if ( a[param] < b[param] ){
      return reverse? 1 : -1;
    }
    if ( a[param] > b[param] ){
      return reverse? -1 : 1;
    }
    return 0;
}

const spotReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_SPOTS:
            newState = Object.assign({}, state);
            newState.allSpots = {...state.allSpots}
            const spots = action.spots.Spots
            spots.forEach((spot) => {
                newState.allSpots[spot.id] = spot
            })
            return newState;
        case LOAD_SPOT:
            newState = Object.assign({}, state)
            newState.singleSpot = {...action.spot}
            return newState
        case ADD_SPOT:
            newState = Object.assign({}, state)
            newState.allSpots = {...state.allSpots}
            const spot = action.spot
            spot.previewImage = action.url
            spot.avgRating = 'NEW'
            newState.allSpots[spot.id] = spot
            return newState;
        case DELETE_SPOT:
            newState = Object.assign({}, state)
            newState.allSpots = {...state.allSpots}
            const spot2 = action.spot
            delete newState.allSpots[spot2.id]
            delete newState.singleSpot
            return newState;
        case OFFLOAD_SPOT:
            newState = Object.assign({}, state)
            newState.singleSpot = {}
            return newState;
        case FILTER_SPOT:
            newState = Object.assign({}, state)
            const nonSpots = Object.values(state.allSpots)
            let newSpots = nonSpots.sort((a, b) => compare(a,b, action.filter, action.reverse))
            newState.filter = {spots: newSpots, filter: action.filter}
            return newState
        case EDIT_SPOT:
            newState = Object.assign({}, state)
            newState.allSpots = {...state.allSpots}
            const spot3 = action.spot
            newState.allSpots[spot3.id] = spot3
            newState.singleSpot = {...spot3}
            return newState;
      default:
        return state;
    }
  };

  export default spotReducer;
