import React from "react";
import classes from "./Input.module.css";

const Input = (props) => {
  return (
    <>
      {props.required && (
        <input
          type={props.type}
          className={`${classes.task__input}${
            props.className ? " " + props.className : ""
          }`}
          id={props.id}
          value={props.value}
          onChange={props.onChange}
          placeholder={props.placeholder}
          min={props.min}
          max={props.max}
          required
        />
      )}
      {!props.required && !props.readonly && (
        <input
          type={props.type}
          className={`${classes.task__input}${
            props.className ? " " + props.className : ""
          }`}
          id={props.id}
          value={props.value}
          onChange={props.onChange}
          placeholder={props.placeholder}
          min={props.min}
          max={props.max}
        />
      )}
      {props.readonly && (
        <input
          type={props.type}
          className={`${classes.task__input}${
            props.className ? " " + props.className : ""
          }`}
          value={props.value}
          onChange={props.onChange}
          id={props.id}
          placeholder={props.placeholder}
          min={props.min}
          max={props.max}
          readOnly
        />
      )}
    </>
  );
};

export default Input;
