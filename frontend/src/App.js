import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from 'react-router-dom';
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Home from "./components/HomePage";
import SpotIndex from "./components/SpotIndexItem";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHome, setIsHome] = useState(true);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
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
            <SpotIndex />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
