import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";
import Footer from "./index";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

it("Footer renders correctly", () => {
  const tree = renderer
    .create(
      <Router>
        <Footer />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
