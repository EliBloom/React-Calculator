import React, { useEffect, useState, useRef } from "react";
import { AutoComplete, Input, List } from "antd";
import Trie from "../../Autocomplete/Trie";
import allowedKeywords from "../Utils/KeywordDataset";

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
  userEnteredFunctionCallback,
  allClearCallback,
  piCallback,
  eulersCallback,
  mathFunctionCallback,
  backspaceCallback,
}) {
  const inputStyle = { width: "334px" };
  const buttonStyle = { width: "334px" };
  const autoComplete = new Trie();
  const [data, setData] = useState([]);
  let typedFunctionName = useRef("");
  useEffect(() => {
    console.log("re render");
    autoComplete.fillTrie(allowedKeywords);

    console.log(autoComplete.getPostFixes("s"));
  }, [allowedKeywords]);

  /**
   * Called when user click on a suggested word supplied by the autocomplete
   */
  function handleSugestionClick(suggestion) {}

  function handleInputChange(userInput) {
    typedFunctionName.current += userInput;
    if (
      autoComplete.startsWith(typedFunctionName.current) &&
      !autoComplete.contains(typedFunctionName.current)
    ) {
      userEnteredFunctionCallback(userInput);
      setData(autoComplete.getPostFixes(userInput));
    } else if (!autoComplete.startsWith(typedFunctionName.current)) {
      typedFunctionName.current.splice(-1);
      // print out error becuase user is entering invalid text
    } else {
      handleKeyDown(userInput.slice(-1));
    }
  }

  function handleKeyDown(enteredCharacter) {
    switch (enteredCharacter) {
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
      {data.length > 0 && (
        <List
          size="small"
          bordered
          style={buttonStyle}
          dataSource={data}
          renderItem={(item) => (
            <List.Item
              onClick={(e) => {
                console.log(e.target.innerText);
              }}
              style={{ fontSize: "small" }}
            >
              {item}
            </List.Item>
          )}
        />
      )}
    </div>
  );
}

export default Display;
