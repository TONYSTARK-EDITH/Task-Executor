import React from "react";
import classes from "./Input.module.css";

const Input = (props) => {
  return (
    <input
      type={props.attr.type}
      className={` ${classes.task__input} ${
        props.attr.className ? props.attr.className : ""
      }`}
      id={props.attr.id}
      value={props.attr.value}
      onChange={props.attr.onChange}
      placeholder={props.attr.placeholder}
    />
  );
};

export default Input;
