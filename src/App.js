import React from "react";
import "./App.css";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import HomePage from "./containers/HomePage";

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <div className="App">
        <HomePage />
      </div>
    </I18nextProvider>
  );
}

export default App;
