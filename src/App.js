import "./App.css";
import React, { useState, useEffect } from "react";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { ToastContainer, toast } from "react-toastify";
import db from "./components/Helpers/FireStoreDb";
import code from "./components/Helpers/StatusCode";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/Home/Home";
import { Dna } from "react-loader-spinner";

const App = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loginUI, setLoginUI] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMaster, setIsMaster] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem(code.LOGGED_IN) === "1") {
      if (window.navigator.onLine) {
        try {
          db.checkIfUserExists(localStorage.getItem(code.EMAIL)).then(
            (resp) => {
              if (resp) {
                setIsLoggedIn(true);
                setName(localStorage.getItem(code.NAME));
                setEmail(localStorage.getItem(code.EMAIL));
                if (localStorage.getItem(code.MASTER) === "1") {
                  setIsMaster(true);
                }
              } else {
                logout();
              }
              setTimeout(() => {
                setLoading(false);
              }, 1000);
            }
          );
        } catch (e) {
          toast.error(e.message);
        }
      } else {
        setTimeout(() => {
          setLoading(false);
          toast.error("No Internet Connection");
        }, 1000);
      }
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [isLoggedIn, isMaster]);

  const login = async (userName, passWord) => {
    if (window.navigator.onLine) {
      if (localStorage.getItem(code.LOGGED_IN) === "1") {
        setIsLoggedIn(true);
        toast.dismiss();
        return;
      }
      const [statusCode, data] = await db.getUser(userName);
      if (statusCode === code.EMPTY_DOC) {
        toast.error(`${userName} is not registered`);
      } else if (statusCode === code.ERROR) {
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
          return true;
        } else {
          toast.error("Password is incorrect");
        }
      }
    } else {
      toast.error("No Internet Connection");
    }
    return false;
  };

  const register = async (name, userName, passWord, isMaster) => {
    if (window.navigator.onLine) {
      if (localStorage.getItem(code.LOGGED_IN) === "1") {
        setIsLoggedIn(true);
        toast.dismiss();
        return;
      }
      const [statusCode, error] = await db.addUsers(
        name,
        userName,
        passWord,
        isMaster
      );
      if (statusCode === code.SUCCESS) {
        toast.success("User registered successfully");
        return true;
      } else if (statusCode === code.USER_EXISTS) {
        toast.warn(`${userName} already exists`);
      } else if (statusCode === code.ERROR) {
        toast.error("No Internet Connections");
      } else {
        toast.error(error);
      }
    } else {
      toast.error("No Internet Connection");
    }
    return false;
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
      {loading && (
        <div className="task__loader">
          <Dna
            visible={loading}
            height="80"
            width="80"
            ariaLabel="dna-loading"
          />
        </div>
      )}
      {loginUI && !isLoggedIn && !loading && (
        <Login onChange={loginUiChangeHandler} onLogin={login} />
      )}
      {!loginUI && !isLoggedIn && !loading && (
        <Register onChange={registerUiChangeHandler} onRegister={register} />
      )}

      {isLoggedIn && !loading && (
        <Home isMaster={isMaster} email={email} name={name} logout={logout} />
      )}

      <ToastContainer
        position="bottom-right"
        autoClose={1500}
        limit={5}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="dark"
      />
    </>
  );
};

export default App;
