import React from "react";
import Button from "../Button/Button";
import classes from "./Nav.module.css";
import code from "../../Helpers/StatusCode";

const Nav = (props) => {
  const buttonProps = {
    type: "button",
    onClick: props.logout,
  };
  return (
    <nav className={classes.task__nav}>
      <div className={classes.task__nav__fields}>
        <p>
          Welcome {props.name} (
          {props.isMaster
            ? code.MASTER.toUpperCase()
            : code.STUDENT.toUpperCase()}
          )
        </p>
        <Button attr={buttonProps}>Logout</Button>
      </div>
    </nav>
  );
};

export default Nav;
