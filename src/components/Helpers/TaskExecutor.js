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
    this.#generateFunction();
  }

  #generateFunction() {
    Object.entries(this.numbersObj).forEach((e) => {
      TaskExecutor.prototype[e[1]] = (ops = null) => eval(+e[0] + ops);
    });

    Object.entries(this.mathOps).forEach((e) => {
      TaskExecutor.prototype[e[1]] = (operand) => `${e[0]}${operand}`;
    });
  }
}

const taskExecutor = new TaskExecutor();
Object.freeze(taskExecutor);

export default taskExecutor;
