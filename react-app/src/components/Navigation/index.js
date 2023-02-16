import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import CreatePhotoModal from "../CreatePhoto";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const location = useLocation();

  return (
    <div className="Navbar">
      <div>
        <NavLink exact to="/">
          <img
            src={process.env.PUBLIC_URL + "/PixelPeek.png"}
            className="Navbar-Home-Logo"
          />
        </NavLink>
        <NavLink exact to="/you">
          You
        </NavLink>
        <NavLink exact to="/photos">
          Explore
        </NavLink>
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
