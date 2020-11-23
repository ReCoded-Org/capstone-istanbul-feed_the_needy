import React, { useState, useEffect } from "react";
import "./style.css";
import { Typography, Button, Row, Col, Avatar, message, Divider } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import firebase from "../../firebaseConfig";

const db = firebase.firestore();
const auth = firebase.auth();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;
const { Title, Text } = Typography;

const CreateCoupons = ({ isTesting }) => {
  const { t } = useTranslation();
  const [count, setCount] = useState(1);
  const [restaurant, setRestaurant] = useState({});
  const [newCoupons, setNewCoupons] = useState({
    amounts: {
      25: false,
      50: false,
      75: false,
      100: false,
      150: false,
      200: false,
    },
  });
  const [ghosted, setGhosted] = useState({
    // ghost property in antd button removes the styling from it
    "25₺": true,
    "50₺": true,
    "75₺": true,
    "100₺": true,
    "150₺": true,
    "200₺": true,
  });

  const getRestaurantInfo = async (id) => {
    const res = await db.collection("restaurants").doc(id).get();
    const data = res.data();
    setRestaurant(data);
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        getRestaurantInfo(user.uid);
      }
    });
  }, []);

  const postCoupons = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        db.collection("coupons")
          .doc(user.uid)
          .set({
            compName: restaurant.name,
            amounts: { ...newCoupons.amounts },
            createdAt: timestamp(),
            id: user.uid,
            img: restaurant.logoURL,
          })
          .then(() => message.success(t("createCoupons.message.success")))
          .catch(() => message.warning(t("createCoupons.message.warning")));
      }
    });
  };

  const selectCoupon = (e) => {
    const key = e.target.innerText;
    const slicedKey = key.slice(0, key.length - 1);
    setGhosted({
      ...ghosted,
      [key]: !ghosted[key],
    });

    setNewCoupons({
      ...newCoupons,
      amounts: {
        ...newCoupons.amounts,
        [slicedKey]: !newCoupons.amounts[slicedKey],
      },
    });

    if (ghosted[key] === false) {
      setCount((previous) => previous - 1);
    } else {
      setCount((previous) => previous + 1);
    }
  };

  const handleSubmit = () => {
    postCoupons();
    setGhosted({
      "25₺": true,
      "50₺": true,
      "75₺": true,
      "100₺": true,
      "150₺": true,
      "200₺": true,
    });
    setCount(1);
  };

  const firstRowList = [];
  const secondRowList = [];
  const ghostList = [
    ghosted["25₺"],
    ghosted["50₺"],
    ghosted["75₺"],
    ghosted["100₺"],
    ghosted["150₺"],
    ghosted["200₺"],
  ];
  const coupons = ["25₺", "50₺", "75₺", "100₺", "150₺", "200₺"];

  for (let i = 0; i < ghostList.length / 2; i += 1) {
    firstRowList.push({ ghost: ghostList[i], text: coupons[i] });
  }
  for (let i = ghostList.length / 2; i < ghostList.length; i += 1) {
    secondRowList.push({ ghost: ghostList[i], text: coupons[i] });
  }

  const MAXSELECTABLECOUPON = 4;

  return (
    <div className="createCoupons">
      <Divider className="createCouponsTitle">
        <Title level={3} type="primary">
          {t("createCoupons.title")}
        </Title>
      </Divider>
      <Row gutter={[16, 16]}>
        {firstRowList.map((row) => (
          <Col key={row.text} span={8}>
            {isTesting ? (
              <button type="button">{row.text}</button>
            ) : (
              <Button
                className="couponPrices"
                onClick={selectCoupon}
                size="large"
                shape="round"
                ghost={row.ghost} // default is true and when selected false
                type="primary"
                disabled={count > MAXSELECTABLECOUPON && row.ghost}
              >
                <b>{row.text}</b>
              </Button>
            )}
          </Col>
        ))}
      </Row>
      <Row gutter={[16, 16]}>
        {secondRowList.map((row) => (
          <Col key={row.text} span={8}>
            {isTesting ? (
              <button type="button">{row.text}</button>
            ) : (
              <Button
                className="couponPrices"
                onClick={selectCoupon}
                size="large"
                shape="round"
                ghost={row.ghost}
                type="primary"
                disabled={count > MAXSELECTABLECOUPON && row.ghost}
              >
                <b>{row.text}</b>
              </Button>
            )}
          </Col>
        ))}
      </Row>
      <div className="couponInfoWrapper">
        <Avatar
          className="couponInfo"
          size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
          icon={<InfoCircleOutlined />}
        />
        <Text>
          <b>{t("createCoupons.text")}</b>
        </Text>
      </div>
      {isTesting ? (
        <button type="button">25₺</button>
      ) : (
        <Button
          onClick={handleSubmit}
          className="couponCreateButton"
          type="primary"
          size="large"
          disabled={count <= MAXSELECTABLECOUPON}
        >
          {t("createCoupons.createButton")}
        </Button>
      )}
    </div>
  );
};

export default CreateCoupons;
