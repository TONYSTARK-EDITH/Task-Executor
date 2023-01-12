import React, { useState } from "react";
import classes from "./Register.module.css";
import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";
import Input from "../UI/Input/Input";
import FormField from "../UI/FormField/FormField";
import Form from "../UI/Form/Form";

const Register = (props) => {
  const [name, setName] = useState("");

  const [userName, setUserName] = useState("");

  const [passWord, setPassWord] = useState("");

  const [isMaster, setIsMaster] = useState(false);

  const nameChangeHandler = (e) => {
    setName(e.target.value);
  };

  const userNameChangeHandler = (e) => {
    setUserName(e.target.value);
  };

  const passWordChangeHandler = (e) => {
    setPassWord(e.target.value);
  };

  const isMasterChangeHandler = (e) => {
    setIsMaster(e.target.checked);
  };

  const register = (e) => {
    e.preventDefault();
    props.onRegister(name, userName, passWord, isMaster).then((resp) => {
      if (resp) {
        setUserName("");
        setPassWord("");
        setName("");
        setIsMaster(false);
      }
    });
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
    <div className={classes.task__register}>
      <Card className={classes.task__reg__card}>
        <Form onSubmit={register}>
          <FormField>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={nameChangeHandler}
              placeholder="Name"
              required={true}
            />
          </FormField>
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
            <Input
              className={classes.task__checkbox}
              id="checkbox"
              type="checkbox"
              value={isMaster}
              onChange={isMasterChangeHandler}
              required={false}
            />
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
        </Form>
      </Card>
    </div>
  );
};

export default Register;
