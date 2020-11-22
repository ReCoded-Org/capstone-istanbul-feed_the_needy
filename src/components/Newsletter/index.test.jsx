import React from "react";
import renderer from "react-test-renderer";
import Newsletter from "./index";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

// Fix for TypeError: window.matchMedia is not a function
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

it("Newsletter renders correctly", () => {
  const tree = renderer
    .create(<Newsletter isTesting />, { disableLifecycleMethods: true })
    .toJSON();
  expect(tree).toMatchSnapshot();
});
