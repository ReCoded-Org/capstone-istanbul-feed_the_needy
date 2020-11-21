import React, { useState } from "react";
import Register from "../../components/Register";
import Login from "../../components/Login";
import { Form, Row, Button } from "antd";
import "./index.css";
import { useTranslation } from "react-i18next";

const Authentication = () => {
  const { t } = useTranslation();
  const [show, setShow] = useState(true);

  const handleShow = () => {
    setShow(true);
  };

  const handleClick = () => {
    setShow(false);
  };

  return (
    <div>
      <div className="authButtons">
        <Form.Item style={{ marginBottom: "5em" }}>
          <div className="authButton">
            <Row>
              <Button
                className="registerButton"
                type="inner"
                onClick={handleShow}
                value="horizontal"
              >
                {t("login.loginTitle.loginTitle0")}
              </Button>
              <Button
                className="registerButton"
                type="inner"
                onClick={handleClick}
                value="vertical"
              >
                {t("register.registerTitle.registerTitle0")}
              </Button>
            </Row>
          </div>
        </Form.Item>
        {show ? <Login /> : <Register />}
      </div>
    </div>
  );
};

export default Authentication;
