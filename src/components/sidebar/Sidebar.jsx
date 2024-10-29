// src/components/Sidebar.js
import React, { useContext, useState } from "react";
import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import ViewListIcon from "@mui/icons-material/ViewList";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutAsyncUser } from "../../redux/asyncThunks/authThunks";
import { DarkModeContext } from "../../context/darkModeContext";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import { toast } from "react-toastify";


const Sidebar = () => {
  const [activeLink, setActiveLink] = useState("/");
  const dispatchAuth = useDispatch();
  const navigate = useNavigate();

  const { dispatch } = useContext(DarkModeContext);

  const handleLogout = () => {
    dispatchAuth(logoutAsyncUser());
    localStorage.removeItem("user");
    toast.success("Logout Successfuly");
    navigate("/login");
  };

  const links = {
    Main: [
      {
        path: "/",
        label: "Dashboard",
        icon: <DashboardIcon className="icon" />,
      },
    ],
    Lists: [
      {
        path: "/users",
        label: "Users",
        icon: <PersonOutlineIcon className="icon" />,
      },
      {
        path: "/movies",
        label: "Movies",
        icon: <LocalMoviesIcon className="icon" />,
      },
      {
        path: "/series",
        label: "Series",
        icon: <OndemandVideoIcon className="icon" />,
      },
      {
        path: "/lists",
        label: "Lists",
        icon: <ViewListIcon className="icon" />,
      },
      {
        path: "/subscriptions",
        label: "Subscriptions",
        icon: <SubscriptionsIcon className="icon" />,
      },
    ],
    Useful: [
      {
        path: "/earnings",
        label: "Earnings",
        icon: <AccountBalanceWalletOutlinedIcon className="icon" />,
      },
      {
        path: "/stats",
        label: "Stats",
        icon: <InsertChartIcon className="icon" />,
      },
    ],
    // Service: [
    //   { path: "/settings", label: "Settings", icon: <SettingsApplicationsIcon className="icon" /> },
    // ],
    User: [
      {
        path: "/profile",
        label: "Profile",
        icon: <AccountCircleOutlinedIcon className="icon" />,
      },
    ],
  };

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Streamer</span>
        </Link>
      </div>
      <div className="center">
        <ul>
          {Object.entries(links).map(([title, items]) => (
            <React.Fragment key={title}>
              <p className="title">{title.toUpperCase()}</p>
              {items.map(({ path, label, icon }) => (
                <Link
                  to={path}
                  key={path}
                  onClick={() => handleLinkClick(path)}
                  className={activeLink === path ? "active" : ""}
                  style={{ textDecoration: "none" }}
                >
                  <li key={path}>
                    {icon}
                    <span>{label}</span>
                  </li>
                </Link>
              ))}
            </React.Fragment>
          ))}
          <li onClick={handleLogout} style={{ cursor: "pointer" }}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
