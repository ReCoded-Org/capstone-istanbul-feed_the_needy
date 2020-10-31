import React from "react";
import renderer from "react-test-renderer";
import WorkingTogether from "./index";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

it("Working together renders correctly", () => {
  const tree = renderer.create(<WorkingTogether />).toJSON();
  expect(tree).toMatchSnapshot();
});
