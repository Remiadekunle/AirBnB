import { csrfFetch } from "./csrf"

const LOAD_SPOTS = 'spots/loadSpots'

const LOAD_SPOT = 'spots/loadSpot'

const ADD_SPOT = 'spots/addSpot'

const FILTER_SPOT = 'spots/filterSpot'

const EDIT_SPOT = 'spots/editSpot'

const OFFLOAD_SPOT = 'spots/offloadSpot'

const DELETE_SPOT = 'spots/deleteSpot'

const LOAD_CACHE = 'spots/loadCache'

const SET_CACHE = 'spots/setCache'

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

export const loadCache = () => {
    return{
        type: LOAD_CACHE
    }
}

export const setCache = (spots) => {
    return{
        type:SET_CACHE,
        spots
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
        dispatch(setCache(spots))
    }
}

export const fetchSingleSpot = (spotId) => async dispatch => {
    const res = await fetch(`/api/spots/${spotId}`)
    if (res.ok){
        const spot = await res.json()
        await dispatch(loadSpot(spot))
    }
}


export const createSpot = (spot, payload, key, address) => async dispatch => {

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

// export const validateAddress = async (payload, key) => {
//     const res = await fetch(`https://addressvalidation.googleapis.com/v1:validateAddress?key=${key}`, {
//         method: 'POST',
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload)
//     })

//     if (res.ok){
//         const body = await res.json()

//         let latitude = body.result.geocode.location.latitude? body.result.geocode.location.latitude : 0
//         let longitude = body.result.geocode.location.longitude? body.result.geocode.location.longitude : 0
//         let addressComplete = body.result?.verdict.addressComplete? body.result?.verdict.addressComplete : false
//         let unconfirmedComponentTypes = body.result.address.unconfirmedComponentTypes?  body.result.address.unconfirmedComponentTypes : false
//         // console.log('what ended uyp being the payload', {
//         //     latitude,
//         //     longitude,
//         //     addressComplete,
//         //     unconfirmedComponentTypes
//         // } )
//         return {
//             latitude,
//             longitude,
//             addressComplete,
//             unconfirmedComponentTypes
//         }
//     }
// }

export const updateSpot = (spot, oldSpot) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${oldSpot.id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(spot)
    })

    let body;

    if (res.ok){
        body = await res.json();


        oldSpot.address = body.address
        oldSpot.city = body.city
        oldSpot.state = body.state
        oldSpot.country = body.country
        oldSpot.lat = body.lat
        oldSpot.lng = body.lng
        oldSpot.name = body.name
        oldSpot.price = body.price
        oldSpot.description = body.description

        await dispatch(editSpot(oldSpot))
    }

}

const initialState = { cache: {}, allSpots: {}};

export function compare( a, b, param, reverse ) {
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
            newState.allSpots = {}
            const spots = action.spots.Spots
            spots.forEach((spot) => {
                newState.allSpots[spot.id] = spot
            })
            return newState;
        case SET_CACHE:
            newState = Object.assign({}, state);
            newState.allSpots = {...state.allSpots}
            const spotsCache = action.spots?.Spots
            spotsCache?.forEach((spot) => {
                newState.cache[spot.id] = spot
            })
            return newState;
        case LOAD_CACHE:
            newState = Object.assign({}, state)
            newState.allSpots = {...state.cache}
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
