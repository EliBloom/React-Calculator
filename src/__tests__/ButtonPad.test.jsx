import React from "react";
import "@testing-library/jest-dom/extend-expect";
import BasicCalculator from "../components/BasicCalculator/BasicCalculator";
import ButtonPad from "../components/BasicCalculator/ButtonPad";
import Display from "../components/BasicCalculator/Display";
import { render, fireEvent, screen } from "@testing-library/react";
import { ItemGroup } from "rc-menu";

describe("Calculator Button Pad Test", () => {
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

  test("The button pad should be rendered on its own", () => {
    render(<ButtonPad />);
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
      "(",
      ")",
      "cos",
      "tan",
      "sin",
      "e",
      "ln",
      "π",
      "EXP",
    ];
    onScreenSymbols.forEach((symbol) => {
      expect(screen.getByText(symbol)).toBeInTheDocument();
    });
  });
});
