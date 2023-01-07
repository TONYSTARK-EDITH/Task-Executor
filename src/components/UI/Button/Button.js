import React from "react";
import classes from "./Button.module.css";
const Button = (props) => {
  return (
    <button
      type={props.attr.type}
      className={`${
        props.attr.className ? props.attr.className : classes.task__btn
      }`}
      onClick={props.attr.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
