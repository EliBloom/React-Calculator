import React from "react";
import "@testing-library/jest-dom/extend-expect";
import BasicCalculator from "../components/BasicCalculator/BasicCalculator";
import { render, fireEvent, screen } from "@testing-library/react";

describe("Basic Calculator Test", () => {
  beforeEach(() => render(<BasicCalculator />));
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

  describe("Calculator UI Functionality", () => {
    test("The buttons of the Basic Calculator should be rendered", () => {
      const onScreenSymbols = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "(",
        ")",
        "+",
        "-",
        "x",
        "AC",
        "÷",
        ".",
        "%",
      ];
      onScreenSymbols.forEach((symbol) => {
        expect(screen.getByText(symbol)).toBeInTheDocument();
      });
    });

    test("The display component should be rendered by default", () => {
      expect(
        screen.getByRole("textbox", { name: /basic-calculator-display/i })
      ).toBeInTheDocument();
    });

    test("The display component should recieve a character for every button pressed on button pad and should display full equation", () => {
      const numberOneButton = screen.getByText("1");
      const plusButton = screen.getByText("+");
      const numberTwoButton = screen.getByText("2");
      fireEvent.click(numberOneButton);
      fireEvent.click(plusButton);
      fireEvent.click(numberTwoButton);

      const display = screen.getByRole("textbox", {
        name: /basic-calculator-display/i,
      });

      expect(display.value).toEqual("1+2");
    });

    test("AC button should clear the display and reset the calculator", () => {
      const numberOneButton = screen.getByText("1");
      const plusButton = screen.getByText("+");
      const numberTwoButton = screen.getByText("2");

      fireEvent.click(numberOneButton);
      fireEvent.click(plusButton);
      fireEvent.click(numberTwoButton);

      const display = screen.getByRole("textbox", {
        name: /basic-calculator-display/i,
      });

      expect(display.value).toEqual("1+2");

      const clearButton = screen.getByText("AC");
      fireEvent.click(clearButton);

      expect(display.value).toEqual("");
    });
  });

  describe("Calculator Calculate function", () => {
    let oneButton;
    let twoButton;
    let threeButton;
    let fourButton;
    let fiveButton;
    let sixButton;
    let sevenButton;
    let eightButton;
    let nineButton;
    let zeroButton;
    let plusButton;
    let minusButton;
    let multiplyButton;
    let divideButton;
    let modulusButton;
    let decimalButton;
    let equalsButton;
    let openingParenthesesButton;
    let closingParenthesesButton;

    beforeEach(() => {
      oneButton = screen.getByText("1");
      twoButton = screen.getByText("2");
      threeButton = screen.getByText("3");
      fourButton = screen.getByText("4");
      fiveButton = screen.getByText("5");
      sixButton = screen.getByText("6");
      sevenButton = screen.getByText("7");
      eightButton = screen.getByText("8");
      nineButton = screen.getByText("9");
      zeroButton = screen.getByText("0");
      plusButton = screen.getByText("+");
      minusButton = screen.getByText("-");
      multiplyButton = screen.getByText("x");
      divideButton = screen.getByText("÷");
      modulusButton = screen.getByText("%");
      decimalButton = screen.getByText(".");
      equalsButton = screen.getByText("=");
      openingParenthesesButton = screen.getByText("(");
      closingParenthesesButton = screen.getByText(")");
    });

    describe("Addition Functionality", () => {
      test("Simple addition calculation", async () => {
        fireEvent.click(oneButton);
        fireEvent.click(plusButton);
        fireEvent.click(twoButton);
        fireEvent.click(equalsButton);

        const display = screen.getByRole("textbox", {
          name: /basic-calculator-display/i,
        });

        expect(display.value).toEqual("3");
      });

      test("Simple addition calculation with double digits", async () => {
        fireEvent.click(oneButton);
        fireEvent.click(twoButton);
        fireEvent.click(plusButton);
        fireEvent.click(twoButton);
        fireEvent.click(zeroButton);
        fireEvent.click(equalsButton);

        const display = screen.getByRole("textbox", {
          name: /basic-calculator-display/i,
        });

        expect(display.value).toEqual("32");
      });

      test("Long addition calculation", async () => {
        fireEvent.click(oneButton);
        fireEvent.click(plusButton);
        fireEvent.click(twoButton);
        fireEvent.click(plusButton);
        fireEvent.click(fourButton);
        fireEvent.click(plusButton);
        fireEvent.click(sixButton);
        fireEvent.click(plusButton);
        fireEvent.click(oneButton);
        fireEvent.click(plusButton);
        fireEvent.click(threeButton);
        fireEvent.click(plusButton);
        fireEvent.click(nineButton);
        fireEvent.click(equalsButton);

        const display = screen.getByRole("textbox", {
          name: /basic-calculator-display/i,
        });

        expect(display.value).toEqual("26");
      });
    });

    describe("Subtraction Functionality", () => {
      test("Simple subtraction calculation", async () => {
        fireEvent.click(oneButton);
        fireEvent.click(minusButton);
        fireEvent.click(twoButton);
        fireEvent.click(equalsButton);

        const display = screen.getByRole("textbox", {
          name: /basic-calculator-display/i,
        });

        expect(display.value).toEqual("-1");
      });

      test("Simple subtration calculation with double digits", async () => {
        fireEvent.click(oneButton);
        fireEvent.click(twoButton);
        fireEvent.click(minusButton);
        fireEvent.click(twoButton);
        fireEvent.click(zeroButton);
        fireEvent.click(equalsButton);

        const display = screen.getByRole("textbox", {
          name: /basic-calculator-display/i,
        });

        expect(display.value).toEqual("-8");
      });

      test("Long subtraction calculation", async () => {
        fireEvent.click(oneButton);
        fireEvent.click(minusButton);
        fireEvent.click(twoButton);
        fireEvent.click(minusButton);
        fireEvent.click(fourButton);
        fireEvent.click(minusButton);
        fireEvent.click(sixButton);
        fireEvent.click(minusButton);
        fireEvent.click(oneButton);
        fireEvent.click(minusButton);
        fireEvent.click(threeButton);
        fireEvent.click(minusButton);
        fireEvent.click(nineButton);
        fireEvent.click(equalsButton);

        const display = screen.getByRole("textbox", {
          name: /basic-calculator-display/i,
        });

        expect(display.value).toEqual("-24");
      });
    });

    describe("Addition and Subtraction Combination Functionality", () => {
      test("Simple subtration and addition calculation", async () => {
        fireEvent.click(oneButton);
        fireEvent.click(twoButton);
        fireEvent.click(minusButton);
        fireEvent.click(twoButton);
        fireEvent.click(plusButton);
        fireEvent.click(nineButton);
        fireEvent.click(equalsButton);

        const display = screen.getByRole("textbox", {
          name: /basic-calculator-display/i,
        });

        expect(display.value).toEqual("19");
      });

      test("Long subtration and addition calculation", async () => {
        fireEvent.click(oneButton);
        fireEvent.click(twoButton);
        fireEvent.click(minusButton);
        fireEvent.click(twoButton);
        fireEvent.click(plusButton);
        fireEvent.click(nineButton);
        fireEvent.click(zeroButton);
        fireEvent.click(twoButton);
        fireEvent.click(plusButton);
        fireEvent.click(twoButton);
        fireEvent.click(plusButton);
        fireEvent.click(sevenButton);
        fireEvent.click(oneButton);
        fireEvent.click(twoButton);
        fireEvent.click(minusButton);
        fireEvent.click(twoButton);
        fireEvent.click(plusButton);
        fireEvent.click(nineButton);
        fireEvent.click(equalsButton);

        const display = screen.getByRole("textbox", {
          name: /basic-calculator-display/i,
        });

        expect(display.value).toEqual("1633");
      });
    });

    describe("Multiplication Functionality", () => {
      test("Simple multiplication calculation", async () => {
        fireEvent.click(twoButton);
        fireEvent.click(multiplyButton);
        fireEvent.click(twoButton);
        fireEvent.click(equalsButton);

        const display = screen.getByRole("textbox", {
          name: /basic-calculator-display/i,
        });

        expect(display.value).toEqual("4");
      });

      test("Long multiplication calculation", async () => {
        fireEvent.click(oneButton);
        fireEvent.click(twoButton);
        fireEvent.click(multiplyButton);
        fireEvent.click(twoButton);
        fireEvent.click(multiplyButton);
        fireEvent.click(nineButton);
        fireEvent.click(zeroButton);
        fireEvent.click(multiplyButton);
        fireEvent.click(twoButton);
        fireEvent.click(multiplyButton);
        fireEvent.click(sevenButton);
        fireEvent.click(oneButton);
        fireEvent.click(twoButton);
        fireEvent.click(multiplyButton);
        fireEvent.click(twoButton);
        fireEvent.click(multiplyButton);
        fireEvent.click(nineButton);
        fireEvent.click(equalsButton);

        const display = screen.getByRole("textbox", {
          name: /basic-calculator-display/i,
        });

        expect(display.value).toEqual("55365120");
      });
    });

    describe("Division Functionality", () => {
      test("Simple division calculation", async () => {
        fireEvent.click(twoButton);
        fireEvent.click(zeroButton);

        fireEvent.click(divideButton);
        fireEvent.click(twoButton);
        fireEvent.click(equalsButton);

        const display = screen.getByRole("textbox", {
          name: /basic-calculator-display/i,
        });

        expect(display.value).toEqual("10");
      });

      test("Long division calculation", async () => {
        fireEvent.click(twoButton);
        fireEvent.click(zeroButton);
        fireEvent.click(zeroButton);
        fireEvent.click(divideButton);
        fireEvent.click(twoButton);
        fireEvent.click(divideButton);
        fireEvent.click(twoButton);
        fireEvent.click(divideButton);
        fireEvent.click(threeButton);
        fireEvent.click(equalsButton);

        const display = screen.getByRole("textbox", {
          name: /basic-calculator-display/i,
        });

        expect(display.value).toEqual("16.666666666666668");
      });
    });

    describe("Modulus Functionality", () => {
      test("Simple modulus calculation", async () => {
        fireEvent.click(twoButton);
        fireEvent.click(threeButton);

        fireEvent.click(modulusButton);
        fireEvent.click(fiveButton);
        fireEvent.click(equalsButton);

        const display = screen.getByRole("textbox", {
          name: /basic-calculator-display/i,
        });

        expect(display.value).toEqual("3");
      });
    });

    describe("All Simple Operators Combined Functionality", () => {
      test("calculation with multiply, subtract, divide, and add should use proper order of operations", async () => {
        fireEvent.click(oneButton);
        fireEvent.click(twoButton);
        fireEvent.click(plusButton);
        fireEvent.click(sixButton);
        fireEvent.click(multiplyButton);
        fireEvent.click(twoButton);
        fireEvent.click(minusButton);
        fireEvent.click(oneButton);
        fireEvent.click(zeroButton);
        fireEvent.click(divideButton);
        fireEvent.click(twoButton);
        fireEvent.click(plusButton);
        fireEvent.click(oneButton);
        fireEvent.click(plusButton);
        fireEvent.click(fiveButton);
        fireEvent.click(modulusButton);
        fireEvent.click(threeButton);
        fireEvent.click(equalsButton);

        const display = screen.getByRole("textbox", {
          name: /basic-calculator-display/i,
        });

        expect(display.value).toEqual("22");
      });
    });

    describe("Parentheses Functionality", () => {
      test("Simple usage of parentheses", async () => {
        fireEvent.click(twoButton);
        fireEvent.click(multiplyButton);
        fireEvent.click(openingParenthesesButton);
        fireEvent.click(twoButton);
        fireEvent.click(plusButton);
        fireEvent.click(eightButton);
        fireEvent.click(closingParenthesesButton);
        fireEvent.click(equalsButton);

        const display = screen.getByRole("textbox", {
          name: /basic-calculator-display/i,
        });

        expect(display.value).toEqual("20");
      });

      test("Advanced usage of parentheses", async () => {
        fireEvent.click(openingParenthesesButton);
        fireEvent.click(twoButton);
        fireEvent.click(multiplyButton);
        fireEvent.click(openingParenthesesButton);
        fireEvent.click(oneButton);
        fireEvent.click(fiveButton);
        fireEvent.click(divideButton);
        fireEvent.click(openingParenthesesButton);
        fireEvent.click(twoButton);
        fireEvent.click(plusButton);
        fireEvent.click(threeButton);
        fireEvent.click(closingParenthesesButton);
        fireEvent.click(multiplyButton);
        fireEvent.click(twoButton);
        fireEvent.click(closingParenthesesButton);
        fireEvent.click(minusButton);
        fireEvent.click(threeButton);
        fireEvent.click(closingParenthesesButton);

        fireEvent.click(equalsButton);

        const display = screen.getByRole("textbox", {
          name: /basic-calculator-display/i,
        });

        expect(display.value).toEqual("9");
      });
    });
  });
});
