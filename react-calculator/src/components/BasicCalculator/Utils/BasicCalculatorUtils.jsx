/**
 * Callback for when the backspace button is pressed.
 *
 * Currently does not work for using the backspace keyboard button
 */
export function handleBackspaceCallback() {
  if (callStack.current.length > 0) {
    // needs to be handled when everything has been deleted
    let toBeDeleted = callStack.current.pop();
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
