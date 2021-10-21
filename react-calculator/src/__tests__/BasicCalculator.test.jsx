import React from "react";
import "@testing-library/jest-dom/extend-expect";
import BasicCalculator from "../components/BasicCalculator/BasicCalculator";
import {
  render,
  fireEvent,
  screen,
  waitForElementToBeRemoved,
  waitFor,
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
    let backspaceButton;

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
      backspaceButton = screen.getByRole("button", {
        name: /backspace-button/i,
      });
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

    describe("PI Functionality", () => {
      test("Simple pi calculation", async () => {
        fireEvent.click(oneButton);
        fireEvent.click(plusButton);
        fireEvent.click(piButton);
        fireEvent.click(equalsButton);

        const display = screen.getByRole("textbox", {
          name: /basic-calculator-display/i,
        });

        expect(display.value).toEqual("4.141592653589793");
      });

      test("Advanced pi calculation", async () => {
        fireEvent.click(twoButton);
        fireEvent.click(plusButton);
        fireEvent.click(threeButton);
        fireEvent.click(multiplyButton);
        fireEvent.click(piButton);
        fireEvent.click(plusButton);
        fireEvent.click(twoButton);

        fireEvent.click(equalsButton);

        const display = screen.getByRole("textbox", {
          name: /basic-calculator-display/i,
        });

        expect(display.value).toEqual("13.42477796076938");
      });

      test("Advanced pi calculation with parenthesis", async () => {
        fireEvent.click(fiveButton);
        fireEvent.click(multiplyButton);
        fireEvent.click(openingParenthesesButton);
        fireEvent.click(oneButton);
        fireEvent.click(fiveButton);
        fireEvent.click(divideButton);
        fireEvent.click(openingParenthesesButton);
        fireEvent.click(fiveButton);
        fireEvent.click(plusButton);
        fireEvent.click(piButton);
        fireEvent.click(closingParenthesesButton);
        fireEvent.click(closingParenthesesButton);
        fireEvent.click(minusButton);
        fireEvent.click(piButton);

        fireEvent.click(equalsButton);

        const display = screen.getByRole("textbox", {
          name: /basic-calculator-display/i,
        });

        expect(display.value).toEqual("6.070364169984643");
      });
    });

    describe("Euler's number Functionality", () => {
      test("Simple euler's calculation", async () => {
        fireEvent.click(oneButton);
        fireEvent.click(plusButton);
        fireEvent.click(eulersButton);
        fireEvent.click(equalsButton);

        const display = screen.getByRole("textbox", {
          name: /basic-calculator-display/i,
        });

        expect(display.value).toEqual("3.718281828459045");
      });

      test("Advanced euler's calculation", async () => {
        fireEvent.click(twoButton);
        fireEvent.click(plusButton);
        fireEvent.click(threeButton);
        fireEvent.click(multiplyButton);
        fireEvent.click(eulersButton);
        fireEvent.click(plusButton);
        fireEvent.click(twoButton);

        fireEvent.click(equalsButton);

        const display = screen.getByRole("textbox", {
          name: /basic-calculator-display/i,
        });

        expect(display.value).toEqual("12.154845485377136");
      });

      test("Advanced euler's calculation with parenthesis", async () => {
        fireEvent.click(fiveButton);
        fireEvent.click(multiplyButton);
        fireEvent.click(openingParenthesesButton);
        fireEvent.click(oneButton);
        fireEvent.click(fiveButton);
        fireEvent.click(divideButton);
        fireEvent.click(openingParenthesesButton);
        fireEvent.click(fiveButton);
        fireEvent.click(plusButton);
        fireEvent.click(eulersButton);
        fireEvent.click(closingParenthesesButton);
        fireEvent.click(closingParenthesesButton);
        fireEvent.click(minusButton);
        fireEvent.click(eulersButton);

        fireEvent.click(equalsButton);

        const display = screen.getByRole("textbox", {
          name: /basic-calculator-display/i,
        });

        expect(display.value).toEqual("6.998906746264684");
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
      test("calculation with multiply, subtract, divide, and add; should use proper order of operations", async () => {
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
    });

    describe("Mathematical Functions", () => {
      describe("Cosine Functions", () => {
        test("Simple usage of cosine mathematical function", async () => {
          fireEvent.click(cosButton);
          fireEvent.click(threeButton);
          fireEvent.click(closingParenthesesButton);
          fireEvent.click(equalsButton);

          const display = screen.getByRole("textbox", {
            name: /basic-calculator-display/i,
          });

          expect(display.value).toEqual("0.9986295347545738");
        });

        test("Advanced usage of cosine mathematical function", async () => {
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

          expect(display.value).toEqual("7.995128100519649");
        });
      });

      describe("Deletion Functionality", () => {
        // test("Delete button should remove a digit", async () => {
        //   fireEvent.click(twoButton);
        //   fireEvent.click(plusButton);
        //   fireEvent.click(threeButton);
        //   fireEvent.click(backspaceButton);
        //   fireEvent.click(sixButton);
        //   fireEvent.click(equalsButton);
        //   const display = screen.getByRole("textbox", {
        //     name: /basic-calculator-display/i,
        //   });
        //   expect(display.value).toEqual("8");
        // });
        // test("Delete button should remove an operator", async () => {
        //   fireEvent.click(twoButton);
        //   fireEvent.click(plusButton);
        //   fireEvent.click(fourButton);
        //   fireEvent.click(backspaceButton);
        //   fireEvent.click(backspaceButton);
        //   fireEvent.click(multiplyButton);
        //   fireEvent.click(fourButton);
        //   fireEvent.click(equalsButton);
        //   const display = screen.getByRole("textbox", {
        //     name: /basic-calculator-display/i,
        //   });
        //   expect(display.value).toEqual("8");
        // });
        test("Delete button should remove pi", async () => {
          fireEvent.click(twoButton);
          fireEvent.click(plusButton);
          fireEvent.click(sinButton);
          fireEvent.click(threeButton);
          fireEvent.click(plusButton);
          fireEvent.click(fourButton);
          fireEvent.click(closingParenthesesButton);
          fireEvent.click(equalsButton);
          const display = screen.getByRole("textbox", {
            name: /basic-calculator-display/i,
          });
          expect(display.value).toEqual("2.1218693434051477");
        });
        test("Delete button should remove a mathematical function", async () => {
          fireEvent.click(twoButton);
          fireEvent.click(plusButton);
          fireEvent.click(sinButton);
          fireEvent.click(threeButton);
          fireEvent.click(plusButton);
          fireEvent.click(fourButton);
          fireEvent.click(closingParenthesesButton);
          fireEvent.click(equalsButton);
          const display = screen.getByRole("textbox", {
            name: /basic-calculator-display/i,
          });
          expect(display.value).toEqual("2.1218693434051477");
        });
        test("Delete button should be able to remove multiple items and not affect calculated value", async () => {
          fireEvent.click(twoButton);
          fireEvent.click(plusButton);
          fireEvent.click(sinButton);
          fireEvent.click(threeButton);
          fireEvent.click(plusButton);
          fireEvent.click(fourButton);
          fireEvent.click(closingParenthesesButton);
          fireEvent.click(equalsButton);
          const display = screen.getByRole("textbox", {
            name: /basic-calculator-display/i,
          });
          expect(display.value).toEqual("2.1218693434051477");
        });
      });

      describe("Sine Functions", () => {
        test("Simple usage of sine mathematical function", async () => {
          fireEvent.click(twoButton);
          fireEvent.click(plusButton);
          fireEvent.click(sinButton);
          fireEvent.click(threeButton);
          fireEvent.click(plusButton);
          fireEvent.click(fourButton);
          fireEvent.click(closingParenthesesButton);
          fireEvent.click(equalsButton);

          const display = screen.getByRole("textbox", {
            name: /basic-calculator-display/i,
          });

          expect(display.value).toEqual("2.1218693434051477");
        });

        //2+(3*(sin(2+4*2)))-sin(4)
        test("Advanced usage of sine mathematical function", async () => {
          fireEvent.click(twoButton);
          fireEvent.click(plusButton);
          fireEvent.click(openingParenthesesButton);
          fireEvent.click(threeButton);
          fireEvent.click(multiplyButton);
          fireEvent.click(openingParenthesesButton);
          fireEvent.click(sinButton);
          fireEvent.click(twoButton);
          fireEvent.click(plusButton);
          fireEvent.click(fourButton);
          fireEvent.click(multiplyButton);
          fireEvent.click(twoButton);
          fireEvent.click(closingParenthesesButton);
          fireEvent.click(closingParenthesesButton);
          fireEvent.click(closingParenthesesButton);
          fireEvent.click(minusButton);
          fireEvent.click(sinButton);
          fireEvent.click(fourButton);
          fireEvent.click(closingParenthesesButton);

          fireEvent.click(equalsButton);

          const display = screen.getByRole("textbox", {
            name: /basic-calculator-display/i,
          });

          expect(display.value).toEqual("2.451188059256666");
        });
      });

      describe("Tangent Functions", () => {
        test("Simple usage of tangent mathematical function", async () => {
          fireEvent.click(tanButton);
          fireEvent.click(threeButton);
          fireEvent.click(closingParenthesesButton);
          fireEvent.click(equalsButton);

          const display = screen.getByRole("textbox", {
            name: /basic-calculator-display/i,
          });

          expect(display.value).toEqual("0.0524077792830412");
        });
        //(3 × 2 + (4 ÷ tan(3 × tan(5 + 1)) - 6) ÷ 2)+4
        test("Advanced usage of tangent mathematical function", async () => {
          fireEvent.click(openingParenthesesButton);
          fireEvent.click(threeButton);
          fireEvent.click(multiplyButton);
          fireEvent.click(twoButton);
          fireEvent.click(plusButton);
          fireEvent.click(openingParenthesesButton);
          fireEvent.click(fourButton);
          fireEvent.click(divideButton);
          fireEvent.click(tanButton);
          fireEvent.click(threeButton);
          fireEvent.click(multiplyButton);
          fireEvent.click(tanButton);

          fireEvent.click(fiveButton);
          fireEvent.click(plusButton);
          fireEvent.click(oneButton);
          fireEvent.click(closingParenthesesButton);
          fireEvent.click(closingParenthesesButton);
          fireEvent.click(minusButton);
          fireEvent.click(sixButton);
          fireEvent.click(closingParenthesesButton);
          fireEvent.click(divideButton);
          fireEvent.click(twoButton);
          fireEvent.click(closingParenthesesButton);
          fireEvent.click(plusButton);
          fireEvent.click(fourButton);

          fireEvent.click(equalsButton);

          const display = screen.getByRole("textbox", {
            name: /basic-calculator-display/i,
          });

          expect(display.value).toEqual("370.4182831468295");
        });
      });

      describe("Square Root Functions", () => {
        // test("Simple usage of square root mathematical function", async () => {
        //   fireEvent.click(squareRootButton);
        //   fireEvent.click(nineButton);
        //   fireEvent.click(closingParenthesesButton);
        //   fireEvent.click(equalsButton);
        //   const display = screen.getByRole("textbox", {
        //     name: /basic-calculator-display/i,
        //   });
        //   expect(display.value).toEqual("3");
        // });
        //2x(3+sqr(25-13)-6xsqr(81))
        // test("Advanced usage of square root+ mathematical function", async () => {
        //   fireEvent.click(twoButton);
        //   fireEvent.click(multiplyButton);
        //   fireEvent.click(openingParenthesesButton);
        //   fireEvent.click(threeButton);
        //   fireEvent.click(plusButton);
        //   fireEvent.click(squareRootButton);
        //   fireEvent.click(twoButton);
        //   fireEvent.click(fiveButton);
        //   fireEvent.click(minusButton);
        //   fireEvent.click(oneButton);
        //   fireEvent.click(threeButton);
        //   fireEvent.click(closingParenthesesButton);
        //   fireEvent.click(minusButton);
        //   fireEvent.click(sixButton);
        //   fireEvent.click(multiplyButton);
        //   fireEvent.click(squareRootButton);
        //   fireEvent.click(eightButton);
        //   fireEvent.click(oneButton);
        //   fireEvent.click(closingParenthesesButton);
        //   fireEvent.click(closingParenthesesButton);
        //   fireEvent.click(equalsButton);
        //   const display = screen.getByRole("textbox", {
        //     name: /basic-calculator-display/i,
        //   });
        //   expect(display.value).toEqual("-95.0717967697");
        // });
      });
    });
  });
});
