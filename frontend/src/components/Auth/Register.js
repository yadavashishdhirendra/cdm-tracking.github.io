import React, { useEffect, useState } from "react";
import "./Auth.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../Assets/Images/DiTech Logo DM_Final (1).png";
import { useDispatch, useSelector } from "react-redux";
import { RegisterUser } from "../../Actions/userActions";
import MetaData from "../Helmet/MetaData";
import { useAlert } from "react-alert";

const Register = () => {
  const alert = useAlert();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.Authentication
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = (e) => {
    e.preventDefault();
    dispatch(RegisterUser(name, email, password));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({
        type: "ClearErrors",
      });
    }
    if (isAuthenticated) {
      navigate("/");
      alert.success("Register Successfully!");
    }
  }, [dispatch, error, isAuthenticated]);

  return (
    <>
      <MetaData title={`DiTech Creative & Digital Marketing - Register`} />
      <div className="register-container">
        <div className="inside-container">
          <img src={Logo} alt="DiTech Creative & Digital Marketing" />
          <form onSubmit={(e) => registerUser(e)}>
            <TextField
              id="outlined-basic"
              value={name}
              label="Full Name"
              variant="outlined"
              onChange={(e) => setName(e.target.value)}
            />
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
                Sign Up
              </Button>
            </div>
          </form>
          <div className="login-tabs">
            <p>
              Already Have an Account ? <Link to="/login">Log In</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
