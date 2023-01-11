import {
  getFirestore,
  getDoc,
  setDoc,
  doc,
  collection,
  where,
  query,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

import CryptoJS from "react-native-crypto-js";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import code from "./StatusCode";

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
        .decrypt(process.env.REACT_APP_ZERO, process.env.REACT_APP_ONE)
        .toString(CryptoJS.enc.Utf8),
      authDomain: this.#encrypt
        .decrypt(process.env.REACT_APP_TWO, process.env.REACT_APP_THREE)
        .toString(CryptoJS.enc.Utf8),
      databaseURL: this.#encrypt
        .decrypt(process.env.REACT_APP_FOUR, process.env.REACT_APP_FIVE)
        .toString(CryptoJS.enc.Utf8),
      projectId: this.#encrypt
        .decrypt(process.env.REACT_APP_SIX, process.env.REACT_APP_SEVEN)
        .toString(CryptoJS.enc.Utf8),
      storageBucket: this.#encrypt
        .decrypt(process.env.REACT_APP_EIGHT, process.env.REACT_APP_NINE)
        .toString(CryptoJS.enc.Utf8),
      messagingSenderId: this.#encrypt
        .decrypt(process.env.REACT_APP_TEN, process.env.REACT_APP_ELEVEN)
        .toString(CryptoJS.enc.Utf8),
      appId: this.#encrypt
        .decrypt(process.env.REACT_APP_TWELVE, process.env.REACT_APP_THIRTEEN)
        .toString(CryptoJS.enc.Utf8),
      measurementId: this.#encrypt
        .decrypt(process.env.REACT_APP_FOURTEEN, process.env.REACT_APP_FIFTEEN)
        .toString(CryptoJS.enc.Utf8),
    };
    this.#app = initializeApp(this.#firebaseConfig);
    this.#auth = getAuth(this.#app);
    this.#db = getFirestore(this.#app);
  }

  async getAllStudents(field = "ALL") {
    const userRef = collection(this.#db, code.USER);
    const studQuery = query(userRef, where("ismaster", "==", false));
    const studQuerySnap = await getDocs(studQuery);
    let studArr = [];
    studQuerySnap.forEach((students) => {
      if (field === "ALL") studArr.push(students.data());
      else studArr.push(students.data()[field]);
    });
    return studArr;
  }

  async getUser(id) {
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
  }

  async checkIfUserExists(id) {
    const docRef = doc(this.#db, code.USER, id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
  }

  async addUsers(name, username, password, ismaster) {
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
  }

  async addTasks(master, student, lop, ops, rop, ans) {
    let count = 0;
    for (let s of student) {
      const taskObj = {
        master: master,
        student: s,
        lop: lop,
        ops: ops,
        rop: rop,
        ans: ans,
      };
      try {
        const taskRef = collection(this.#db, code.TASKS);
        await addDoc(taskRef, taskObj);
        count++;
      } catch (e) {
        return [code.ERROR, e.message];
      }
    }
    if (count === student.length) {
      return [code.SUCCESS, code.SUCCESS];
    } else {
      return [code.ERROR, "There was some error adding tasks"];
    }
  }

  async getTasks(field, value) {
    const taskRef = collection(this.#db, code.TASKS);
    const taskQuery = query(taskRef, where(field, "==", value));
    const taskSnap = await getDocs(taskQuery);
    let taskArr = [];
    taskSnap.forEach((e) => {
      taskArr.push({ id: e.id, ...e.data() });
    });
    return taskArr;
  }

  async deleteTask(id) {
    const taskRef = doc(this.#db, code.TASKS, id);
    try {
      await deleteDoc(taskRef);
      return [code.SUCCESS, code.SUCCESS];
    } catch (e) {
      return [code.ERROR, e.message];
    }
  }

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

const db = new FireStoreDb();
Object.freeze(db);

export default db;
