import "./navbar.scss";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import LightModeIcon from "@mui/icons-material/LightMode";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { darkMode, dispatch } = useContext(DarkModeContext);

  // Update this line
  const user = useSelector((state) => state.auth?.user);


  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="items">
          <div className="item">
            {darkMode ? (
              <LightModeIcon
                className="icon"
                onClick={() => dispatch({ type: "TOGGLE" })}
              />
            ) : (
              <DarkModeOutlinedIcon
                className="icon"
                onClick={() => dispatch({ type: "TOGGLE" })}
              />
            )}
          </div>
          <div className="item">
            <Link to={"/profile"} className="profileName">
              <PersonIcon className="userIcon" />
              <p>{user?.user?.name}</p> {/* Optional chaining to safely access name */}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
