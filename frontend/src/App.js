import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import * as sessionActions from "./store/session";
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import SpotsBrowser from "./components/Spots/SpotsBrowser";
import SpotDetails from "./components/Spots/SpotDetails";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);


  return (
    <>
    <Navigation isLoaded={isLoaded} />
{
   isLoaded && <Switch>
    <Route exact path="/spots/:spotId">
      <SpotDetails />
    </Route>
      <Route exact path="/login">
        <LoginFormPage />
      </Route>
      <Route exact path="/signup">
        <SignupFormPage />
      </Route>
      <Route exact path="/">
    <SpotsBrowser />
      </Route>
    </Switch>
}
    </>
  );
}

export default App;
