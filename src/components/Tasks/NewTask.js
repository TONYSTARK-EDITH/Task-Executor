import React from "react";
import Card from "../UI/Card/Card";
import classes from "./NewTask.module.css";
import ReactDOM from "react-dom";
import FormField from "../UI/FormField/FormField";
import task from "../Helpers/TaskExecutor";
import Button from "../UI/Button/Button";
import Form from "../UI/Form/Form";
const NewTask = (props) => {
  const onCancel = () => {
    props.close();
  };

  const cancelProps = {
    type: "button",
    onClick: onCancel,
  };
  const assignProps = {
    type: "submit",
  };

  const addNewTask = (e) => {
    e.preventDefault();
    props.addNewTask(
      document.getElementById("students").value,
      document.getElementById("ops").value
    );
  };

  return (
    <>
      {ReactDOM.createPortal(
        <Card className={classes.task__card__overlay}>
          <Form onSubmit={addNewTask}>
            <FormField className={classes.task__form__field}>
              <label htmlFor="students">Assign To</label>
              <select name="students" id="students">
                <option value="ALL">ALL</option>
                {props.students.map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
              </select>
            </FormField>
            <FormField className={classes.task__form__field}>
              <label htmlFor="ops">Assign Operation</label>
              <select name="ops" id="ops">
                {Object.values(task.mathOps).map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
              </select>
            </FormField>
            <FormField className={classes.task__form__field}>
              <Button className={classes.task__cancel__btn} attr={cancelProps}>
                Cancel
              </Button>
              <Button attr={assignProps}>Assign</Button>
            </FormField>
          </Form>
        </Card>,
        document.getElementById("overlay")
      )}
    </>
  );
};

export default NewTask;
