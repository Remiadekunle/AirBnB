import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from 'react-router-dom';
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Home from "./components/HomePage";
import SpotIndex from "./components/SpotIndexItem";
import { fetchSpots } from "./store/spots";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHome, setIsHome] = useState(true);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    dispatch(fetchSpots())
  }, [dispatch]);

  return isLoaded && (
    <>
      <Navigation isLoaded={isLoaded} isHome={isHome} setIsHome={setIsHome}/>
      {isLoaded && (
        <Switch>
          <Route exact path={'/'}>
            <Home isHome={isHome} setIsHome={setIsHome} />
          </Route>
          <Route path={'/spots/:spotId'}>
            <SpotIndex isHome={isHome} setIsHome={setIsHome}/>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
