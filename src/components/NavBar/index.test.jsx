import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";
import NavBar from "./index";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

it("Navbar renders correctly", () => {
  const tree = renderer
    .create(
      <Router>
        <NavBar isTesting />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
