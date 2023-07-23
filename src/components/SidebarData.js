import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Top",
    path: "/top",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Recommendation",
    path: "/recommendation",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
  },
  {
    title: "Generate",
    path: "/generate",
    icon: <FaIcons.FaCartPlus />,
    cName: "nav-text",
  },
  {
    title: "Profile Data",
    path: "/profile-data",
    icon: <FaIcons.FaCartPlus />,
    cName: "nav-text",
  },
];