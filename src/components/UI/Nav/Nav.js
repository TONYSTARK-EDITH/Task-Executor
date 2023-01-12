import React from "react";
import Button from "../Button/Button";
import classes from "./Nav.module.css";
import code from "../../Helpers/StatusCode";
import { MdLogout } from "react-icons/md";
const Nav = (props) => {
  const buttonProps = {
    type: "button",
    onClick: props.logout,
  };
  return (
    <nav className={classes.task__nav}>
      <div className={classes.task__nav__fields}>
        <img
          className={classes.task__nav__img}
          width="50"
          height="50"
          src="./icon.png"
          alt="LOGO"
        ></img>
        <p>
          Welcome {props.name} (
          {props.isMaster
            ? code.MASTER.toUpperCase()
            : code.STUDENT.toUpperCase()}
          )
        </p>
        <Button className={classes.task__btn} attr={buttonProps}>
          Logout
        </Button>
        <Button className={classes.task__media__btn} attr={buttonProps}>
          <MdLogout></MdLogout>
        </Button>
      </div>
    </nav>
  );
};

export default Nav;
