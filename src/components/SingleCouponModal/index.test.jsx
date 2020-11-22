import React from "react";
import renderer from "react-test-renderer";
import SingleCouponModal from "./index";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

it("SingleCouponModal renders correctly", () => {
  const tree = renderer.create(<SingleCouponModal />).toJSON();
  expect(tree).toMatchSnapshot();
});
