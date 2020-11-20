import React, { useRef, useState } from "react";
import "./style.css";
import { Card, Typography } from "antd";
import { LinkOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import defaultRestaurantLogo from "../../images/defaultRestaurantLogo.jpg";

const { Meta } = Card;
const { Text, Title } = Typography;

const ExampleCoupon = ({ orgName, orgLink, orgDescription, logoURL }) => {
  const { t } = useTranslation();
  const [price, setPrice] = useState("25₺");
  const timer = useRef(null);
  const priceList = ["25₺", "50₺", "75₺", "100₺", "150₺", "200₺"];
  const counter = useRef(-1);
  const MAXCOUNTER = 5;

  const changePrices = () => {
    if (counter.current < MAXCOUNTER) {
      counter.current += 1;
      setPrice(priceList[counter.current]);
    } else {
      counter.current = -1;
    }
    if (timer.current === null) {
      timer.current = setInterval(changePrices, 2000);
    }
  };

  const stopTimer = () => {
    if (timer.current !== null) {
      clearInterval(timer.current);
      timer.current = null;
    }
  };

  return (
    <>
      <Card
        onMouseEnter={changePrices}
        onMouseLeave={stopTimer}
        hoverable
        style={{ width: "100%", height: "96.5%" }}
        cover={
          <img
            style={{ maxHeight: "21rem" }}
            alt="restaurant's logo"
            src={logoURL || defaultRestaurantLogo}
          />
        }
      >
        <Meta title={price} />
        <div className="exampleCouponContent">
          <Title level={3}>{orgName}</Title>
          <a
            title={t("editOrganization.exampleCoupon.link")}
            target="_blank"
            rel="noopener noreferrer"
            href={orgLink}
          >
            <LinkOutlined />
          </a>
          <br />
          <Text>{orgDescription}</Text>
        </div>
      </Card>
    </>
  );
};

export default ExampleCoupon;
