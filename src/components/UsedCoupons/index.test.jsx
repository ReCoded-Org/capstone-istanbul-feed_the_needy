import React from "react";
import renderer from "react-test-renderer";
import UsedCoupons from "./index";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

it("UsedCoupons renders correctly", () => {
  const tree = renderer.create(<UsedCoupons isTesting />).toJSON();
  expect(tree).toMatchSnapshot();
});
