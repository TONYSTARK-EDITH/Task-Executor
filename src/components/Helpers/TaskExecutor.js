/**
 *
 * TaskExecutor
 *
 * This class has the function from numbers 1 to 9 and all the basic arithmetic operation functions
 * Only the singleton object will be exported and this class will be executed only once on the whole
 * session
 *
 */
class TaskExecutor {
  constructor() {
    this.numbersObj = {
      1: "one",
      2: "two",
      3: "three",
      4: "four",
      5: "five",
      6: "six",
      7: "seven",
      8: "eight",
      9: "nine",
    };
    this.mathOps = {
      "+": "add",
      "-": "subtract",
      "*": "multiply",
      "/": "dividedBy",
    };
    this.opsMath = {
      add: "+",
      subtract: "-",
      multiply: "*",
      dividedBy: "/",
    };
    this.#generateFunction();
  }
  /**
   * #generateFunction
   *
   * * This function is a private function which generates the
   * * functions from 1 to 9 and mathematical operators function
   * * This function will be executed when a object is created
   *
   * * The Numbers Function logic *
   * * It has an optional argument by default it would be null
   * * the function returns the floor division of the evaluated expr
   * * of respective number and the argument
   *
   * * The Basic Arithmetic Operators Function Logic *
   * * It has an argument operand it is an mandatory argument
   * * the function returns a string combined of the respective
   * * operator and the argument
   *
   * * How It Works *
   * * obj.one(obj.add(obj.three()))
   * * the obj.three() returns 3 since evaluated expr of 3 + null is 3 itself
   * * the obj.add(3) returns "+3"
   * * the obj.one("+3") returns 4 since evaluated expr of (1 + "+3") is 4
   * * Hence the desired output is achieved as per the requirement
   *
   *
   */
  #generateFunction() {
    Object.entries(this.numbersObj).forEach((e) => {
      TaskExecutor.prototype[e[1]] = (ops = null) =>
        // eslint-disable-next-line no-eval
        Math.floor(eval(+e[0] + ops));
    });

    Object.entries(this.mathOps).forEach((e) => {
      TaskExecutor.prototype[e[1]] = (operand) => `${e[0]}${operand}`;
    });
  }
}

/**
 * Singleton object for this class
 */
const taskExecutor = new TaskExecutor();
Object.freeze(taskExecutor);
export default taskExecutor;
