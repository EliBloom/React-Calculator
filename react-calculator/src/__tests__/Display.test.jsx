import React from "react";
import "@testing-library/jest-dom/extend-expect";
import BasicCalculator from "../components/BasicCalculator/BasicCalculator";
import Display from "../components/BasicCalculator/Display";
import { render, screen, prettyDOM } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

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

  let display = {};

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
    beforeEach(() => {
      render(<BasicCalculator />);

      display = screen.getByRole("textbox", {
        name: /basic-calculator-display/i,
      });
    });

    test("Display should be able to take a digit", () => {
      expect(display).toBeInTheDocument();

      userEvent.type(display, "1");
      expect(display.value).toEqual("1");
    });

    test("Display should be able to take an equation", () => {
      expect(display).toBeInTheDocument();

      userEvent.type(display, "1+2");
      expect(display.value).toEqual("1+2");
    });

    test("Display should allow user to type a math function", () => {
      expect(display).toBeInTheDocument();

      userEvent.type(display, "cos)");
      expect(display.value).toEqual("cos()");
    });

    test("Display should show list of options when user types math functions", () => {
      expect(display).toBeInTheDocument();

      userEvent.type(display, "c");

      let autocompleteList = screen.getByRole("list", {
        name: "",
      });
      expect(autocompleteList).toBeInTheDocument();
    });

    /**
     * The filled Display value is expected as s(, this is becuase react-testing-library is weird and only
     * has the value of the last character of the selected string.
     */
    test("Display should get filled by selected autocomplete option", () => {
      expect(display).toBeInTheDocument();

      userEvent.type(display, "s");
      const element = screen.getByTestId("autocomplete-options-list");

      expect(element).toBeInTheDocument();

      let listItems = screen.getAllByRole("listitem", {
        name: "",
      });

      let listItem = listItems[0];

      expect(listItem).toBeInTheDocument();
      userEvent.click(listItem);

      expect(display.value).toEqual("s(");
    });
  });
});
