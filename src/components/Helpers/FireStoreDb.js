import {
  getFirestore,
  getDoc,
  setDoc,
  doc,
  collection,
  where,
  query,
  getDocs,
  deleteDoc,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import CryptoJS from "react-native-crypto-js";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import code from "./StatusCode";

/**
 * FIRESTOREDB
 *
 * * Initialize firebase and start a firestore db instance
 * * Contains all the methods for collections
 *
 * @param db Firestore Database Object
 * @param firebaseConfig Firebase configuration object
 * @param app Firebase app object
 * @param auth Firebase Authentication object
 * @param encrypt CryptoJS Encryption Method
 */
class FireStoreDb {
  #db;
  #firebaseConfig;
  #app;
  #auth;
  #encrypt;
  constructor() {
    this.#encrypt = CryptoJS.AES;
    this.#firebaseConfig = {
      apiKey: this.#encrypt
        .decrypt(process.env.REACT_APP_2, process.env.REACT_APP_1)
        .toString(CryptoJS.enc.Utf8),
      authDomain: this.#encrypt
        .decrypt(process.env.REACT_APP_4, process.env.REACT_APP_3)
        .toString(CryptoJS.enc.Utf8),
      projectId: this.#encrypt
        .decrypt(process.env.REACT_APP_6, process.env.REACT_APP_5)
        .toString(CryptoJS.enc.Utf8),
      storageBucket: this.#encrypt
        .decrypt(process.env.REACT_APP_8, process.env.REACT_APP_7)
        .toString(CryptoJS.enc.Utf8),
      messagingSenderId: this.#encrypt
        .decrypt(process.env.REACT_APP_10, process.env.REACT_APP_9)
        .toString(CryptoJS.enc.Utf8),
      appId: this.#encrypt
        .decrypt(process.env.REACT_APP_12, process.env.REACT_APP_11)
        .toString(CryptoJS.enc.Utf8),
      measurementId: this.#encrypt
        .decrypt(process.env.REACT_APP_14, process.env.REACT_APP_13)
        .toString(CryptoJS.enc.Utf8),
    };
    this.#app = initializeApp(this.#firebaseConfig);
    this.#auth = getAuth(this.#app);
    if (this.#auth.currentUser === null) {
      signInWithEmailAndPassword(
        this.#auth,
        this.#encrypt
          .decrypt(process.env.REACT_APP_16, process.env.REACT_APP_15)
          .toString(CryptoJS.enc.Utf8),
        process.env.REACT_APP_17
      );
    }
    this.#db = getFirestore(this.#app);
  }

  /**
   * getStudents
   *
   * * If field is set to all Returns an array of all the users who is students
   * * else it returns an array of all the users who is student with a particular field
   *
   * @param {String} field
   * @returns {Array} studArr
   */
  async getStudents(field = "ALL") {
    try {
      const userRef = collection(this.#db, code.USER);
      const studQuery = query(userRef, where("ismaster", "==", false));
      const studQuerySnap = await getDocs(studQuery);
      let studArr = [];
      studQuerySnap.forEach((students) => {
        if (field === "ALL") studArr.push(students.data());
        else studArr.push(students.data()[field]);
      });
      return studArr;
    } catch (e) {
      return code.NO_INTERNET_CONNECTIONS;
    }
  }

  /**
   * getUser
   *
   * * Returns an array of two elements containing status code and data
   * * If there is no error in executing the function then the data would the user details
   * * else the data would be the error message
   *
   * @param {String} id
   * @returns {Array} [statusCode, data]
   */

  async getUser(id) {
    try {
      let docRef;
      if (id) {
        docRef = doc(this.#db, code.USER, id);
      } else {
        return [code.ERROR, "Please provide id"];
      }
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return [code.SUCCESS, docSnap.data()];
      } else {
        return [code.EMPTY_DOC, {}];
      }
    } catch (e) {
      return [code.NO_INTERNET_CONNECTIONS, e.message];
    }
  }

  /**
   *
   * checkIfUserExists
   *
   * * If the id is present in the document users then it returns true
   * * else false
   *
   * @param {String} id
   * @returns true or false or status code
   */
  async checkIfUserExists(id) {
    try {
      const docRef = doc(this.#db, code.USER, id);
      const docSnap = await getDoc(docRef);
      return docSnap.exists();
    } catch (e) {
      throw code.NO_INTERNET_CONNECTIONS;
    }
  }

  /**
   *
   * addUsers
   *
   * * It adds the given user information to the document user with the id username
   * * If the user already exists it returns the status code and the id
   * * else it adds to the document and returns the success status code
   *
   *
   * @param {String} name
   * @param {String} username
   * @param {String} password
   * @param {boolean} ismaster
   * @returns {Array} [statusCode, data]
   */
  async addUsers(name, username, password, ismaster) {
    try {
      const id = username;
      const dataObj = {
        name: name,
        username: username,
        password: password,
        ismaster: ismaster,
      };
      const isUserExist = await this.checkIfUserExists(id);
      if (isUserExist) {
        return [code.USER_EXISTS, id];
      } else {
        try {
          const docRef = doc(this.#db, code.USER, id);
          await setDoc(docRef, dataObj);
          return [code.SUCCESS, id];
        } catch (e) {
          return [code.ERROR, e.message];
        }
      }
    } catch (e) {
      return [code.NO_INTERNET_CONNECTIONS, e.message];
    }
  }

  /**
   *
   * addTasks
   *
   * * It adds the task provided by the master to the list of students
   * * Uses batch wise writing
   *
   * @param {String} master
   * @param {Array} student
   * @param {Number} lop
   * @param {String} ops
   * @param {Number} rop
   * @param {Number} ans
   * @returns {Array} [statusCode, data]
   */
  async addTasks(master, student, lop, ops, rop, ans) {
    const batch = writeBatch(this.#db);
    for (let s of student) {
      const taskObj = {
        master: master,
        student: s,
        lop: lop,
        ops: ops,
        rop: rop,
        ans: ans,
      };
      const taskRef = doc(collection(this.#db, code.TASKS));
      batch.set(taskRef, taskObj);
    }
    try {
      await batch.commit();
      return [code.SUCCESS, code.SUCCESS];
    } catch (e) {
      return [code.ERROR, e.message];
    }
  }
  /**
   *
   * getTasks
   *
   * * Get the tasks from the document tasks with the field and value
   *
   *
   * @param {String} field The field is the field we need to filter the collection
   * @param {String} value The value is the value of the field
   * @returns {Array} taskArr
   */
  async getTasks(field, value) {
    try {
      const taskRef = collection(this.#db, code.TASKS);
      const taskQuery = query(taskRef, where(field, "==", value));
      const taskSnap = await getDocs(taskQuery);
      let taskArr = [];
      taskSnap.forEach((e) => {
        taskArr.push({ id: e.id, ...e.data() });
      });
      return taskArr;
    } catch (e) {
      return code.NO_INTERNET_CONNECTIONS;
    }
  }

  /**
   *
   * deleteTask
   *
   * * Deletes the collection task with the id if it exists
   *
   * @param {String} id
   * @returns {Array} [statusCode, msg]
   */
  async deleteTask(id) {
    const taskRef = doc(this.#db, code.TASKS, id);
    try {
      await deleteDoc(taskRef);
      return [code.SUCCESS, code.SUCCESS];
    } catch (e) {
      return [code.ERROR, e.message];
    }
  }

  /**
   *
   * updateTask
   *
   * * It allows to update a particular task by a student
   * * Updatable fields are lop, rop, ans
   *
   * @param {String} id
   * @param {Number} lop
   * @param {Number} rop
   * @param {Number} ans
   * @returns {Array} [statusCode, msg]
   */
  async updateTask(id, lop, rop, ans) {
    const updatedObj = {
      lop: lop,
      rop: rop,
      ans: ans,
    };
    const taskRef = doc(this.#db, code.TASKS, id);
    try {
      await updateDoc(taskRef, updatedObj);
      return [code.SUCCESS, code.SUCCESS];
    } catch (e) {
      return [code.ERROR, e.message];
    }
  }
}
/**
 * * Singleton Object for the FireStoreDb
 */
const db = new FireStoreDb();
Object.freeze(db);
export default db;
