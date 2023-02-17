import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import ProfileButton from "./ProfileButton";
import CreatePhotoModal from "../CreatePhotoModal";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session);
  const location = useLocation();
  const { closeModal } = useModal();

  //attempting to make it so you can click openLogin and it will open login modal, using a div below with an onClick

  // const openLogin = () => {
  //   <OpenModalButton
  //     buttonText="Log In"
  //     onItemClick={closeModal}
  //     modalComponent={<LoginFormModal />}
  //     className="Log"
  //   />;
  // };

  if (!sessionUser) return null;

  return (
    <div className="Navbar">
      <div className="leftNav">
        <div className="HomeButton-Holder">
          <NavLink exact to="/">
            <img
              src={process.env.PUBLIC_URL + "/PixelPeek.png"}
              className="Navbar-Home-Logo"
            />
          </NavLink>
        </div>
        <div className="YouAndExplore">
          {sessionUser.user && (
            <NavLink exact to="/you" className={"YouButton"}>
              You
            </NavLink>
          )}
          <NavLink exact to="/photos" className={"ExploreButton"}>
            Explore
          </NavLink>
        </div>
      </div>
      <div className="rightNav">
        <div className="CreatePhoto-Holder">
          {sessionUser && sessionUser.user && location.pathname != "/" && (
            <CreatePhotoModal user={sessionUser} />
          )}
        </div>
        {isLoaded && sessionUser.user && (
          <ProfileButton user={sessionUser.user} />
        )}
        {!sessionUser.user && (
          <div className="Login-Signup-Holder">
            <OpenModalButton
              buttonText="Log In"
              className="login"
              modalComponent={<LoginFormModal />}
            />
            <OpenModalButton
              buttonText="Sign Up"
              className="signup cleanButton"
              modalComponent={<SignupFormModal />}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Navigation;
