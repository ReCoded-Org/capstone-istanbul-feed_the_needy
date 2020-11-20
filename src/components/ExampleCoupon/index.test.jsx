import React from "react";
import renderer from "react-test-renderer";
import ExampleCoupon from "./index";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

it("ExampleCoupon renders correctly", () => {
  const tree = renderer.create(<ExampleCoupon isTesting />).toJSON();
  expect(tree).toMatchSnapshot();
});
