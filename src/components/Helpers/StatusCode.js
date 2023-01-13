/**
 * STATUS CODE
 *
 * * It stores all the statuscode
 * * List of all Status Codes
 * * LOGGED_IN
 * * MASTER
 * * NAME
 * * EMAIL
 * * STUDENT
 * * USER
 * * TASKS
 * * EMPTY_DOC
 * * USER_EXISTS
 * * SUCCESS
 * * ERROR
 *
 */
class StatusCode {
  constructor() {
    this.LOGGED_IN = "LOGGED_IN";
    this.MASTER = "master";
    this.NAME = "NAME";
    this.EMAIL = "EMAIL";
    this.STUDENT = "student";
    this.USER = "users";
    this.TASKS = "tasks";
    this.EMPTY_DOC = 2;
    this.USER_EXISTS = 1;
    this.SUCCESS = 0;
    this.ERROR = -1;
  }
}

const statusCode = new StatusCode();
Object.freeze(statusCode);
export default statusCode;
