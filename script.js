const ADD = "+";
const SUBTRACT = "-";
const MULTIPLY = "x";
const DIVIDE = ":";
const CLEAR = "AC";
const EQUAL = "=";
const SIGN = "+/-";
const DOT = ".";
const ZERO = "0";
const PERCENT = "%";

const display = document.querySelector(".display");
const allButtons = Array.from(document.querySelectorAll(".btn"));
const allNumbers = allButtons.filter((btn) => btn.textContent.match(/[0-9.]/));
const allOperators = allButtons.filter((btn) =>
  btn.textContent.match(/[^0-9.]/)
);

let operator = "";
let value = "";
let isCalculated = false;
let isOperatorAssigned = false;

function add(num1, num2) {
  return Math.round((num1 + num2) * 100) / 100;
}

function subtract(num1, num2) {
  return Math.round((num1 - num2) * 100) / 100;
}

function multiply(num1, num2) {
  return Math.round(num1 * num2 * 100) / 100;
}

function divide(num1, num2) {
  let result = Math.round((num1 / num2) * 100) / 100;
  return Number.isFinite(result) ? result : "Cannot divide by zero";
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
  if (
    allNumbers.includes(e.target) &&
    e.target.textContent === DOT &&
    isOperatorAssigned
  ) {
    isOperatorAssigned = false;
    display.textContent = ZERO + DOT;
  } else if (allNumbers.includes(e.target) && isOperatorAssigned) {
    isOperatorAssigned = false;
    display.textContent = e.target.textContent;
  } else if (allNumbers.includes(e.target) && isCalculated) {
    isCalculated = false;
    switch (display.textContent) {
      case ZERO + DOT:
        display.textContent += e.target.textContent;
        break;
      default:
        display.textContent =
          e.target.textContent !== DOT ? e.target.textContent : ZERO + DOT;
        break;
    }
  } else if (
    display.textContent === ZERO &&
    allNumbers.includes(e.target) &&
    e.target.textContent === ZERO
  ) {
    return;
  } else if (
    display.textContent === ZERO &&
    allNumbers.includes(e.target) &&
    e.target.textContent !== DOT
  ) {
    display.textContent = e.target.textContent;
  } else if (
    display.textContent === ZERO &&
    allOperators.includes(e.target) &&
    (e.target.textContent === ADD ||
      e.target.textContent === SUBTRACT ||
      e.target.textContent === MULTIPLY ||
      e.target.textContent === DIVIDE)
  ) {
    value = display.textContent;
  } else if (
    display.textContent === ZERO &&
    allNumbers.includes(e.target) &&
    e.target.textContent === DOT
  ) {
    display.textContent += e.target.textContent;
  } else if (
    display.textContent.startsWith(ZERO + DOT) &&
    allNumbers.includes(e.target) &&
    e.target.textContent !== DOT
  ) {
    display.textContent += e.target.textContent;
  } else if (
    display.textContent === ZERO + DOT &&
    allOperators.includes(e.target)
  ) {
    display.textContent = ZERO;
  } else if (
    !display.textContent.includes(".") &&
    allNumbers.includes(e.target) &&
    e.target.textContent === DOT
  ) {
    display.textContent += e.target.textContent;
  } else if (allNumbers.includes(e.target) && e.target.textContent !== DOT) {
    display.textContent += e.target.textContent;
  }

  if (allButtons.includes(e.target)) {
    e.target.classList.add("highlight");
    allButtons.forEach((button) => {
      if (button.textContent !== e.target.textContent) {
        button.classList.remove("highlight");
      }
    });
  }

  if (
    allOperators.includes(e.target) &&
    e.target.textContent !== CLEAR &&
    e.target.textContent !== EQUAL &&
    e.target.textContent !== SIGN &&
    e.target.textContent !== PERCENT
  ) {
    if (operator === e.target.textContent && value) {
      display.textContent = `${getCorrectOperatorFn(
        operator,
        +value,
        +display.textContent
      )}`;
    }
    value = display.textContent;
    operator = e.target.textContent;
    isOperatorAssigned = true;
    isCalculated = false;
  }

  if (allOperators.includes(e.target) && e.target.textContent === SIGN) {
    if (Math.sign(display.textContent) === 1) {
      display.textContent = `${-Math.abs(display.textContent)}`;
    } else if (Math.sign(display.textContent) === -1) {
      display.textContent = `${Math.abs(display.textContent)}`;
    } else {
      return;
    }
  }

  if (
    allOperators.includes(e.target) &&
    e.target.textContent === EQUAL &&
    operator &&
    value
  ) {
    display.textContent = `${getCorrectOperatorFn(
      operator,
      +value,
      +display.textContent
    )}`;
    value = display.textContent;
    operator = "";
    isCalculated = true;
  } else if (
    allOperators.includes(e.target) &&
    e.target.textContent === EQUAL &&
    display.textContent &&
    !value
  ) {
    isCalculated = true;
  }

  if (allOperators.includes(e.target) && e.target.textContent === PERCENT) {
    display.textContent = Number(display.textContent) / 100;
  }

  if (allOperators.includes(e.target) && e.target.textContent === CLEAR) {
    display.textContent = ZERO;
    operator = "";
    value = "";
    isCalculated = false;
    isOperatorAssigned = false;
  }
}

allButtons.forEach((btn) => btn.addEventListener("click", showOnDisplay));
