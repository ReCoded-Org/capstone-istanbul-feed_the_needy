import React from "react";
import "antd/dist/antd.css";
import "./style.css";
import { useTranslation } from "react-i18next";
import { Row, Col, Typography } from "antd";
import { ReactComponent as BurgerKing } from "./BurgerKing.svg";
import { ReactComponent as McDonalds } from "./McDonalds.svg";
import { ReactComponent as Tesco } from "./Tesco.svg";
import { ReactComponent as PizzaHut } from "./PizzaHut.svg";

const { Title } = Typography;

const OurSponsors = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Row gutter={16} className="ourSponsorsTitle">
        <Title>{t("ourSponsorsComp.card.title0")}</Title>
      </Row>
      <Row gutter={16} justify="space-around">
        <Col xs={24} sm={24} md={12} xl={6}>
          <BurgerKing className="burgerKing" />
        </Col>
        <Col xs={24} sm={24} md={12} xl={6}>
          <McDonalds />
        </Col>
        <Col xs={24} sm={24} md={12} xl={6}>
          <Tesco className="tesco" />
        </Col>
        <Col xs={24} sm={24} md={12} xl={6}>
          <PizzaHut />
        </Col>
      </Row>
    </div>
  );
};

export default OurSponsors;
