import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  signup,
  login,
  updateAuthData,
  startLoading,
  stopLoading,
  unsetgame,
  setgame,
  seterr,
  setsuccess,
} from "../redux/slices/auth";
import jwt from "jwt-decode";
import axios from "axios";
import { Alert, Snackbar } from "@mui/material";
export default function (props) {
  const { err,success } = useSelector((state) => state.auth);
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;
  const dispatch = useDispatch();
  const handleClose = () => {
    setState({ ...state, open: false });
    dispatch(seterr(""));
    dispatch(setsuccess(""));
  };
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
    setUsername(username.trim());
    dispatch(signup({ name, username, password }));
    changeAuthMode();
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // setUsername(username.trim());
    dispatch(login({ username, password }));
  };

  useEffect(()=>{
    if(err || success){
      setState({...state,open:true})
    }
  },[err,success])

  const userAuthnticated = async () => {
    // dispatch(startLoading());
    axios
      .get(
        "https://tasty-gold-turtleneck.cyclic.app/user/isUserAuth",
        {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        console.log(response);
        if (response.data.auth) {
          // dispatch(stopLoading());
          const data = jwt(response.data.token);
          localStorage.setItem("token", response.data.token);
          console.log(data);
          if (data.success) {
            if (data.level == 0) {
              dispatch(unsetgame());
            } else {
              dispatch(setgame());
            }
            dispatch(
              updateAuthData({
                level: data.level,
                isAdmin: data.isAdmin,
                isAuth: data.isAuth,
                name: data.name,
                username: data.username,
                isTimer: true,
                initialTime: data.r1s,
                completed: data.completed,
                gameon: data.level === 0 ? false : true,
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
          // dispatch(stopLoading());
          updateAuthData({
            level: null,
            isAdmin: null,
            isAuth: false,
            name: null,
            username: null,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        // dispatch(stopLoading());
      });
  };

  useEffect(() => {
    if (token) {
      userAuthnticated();
    }
  }, []);

  if (authMode === "signin") {
    return (
      <>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={handleClose}
          key={vertical + horizontal}
          autoHideDuration={3000}
        >
          {err ? (
            <Alert mt={2} mb={4} severity="error">
              {err}
            </Alert>
          ) : success ? (
            <Alert mt={2} mb={4} severity="success">
              {success}
            </Alert>
          ) : null}
        </Snackbar>
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
      </>
    );
  }

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        {err ? (
          <Alert mt={2} mb={4} severity="error">
            {err}
          </Alert>
        ) : success ? (
          <Alert mt={2} mb={4} severity="success">
            {success}
          </Alert>
        ) : null}
      </Snackbar>
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
    </>
  );
}
