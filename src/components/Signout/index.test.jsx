import React from "react";
import renderer from "react-test-renderer";
import Signout from "./index";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

it("Signout renders correctly", () => {
  const tree = renderer.create(<Signout />).toJSON();
  expect(tree).toMatchSnapshot();
});
