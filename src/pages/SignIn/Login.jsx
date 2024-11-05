import "./Login.scss";
import { useState } from "react";
import { IoMdMail } from "react-icons/io";
import { BiSolidLock, BiShow, BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginAsyncUser } from "../../redux/asyncThunks/authThunks";
import { toast } from "react-toastify";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await dispatch(
        loginAsyncUser({ email, password })
      ).unwrap();
      toast.success(response.message);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <h1>STREAMER DASHBOARD</h1>
        </div>
      </div>
      <div className="container">
        <form className="input" onSubmit={handleLogin}>
          <h1>Login</h1>

          <div className="inputValid">
            <div className="inputType">
              <IoMdMail className="inputIcon" />
              <input
                type="email"
                autoComplete="off"
                placeholder="Email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="inputValid">
            <div className="inputType">
              <BiSolidLock className="inputIcon" />
              <input
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              {showPassword ? (
                <BiHide
                  className="inputIcon"
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <BiShow
                  className="inputIcon"
                  onClick={togglePasswordVisibility}
                />
              )}
            </div>
          </div>
          <button className="loginButton" type="submit">
            Login
          </button>
          <span>
            New to streamer
            <span className="signupLink">
              <Link to="/register"> Sign Up</Link>
            </span>
          </span>
        </form>
      </div>
    </div>
  );
}
