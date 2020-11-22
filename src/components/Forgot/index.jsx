import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import firebase from "../../firebaseConfig";
import { MailOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { Layout } from "../Layout/index";

const layout = Layout.layout;
const tailLayout = Layout.tailLayout;

function Forgot({ isTesting }) {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");

  const forgotPassword = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() =>
        message.success(t("forgotEmail.forgotEmailtitle.forgotEmailSuccess"))
      )
      .catch(() =>
        message.warning(t("forgotEmail.forgotEmailtitle.forgotEmailError"))
      );
  };

  return (
    <Form {...layout} {...tailLayout}>
      <Form.Item
        rules={[
          {
            required: true,
            message: t("forgotEmail.forgotEmailtitle.forgotEmailError2"),
          },
        ]}
      >
        <Input
          prefix={<MailOutlined />}
          style={{ width: "40em", display: "flex" }}
          placeholder={t("forgotEmail.forgotEmailtitle.forgotEmailTitle1")}
          action="click"
          type="email"
          className="ant-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Item>
      <Form.Item {...tailLayout}>
        {isTesting ? (
          <button>Donate</button>
        ) : (
          <Button
            style={{ width: "40em", background: "#2F80ED" }}
            type="submit"
            onClick={forgotPassword}
          >
            {t("forgotEmail.forgotEmailtitle.forgotEmailTitle0")}
          </Button>
        )}
      </Form.Item>
    </Form>
  );
}

export default Forgot;
