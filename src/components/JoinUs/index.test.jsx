import React from "react";
import renderer from "react-test-renderer";
import JoinUs from "./index";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

const isTesting = true;

it("JoinUs renders correctly", () => {
  const tree = renderer.create(<JoinUs isTesting={isTesting} />).toJSON();
  expect(tree).toMatchSnapshot();
});
