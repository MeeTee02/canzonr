import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Generate from "./routes/Generate";
import Top from "./routes/Top";
import Recommendation from "./routes/Recommendation";
import Sidebar from "./components/Sidebar";
import "./App.css";
import Home from "./routes/Home";
import ProfileData from "./routes/ProfileData";
import SpotifyAuth from "./routes/SpotifyAuth";
import AccessTokenCallback from "./routes/AccessTokenCallback";

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
        path: "/recommendation",
        element: <Recommendation />,
      },
      {
        path: "/generate",
        element: <Generate />,
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