import React from "react";
import renderer from "react-test-renderer";
import EditOrganization from "./index";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

it("EditOrganization renders correctly", () => {
  const tree = renderer.create(<EditOrganization isTesting />).toJSON();
  expect(tree).toMatchSnapshot();
});
