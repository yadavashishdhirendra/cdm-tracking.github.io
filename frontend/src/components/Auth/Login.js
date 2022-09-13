import React, { useEffect, useState } from "react";
import "./Auth.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../Assets/Images/DiTech Logo DM_Final (1).png";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Actions/userActions";
import MetaData from "../Helmet/MetaData";
import { useAlert } from "react-alert";

const Login = () => {
  const alert = useAlert();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, error } = useSelector(
    (state) => state.Authentication
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const LoginUser = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
      alert.success("Login Successfull!");
    }
    if (error) {
      alert.error(error);
      dispatch({
        type: "ClearErrors",
      });
    }
  }, [dispatch, isAuthenticated, navigate, error]);

  return (
    <div className="register-container">
      <MetaData title={`DiTech Creative & Digital Marketing - Login`} />
      <div className="inside-container">
        <img src={Logo} alt="DiTech Creative & Digital Marketing" />
        <form onSubmit={(e) => LoginUser(e)}>
          <TextField
            id="outlined-basic"
            value={email}
            label="Email"
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            value={password}
            label="Password"
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="button">
            <Button type="submit" variant="contained">
              Log In
            </Button>
          </div>
        </form>
        <div className="login-tabs">
          <p>
            Don't Have an Account ? <Link to="/register">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
