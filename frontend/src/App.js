import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from 'react-router-dom';
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Home from "./components/HomePage";
import SpotIndex from "./components/SpotIndexItem";
import { fetchSpots } from "./store/spots";
import NavigationSpot from "./components/Navigation/nav2";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHome, setIsHome] = useState(true);
  const [isFiltered, setIsFiltered] = useState(false)

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    dispatch(fetchSpots())
  }, [dispatch]);

  return isLoaded && (
    <>
      {isLoaded && (
        <Switch>
          <Route exact path={'/'}>
            <Navigation isLoaded={isLoaded} isHome={isHome} setIsHome={setIsHome} setIsFiltered={setIsFiltered}/>
            <Home isHome={isHome} setIsHome={setIsHome} isFiltered={isFiltered} />
          </Route>
          <Route path={'/spots/:spotId'}>
            <NavigationSpot isLoaded={isLoaded} isHome={isHome} setIsHome={setIsHome} setIsFiltered={setIsFiltered} />
            <SpotIndex isHome={isHome} setIsHome={setIsHome}/>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
