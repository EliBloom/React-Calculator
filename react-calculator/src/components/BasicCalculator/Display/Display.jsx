import React, { useEffect } from "react";
import { AutoComplete, Input } from "antd";
import Trie from "../../Autocomplete/Trie";

/**
 * This class is essentially a box that serves as the display for the the user's input as well as the final calculation
 * found from the input equation. This will eventually have to parse the equation so that the calculator will also be
 * able to take input from typing it on their keyboard.
 */
export function Display({
  expression,
  digitCallback,
  equalsCallback,
  operatorCallback,
  allClearCallback,
  piCallback,
  eulersCallback,
  mathFunctionCallback,
  backspaceCallback,
}) {
  const inputStyle = { width: "334px" };
  const autoComplete = new Trie();

  useEffect(() => {
    autoComplete.insert("this");
    autoComplete.insert("things");
    autoComplete.insert("the");
    autoComplete.insert("that");
    autoComplete.insert("throll");
    autoComplete.insert("thick");
    autoComplete.insert("toggle");
    autoComplete.insert("tick");

    console.log(autoComplete.getPostFixes("th"));
  });
  // const handleKeys = useCallback((event) => {
  //   debounce(handleKeyDown(event), 1000);
  // });

  // const delayedQuery = useCallback(
  //   _.debounce((q) => sendQuery(q), 500),
  //   []
  // );

  // const debounce = (func, wait) => {
  //   let timeout;

  //   return function executedFunction(...args) {
  //     const later = () => {
  //       clearTimeout(timeout);
  //       func(...args);
  //     };

  //     clearTimeout(timeout);
  //     timeout = setTimeout(later, wait);
  //   };
  // };
  // function debounce(passedFunc, waitTime) {
  //   let timeout;

  //   // return () => {
  //   clearTimeout(timeout);

  //   setTimeout(passedFunc, waitTime);
  //   // };
  // }

  function handleInputChange(userInput) {
    if (userInput === "") {
    }
    handleKeyDown(userInput.slice(-1));
  }

  function handleKeyDown(event) {
    switch (event) {
      case "0":
        digitCallback("0");
        break;
      case "1":
        digitCallback("1");
        break;
      case "2":
        digitCallback("2");
        break;
      case "3":
        digitCallback("3");
        break;
      case "4":
        digitCallback("4");
        break;
      case "5":
        digitCallback("5");
        break;
      case "6":
        digitCallback("6");
        break;
      case "7":
        digitCallback("7");
        break;
      case "8":
        digitCallback("8");
        break;
      case "9":
        digitCallback("9");
        break;
      case "+":
        operatorCallback("+");
        break;
      case "-":
        operatorCallback("-");
        break;
      case "/":
      case "÷":
        operatorCallback("/");
        break;
      case "*":
      case "x":
        operatorCallback("*");
        break;
      case ".":
        digitCallback(".");
        break;
      case "%":
        operatorCallback("%");
        break;
      case "(":
        operatorCallback("(");
        break;
      case ")":
        operatorCallback(")");
        break;
      case "=":
        equalsCallback();
        break;
      case "Enter":
        equalsCallback();
        break;
      case "Backspace":
        backspaceCallback();
        break;
      case "e":
        eulersCallback();
        break;
    }
  }

  return (
    <div>
      <Input
        aria-label={"basic-calculator-display"}
        className="basic-calculator__display"
        style={inputStyle}
        placeholder="Basic usage"
        value={expression}
        onChange={(userInputEvent) => {
          handleInputChange(userInputEvent.target.value);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === "Backspace") {
            handleKeyDown(event.key);
          }
        }}
      />
    </div>
  );
}

export default Display;
