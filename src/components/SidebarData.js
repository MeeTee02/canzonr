import React from "react";
import * as AiIcons from "react-icons/ai";
import * as MdIcons from "react-icons/md";
import * as GaIcons from "react-icons/gi";
import * as CgIcons from "react-icons/cg";

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
    icon: <MdIcons.MdFavorite />,
    cName: "nav-text",
  },
  {
    title: "Recommendation",
    path: "/recommendation",
    icon: <MdIcons.MdRecommend />,
    cName: "nav-text",
  },
  {
    title: "Generate",
    path: "/generate",
    icon: <GaIcons.GiMusicalNotes />,
    cName: "nav-text",
  },
  {
    title: "Profile Data",
    path: "/profile-data",
    icon: <CgIcons.CgProfile />,
    cName: "nav-text",
  },
];