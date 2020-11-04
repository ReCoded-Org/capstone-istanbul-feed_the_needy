import React from "react";
import renderer from "react-test-renderer";
import YouCanHelp from ".";

jest.mock("i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

const isTesting = true;

it("renders correctly", () => {
  const tree = renderer.create(<YouCanHelp isTesting={isTesting} />).toJSON();
  expect(tree).toMatchSnapshot();
});
