const display = document.getElementById("display");
const opDisplay = document.getElementById("op-display");
const buttons = document.getElementsByClassName("button");
let resultCalc = false;

window.onload = function () {
  document.getElementById("op-display").innerText = "";
  document.getElementById("display").innerText = "0";
};

let math_it_up = {
  "+": function (x, y) {
    return x + y;
  },
  "-": function (x, y) {
    return x - y;
  },
  "/": function (x, y) {
    return x / y;
  },
  "*": function (x, y) {
    return x * y;
  },
};

function execMathCalc(acumulator, currentValue, oper) {
  return math_it_up[oper](
    isNaN(acumulator) ? execOper(acumulator) : Number(acumulator),
    isNaN(currentValue) ? execOper(currentValue) : Number(currentValue)
  );
}

function execOper(oper) {
  let operadores;

  operadores = oper.split("+");
  if (operadores.length > 1) {
    return operadores.reduce((acumulator, currentValue) => {
      return execMathCalc(acumulator, currentValue, "+");
    });
  }
  operadores = oper.split("-");
  if (operadores.length > 1) {
    if (isOperation(operadores[0][operadores[0].length - 1])) {
      let pos = operadores[0].length - 1;
      let operNew = operadores[0][pos];
      let operadoresNew = [operadores[0].substring(0, pos), operadores[1]];
      return operadoresNew.reduce((acumulator, currentValue) => {
        return execMathCalc(acumulator, currentValue, operNew) * -1;
      });
    }

    return operadores.reduce((acumulator, currentValue) => {
      return execMathCalc(acumulator, currentValue, "-");
    });
  }
  operadores = oper.split("/");
  if (operadores.length > 1) {
    return operadores.reduce((acumulator, currentValue) => {
      return execMathCalc(acumulator, currentValue, "/");
    });
  }
  operadores = oper.split("*");
  if (operadores.length > 1) {
    return operadores.reduce((acumulator, currentValue) => {
      return execMathCalc(acumulator, currentValue, "*");
    });
  }
  return operadores[0];
}

function changeLastChar(oper, digit) {
  let result;
  result = oper;
  if (
    oper[oper.length - 1] === "+" ||
    oper[oper.length - 1] === "-" ||
    oper[oper.length - 1] === "*" ||
    oper[oper.length - 1] === "/"
  ) {
    if (digit === "-" && oper[oper.length - 1] !== "-") {
      return result;
    }
    result = oper.substring(0, oper.length - 1);
  }
  return result;
}

function isOperation(oper) {
  if (oper === "+" || oper === "-" || oper === "*" || oper === "/") {
    return true;
  }
  return false;
}

function enterDigits(digits) {
  let oper;
  if (resultCalc) {
    display.innerText = "0";
    if (!isOperation(digits)) {
      opDisplay.innerText = "";
    }
    resultCalc = false;
  }

  if (isOperation(display.innerText)) {
    display.innerText = "0";
  }

  if (isNaN(digits)) {
    if (digits === "X") {
      digits = "*";
    }

    switch (digits) {
      case "AC":
        display.innerText = "0";
        opDisplay.innerText = "";
        return;
      case "=":
        oper = opDisplay.innerText;
        opDisplay.innerText = execOper(opDisplay.innerText);
        display.innerText = opDisplay.innerText;
        resultCalc = true;
        return;
      case ".":
        if (display.innerText.search(/[.]/) != -1) {
          return;
        }
        break;
      default:
        display.innerText = digits;
        opDisplay.innerText = changeLastChar(opDisplay.innerText, digits);
        break;
    }
  }

  if (Number(opDisplay.innerText) === 0) {
    opDisplay.innerText = digits;
  } else {
    opDisplay.innerText += digits;
  }

  if (isNaN(digits) && digits != ".") {
    display.innerText = digits;
  } else {
    if (Number(display.innerText) === 0) {
      display.innerText = digits;
    } else {
      display.innerText += digits;
    }
  }
}

const buttonsArray = Array(...buttons);
buttonsArray.forEach((element) => {
  element.addEventListener("click", (element) => {
    enterDigits(element.target.innerText);
  });
});
