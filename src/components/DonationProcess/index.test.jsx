import React from "react";
import renderer from "react-test-renderer";
import DonationProcess from "./index";

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

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

it("Donation Process renders correctly", () => {
  const tree = renderer.create(<DonationProcess />).toJSON();
  expect(tree).toMatchSnapshot();
});
