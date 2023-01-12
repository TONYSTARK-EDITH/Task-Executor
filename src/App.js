import "./App.css";
import React, { useState, useEffect } from "react";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { ToastContainer, toast } from "react-toastify";
import db from "./components/Helpers/FireStoreDb";
import code from "./components/Helpers/StatusCode";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/Home/Home";

const App = () => {
  const [email, setEmail] = useState("");

  const [name, setName] = useState("");

  const [loginUI, setLoginUI] = useState(true);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isMaster, setIsMaster] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(code.LOGGED_IN) === "1") {
      setIsLoggedIn(true);
      setName(localStorage.getItem(code.NAME));
      setEmail(localStorage.getItem(code.EMAIL));
      if (localStorage.getItem(code.MASTER) === "1") {
        setIsMaster(true);
      }
    }
  }, [isLoggedIn, isMaster]);

  const login = async (userName, passWord) => {
    const [statusCode, data] = await db.getUser(userName);
    if (statusCode === code.EMPTY_DOC) {
      toast.error(`${userName} is not registered`);
    } else if (statusCode === code.NO_INTERNET_CONNECTIONS) {
      toast.error("No Internet Connections");
    } else {
      if (passWord === data.password) {
        setIsLoggedIn(true);
        localStorage.setItem(code.LOGGED_IN, "1");
        localStorage.setItem(code.NAME, data.name);
        localStorage.setItem(code.EMAIL, data.username);
        setName(data.name);
        setEmail(data.username);
        if (data.ismaster) {
          setIsMaster(true);
          localStorage.setItem(code.MASTER, "1");
        }
      } else {
        toast.error("Password is incorrect");
      }
    }
  };

  const register = async (name, userName, passWord, isMaster) => {
    const [statusCode, error] = await db.addUsers(
      name,
      userName,
      passWord,
      isMaster
    );
    if (statusCode === code.SUCCESS) {
      toast.success("User registered successfully");
    } else if (statusCode === code.USER_EXISTS) {
      toast.warn(`${userName} already exists`);
    } else if (statusCode === code.NO_INTERNET_CONNECTIONS) {
      toast.error("No Internet Connections");
    } else {
      toast.error(error);
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setIsMaster(false);
    localStorage.removeItem(code.LOGGED_IN);
    localStorage.removeItem(code.MASTER);
    localStorage.removeItem(code.NAME);
    localStorage.removeItem(code.EMAIL);
  };

  const loginUiChangeHandler = () => {
    setLoginUI(false);
  };

  const registerUiChangeHandler = () => {
    setLoginUI(true);
  };

  return (
    <>
      {loginUI && !isLoggedIn && (
        <Login onChange={loginUiChangeHandler} onLogin={login} />
      )}
      {!loginUI && !isLoggedIn && (
        <Register onChange={registerUiChangeHandler} onRegister={register} />
      )}

      {isLoggedIn && (
        <Home isMaster={isMaster} email={email} name={name} logout={logout} />
      )}

      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        limit={1}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="dark"
      />
    </>
  );
};

export default App;
