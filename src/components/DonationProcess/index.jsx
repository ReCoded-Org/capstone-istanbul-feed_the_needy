import React from "react";
import "antd/dist/antd.css";
import "./style.css";
import { useTranslation } from "react-i18next";
import { Row, Col, Card, Typography } from "antd";
import { ReactComponent as StepDonation } from "./stepDonation.svg";
import { ReactComponent as StepFood } from "./stepFood.svg";
import { ReactComponent as StepCoupon } from "./stepCoupon.svg";

const { Title } = Typography;

const DonationProcess = () => {
  const { t } = useTranslation();

  return (
    <div justify="center" align="center">
      <Row gutter={16} justify="center" className="donationProcessTitle">
        <Title>{t("donationProcessComp.card.title0")}</Title>
      </Row>
      <Row gutter={56} justify="space-around">
        <Col xs={24} sm={24} md={12} xl={8}>
          <Card bordered={false}>
            <div className="donationProcessText">
              <StepDonation />
              <Title level={2}>{t("donationProcessComp.card.title1")}</Title>
              <Title level={5}>{t("donationProcessComp.card.title4")}</Title>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} xl={8}>
          <Card bordered={false}>
            <div className="donationProcessText">
              <StepFood />
              <Title level={2}>{t("donationProcessComp.card.title2")}</Title>
              <Title level={5}>{t("donationProcessComp.card.title5")}</Title>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} xl={8}>
          <Card bordered={false}>
            <div className="donationProcessText">
              <StepCoupon />
              <Title level={2}>{t("donationProcessComp.card.title3")}</Title>
              <Title level={5}>{t("donationProcessComp.card.title6")}</Title>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DonationProcess;
