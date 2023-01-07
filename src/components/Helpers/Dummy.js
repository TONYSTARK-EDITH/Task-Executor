var SingletonFactory = (() => {
  const SingletonClass = () => {
    let obj = {};
    const numbersObj = {
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
    const mathOps = {
      "+": "add",
      "-": "subtract",
      "*": "multiply",
      "/": "dividedBy",
    };

    Object.entries(numbersObj).forEach((e) => {
      obj[e[1]] = (ops = null) => eval(+e[0] + ops);
    });

    Object.entries(mathOps).forEach((e) => {
      obj[e[1]] = (operand) => `${e[0]}${operand}`;
    });

    return obj;
  };

  var instance;

  return function () {
    if (!instance) {
      instance = new SingletonClass();
      delete instance.constructor;
    }
    return instance;
  };
})();
console.log(SingletonFactory());

const one = (ops = null) => eval(1 + ops);
const two = (ops = null) => eval(2 + ops);
const three = (ops = null) => eval(3 + ops);
const four = (ops = null) => eval(4 + ops);
const five = (ops = null) => eval(5 + ops);
const six = (ops = null) => eval(6 + ops);
const seven = (ops = null) => eval(7 + ops);
const eight = (ops = null) => eval(8 + ops);
const nine = (ops = null) => eval(9 + ops);

const add = (operand) => "+" + operand;
const subtract = (operand) => "-" + operand;
const multiply = (operand) => "*" + operand;
const dividedBy = (operand) => "/" + operand;

seven(add(two()));
