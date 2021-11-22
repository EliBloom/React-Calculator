import React, { useEffect, useState, useRef, useContext } from "react";
import { Input, List } from "antd";
import Trie from "../../Autocomplete/Trie";
import allowedKeywords from "../Utils/KeywordDataset";
import { ErrorContext } from "../../App/App";

/**
 * This class is essentially a box that serves as the display for the the user's input as well as the final calculation
 * found from the input equation. This also doubles as an input field allowing the user to enter the equation via keyboard.
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
  // Autocomplete object
  const autoComplete = useRef(new Trie());
  // Data  for filling the autocomplete dropdown options
  const [data, setData] = useState([]);
  // This is used to keep track of what the user has entered in terms of a mathematical function
  let typedFunctionName = useRef("");
  // Context for error message, main use is for displaying error on user entering invalid characters
  let errorMessageCallback = useContext(ErrorContext);

  // Only fill the Trie when allowedKeywords is imported and loaded
  useEffect(() => {
    autoComplete.current.fillTrie(allowedKeywords);
  }, [allowedKeywords]);

  /**
   * Called when user selects an options from the autocomplete dropdown.The selected value is set on the Display and
   * entered into the equation.
   *
   * @param suggestion - string value of available mathematical functions based on the user entered prefix.
   */
  function handleSuggestionClick(suggestion) {
    let shortenedSuggestion = "";

    //remove any characters from the selected autocomplete that have already been typed
    Array.from(typedFunctionName.current).forEach(() => {
      shortenedSuggestion = suggestion.slice(1);
    });
    setData([]);
    mathFunctionCallback(suggestion, true);
    operatorCallback("(", true);
    userEnteredFunctionCallback(shortenedSuggestion + "(");
  }

  /**
   * Called when user enters text into Display component.
   *
   * @param userInput - string of user inputed values.
   */
  function handleInputChange(userInput) {
    //valid user input characters
    var reg = /^[a-wy-z]+$/i;

    let lastEntered = "";
    // gets the last character that the user entered, since previous characters have already been handled
    userInput.length === 1
      ? (lastEntered = userInput)
      : (lastEntered = userInput.slice(-1));

    if (reg.test(lastEntered)) {
      // Keep track of the mathematical function that the user is entering
      typedFunctionName.current += lastEntered;

      // User has entered a valid character and the character does not make a completed word
      if (
        autoComplete.current.startsWith(typedFunctionName.current) &&
        !autoComplete.current.contains(typedFunctionName.current)
      ) {
        userEnteredFunctionCallback(lastEntered);
        setData(autoComplete.current.getPostFixes(typedFunctionName.current));
      }
      // user entered valid character and the character makes a completed word
      else if (autoComplete.current.contains(typedFunctionName.current)) {
        mathFunctionCallback(typedFunctionName.current, true);
        operatorCallback("(", true);
        userEnteredFunctionCallback(lastEntered + "(");
        setData([]);
      }
      // user entered an invalid character
      else if (!autoComplete.current.startsWith(typedFunctionName.current)) {
        typedFunctionName.current.length === 1
          ? (typedFunctionName.current = "")
          : (typedFunctionName.current = typedFunctionName.current.slice(-1));
        errorMessageCallback("Invalid function entered");
      }
    } else {
      // user entered non alphabetical number
      handleKeyDown(lastEntered);
    }
  }

  /**
   * Called when user pressed a keyboard key.
   *
   * @param enteredCharacter - the character being entered into the Display component.
   */
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
          handleInputChange(userInputEvent.target.value.toLocaleLowerCase());
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
                handleSuggestionClick(e.target.innerText);
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
