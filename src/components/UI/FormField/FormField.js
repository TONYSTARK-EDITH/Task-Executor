import React from "react";
import classes from "./FormField.module.css";

const FormField = (props) => {
  return (
    <div
      className={`${classes.task__form__field} ${
        props.className ? props.className : ""
      }`}
    >
      {props.children}
    </div>
  );
};

export default FormField;
