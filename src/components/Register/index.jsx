import React, { useState } from "react";
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
  const [passwordCheck, setPasswordCheck] = useState("");
  const [name, setName] = useState("");
  const defaultLogoUrl =
    "https://image.freepik.com/free-photo/wooden-board-empty-table-top-blurred-background_1253-1584.jpg";
  let history = useHistory();

  const routeChange = () => {
    let path = "/admin";
    history.push(path);
  };

  const addOrganization = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        db.collection("restaurants").doc(user.uid).set({
          name: name,
          email: email,
          uid: user.uid,
          website: "",
          description: "",
          logo: "",
          logoURL: defaultLogoUrl,
          logoName: "",
        });
        const chartStatistics = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        db.collection("soldCoupons").doc(user.uid).set({
          compName: name,
          "25₺": chartStatistics,
          "50₺": chartStatistics,
          "75₺": chartStatistics,
          "100₺": chartStatistics,
          "150₺": chartStatistics,
          "200₺": chartStatistics,
        });
        setName("");
      }
    });
  };

  const handleClick = () => {
    if (password === passwordCheck) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          message.success(t("register.registerTitle.registerSuccessMessage"));
          routeChange();
        })
        .catch((err) => {
          message.warning(err.message);
        });
    } else {
      message.warning("Please enter matching passwords!");
    }
  };

  const addDetails = () => {
    handleClick();
    addOrganization();
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
          value={passwordCheck}
          onChange={(e) => setPasswordCheck(e.target.value)}
          rules={[
            { required: true, message: "Please input your password again!" },
          ]}
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
              type="primary"
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
