const ADD = "+";
const SUBTRACT = "-";
const MULTIPLY = "x";
const DIVIDE = ":";
const CLEAR = "C";
const EQUAL = "=";

const display = document.querySelector(".display");
const allButtons = Array.from(document.querySelectorAll(".btn"));
const allNumbers = allButtons.filter((btn) => btn.textContent.match(/[0-9]/));
const allOperators = allButtons.filter((btn) =>
  btn.textContent.match(/[^0-9]/)
);

let operator = "";
let value = "";
let tempValue = "";
let isCalculated = false;

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function operate(operator, num1, num2) {
  return operator(num1, num2);
}

function getCorrectOperatorFn(operator, num1, num2) {
  switch (operator) {
    case ADD:
      return operate(add, num1, num2);
    case SUBTRACT:
      return operate(subtract, num1, num2);
    case MULTIPLY:
      return operate(multiply, num1, num2);
    case DIVIDE:
      return operate(divide, num1, num2);
    default:
      break;
  }
}

function showOnDisplay(e) {
  if (allNumbers.includes(e.target)) {
    if (
      display.textContent === "0" ||
      display.textContent === ADD ||
      display.textContent === SUBTRACT ||
      display.textContent === MULTIPLY ||
      display.textContent === DIVIDE
    ) {
      display.textContent = "";
    }

    if (isCalculated) {
      display.textContent = e.target.textContent;
      value = display.textContent;
      isCalculated = false;
    } else {
      display.textContent += e.target.textContent;
      value = display.textContent;
    }
  }

  if (
    e.target.textContent !== CLEAR &&
    e.target.textContent !== EQUAL &&
    allOperators.includes(e.target) &&
    !value &&
    !tempValue &&
    !operator
  ) {
    tempValue = "0";
  } else if (
    e.target.textContent !== CLEAR &&
    e.target.textContent !== EQUAL &&
    allOperators.includes(e.target) &&
    value &&
    tempValue &&
    operator
  ) {
    display.textContent = `${getCorrectOperatorFn(
      operator,
      +tempValue,
      +value
    )}`;
    operator = e.target.textContent;
    value = display.textContent;
    if (value) {
      tempValue = value;
      value = "";
    }
    isCalculated = true;
  } else if (
    e.target.textContent !== CLEAR &&
    e.target.textContent !== EQUAL &&
    allOperators.includes(e.target)
  ) {
    operator = e.target.textContent;
    display.textContent = operator;
    if (value) {
      tempValue = value;
      value = "";
    }
  }

  if (e.target.textContent === EQUAL && operator && value && tempValue) {
    display.textContent = `${getCorrectOperatorFn(
      operator,
      +tempValue,
      +value
    )}`;
    tempValue = display.textContent;
    value = "";
    isCalculated = true;
  }

  if (e.target.textContent === CLEAR && allOperators.includes(e.target)) {
    display.textContent = "0";
    operator = "";
    value = "";
    tempValue = "";
    isCalculated = false;
  }
}

allButtons.forEach((btn) => btn.addEventListener("click", showOnDisplay));
