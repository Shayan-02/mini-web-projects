const MAIN_SCREEN = document.querySelector("#main-screen");
const SECOND_SCREEN = document.querySelector("#second-screen");
const ARRAY = [
  "C",
  "D",
  "7",
  "8",
  "9",
  "/",
  "4",
  "5",
  "6",
  "*",
  "1",
  "2",
  "3",
  "-",
  ".",
  "0",
  "=",
  "+",
];

const clear = () => {
  MAIN_SCREEN.textContent = 0;
  SECOND_SCREEN.textContent = "";
};

const removeLastValue = () => {
  if (MAIN_SCREEN.textContent.length <= 1) {
    MAIN_SCREEN.textContent = "";
  } else {
    MAIN_SCREEN.textContent = MAIN_SCREEN.textContent.slice(
      0,
      MAIN_SCREEN.textContent.length - 1
    );
  }
};

const displayNumbers = (text) => {
  if (MAIN_SCREEN.textContent == "0") {
    MAIN_SCREEN.textContent = text;
  } else {
    MAIN_SCREEN.textContent += text;
  }
};

const displayOperators = (ope, arr) => {
  if (
    !arr.includes(
      MAIN_SCREEN.textContent[MAIN_SCREEN.textContent.length - 1]
    ) &&
    MAIN_SCREEN.textContent[MAIN_SCREEN.textContent.length - 1] !== "."
  ) {
    MAIN_SCREEN.textContent += ope;
  }
};

const getLastValue = (text, ope) => {
  let values = text;
  let operators = ope;
  if (!operators.includes(values[0])) {
    values = "+" + values;
  }
  let operInValues = values.match(/[\+\-\/\*]/g);
  let lastOperator = operInValues[operInValues.length - 1];
  let lastValue = values.slice(values.lastIndexOf(lastOperator));
  return lastValue;
};

const displayDot = (dot) => {
  let operators = ARRAY.join("").match(/[\+\-\/\*]/g);
  let numValue = getLastValue(MAIN_SCREEN.textContent, operators);
  if (
    !numValue.includes(".") &&
    !operators.includes(numValue[numValue.length - 1])
  ) {
    MAIN_SCREEN.textContent += dot;
  }
};

const convertToNumbers = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== "-" && arr[i] !== "+" && arr[i] !== "*" && arr[i] !== "/") {
      arr[i] = Number(arr[i]);
    }
  }
};

const pemdasSort = (arr) => {
  let output = arr.sort((a, b) => {
    const precedence = {
      "+": 1,
      "-": 1,
      "/": 2,
      "*": 2,
    };
    return precedence[b] - precedence[a];
  });
  return output;
};

const divide = (arr, operator) => {
  let input = arr.slice(arr.indexOf(operator) - 1, arr.indexOf(operator) + 2);
  let result = input[0] / input[2];
  arr.splice(arr.indexOf(operator) - 1, 3, result);
};

const multiply = (arr, operator) => {
  let input = arr.slice(arr.indexOf(operator) - 1, arr.indexOf(operator) + 2);
  let result = input[0] * input[2];
  arr.splice(arr.indexOf(operator) - 1, 3, result);
};

const add = (arr, operator) => {
  let input = arr.slice(arr.indexOf(operator) - 1, arr.indexOf(operator) + 2);
  let result = input[0] + input[2];
  arr.splice(arr.indexOf(operator) - 1, 3, result);
};

const subtract = (arr, operator) => {
  let input = arr.slice(arr.indexOf(operator) - 1, arr.indexOf(operator) + 2);
  let result = input[0] - input[2];
  arr.splice(arr.indexOf(operator) - 1, 3, result);
};

const calculate = (array, ope) => {
  for (let i = 0; i < ope.length; i++) {
    if (ope[i] == "/") {
      divide(array, ope[i]);
    } else if (ope[i] == "*") {
      multiply(array, ope[i]);
    } else if (ope[i] == "+") {
      add(array, ope[i]);
    } else if (ope[i] == "-") {
      subtract(array, ope[i]);
    }
  }
};

const result = (ope) => {
  let output = MAIN_SCREEN.textContent.match(
    /(?<number>\d+(?:\.\d+)?)|(?<operator>[\+\-\/\*])/g
  );
  convertToNumbers(output);
  let btnOperators = ope;
  let removedOperator = "";
  let operators = "";
  if (btnOperators.includes(output[0])) {
    removedOperator = output.shift();
    operators = pemdasSort(output.join("").match(/[\+\-\*\/]/g));
    if (removedOperator == "-") {
      output[0] = Number(-Math.abs(output[0]));
    }
  } else {
    operators = pemdasSort(output.join("").match(/[\+\-\*\/]/g));
  }
  calculate(output, operators, removedOperator);
  SECOND_SCREEN.textContent = MAIN_SCREEN.textContent + "=";
  MAIN_SCREEN.textContent = output;
};

const BUTTONS = document.querySelectorAll(".btn");

BUTTONS.forEach((btn) =>
  btn.addEventListener("click", function (e) {
    let numbers = ARRAY.join("").match(/[0-9]/g);
    let operators = ARRAY.join("").match(/[\+\-\/\*]/g);

    if (e.target.textContent == "C") {
      clear();
    } else if (e.target.className.length == 10) {
      removeLastValue();
    } else if (numbers.includes(e.target.textContent)) {
      displayNumbers(e.target.textContent);
    } else if (operators.includes(e.target.textContent)) {
      displayOperators(e.target.textContent, operators);
    } else if (e.target.textContent == ".") {
      displayDot(e.target.textContent);
    } else if (
      e.target.textContent == "=" &&
      !operators.includes(
        MAIN_SCREEN.textContent[MAIN_SCREEN.textContent.length - 1]
      )
    ) {
      result(operators);
    }
  })
);
