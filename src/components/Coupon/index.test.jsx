import React from "react";
import renderer from "react-test-renderer";
import Coupon from "./index";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

it("Coupon renders correctly", () => {
  const tree = renderer.create(<Coupon isTesting />).toJSON();
  expect(tree).toMatchSnapshot();
});
