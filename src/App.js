import "./App.css";
import React, { useState } from "react";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { ToastContainer, toast } from "react-toastify";
import { getApps } from "firebase/app";
import "react-toastify/dist/ReactToastify.css";
import s from "./components/Helpers/TaskExecutor";

const App = () => {
  const [loginUI, setLoginUI] = useState(true);

  const toastProps = {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };
  console.log(s.one(s.add(s.two())));
  const loginUiChangeHandler = () => {
    getApps().forEach((e) => {
      console.log(e._options);
    });
    toast.success("Login", toastProps);
    setLoginUI(false);
  };

  const registerUiChangeHandler = () => {
    toast.success("Register", toastProps);
    setLoginUI(true);
  };

  return (
    <>
      {loginUI && <Login onChange={loginUiChangeHandler} />}
      {!loginUI && <Register onChange={registerUiChangeHandler} />}

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
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
