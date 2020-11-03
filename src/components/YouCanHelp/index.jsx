import React from "react";
import HelpImage from "./image.png";
import { Button, Row, Col } from "antd";
import { useTranslation } from "react-i18next";
import "antd/dist/antd.css";
import "./index.css";

const YouCanHelp = ({ isTesting }) => {
  const { t } = useTranslation();

  return (
    <div className="containerYoucanhelp">
      <Row span={36} xs={24} sm={20} md={36} xl={30} justify="space-between">
        <Col
          className="youCanHelpToo"
          span={16}
          xs={24}
          sm={20}
          md={24}
          xl={10}
        >
          <Col className="youCanHelpText">
            <h1>You can help too!</h1>
            <span>{t("youcanhelp.headers.textSection1")}</span>
            <Col>
              {isTesting ? (
                <button>Donate</button>
              ) : (
                <Button className="donateButton">
                  {t("youcanhelp.headers.button")}
                </Button>
              )}
            </Col>
          </Col>
        </Col>
        <Col className="imageSection" span={36} xs={8} sm={20} md={24} xl={12}>
          <img
            className="foodImage"
            span={36}
            xs={8}
            sm={20}
            md={24}
            xl={12}
            src={HelpImage}
            alt="help"
          />
        </Col>
      </Row>
    </div>
  );
};
export default YouCanHelp;
