import React from "react";
import renderer from "react-test-renderer";
import CheckoutDrawer from "./index";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

it("CheckoutDrawer renders correctly", () => {
  const tree = renderer.create(<CheckoutDrawer isTesting />).toJSON();
  expect(tree).toMatchSnapshot();
});
