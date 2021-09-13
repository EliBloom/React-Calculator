import React from "react";
import "@testing-library/jest-dom/extend-expect";
import BasicCalculator from "../components/BasicCalculator/BasicCalculator";
import {
  render,
  fireEvent,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";

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

  describe.only("Calculator UI Functionality", () => {
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
    let logButton;
    let cosButton;
    let sinButton;
    let tanButton;
    let powerButton;
    let lnButton;
    let piButton;
    let eulersButton;
    let squareRootButton;

    beforeEach(() => {
      oneButton = screen.getByRole("button", {
        name: /one-button/i,
      });
      twoButton = screen.getByRole("button", {
        name: /two-button/i,
      });
      threeButton = screen.getByRole("button", {
        name: /three-button/i,
      });
      fourButton = screen.getByRole("button", {
        name: /four-button/i,
      });
      fiveButton = screen.getByRole("button", {
        name: /five-button/i,
      });
      sixButton = screen.getByRole("button", {
        name: /six-button/i,
      });
      sevenButton = screen.getByRole("button", {
        name: /seven-button/i,
      });
      eightButton = screen.getByRole("button", {
        name: /eight-button/i,
      });
      nineButton = screen.getByRole("button", {
        name: /nine-button/i,
      });
      zeroButton = screen.getByRole("button", {
        name: /zero-button/i,
      });
      plusButton = screen.getByRole("button", {
        name: /plus-button/i,
      });
      minusButton = screen.getByRole("button", {
        name: /minus-button/i,
      });
      multiplyButton = screen.getByRole("button", {
        name: /multiply-button/i,
      });
      divideButton = screen.getByRole("button", {
        name: /divide-button/i,
      });
      modulusButton = screen.getByRole("button", {
        name: /modulus-button/i,
      });
      decimalButton = screen.getByRole("button", {
        name: /decimal-button/i,
      });
      equalsButton = screen.getByRole("button", {
        name: /equals-button/i,
      });
      openingParenthesesButton = screen.getByRole("button", {
        name: /opening-parenthesis-button/i,
      });
      closingParenthesesButton = screen.getByRole("button", {
        name: /closing-parenthesis-button/i,
      });
      logButton = screen.getByRole("button", {
        name: /log-button/i,
      });
      cosButton = screen.getByRole("button", {
        name: /cos-button/i,
      });
      sinButton = screen.getByRole("button", {
        name: /sin-button/i,
      });
      tanButton = screen.getByRole("button", {
        name: /tangent-button/i,
      });
      powerButton = screen.getByRole("button", {
        name: /power-button/i,
      });
      lnButton = screen.getByRole("button", {
        name: /natural-log-button/i,
      });
      piButton = screen.getByRole("button", {
        name: /pi-button/i,
      });
      eulersButton = screen.getByRole("button", {
        name: /eulers-button/i,
      });
      squareRootButton = screen.getByRole("button", {
        name: /square-root-button/i,
      });
    });

    describe.only("Addition Functionality", () => {
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

    describe.only("Subtraction Functionality", () => {
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

    describe.only("Addition and Subtraction Combination Functionality", () => {
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

    describe.only("Multiplication Functionality", () => {
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

    describe.only("Division Functionality", () => {
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

    describe.only("Modulus Functionality", () => {
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

    describe.only("All Simple Operators Combined Functionality", () => {
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
      test.only("Simple usage of parentheses", async () => {
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

      test.only("Advanced usage of parentheses", async () => {
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
        fireEvent.click(multiplyButton);
        fireEvent.click(fourButton);
        fireEvent.click(closingParenthesesButton);
        fireEvent.click(multiplyButton);
        fireEvent.click(twoButton);
        fireEvent.click(closingParenthesesButton);
        fireEvent.click(minusButton);
        fireEvent.click(threeButton);
        fireEvent.click(closingParenthesesButton);
        fireEvent.click(multiplyButton);
        fireEvent.click(nineButton);
        fireEvent.click(minusButton);
        fireEvent.click(sevenButton);

        fireEvent.click(equalsButton);

        const display = screen.getByRole("textbox", {
          name: /basic-calculator-display/i,
        });

        expect(display.value).toEqual("4.571428571428569");
      });

      //This is failing: (2x(15/(2+3x4)x2)-3)*9-7
      //when debugging play into the brackets of a - openingParentheses === 4 twice
    });

    // 2x(3+cos(2-6))
    describe("Mathematical Functions", () => {
      test("Simple usage of cosine mathematical function", async () => {
        fireEvent.click(twoButton);
        fireEvent.click(multiplyButton);
        fireEvent.click(openingParenthesesButton);
        fireEvent.click(threeButton);
        fireEvent.click(plusButton);
        fireEvent.click(cosButton);
        fireEvent.click(twoButton);
        fireEvent.click(minusButton);
        fireEvent.click(sixButton);
        fireEvent.click(closingParenthesesButton);
        fireEvent.click(closingParenthesesButton);
        fireEvent.click(equalsButton);

        const display = screen.getByRole("textbox", {
          name: /basic-calculator-display/i,
        });

        expect(display.value).toEqual("7.99512810052");
      });
    });
  });
});
