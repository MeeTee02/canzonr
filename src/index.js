import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Top from "./routes/Top";
import Recommendation from "./routes/Recommendation";
import Sidebar from "./components/Sidebar";
import "./App.scss";
import Home from "./routes/Home";
import ProfileData from "./routes/ProfileData";
import SpotifyAuth from "./routes/SpotifyAuth";
import AccessTokenCallback from "./routes/AccessTokenCallback";
import Artists from "./routes/Artists";
import Tracks from "./routes/Tracks";
import Genres from "./routes/Genres";
import ArtistRecommendations from "./routes/ArtistRecommendations";
import TrackRecommendations from "./routes/TrackRecommendations";
import GenerateTracks from "./routes/GenerateTracks";

const AppLayout = () => (
  <>
    <Sidebar />
    <Outlet />
  </>
);

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/top",
        element: <Top />,
      },
      {
        path: "/top/artists",
        element: <Artists />,
      },
      {
        path: "/top/tracks",
        element: <Tracks />,
      },
      {
        path: "/top/genres",
        element: <Genres />,
      },
      {
        path: "/recommendation",
        element: <Recommendation />,
      },
      {
        path: "/recommendation/artists",
        element: <ArtistRecommendations />,
      },
      {
        path: "/recommendation/tracks",
        element: <TrackRecommendations />,
      },
      {
        path: "/generate",
        element: <GenerateTracks />,
      },
      {
        path: "/profile-data",
        element: <ProfileData />,
      },
      {
        path: "/auth",
        element: <SpotifyAuth />,
      },
      {
        path: "/callback",
        element: <AccessTokenCallback />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);