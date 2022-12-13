import { csrfFetch } from "./csrf"

const LOAD_SPOTS = 'spots/loadSpots'

const LOAD_SPOT = 'spots/loadSpot'

const ADD_SPOT = 'spots/addSpot'

const EDIT_SPOT = 'spots/editSpot'

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

export const addSpot = (spot) => {
    return {
        type: ADD_SPOT,
        spot
    }
}

export const editSpot = (spot) => {
    return {
        type:EDIT_SPOT,
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

export const createSpot = (spot) => async dispatch => {
    const res = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(spot)
    })
    let body;
    if (res.ok) {
        body = await res.json();
        await dispatch(addSpot(body))
    } else {
        body = await res.json();
        console.log(('error check'))
        const errors = body.errors
        return errors
    }
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

export const updateSpot = (spot, id) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(spot)
    })

    let body;

    if (res.ok){
        await dispatch(editSpot(spot))
    }

}

const initialState = {};

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
            newState.allSpots[spot.id] = spot
            return newState;
        case DELETE_SPOT:
            newState = Object.assign({}, state)
            newState.allSpots = {...state.allSpots}
            const spot2 = action.spot
            delete newState.allSpots[spot2.id]
            delete newState.singleSpot
            return newState;
        case EDIT_SPOT:
            newState = Object.assign({}, state)
            newState.allSpots = {...state.allSpots}
            const spot3 = action.spot
            newState.allSpots[spot3.id] = spot3
            return newState;
      default:
        return state;
    }
  };

  export default spotReducer;
