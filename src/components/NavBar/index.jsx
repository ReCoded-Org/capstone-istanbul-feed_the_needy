import React from "react";
import { Link } from "react-router-dom";
import Icon from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { ReactComponent as AdminSvg } from "./admin.svg";
import { ReactComponent as CartSvg } from "./cart.svg";
import { ReactComponent as LogoSvg } from "../../images/logo.svg";
import { ReactComponent as FoodOnCouponSvg } from "../../images/foodOnCoupon.svg";
import { ReactComponent as StackedTitleSvg } from "../../images/stackedTitle.svg";

import "./style.css";

const { Header } = Layout;

const home = "Home";
const coupons = "Coupons";
const blog = "Blog";

const AdminIcon = () => (
  <Icon style={{ transform: "scale(2)" }} component={AdminSvg} />
);
const CartIcon = () => (
  <Icon style={{ transform: "scale(2)" }} component={CartSvg} />
);

const NavBar = () => {
  return (
    <>
      <Header className="header">
        <div className="logo">
          <LogoSvg />
          
        </div>
        <div className="title">
          <FoodOnCouponSvg />
        </div>
        <div className="stacked-title">
          <StackedTitleSvg />

        </div>
        <Menu
          style={{ background: "#F0B32C" }}
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
        >
          <Menu.Item key="1">
            {" "}
            <Link to="/">{home}</Link>
            {" "}
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/coupons">{coupons}</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/blog">{blog}</Link>
          </Menu.Item>

          <Menu.Item key="4" className="cart">
            <Link to="/cart">
              <CartIcon />
            </Link>
          </Menu.Item>

          <Menu.Item key="5" className="admin">
            <Link to="/admin">
              {" "}
              <AdminIcon />
              {" "}
            </Link>
          </Menu.Item>
        </Menu>
      </Header>
    </>
  );
};

export default NavBar;
