import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import ProfileButton from "./ProfileButton";
import CreatePhotoModal from "../CreatePhotoModal";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";

import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
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
        {sessionUser && location.pathname != "/" && (
          <div className="YouAndExplore">
            <NavLink exact to="/you" className={"YouButton"}>
              You
            </NavLink>
            <NavLink exact to="/photos" className={"ExploreButton"}>
              Explore
            </NavLink>
          </div>
        )}
      </div>
      <div className="rightNav">
        <div className="CreatePhoto-Holder">
          {sessionUser && location.pathname != "/" && (
            <CreatePhotoModal user={sessionUser} />
          )}
        </div>
        {/* need to work on rendering profile dropdown in navbar when signed in only */}
        {/* {isLoaded && <ProfileButton user={sessionUser} />} */}
        <div className="Login-Signup-Holder">
          <div className="Log">Log in</div>
          <div className="Sign">SignUp</div>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
