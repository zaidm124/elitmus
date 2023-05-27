import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { signup, login, updateAuthData } from "../redux/slices/auth";
import jwt from "jwt-decode";
import axios from "axios";
export default function (props) {
  const dispatch = useDispatch();
  let [authMode, setAuthMode] = useState("signin");
  const token = localStorage.getItem("token");
  const msg = localStorage.getItem("msg");

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
    setName("");
    setPassword("");
    setUsername("");
  };

  const handleregister = (e) => {
    e.preventDefault();
    dispatch(signup({ name, username, password }));
    changeAuthMode();
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login({ username, password }));
  };

  const userAuthnticated = async () => {
    axios
      .get("http://localhost:5000/user/isUserAuth", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response);
        if (response.data.auth) {
          const data = jwt(response.data.token);
          localStorage.setItem("token", response.data.token);
          console.log(data);
          if (data.success) {
            dispatch(
              updateAuthData({
                level: data.level,
                isAdmin: data.isAdmin,
                isAuth: data.isAuth,
                name: data.name,
                username: data.username,
                isTimer:true,
                initialTime:data.r1s,
                completed:data.completed
              })
            );
          } else {
            dispatch(
              updateAuthData({
                level: null,
                isAdmin: null,
                isAuth: false,
                name: null,
                username: null,
              })
            );
          }
        } else {
          updateAuthData({
            level: null,
            isAdmin: null,
            isAuth: false,
            name: null,
            username: null,
          });
        }
      });
  };

  useEffect(() => {
    if (token) {
      userAuthnticated();
    }
  }, []);

  if (authMode === "signin") {
    return (
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Sign Up
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Username</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                className="form-control mt-1"
                placeholder="Enter Username"
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control mt-1"
                placeholder="Enter password"
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button
                onClick={handleLogin}
                type="submit"
                className="btn btn-primary"
              >
                Sign In
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" onClick={changeAuthMode}>
              Sign In
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Full Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="form-control mt-1"
              placeholder="Enter Full Name"
            />
          </div>
          <div className="form-group mt-3">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control mt-1"
              placeholder="Enter Username"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control mt-1"
              placeholder="Enter Password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button
              onClick={handleregister}
              type="submit"
              className="btn btn-primary"
            >
              Register
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
