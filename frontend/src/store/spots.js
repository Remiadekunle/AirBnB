const LOAD_SPOTS = 'spots/loadSpots'

const loadSpots = (spots) => {
    return {
        type: LOAD_SPOTS,
        spots
    }
}

export const fetchSpots = () => async dispatch => {
    const res = await fetch('/api/spots')

    if (res.ok){
        const spots = await res.json()
        dispatch(loadSpots(spots))
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
      default:
        return state;
    }
  };

  export default spotReducer;
