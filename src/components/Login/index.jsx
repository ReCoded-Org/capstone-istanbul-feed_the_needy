import React, { useState } from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import { useHistory } from "react-router-dom";
import firebase from "../../firebaseConfig";
import { MailOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Layout } from "../Layout/index";
import "./index.css";

const layout = Layout.layout;
const tailLayout = Layout.tailLayout;

const Login = ({ isTesting }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signin = (e) => {
    e.preventDefault();
    routeChangeAdmin();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => message.success(t("login.loginTitle.loginSuccessMessage")))
      .catch(() => message.warning(t("login.loginTitle.loginErrorMessage")));
  };

  let historyAdmin = useHistory();
  const routeChangeAdmin = () => {
    let path = "/admin";
    historyAdmin.push(path);
  };

  let historyForgot = useHistory();
  const routeChange = () => {
    let path = "/forgot";
    historyForgot.push(path);
  };

  const resetPassword = (e) => {
    routeChange();
  };

  return (
    <div className="formInputSection" {...layout} {...tailLayout}>
      <Form>
        <Form.Item
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input
            prefix={<MailOutlined />}
            placeholder="Email"
            action="click"
            type="email"
            className="ant-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input
            placeholder={t("login.loginTitle.loginTitle2")}
            action="click"
            type="password"
            className="ant-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item valuePropName="checked">
          <Checkbox>{t("login.loginTitle.loginTitle3")}</Checkbox>
        </Form.Item>
        <Form.Item>
          {isTesting ? (
            <button>Donate</button>
          ) : (
            <Button
              style={{ background: "#2F80ED" }}
              type="submit"
              onClick={signin}
              className="loginButton"
            >
              {t("login.loginTitle.loginTitle0")}
            </Button>
          )}
        </Form.Item>
        <Form.Item>
          <Link to="/forgot" onClick={resetPassword}>
            {t("login.loginTitle.logintTitle4")}
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
