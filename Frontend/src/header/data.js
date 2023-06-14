import React from "react";
import { CgProfile } from "react-icons/cg";

export const links = [
  // {
  //   id: 1,
  //   url: '/Notice',
  //   text: 'Notice',
  //   className: 'notice-link',
  // },
  {
    id: 2,
    url: "/qna",
    text: "QnA",
    className: "qna-link",
  },
  {
    id: 3,
    url: "/Problemlist",
    text: "Problem",
    className: "problemlist-link",
  },
];

export const social = [
  {
    id: 1,
    icon: <CgProfile />,
  },
  {
    id: 2,
    url: "/loginhome",
    text: "Login",
    className: "login-link",
  },
  {
    id: 3,
    url: "/logout",
    text: "LogOut",
    className: "logout-link",
  },
  {
    id: 4,
    url: "/Manage",
    text: "Manage",
    className: "management-link",
  },
];
