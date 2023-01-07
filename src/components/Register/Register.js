import React, { useState } from "react";
import classes from "./Register.module.css";
import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";
import Input from "../UI/Input/Input";
import FormField from "../UI/FormField/FormField";

const Register = (props) => {
  const [userName, setUserName] = useState("");

  const [passWord, setPassWord] = useState("");

  const userNameChangeHandler = (e) => {
    setUserName(e.target.value);
  };

  const passWordChangeHandler = (e) => {
    setPassWord(e.target.value);
  };

  const userNameProps = {
    id: "username",
    type: "email",
    value: userName,
    onChange: userNameChangeHandler,
    placeholder: "Username",
  };

  const passWordProps = {
    id: "password",

    type: "password",
    value: passWord,
    onChange: passWordChangeHandler,
    placeholder: "Password",
  };

  const masterOrStudentProps = {
    className: classes.task__checkbox,
    id: "checkbox",
    type: "checkbox",
    value: "Master",
  };

  const onRegisterProps = {
    className: classes.task__line__btn,
    type: "button",
    onClick: props.onChange,
  };
  const onSubmitProps = {
    type: "submit",
    onClick: () => {},
  };

  return (
    <div className={classes.task__register}>
      <Card>
        <FormField>
          <Input attr={userNameProps} />
        </FormField>
        <FormField>
          <Input attr={passWordProps} />
        </FormField>
        <FormField>
          <Input attr={masterOrStudentProps} />
          <label htmlFor="checkbox">Master</label>
        </FormField>
        <FormField>
          <span>
            Already a user ? <Button attr={onRegisterProps}>Login</Button>
          </span>
        </FormField>
        <FormField>
          <Button attr={onSubmitProps}>Register</Button>
        </FormField>
      </Card>
    </div>
  );
};

export default Register;
