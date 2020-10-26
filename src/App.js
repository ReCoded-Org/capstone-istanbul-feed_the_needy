import React from "react";
import "./App.css";
import "antd/dist/antd.css";
import { Layout } from "antd";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import HomePage from "./containers/HomePage";

const { Content } = Layout;

function App() {
  return (
    <Router>
      <Layout className="layout">
        <NavBar />
        <Content style={{ background: "white", padding: "0 50px" }}>
          <div className="site-layout-content">
            <Route path="/" component={HomePage} />
            <Route path="/coupons" component="#" />
            <Route path="/blog" component="#" />
            <Route path="/admin" component="#" />
            <Route path="/cart" component="#" />
          </div>
        </Content>
        <Footer />
      </Layout>
    </Router>
  );
}

export default App;
