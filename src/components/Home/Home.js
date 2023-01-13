import React, { useState, useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import Nav from "../UI/Nav/Nav";
import Button from "../UI/Button/Button";
import classes from "./Home.module.css";
import db from "../Helpers/FireStoreDb";
import NewTask from "../Tasks/NewTask";
import TaskObjects from "../Tasks/TaskObjects";
import taskExecutor from "../Helpers/TaskExecutor";
import { toast } from "react-toastify";
import code from "../Helpers/StatusCode";
import { FiRefreshCw } from "react-icons/fi";

const Home = (props) => {
  const [newTask, setNewTask] = useState(false);
  const [students, setStudents] = useState([]);
  const [taskObjs, setTaskObjs] = useState([]);
  const { email, name, isMaster } = props;

  const deleteNewTask = () => {
    document.getElementById("overlay").style.display = "none";
    setNewTask(false);
  };
  const addNewTask = useCallback(
    async (studs, ops) => {
      if (window.navigator.onLine) {
        let studArr = [];
        if (studs === "ALL") {
          studArr.push(...students);
        } else {
          studArr.push(studs);
        }
        const [statusCode, msg] = await db.addTasks(
          email,
          studArr,
          "",
          taskExecutor.opsMath[ops],
          "",
          ""
        );
        if (statusCode === code.SUCCESS) {
          toast.success("Tasks added");
          deleteNewTask();
        } else {
          toast.error(msg);
          deleteNewTask();
        }
      } else {
        toast.error("No Internet Connection");
      }
    },
    [email, students]
  );

  const retriveStudents = useCallback(async () => {
    if (newTask) {
      if (window.navigator.onLine) {
        const data = await db.getStudents("username");
        const [statusCode, msg] = data;
        if (statusCode === code.ERROR) {
          toast.error(msg);
          return;
        }
        setStudents(data);
      } else {
        toast.error("No Internet Connection");
      }
    }
  }, [newTask]);

  const retriveTask = useCallback(async () => {
    if (!newTask) {
      if (window.navigator.onLine) {
        const data = await db.getTasks(
          isMaster ? code.MASTER : code.STUDENT,
          email
        );
        const [statusCode, msg] = data;
        if (statusCode === code.ERROR) {
          toast.error(msg);
          return;
        }
        setTaskObjs(data);
      } else {
        toast.error("No Internet Connection");
      }
    }
  }, [newTask, isMaster, email]);

  const deleteTask = useCallback(
    async (id) => {
      if (window.navigator.onLine) {
        const [statusCode, msg] = await db.deleteTask(id);
        if (statusCode === code.SUCCESS) {
          toast.success("Task deleted successfully");
          retriveTask();
        } else {
          toast.error(msg);
        }
      } else {
        toast.error("No Internet Connection");
      }
    },
    [retriveTask]
  );

  const updateTask = useCallback(async (id, lop, rop, ans) => {
    if (window.navigator.onLine) {
      const [statusCode, msg] = await db.updateTask(id, lop, rop, ans);
      if (statusCode === code.SUCCESS) {
        toast.success("Task completed successfully");
      } else {
        toast.error(msg);
      }
    } else {
      toast.error("No Internet Connection");
    }
  }, []);

  useEffect(() => {
    retriveStudents();
    retriveTask();
  }, [retriveStudents, retriveTask]);

  const createTask = () => {
    document.getElementById("overlay").style.display = "flex";
    setNewTask(true);
  };

  const btnProps = {
    type: "button",
    onClick: createTask,
  };
  return (
    <>
      {newTask && isMaster && (
        <NewTask
          addNewTask={addNewTask}
          students={students}
          close={deleteNewTask}
        />
      )}
      {ReactDOM.createPortal(
        <Nav name={name} isMaster={isMaster} logout={props.logout} />,
        document.getElementById("nav")
      )}
      <div className={classes.task__master}>
        <div className={classes.task__master__header}>
          <h2>Assigned Tasks</h2>
          <Button
            className={`${classes.task__master__btn} ${classes.task__master__refresh}`}
            attr={{
              ...btnProps,
              onClick: () => {
                retriveTask();
                toast.info("Refreshed");
              },
            }}
          >
            <FiRefreshCw></FiRefreshCw>
          </Button>
          <Button
            className={
              isMaster ? classes.task__master__btn : classes.task__hide
            }
            attr={btnProps}
          >
            +
          </Button>
        </div>
        {taskObjs.map((e, i) => (
          <TaskObjects
            a={e.lop}
            b={e.rop}
            ans={e.ans}
            updateTask={updateTask}
            deleteTask={deleteTask}
            id={e.id}
            name={isMaster ? e.student : e.master}
            key={i}
            required={!isMaster}
            readonly={isMaster}
            ops={e.ops}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
