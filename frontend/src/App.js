import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import * as sessionActions from "./store/session";
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import SpotsBrowser from "./components/Spots/SpotsBrowser";
import SpotDetails from "./components/Spots/SpotDetails";
import UserSpots from "./components/Spots/UserSpots"
import NewSpotForm from "./components/Spots/NewSpotForm";
import './index.css'
import { useModalContext } from "./context/modalContext";
import Modal from "./components/Modals/Modal";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const {modal} = useModalContext()

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);


  return (
    <>
    {modal && <Modal />}
    <Navigation isLoaded={isLoaded} />
{
   isLoaded && <Switch>
    <Route exact path="/spots/current">
      <UserSpots />
    </Route>
    <Route exact path="/spots/:spotId">
      <SpotDetails />
    </Route>
      <Route exact path="/login">
        <LoginFormPage />
      </Route>
      <Route exact path="/signup">
        <SignupFormPage />
      </Route>
      <Route exact path='/newSpot'>
      <NewSpotForm />
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
