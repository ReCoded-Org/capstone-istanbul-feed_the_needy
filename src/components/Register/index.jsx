import React, { useRef, useState } from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import { useHistory } from "react-router-dom";
import firebase from "../../firebaseConfig";
import { useTranslation } from "react-i18next";
import { MailOutlined } from "@ant-design/icons";
import "./index.css";
import { Layout } from "../Layout";

const db = firebase.firestore();
const layout = Layout.layout;
const tailLayout = Layout.tailLayout;

const Register = ({ isTesting }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const uid = useRef();

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      uid.current = user.uid;
    }
  });

  const addOrganization = () => {
    db.collection("restaurants").doc(uid.current).set({
      name: name,
      email: email,
      uid: uid.current,
    });
    setName("");
  };

  const handleClick = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() =>
        message.success(t("register.registerTitle.registerSuccessMessage"))
      )
      .catch(() =>
        message.warning(t("register.registerTitle.registerErrorMessage"))
      );
  };

  let history = useHistory();

  const routeChange = () => {
    let path = "/admin";
    history.push(path);
  };

  const addDetails = (e) => {
    addOrganization();
    handleClick();
    routeChange();
  };

  return (
    <div className="formInputSection" {...layout} {...tailLayout}>
      <Form onFinish={addDetails}>
        <Form.Item>
          <Input
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder={t("register.registerTitle.registerTitle4")}
            action="click"
            type="text"
            className="ant-input"
          />
        </Form.Item>
        <Form.Item
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input
            prefix={<MailOutlined />}
            placeholder={t("register.registerTitle.registerTitle1")}
            action="click"
            type="email"
            className="ant-input"
          />
        </Form.Item>
        <Form.Item
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input
            placeholder={t("register.registerTitle.registerTitle2")}
            action="click"
            type="password"
            className="ant-input"
          />
        </Form.Item>
        <Form.Item
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input
            placeholder={t("register.registerTitle.registerTitle2")}
            action="click"
            type="password"
            className="ant-input"
          />
        </Form.Item>
        <Form.Item valuePropName="checked">
          <Checkbox type="checkbox" required>
            {t("register.registerTitle.registerTitle3")}
          </Checkbox>
        </Form.Item>
        <Form.Item>
          {isTesting ? (
            <button>Donate</button>
          ) : (
            <Button
              style={{ background: "#2F80ED" }}
              type="submit"
              htmlType="submit"
              className="loginButton"
            >
              {t("register.registerTitle.registerTitle0")}
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
