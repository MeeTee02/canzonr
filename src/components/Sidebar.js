import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "../App.scss";
import { IconContext } from "react-icons";
import Button from "@mui/material/Button";
import { handleLastLoginDataUpload } from "../helpers/FirestoreData";
import {
  getProfileData,
  getUserTopArtists,
  getUserTopTracks,
  saveLastLoginUserData,
} from "../helpers/SpotifyApiRequests";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const [userTopArtists, setUserTopArtists] = useState(null);
  const [userTopTracks, setUserTopTracks] = useState(null);
  const [userTopGenres, setUserTopGenres] = useState(null);

  const navigate = useNavigate();

  const showSidebar = () => setSidebar(!sidebar);

  const accessToken = sessionStorage.getItem("spotifyAccessToken");

  const manageAuth = async () => {
    if (accessToken) {

      const profileData = await getProfileData(accessToken); 
      const lastLoginUserData = await saveLastLoginUserData(accessToken, 50, setUserTopArtists, setUserTopGenres, setUserTopTracks);

      handleLastLoginDataUpload(profileData.email, lastLoginUserData.artists, lastLoginUserData.tracks, lastLoginUserData.genres);

      sessionStorage.removeItem("spotifyAccessToken");
      navigate("/");
    } else {
      navigate("/auth");
    }
  };

  return (
    <>
      <IconContext.Provider value={{ color: "undefined" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <Button
            className="auth-button"
            variant="contained"
            color="success"
            onClick={() => manageAuth()}
          >
            {accessToken ? "Logout" : "Login"}
          </Button>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
