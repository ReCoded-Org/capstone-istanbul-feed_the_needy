import React from "react";
import "./App.css";
import { I18nextProvider } from "react-i18next";
import "antd/dist/antd.css";
import { Layout } from "antd";
import { BrowserRouter as Router, Route } from "react-router-dom";
import i18n from "./i18n";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import HomePage from "./containers/HomePage";
import AdminDashboard from "./containers/AdminDashboard";

const { Content } = Layout;

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <Layout className="layout">
          <NavBar />
          <Content style={{ background: "white", padding: "0 5px" }}>
            <div className="site-layout-content">
              <Route exact path="/" component={HomePage} />
              <Route path="/coupons" component="#" />
              <Route path="/blog" component="#" />
              <Route path="/admin" component={AdminDashboard} />
              <Route path="/cart" component="#" />
            </div>
          </Content>
          <Footer />
        </Layout>
      </Router>
    </I18nextProvider>
  );
}

export default App;
