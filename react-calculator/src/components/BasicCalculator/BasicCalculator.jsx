import React, { useState, useRef } from "react";
import Display from "./Display";
import ButtonPad from "./ButtonPad";

/** MAYBE USE CONTEXTS TO PASS DATA FOR PRACTICE */

/**
 * This class is just a standard equation calculator.
 */
export default function BasicCalculator() {
  const [equationString, setEquationString] = useState("");
  //this is to keep track of where each operator is in the equation array
  let equationIndex = useRef(0);
  //the current operand being entered
  let operand = useRef("");
  //an array of the equation tokenized
  let equation = useRef([]);

  //This is how the order of operations is determined, it stores the index of each operator
  let operatorMap = useRef({ "()": [], "^sqrt": [], "*/x÷%": [], "+-": [] });

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
    equation.current.push(operand.current);
    equationIndex.current += 1;
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
    equation.current.push(operand.current);
    equationIndex.current += 1;

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
      "()": [],
      "^sqrt": [],
      "*/x÷%": [],
      "+-": [],
    };
    setEquationString("");
  }

  /**
   * Helper function that is where the equation is calculated. Sets the the equationString to the found solution.
   */
  function calculate() {
    let runningTotal = 0;

    const operatorMapKeys = Object.keys(operatorMap.current);

    // loop through the operatorMap and execute the sub problem. A standard for loop is used so that the algorithm
    // can handle mutations on the array that its looping for.
    for (let a = 0; a < operatorMapKeys.length; a++) {
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
        handleDigitCallback={handleDigitCallback}
        handleEqualsCallback={handleEqualsCallback}
        handleOperatorCallback={handleOperatorCallback}
        handleAllClearCallback={handleAllClearCallback}
      />
    </div>
  );
}
