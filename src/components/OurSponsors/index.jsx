import React from "react";
import "antd/dist/antd.css";
import "./style.css";
import { useTranslation } from "react-i18next";
import { Row, Col, Typography } from "antd";
import { ReactComponent as BurgerKing } from "./BurgerKing.svg";
import { ReactComponent as McDonalds } from "./McDonalds.svg";
import { ReactComponent as Arby } from "./Arby.svg";
import { ReactComponent as PizzaHut } from "./PizzaHut.svg";

const { Title } = Typography;

const OurSponsors = () => {
  const { t } = useTranslation();

  return (
    <Row className="ourSponsorsWrapper">
      <Col span={24} className="ourSponsorsWrapper">
        <Title>{t("ourSponsorsComp.card.title0")}</Title>
      </Col>
      <Row gutter={[48, 8]} className="ourSponsorLogos">
        <Col xs={24} sm={24} md={12} xl={6}>
          <BurgerKing className="burgerKing" />
        </Col>
        <Col xs={24} sm={24} md={12} xl={6}>
          <McDonalds />
        </Col>
        <Col xs={24} sm={24} md={12} xl={6}>
          <Arby className="arby" />
        </Col>
        <Col xs={24} sm={24} md={12} xl={6}>
          <PizzaHut />
        </Col>
      </Row>
    </Row>
  );
};

export default OurSponsors;
