import React, { useState, useRef, useContext } from "react";
import Display from "./Display";
import ButtonPad from "./ButtonPad";
import { ErrorContext } from "../App/App";

/**
 * This class is just a standard equation calculator.
 */
export default function BasicCalculator() {
  // the string that is used for the display
  const [equationString, setEquationString] = useState("");
  // this is to keep track of where each operator is in the equation array
  let equationIndex = useRef(0);
  //the current operand being entered
  let operand = useRef("");
  //an array of the equation tokenized
  let equation = useRef([]);
  // used in the calculate function
  let isFirstParenthesis = useRef(true);
  // string used to determine the last function call, used in backspaceCallback
  let previousFunctionCalled = useRef("");
  //helping variable for the backspace function, holds the previous operand
  let previousOperand = useRef("");
  //should create a stack where the keys are  the operation, inserted in the order in which the user enters them, and value will be the functionCall, e.g."handleDigitCallback", "handleOperatorCallback"
  let callStack = useRef([]);
  //This is how the order of operations is determined, it stores the index of each operator
  let operatorMap = useRef({
    "(": [],
    ")": [],
    "^sqrtsinloglncostan": [],
    "*/x÷%": [],
    "+-": [],
  });
  // says that operand has been pushed onto equation
  let isExpressionClosed = useRef(false);

  const basicCalculatorStyle = {
    justifyContent: "center",
    alignItems: "center",
  };

  // Context for the error message used in error pop over
  let errorMessageCallback = useContext(ErrorContext);

  /**
   * Callback for when a number is entered into the Display component, set the equationString.
   *
   * @param userInput - string of the user input.
   */
  function handleUserEnteredFunctionCallback(userInput) {
    setEquationString(equationString + userInput);
  }

  /**
   * Callback for when a number is entered into the calculator.
   *
   * @param digit - string of the numerical input.
   */
  function handleDigitCallback(digit) {
    // needed for leading zero issue
    let tempEquationString = equationString;

    //no need to have 00, so do nothing if 0 is entered again
    if (operand.current === "0" && digit === "0") {
      return;
    }

    //leading zeros will be replaced with the next non zero digit, if one is entered
    if (operand.current === "0") {
      operand.current = "";

      tempEquationString = equationString.slice(0, -1);
    }
    operand.current += digit;

    // used in backspace method
    previousFunctionCalled.current = "handleDigitCallback";
    previousOperand.current = operand.current;
    callStack.current.push({
      previousFunctionCalled: "handleDigitCallback",
      value: digit,
    });
    isExpressionClosed.current = false;

    setEquationString(tempEquationString + digit);
  }

  /**
   * Callback for when an operator is entered. This will push the operand and operator to their perspective arrays
   * as well as increase the equationIndex.
   *
   * @param operator - the mathematical operator symbol, e.g. +/*().
   * @param wasTyped - Boolean value marking whether or not the operator was from user entering into Display.
   */
  function handleOperatorCallback(operator, wasTyped = false) {
    if (
      operand.current &&
      // PI Value
      //TODO consider using previousFunctionCalled instead
      previousOperand.current !== "3.141592653589793" &&
      // Euler's Constant Value,
      //TODO consider using previousFunctionCalled instead
      previousOperand.current !== "2.718281828459045"
    ) {
      equation.current.push(operand.current);
      equationIndex.current += 1;
    }

    callStack.current.push({
      previousFunctionCalled: "handleOperatorCallback",
      value: operator,
    });

    //this is used for the backspace function
    previousOperand.current = operand.current;
    //operand reset since the value is being pushed onto the equation array
    operand.current = "";
    //used in backspace method
    previousFunctionCalled.current = "handleOperatorCallback";
    isExpressionClosed.current = true;

    equation.current.push(operator);

    if (!wasTyped) {
      setEquationString(equationString + operator);
    }

    //loop through the operatorsMap, if the the current key contains the operator parameter, push it to the array
    Object.keys(operatorMap.current).forEach((operatorKey) => {
      if (operatorKey.includes(operator)) {
        operatorMap.current[operatorKey].push(equationIndex.current);
        equationIndex.current += 1;
      }
    });
  }

  /**
   * Callback for when the pi button is pressed.
   */
  function handlePiCallback() {
    equation.current.push(Math.PI);
    equationIndex.current += 1;
    previousOperand.current = Math.PI;
    callStack.current.push({
      previousFunctionCalled: "handlePiCallback",
      value: Math.PI,
    });
    // used in backspace  method
    previousFunctionCalled.current = "handlePiCallback";

    setEquationString(equationString + "π");
  }

  /**
   * Callback for when the Eulers/natural number button is pressed.
   */
  function handleEulersCallback() {
    equation.current.push(Math.E);
    equationIndex.current += 1;
    previousOperand.current = Math.E;
    callStack.current.push({
      previousFunctionCalled: "handleEulersCallback",
      value: Math.E,
    });
    // used in backspace  method
    previousFunctionCalled.current = "handleEulersCallback";

    setEquationString(equationString + Math.E);
  }

  /**
   * Callback for when a math function button is pressed/entered.
   *
   * @param functionName - the name of the math function being called.
   * @param wasTyped - Boolean marking whether or not functionName is coming from user entered text.
   */
  function handleMathFunctionCallback(functionName, wasTyped = false) {
    handleOperatorCallback(functionName, wasTyped);

    // if the function name was typed, this is handled in Display class.
    if (!wasTyped) {
      handleOperatorCallback("(");
      callStack.current.push({
        previousFunctionCalled: "handleMathFunctionCallback",
        value: functionName + "(",
      });

      setEquationString(equationString + functionName + "(");
    }
    // used in backspace  method
    previousFunctionCalled.current = "handleMathFunctionCallback";
  }

  /**
   * Callback for when the backspace button is pressed.
   *
   * Currently does not work for using the backspace keyboard button
   */
  function handleBackspaceCallback() {
    if (callStack.current.length > 0) {
      // needs to be handled when everything has been deleted
      callStack.current.pop();

      switch (previousFunctionCalled.current) {
        //BUG: handleDigitCallback is still messed up when you delete, readd, delete what you added, and add again does not work
        case "handleDigitCallback":
          operand.current = operand.current.slice(0, -1);
          setEquationString(equationString.slice(0, -1));
          // if isExpressionIsClosed, operand has been pushed to equation, therefore it must be removed
          if (isExpressionClosed.current) {
            let length = equation.current.length - 1;
            let equationOperand = equation.current[length];
            equationOperand = equationOperand.slice(0, -1);
            if (!equationOperand) {
              // if equationOperand is empty, then the operand being deleted is one character, so we can just remove the whole element
              equation.current = equation.current.slice(0, -1);
              equationIndex.current -= 1;
            } else {
              // if equationOperand is not empty, then is is longer than one char, therefore just the last char should be spliced rather than remove the whole element
              equation.current[length] = equationOperand;
            }
          }

          break;
        case "handleOperatorCallback":
          equation.current = equation.current.slice(0, -1);
          equationIndex.current -= 1;
          let endingIndex = callStack.current.length - 1;
          //retrieve and build the previous full operand
          while (
            !"sqrtsinloglncostan*/x÷%+-".includes(
              callStack.current[endingIndex]?.value
            ) &&
            endingIndex >= 0
          ) {
            operand.current =
              callStack.current[endingIndex]?.value + operand.current;
            endingIndex--;
          }
          isExpressionClosed.current = true;
          rebaseIndexes();
          setEquationString(equationString.slice(0, -1));
          break;
        case "handlePiCallback":
          equation.current = equation.current.slice(0, -1);
          equationIndex.current--;
          operand.current = "";
          setEquationString(equation.current.join(""));
          break;
        case "handleEulersCallback":
          equation.current = equation.current.slice(0, -1);
          equationIndex.current--;
          operand.current = "";
          setEquationString(equation.current.join(""));
          break;
        case "handleMathFunctionCallback":
          break;
        default:
          break;
      }

      // grab the next value for  previousFunctionCalled from the callStack
      if (callStack.current.length > 0) {
        previousFunctionCalled.current =
          callStack.current.at(-1).previousFunctionCalled;
      }
    }
  }

  /**
   * Callback for when the equals sign has been clicked, calls the method, calculate to find the final solution to the
   * mathematical expression.
   */
  function handleEqualsCallback() {
    if (
      operand.current &&
      previousOperand.current !== "3.141592653589793" &&
      previousOperand.current !== "2.718281828459045"
    ) {
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
      "^sqrtsinloglncostan": [],
      "*/x÷%": [],
      "+-": [],
    };
    setEquationString("");
  }

  /**
   * Helper function that rebases indexes after a splice is performed
   *
   * @param leftOperand - left digit in equation
   * @param operator - the operator symbol
   * @param rightOperand - the right operator
   */
  function rebaseIndexes() {
    //reset operator map since all of these are now wrong due to the removal of parentheses characters
    operatorMap.current = {
      "(": [],
      ")": [],
      "^sqrtsinloglncostan": [],
      "*/x÷%": [],
      "+-": [],
    };
    // This is to go through the indeces in the operatorMap and shift them since the subproblem has been replaced by the solved value,
    // shortening the equationArray, hence changing the indeces of the remaining operators
    for (let index of equation.current.keys()) {
      if ("^sqrtsinloglncostan".includes(equation.current[index])) {
        operatorMap.current["^sqrtsinloglncostan"].push(index);
      }
      if ("*/x÷%".includes(equation.current[index])) {
        operatorMap.current["*/x÷%"].push(index);
      }
      if ("+-".includes(equation.current[index])) {
        operatorMap.current["+-"].push(index);
      }
    }
  }

  /**
   * Helper function that rebases solves and removes any sub-equations that uses parenthesis, including mathematical function calls.
   */
  function solveParenthesisSubEquations() {
    const openingParenthesisArr = [];
    let openingParentheses;
    if (!equation.current.includes("(")) {
      return;
    } else {
      outterMostLoop: for (
        let equationIndex = 0;
        equationIndex < equation.current.length;
        equationIndex++
      ) {
        if (!equation.current.includes("(")) {
          break outterMostLoop;
        }
        if (
          equation.current[equationIndex] === "(" &&
          !openingParenthesisArr.includes(equationIndex) &&
          equationIndex !== openingParentheses
        ) {
          openingParenthesisArr.push(equationIndex);
        }

        if (equation.current[equationIndex] === ")") {
          if (isFirstParenthesis.current) {
            openingParentheses = openingParenthesisArr.pop();
            isFirstParenthesis.current = false;
          }

          //looks like this portion could be abstracted out since the code is also used in calculate() with slight tweaks
          const operatorMapKeys = Object.keys(operatorMap.current);
          let runningTotal = 0;

          // loop through all of the operators, and if they lie in between the opening and closing parentheses indexes, solve the subequation
          operatorMapKeysLoop: for (
            let operatorMapIndex = 2;
            operatorMapIndex < operatorMapKeys.length;
            operatorMapIndex++
          ) {
            if (!equation.current.includes("(")) {
              break outterMostLoop;
            }
            // the operatorMap is an object with math operators as keys and arrays filled with the idexes of the operators as values, this is selecting
            // the value array so that we can loop thorough indexes of that key
            let operatorsArr =
              operatorMap.current[operatorMapKeys[operatorMapIndex]];

            if (operatorsArr.length > 0) {
              // loop through the array value that is linked to the corresponding key
              for (
                let operatorsArrIndex = 0;
                operatorsArrIndex < operatorsArr.length;
                operatorsArrIndex++
              ) {
                let operatorIndex =
                  operatorMap.current[operatorMapKeys[operatorMapIndex]][
                    operatorsArrIndex
                  ];
                // if the index from the operatorMap is between the index of the opening parentheses and closing, solve the internal equation
                if (
                  operatorIndex > openingParentheses &&
                  operatorIndex < equationIndex
                ) {
                  const leftOperand = equation.current[operatorIndex - 1];
                  const rightOperand = equation.current[operatorIndex + 1];
                  const operator = equation.current[operatorIndex];
                  runningTotal = performOperation(
                    parseFloat(leftOperand),
                    operator,
                    parseFloat(rightOperand)
                  );

                  if (equationIndex - openingParentheses === 4) {
                    equationIndex = equationIndex - 4;
                    //replace the sub equation, e.g. "(1+1)", with the solved value, 2
                    equation.current.splice(
                      openingParentheses,
                      5,
                      runningTotal
                    );
                    operatorMapIndex = 2;

                    openingParentheses = openingParenthesisArr.pop();

                    break operatorMapKeysLoop;
                  } else if (
                    equationIndex - openingParentheses === 3 &&
                    "^sqrtsinloglncostan".includes(
                      equation.current[operatorIndex]
                    )
                  ) {
                    equationIndex = equationIndex - 3;
                    equation.current.splice(
                      openingParentheses,
                      4,
                      runningTotal
                    );
                    operatorMapIndex = 2;

                    openingParentheses = openingParenthesisArr.pop();
                    break operatorMapKeysLoop;
                  }
                  // if not, replace just the 1+1 portion rather than also taking out parentheses
                  else {
                    if (
                      "^sqrtsinloglncostan".includes(
                        equation.current[operatorIndex]
                      )
                    ) {
                      // e.g just replace cos2
                      equation.current.splice(operatorIndex, 2, runningTotal);
                      equationIndex = equationIndex - 1;
                    } else {
                      // e.g.replace 1+1
                      equation.current.splice(
                        operatorIndex - 1,
                        3,
                        runningTotal
                      );
                      equationIndex = equationIndex - 2;
                      operatorMapIndex = 2;
                    }
                  }

                  //reset operator map since all of these are now wrong due to the removal of parentheses characters
                  rebaseIndexes();
                }
              }
            }
          }
        }
      }

      equation.current = equation.current.filter(
        (character) => character !== ")" && character !== "("
      );
      //reset operator map since all of these are now wrong due to the removal of parentheses characters
      rebaseIndexes();
    }
  }

  /**
   * Helper function that is where the equation is calculated. Sets the the equationString to the found solution.
   */
  function calculate() {
    // Check if parentheses are properly entered
    if (operatorMap.current["("].length !== operatorMap.current[")"].length) {
      errorMessageCallback("Incorrect Use of Parenthesis");
    }
    if (operatorMap.current["("].length > 0) {
      // remove and solve sub problems within parentheses
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
          const operator = equation.current[operatorIndex];

          if (operatorMapKeys[a] === "^sqrtsinloglncostan") {
            const rightOperand = equation.current[operatorIndex + 1];
            runningTotal = performOperation(
              null,
              operator,
              parseFloat(rightOperand)
            );
            equation.current.splice(operatorIndex, 2, runningTotal);
          } else {
            const leftOperand = equation.current[operatorIndex - 1];
            const rightOperand = equation.current[operatorIndex + 1];
            // const operator = equation.current[operatorIndex];
            runningTotal = performOperation(
              parseFloat(leftOperand),
              operator,
              parseFloat(rightOperand)
            );

            //replace the sub equation, e.g. "1+1", with the solved value, 2
            equation.current.splice(operatorIndex - 1, 3, runningTotal);
          }

          //reset operator map since all of these are now wrong due to the removal of parentheses characters
          rebaseIndexes();
          // This is not optimal. Done because when we rebase the indexes, b may be out of bounds since the array being looped over is being reduced in size
          // since there will inherently be less operators.
          b--;
          operatorsArr = operatorMap.current[operatorMapKeys[a]];
        }
      }
    }
    setEquationString(runningTotal);
  }

  /**
   * Helper function where the simple mathematical operations are actually performed, e.g. 1+1, 2-1, etc..
   *
   * @param leftOperand - left digit in equation
   * @param operator - the operator symbol
   * @param rightOperand - the right operator
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
      case "sin":
        total = Math.sin((rightOperand * Math.PI) / 180);
        break;
      case "cos":
        total = Math.cos((rightOperand * Math.PI) / 180);
        break;
      case "tan":
        total = Math.tan((rightOperand * Math.PI) / 180);
        break;
      case "ln":
        total = Math.log(rightOperand);
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
      <Display
        expression={equationString}
        digitCallback={handleDigitCallback}
        equalsCallback={handleEqualsCallback}
        operatorCallback={handleOperatorCallback}
        userEnteredFunctionCallback={handleUserEnteredFunctionCallback}
        allClearCallback={handleAllClearCallback}
        piCallback={handlePiCallback}
        eulersCallback={handleEulersCallback}
        mathFunctionCallback={handleMathFunctionCallback}
        backspaceCallback={handleBackspaceCallback}
      />
      <ButtonPad
        digitCallback={handleDigitCallback}
        equalsCallback={handleEqualsCallback}
        operatorCallback={handleOperatorCallback}
        allClearCallback={handleAllClearCallback}
        piCallback={handlePiCallback}
        eulersCallback={handleEulersCallback}
        mathFunctionCallback={handleMathFunctionCallback}
        backspaceCallback={handleBackspaceCallback}
      />
    </div>
  );
}
