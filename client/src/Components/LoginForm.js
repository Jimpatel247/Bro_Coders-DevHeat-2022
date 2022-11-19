import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import "../forms/login.css";
import "../Components/register.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
const LoginForm = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  let name, value;
  let history = useNavigate();
  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const handleLogin=async(e)=>{
    e.preventDefault();
    const { username, password } = user;
  let fetchUrl="/api/login";
  const res = await fetch(fetchUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });
  const json = await res.json();
  // console.log(json.authToken);
  if (json.success) {
    localStorage.setItem("token", json.authToken);
    window.alert("Login Successfull");
    history("/home");
  }
  else {
    alert("Invalid credentials");
  }
  }
  return (
    <div className="registration-form">
      <form>
        <div className="form-icon">
          <span>
            <i className="icon icon-user"></i>
          </span>
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control item"
            onChange={handleInputs}
            id="username"
            name="username"
            value-={user.username}
            placeholder="Username"
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            className="form-control item"
            onChange={handleInputs}
            id="password"
            name="password"
            value={user.password}
            placeholder="Password"
          />
        </div>

        <div className="form-group">
          <button type="button" className="btn btn-block create-account"onClick={handleLogin}>
            Login
          </button>
        </div>
        <div>
           <span className="center">
          Don't have an account? <a href="/register">Create Account</a>
        </span>
        </div>
       
      </form>
      <div className="social-media">
        {/* <h5>Sign up with social media</h5> */}
        <div className="social-icons">
          <a href="#">
            <i className="icon-social-facebook" title="Facebook"></i>
          </a>
          <a href="#">
            <i className="icon-social-google" title="Google"></i>
          </a>
          <a href="#">
            <i className="icon-social-twitter" title="Twitter"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
