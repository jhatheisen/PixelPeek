import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import CreatePhotoModal from "../CreatePhotoModal";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const location = useLocation();

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
        {sessionUser && location.pathname != "/" && (
          <CreatePhotoModal user={sessionUser} />
        )}
        {isLoaded && <ProfileButton user={sessionUser} />}
      </div>
    </div>
  );
}

export default Navigation;
