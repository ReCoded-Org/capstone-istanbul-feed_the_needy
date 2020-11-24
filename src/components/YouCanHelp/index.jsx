import React from "react";
import HelpImage from "./image.png";
import { Button, Row, Col, Image } from "antd";
import { useTranslation } from "react-i18next";
import "antd/dist/antd.css";
import "./index.css";
import { useHistory } from "react-router-dom";

const YouCanHelp = ({ isTesting }) => {
  const { t } = useTranslation();
  const history = useHistory();

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
            <h1>{t("youcanhelp.headers.title")}</h1>
            <span>{t("youcanhelp.headers.textSection1")}</span>
            <Col>
              {isTesting ? (
                <button>Donate</button>
              ) : (
                <Button
                  onClick={() => history.push("/coupons")}
                  className="donateButton"
                >
                  {t("youcanhelp.headers.button")}
                </Button>
              )}
            </Col>
          </Col>
        </Col>
        <Col className="imageSection" span={16} xs={24} sm={20} md={24} xl={10}>
          <Image
            className="foodImage"
            xs={20}
            sm={20}
            md={10}
            xl={10}
            src={HelpImage}
            alt="help"
          />
        </Col>
      </Row>
    </div>
  );
};

export default YouCanHelp;
