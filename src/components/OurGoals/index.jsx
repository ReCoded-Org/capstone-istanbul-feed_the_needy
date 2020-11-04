import React from "react";
import "antd/dist/antd.css";
import "./style.css";
import { useTranslation } from "react-i18next";
import { Row, Col, Card, Typography } from "antd";
import { ReactComponent as GoodHealth } from "./GoodHealth.svg";
import { ReactComponent as NoPoverty } from "./NoPoverty.svg";
import { ReactComponent as ZeroHunger } from "./ZeroHunger.svg";

const { Title } = Typography;

const OurGoals = () => {
  const { t } = useTranslation();

  return (
    <div justify="center" align="center">
      <Row gutter={16} className="ourGoalsTitle">
        <Title>{t("ourGoalsComp.card.title0")}</Title>
      </Row>
      <Row gutter={56} justify="center" align="center">
        <Col xs={24} sm={24} md={12} xl={8}>
          <Card bordered={false}>
            <div className="ourGoalsCard">
              <NoPoverty />
              <Title level={3} className="ourGoalsCardText">
                {t("ourGoalsComp.card.title1")}
              </Title>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} xl={8}>
          <Card bordered={false}>
            <div className="ourGoalsCard">
              <ZeroHunger />
              <Title level={3} className="ourGoalsCardText">
                {t("ourGoalsComp.card.title2")}
              </Title>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} xl={8}>
          <Card bordered={false}>
            <div className="ourGoalsCard">
              <GoodHealth />
              <Title level={3} className="ourGoalsCardText">
                {t("ourGoalsComp.card.title3")}
              </Title>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OurGoals;
