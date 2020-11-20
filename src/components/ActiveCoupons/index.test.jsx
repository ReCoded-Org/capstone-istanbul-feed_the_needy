import React from "react";
import renderer from "react-test-renderer";
import ActiveCoupons from "./index";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

it("ActiveCoupons renders correctly", () => {
  const tree = renderer.create(<ActiveCoupons isTesting />).toJSON();
  expect(tree).toMatchSnapshot();
});
