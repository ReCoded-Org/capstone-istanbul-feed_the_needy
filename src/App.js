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
import Authentication from "./containers/Authentication";
import Forgot from "./components/Forgot/index.jsx";
import Cart from "./containers/Cart";
import CouponsPage from "./containers/CouponsPage";
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
              <Route path="/coupons" component={CouponsPage} />
              <Route path="/blog" component="#" />
              <Route path="/cart" component={Cart} />
              <Route path="/admin" component={AdminDashboard} />
              <Route path="/register" component={Authentication} />
              <Route path="/forgot" component={Forgot} />
            </div>
          </Content>
          <Footer />
        </Layout>
      </Router>
    </I18nextProvider>
  );
}

export default App;
