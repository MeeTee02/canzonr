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
} from "../helpers/SpotifyApiRequests";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const [userData, setUserData] = useState(null);
  const [userTopArtists, setUserTopArtists] = useState(null);
  const [userTopTracks, setUserTopTracks] = useState(null);
  const [userTopGenres, setUserTopGenres] = useState(null);

  const navigate = useNavigate();

  const showSidebar = () => setSidebar(!sidebar);

  const accessToken = sessionStorage.getItem("spotifyAccessToken");

  const manageAuth = () => {
    const artists = new Map();
    const tracks = new Map();
    const genres = new Map();

    if (accessToken) {
      getUserTopArtists(
        accessToken,
        50,
        setUserTopArtists,
        "short_term",
        setUserTopGenres
      );
      artists.set("lastFourWeeks", userTopArtists);
      genres.set("lastFourWeeks", userTopGenres);

      getUserTopArtists(
        accessToken,
        50,
        setUserTopArtists,
        "medium_term",
        setUserTopGenres
      );
      artists.set("lastSixMonths", userTopArtists);
      genres.set("lastSixMonths", userTopGenres);
      console.log(artists);

      getUserTopArtists(
        accessToken,
        50,
        setUserTopArtists,
        "long_term",
        setUserTopGenres
      );
      artists.set("allTime", userTopArtists);
      genres.set("allTime", userTopGenres);

      getUserTopTracks(accessToken, 50, setUserTopTracks, "short_term");
      tracks.set("lastFourWeeks", userTopTracks);

      getUserTopTracks(accessToken, 50, setUserTopTracks, "medium_term");
      tracks.set("lastSixMonths", userTopTracks);

      getUserTopTracks(accessToken, 50, setUserTopTracks, "long_term");
      tracks.set("allTime", userTopTracks);

      handleLastLoginDataUpload("szucsmate2000@gmail.com", artists, tracks, genres);

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
