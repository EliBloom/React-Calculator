import React from "react";
import "@testing-library/jest-dom/extend-expect";
import BasicCalculator from "../components/BasicCalculator/BasicCalculator";
import Display from "../components/BasicCalculator/Display";
import { render, fireEvent, screen } from "@testing-library/react";
import { ItemGroup } from "rc-menu";

describe("Calculator Display Test", () => {
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
  describe("The basic component should be rendered on its own", () => {
    test("Display should be able to take digit", () => {
      render(<Display />);
      let display = screen.getByRole("textbox", {
        name: /basic-calculator-display/i,
      });

      expect(display).toBeInTheDocument();
    });
  });
  describe("The Display should respond to user typing", () => {
    beforeEach(() => render(<BasicCalculator />));

    test("Display should be able to take digit", () => {
      let display = screen.getByRole("textbox", {
        name: /basic-calculator-display/i,
      });

      expect(display).toBeInTheDocument();
    });
  });
});
