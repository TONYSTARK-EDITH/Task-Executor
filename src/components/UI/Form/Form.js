import React from "react";
import classes from "./Form.module.css";

const Form = (props) => {
  return (
    <form
      className={`${props.className ? props.className + " " : ""}${
        classes.task__form
      }`}
      onSubmit={props.onSubmit}
    >
      {props.children}
    </form>
  );
};

export default Form;
