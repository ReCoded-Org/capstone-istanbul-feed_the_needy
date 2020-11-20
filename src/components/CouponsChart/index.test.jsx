import React from "react";
import renderer from "react-test-renderer";
import CouponsChart from "./index";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

it("CouponsChart renders correctly", () => {
  const tree = renderer.create(<CouponsChart />).toJSON();
  expect(tree).toMatchSnapshot();
});
