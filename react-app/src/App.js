import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import AllPhotosPage from "./components/AllPhotosPage";
import SinglePhotoPage from "./components/SinglePhotoPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import SplashPage from "./components/SplashPage";
import YouPage from "./components/YouPage";
import SingleAlbumPhotoPage from "./components/SingleAlbumPhotoPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/photos/:photoId">
            <SinglePhotoPage />
          </Route>
          <Route path="/photos">
            <AllPhotosPage />
          </Route>
          <ProtectedRoute path="/You/album/:albumId">
            <SingleAlbumPhotoPage />
          </ProtectedRoute>
          <ProtectedRoute path="/You">
            <YouPage />
          </ProtectedRoute>
          <Route path="/" exact>
            <SplashPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
