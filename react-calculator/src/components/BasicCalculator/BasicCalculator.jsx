import React, { useState, useRef } from "react";
import Display from "./Display";
import ButtonPad from "./ButtonPad";

/** MAYBE USE CONTEXTS TO PASS DATA FOR PRACTICE */

/**
 * This class is just a standard equation calculator.
 */
export default function BasicCalculator({ errorMessageCallback }) {
  // the string that is used for the display
  const [equationString, setEquationString] = useState("");
  // this is to keep track of where each operator is in the equation array
  let equationIndex = useRef(0);
  //the current operand being entered
  let operand = useRef("");
  //an array of the equation tokenized
  let equation = useRef([]);

  //This is how the order of operations is determined, it stores the index of each operator
  let operatorMap = useRef({
    "(": [],
    ")": [],
    "^sqrt": [],
    "*/x÷%": [],
    "+-": [],
  });

  const basicCalculatorStyle = {
    justifyContent: "center",
    alignItems: "center",
  };

  /**
   * Callabck for when a number is entered into the calculator.
   */
  function handleDigitCallback(digit) {
    operand.current += digit;

    setEquationString(equationString + digit);
  }

  /**
   * Callback for when an operator is entered. This will push the operand and operator to their perspective arrays
   * as well as increase the equationIndex.
   */
  function handleOperatorCallback(operator) {
    if (operand.current) {
      equation.current.push(operand.current);
      equationIndex.current += 1;
    }
    //operand reset since the value is being pushed onto the equation array
    operand.current = "";

    equation.current.push(operator);
    setEquationString(equationString + operator);

    //loop through the operatorsMap, if the the current key contains the operator parameter, push it to the array
    Object.keys(operatorMap.current).forEach((operatorKey) => {
      if (operatorKey.includes(operator)) {
        operatorMap.current[operatorKey].push(equationIndex.current);
        equationIndex.current += 1;
      }
    });
  }

  /**
   * Callback for when the equals sign has been clicked, calls the method, calculate to find the final solution to the
   * mathematical expression.
   */
  function handleEqualsCallback() {
    if (operand.current) {
      equation.current.push(operand.current);
      equationIndex.current += 1;
    }

    calculate();
  }

  /**
   * Callback for when the AC/clear button has been triggered. Resets the state of the calculator back to the default settings
   */
  function handleAllClearCallback() {
    equationIndex.current = 0;
    operand.current = "";
    equation.current = [];
    operatorMap.current = {
      "(": [],
      ")": [],
      "^sqrt": [],
      "*/x÷%": [],
      "+-": [],
    };
    setEquationString("");
  }

  /**
   * This function will either somehow solve any sub problems that are wrapped in paranthesis.
   * Current idea is to keep pushing ( until we come across the first ),once the is come across, we pop off the last element pushed to the ( array. Solve
   * the equation inside of this and splice the equated value into the equation array. Continue with this
   */
  function solveParenthesisSubEquations() {
    const openeningParenthesisArr = [];
    const subEquationIndexes = [];
    if (!equation.current.includes("(")) {
      return;
    } else {
      // the variable "a" itself will mark the index of the closing parenthesis
      for (let a = 0; a < equation.current.length; a++) {
        if (equation.current[a] === "(") {
          openeningParenthesisArr.push(a);
        }

        if (equation.current[a] === ")") {
          let openingParenthesis = openeningParenthesisArr.pop();
          // the characters from equation that are bewtween the opening and closing parenthesis
          let subEquation = equation.current.slice(openingParenthesis + 1, a);
          // this is to get the indexes of those characters above that are between the parenthesis.
          for (let index of equation.current.keys()) {
            if (index > openingParenthesis && index < a)
              subEquationIndexes.push(index);
          }

          //looks like this portion couldbe abstracted out since the code is also used in calculate() with slight tweaks
          const operatorMapKeys = Object.keys(operatorMap.current);
          let runningTotal = 0;

          // loop through all of the operators, and if they lie in between the opening and closing parenthesis indexes, solve the subequation
          for (let b = 2; b < operatorMapKeys.length; b++) {
            // the operatorMap is an object whith math operators as keys and arrays filled with the idexes of the operators as values, this is selecting
            // the value array so that we can loop thorough indexes of that key
            let operatorsArr = operatorMap.current[operatorMapKeys[b]];

            if (operatorsArr.length > 0) {
              // loop through the array value that is linked to the corresponding key
              for (let c = 0; c < operatorsArr.length; c++) {
                let operatorIndex = operatorMap.current[operatorMapKeys[b]][c];
                // if the index from the operatorMap is between the index of the opening parenthesis and  closing, solve the internal arithmetic
                if (operatorIndex > openingParenthesis && operatorIndex < a) {
                  const leftOperand = equation.current[operatorIndex - 1];
                  const rightOperand = equation.current[operatorIndex + 1];
                  const operator = equation.current[operatorIndex];
                  runningTotal = performOperation(
                    parseInt(leftOperand),
                    operator,
                    parseInt(rightOperand)
                  );

                  //replace the sub equation, e.g. "1+1", with the solved value, 2
                  equation.current.splice(operatorIndex - 1, 3, runningTotal);

                  // This is to go through the indeces in the operatorMap and shift them since the subprblem has been replaced by the solved value,
                  // shortening the equationArray, hence changing the indeces of the remaining operators
                  for (let d = 0; d < operatorMapKeys.length; d++) {
                    let operatorsArr = operatorMap.current[operatorMapKeys[d]];
                    const tempArr = [];
                    operatorsArr.forEach((index) => {
                      if (index > operatorIndex) {
                        index -= 2;
                        tempArr.push(index);
                      } else {
                        tempArr.push(index);
                      }
                    });
                    if (tempArr.length > 0) {
                      operatorMap.current[operatorMapKeys[c]] = tempArr;
                    }
                  }
                }
              }
            }
          }
        }
      }

      equation.current = equation.current.filter(
        (character) => character !== ")" && character !== "("
      );
      //reset operator map since all of these are now wrong due to the removal of parenthesis characters
      operatorMap.current = {
        "(": [],
        ")": [],
        "^sqrt": [],
        "*/x÷%": [],
        "+-": [],
      };

      ///re assign the indexes of the operators in the equation
      for (let index of equation.current.keys()) {
        if ("^sqrt".includes(equation.current[index])) {
          operatorMap.current["^sqrt"].push(index);
        }
        if ("*/x÷%".includes(equation.current[index])) {
          operatorMap.current["*/x÷%"].push(index);
        }
        if ("+-".includes(equation.current[index])) {
          operatorMap.current["+-"].push(index);
        }
      }

      console.log(operatorMap.current);

      console.log(equation.current);
    }
  }

  /**
   * Helper function that is where the equation is calculated. Sets the the equationString to the found solution.
   */
  function calculate() {
    // Check if parenthesis are properly entered
    if (operatorMap.current["("].length != operatorMap.current[")"].length) {
      errorMessageCallback("Incorrect Use of Parenthesis");
    }
    if (operatorMap.current["("].length > 0) {
      solveParenthesisSubEquations();
    }
    let runningTotal = 0;

    const operatorMapKeys = Object.keys(operatorMap.current);

    // loop through the operatorMap and execute the sub problem. A standard for loop is used so that the algorithm
    // can handle mutations on the array that its looping over.
    for (let a = 2; a < operatorMapKeys.length; a++) {
      let operatorsArr = operatorMap.current[operatorMapKeys[a]];

      if (operatorsArr.length > 0) {
        // loop through the array value that is linked to the corresponding key
        for (let b = 0; b < operatorsArr.length; b++) {
          let operatorIndex = operatorMap.current[operatorMapKeys[a]][b];
          const leftOperand = equation.current[operatorIndex - 1];
          const rightOperand = equation.current[operatorIndex + 1];
          const operator = equation.current[operatorIndex];
          runningTotal = performOperation(
            parseInt(leftOperand),
            operator,
            parseInt(rightOperand)
          );
          //replace the sub equation, e.g. "1+1", with the solved value, 2
          equation.current.splice(operatorIndex - 1, 3, runningTotal);

          // This is to go through the indeces in the operatorMap and shift them since the subprblem has been replaced by the solved value,
          // shortening the equationArray, hence changing the indeces of the remaining operators
          for (let c = 0; c < operatorMapKeys.length; c++) {
            let operatorsArr = operatorMap.current[operatorMapKeys[c]];
            const tempArr = [];
            operatorsArr.forEach((index) => {
              if (index > operatorIndex) {
                index -= 2;
                tempArr.push(index);
              } else {
                tempArr.push(index);
              }
            });
            if (tempArr.length > 0) {
              operatorMap.current[operatorMapKeys[c]] = tempArr;
            }
          }
        }
      }
    }
    setEquationString(runningTotal);
  }

  /**
   * Helper function where the simple mathematical operations are actually performed, e.g. 1+1, 2-1, etc..
   */
  function performOperation(leftOperand, operator, rightOperand) {
    let total = 0;
    switch (operator) {
      case "^":
        total = Math.pow(leftOperand, rightOperand);
        break;

      case "sqrt":
        total = Math.sqrt(rightOperand);
        break;
      case "x":
        total = leftOperand * rightOperand;
        break;
      case "*":
        total = leftOperand * rightOperand;
        break;
      case "/":
        total = leftOperand / rightOperand;
        break;
      case "÷":
        total = leftOperand / rightOperand;
        break;
      case "%":
        total = leftOperand % rightOperand;
        break;
      case "+":
        total = leftOperand + rightOperand;
        break;
      case "-":
        total = leftOperand - rightOperand;
        break;
      default:
        break;
    }

    return total.toString();
  }

  return (
    <div style={basicCalculatorStyle}>
      <Display expression={equationString} />
      <ButtonPad
        digitCallback={handleDigitCallback}
        equalsCallback={handleEqualsCallback}
        operatorCallback={handleOperatorCallback}
        allClearCallback={handleAllClearCallback}
      />
    </div>
  );
}
