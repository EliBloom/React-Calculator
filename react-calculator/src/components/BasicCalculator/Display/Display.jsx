import React from "react";
import { Input } from "antd";

/**
 * This class is essentially a box that serves as the display for the the user's input as well as the final calcuation
 * found from the input equation. This will eventually have to parse the equation so that the calculator will also be
 * able to take input from typng it on their keyboard.
 *
 */
export function Display(props) {
  const inputStyle = { width: "334px" };

  function handleInputChange(userInput) {
    // const x = userInputEvent ? userInputEvent.target.value : '';
  }

  return (
    <div>
      <Input
        aria-label={"basic-calculator-display"}
        className="basic-calculator__display"
        style={inputStyle}
        placeholder="Basic usage"
        value={props.expression}
        onChange={(userInputEvent) =>
          handleInputChange(userInputEvent.target.value)
        }
      />
    </div>
  );
}

export default Display;
