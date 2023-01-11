import React, { useState, useEffect } from "react";
import FormField from "../UI/FormField/FormField";
import Form from "../UI/Form/Form";
import Input from "../UI/Input/Input";
import classes from "./TaskObjects.module.css";
import { BiChevronsDown, BiChevronsUp } from "react-icons/bi";
import { RiDeleteBin2Fill } from "react-icons/ri";
import Button from "../UI/Button/Button";
import taskExecutor from "../Helpers/TaskExecutor";
const TaskObjects = (props) => {
  const [a, setA] = useState(null);
  const [b, setB] = useState(null);
  const [c, setC] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const { id } = props;

  useEffect(() => {
    setA(props.a);
    setB(props.b);
    setC(props.ans);
  }, [props.a, props.b, props.ans]);

  const expandChangeHandler = () => {
    setIsExpanded((prev) => {
      return !prev;
    });
  };

  const aChangeHandler = (e) => {
    setA(+e.target.value);
  };

  const bChangeHandler = (e) => {
    setB(+e.target.value);
  };

  const calculate = (e) => {
    e.preventDefault();
    const operatorFn = taskExecutor[taskExecutor.mathOps[props.ops]];
    const leftFn = taskExecutor[taskExecutor.numbersObj[+a]];
    const rightFn = taskExecutor[taskExecutor.numbersObj[+b]];
    const ans = leftFn(operatorFn(rightFn()));
    setC(ans);
    props.updateTask(id, a, b, ans);
  };

  const deleteTask = () => {
    props.deleteTask(id);
  };

  const expandProps = {
    type: "button",
    className: classes.task__expand__btn,
  };

  const deleteProps = {
    type: "button",
    className: classes.task__obj__del,
    onClick: deleteTask,
  };

  const calcProps = {
    type: "submit",
  };

  return (
    <div className={classes.task__obj}>
      <div className={classes.task__obj__header} onClick={expandChangeHandler}>
        <span>{props.name} {  }</span>
        <Button attr={expandProps}>
          {!isExpanded && <BiChevronsDown></BiChevronsDown>}
          {isExpanded && <BiChevronsUp></BiChevronsUp>}
        </Button>
      </div>
      <div
        className={`${
          isExpanded
            ? classes.task__obj__details__expanded
            : classes.task__obj__hide
        }`}
      >
        <Form onSubmit={calculate} className={classes.task__obj__form}>
          <FormField>
            <Input
              id="a"
              type="number"
              value={a ? a : ""}
              onChange={aChangeHandler}
              className={classes.task__obj__input}
              placeholder="A"
              min={1}
              max={9}
              readonly={props.readonly}
              required={props.required}
            />
          </FormField>
          <FormField>
            <h2>{props.ops}</h2>
          </FormField>
          <FormField>
            <Input
              id="b"
              type="number"
              value={b ? b : ""}
              onChange={bChangeHandler}
              className={classes.task__obj__input}
              placeholder="B"
              min={1}
              max={9}
              readonly={props.readonly}
              required={props.required}
            />
          </FormField>
          <FormField>
            <h2>{"="}</h2>
          </FormField>
          <FormField>
            <Input
              id="c"
              type="number"
              value={c ? c : ""}
              onChange={() => {}}
              className={classes.task__obj__input}
              placeholder="C"
              min={1}
              max={9}
              readonly={true}
              required={false}
            />
          </FormField>
          <FormField className={classes.task__obj__calc}>
            <Button
              className={
                !props.readonly
                  ? classes.task__obj__hide
                  : classes.task__obj__show
              }
              attr={deleteProps}
            >
              <RiDeleteBin2Fill></RiDeleteBin2Fill>
            </Button>
            <Button
              className={
                props.readonly
                  ? classes.task__obj__hide
                  : classes.task__obj__show
              }
              attr={calcProps}
            >
              Calculate
            </Button>
          </FormField>
        </Form>
      </div>
    </div>
  );
};

export default TaskObjects;
