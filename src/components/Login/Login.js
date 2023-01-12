import React, { useState } from "react";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";
import Input from "../UI/Input/Input";
import FormField from "../UI/FormField/FormField";
import Form from "../UI/Form/Form";

const Login = (props) => {
  const [userName, setUserName] = useState("");

  const [passWord, setPassWord] = useState("");

  const login = (e) => {
    e.preventDefault();
    props.onLogin(userName, passWord).then((resp) => {
      if (resp) {
        setUserName("");
        setPassWord("");
      }
    });
  };

  const userNameChangeHandler = (e) => {
    setUserName(e.target.value);
  };

  const passWordChangeHandler = (e) => {
    setPassWord(e.target.value);
  };

  const onRegisterProps = {
    className: classes.task__line__btn,
    type: "button",
    onClick: props.onChange,
  };
  const onSubmitProps = {
    type: "submit",
  };

  return (
    <div className={classes.task__login}>
      <Card>
        <Form onSubmit={login}>
          <FormField>
            <Input
              id="username"
              type="email"
              value={userName}
              onChange={userNameChangeHandler}
              placeholder="Username"
              required={true}
            />
          </FormField>
          <FormField>
            <Input
              id="password"
              type="password"
              value={passWord}
              onChange={passWordChangeHandler}
              placeholder="Password"
              required={true}
            />
          </FormField>
          <FormField>
            <span>
              Not a user ? <Button attr={onRegisterProps}>Register</Button>
            </span>
          </FormField>
          <FormField>
            <Button attr={onSubmitProps}>Log In</Button>
          </FormField>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
