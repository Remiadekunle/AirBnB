const LOAD_SPOTS = 'spots/loadSpots'

const LOAD_SPOT = 'spots/loadSpot'
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

export const fetchSpots = () => async dispatch => {
    const res = await fetch('/api/spots')

    if (res.ok){
        const spots = await res.json()
        dispatch(loadSpots(spots))
    }
}

export const fetchSingleSpot = (spotId) => async dispatch => {
    const res = await fetch(`/api/spots/${spotId}`)

    if (res.ok){
        const spot = await res.json()
        dispatch(loadSpot(spot))
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
      default:
        return state;
    }
  };

  export default spotReducer;
