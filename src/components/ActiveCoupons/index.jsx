import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import {
  Typography,
  Divider,
  Card,
  Col,
  Row,
  Button,
  Spin,
  message,
} from "antd";
import { useTranslation } from "react-i18next";
import firebase from "../../firebaseConfig";

const db = firebase.firestore();
const auth = firebase.auth();
const { Title, Text } = Typography;
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

const ActiveCoupons = ({ isTesting }) => {
  const { t } = useTranslation();
  const [soldCoupons, setSoldCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const docID = useRef(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        docID.current = user.uid;
        const unsubscribe = db
          .collection("sampleSoldCoupons")
          .doc(user.uid)
          .collection("coupons")
          .where("isActive", "==", true)
          .onSnapshot((snapshot) => {
            const dataArr = [];
            snapshot.forEach((doc) => {
              dataArr.push({ ...doc.data(), docId: doc.id });
            });
            setSoldCoupons(dataArr);
            setLoading(false);
          });
        return unsubscribe;
      }
      return user;
    });
  }, []);

  const coupons = ["25₺", "50₺", "75₺", "100₺", "150₺", "200₺"];
  const totalSoldCoupons = {
    "25₺": [],
    "50₺": [],
    "75₺": [],
    "100₺": [],
    "150₺": [],
    "200₺": [],
  };

  for (let i = 0; i < soldCoupons.length; i += 1) {
    // count the total coupon sold by type
    switch (soldCoupons[i].amount) {
      case "25₺":
        totalSoldCoupons["25₺"].push(soldCoupons[i].docId);
        break;
      case "50₺":
        totalSoldCoupons["50₺"].push(soldCoupons[i].docId);
        break;
      case "75₺":
        totalSoldCoupons["75₺"].push(soldCoupons[i].docId);
        break;
      case "100₺":
        totalSoldCoupons["100₺"].push(soldCoupons[i].docId);
        break;
      case "150₺":
        totalSoldCoupons["150₺"].push(soldCoupons[i].docId);
        break;
      case "200₺":
        totalSoldCoupons["200₺"].push(soldCoupons[i].docId);
        break;
      default:
        message.warning(t("activecoupons.message.warning1"));
    }
  }

  const cardObjList = [];

  for (let i = 0; i < coupons.length; i += 1) {
    cardObjList.push({
      title: coupons[i],
      couponList: totalSoldCoupons[coupons[i]],
    });
  }

  const markUsed = (id, couponAmount) => {
    // marking one of the coupons in the list as used. So set the isActive false
    db.collection("sampleSoldCoupons")
      .doc(docID.current)
      .collection("coupons")
      .doc(id)
      .update({
        amount: couponAmount,
        isActive: false,
        markDate: timestamp(),
        couponId: id,
      })
      .then(() => message.success(t("activeCoupons.message.success")))
      .catch(() => message.warning(t("activeCoupons.message.warning0")));
  };

  return (
    <div className="activeCoupons">
      <Divider>
        <Title level={3}>{t("activeCoupons.title")}</Title>
      </Divider>
      {loading ? (
        <Spin className="spin" size="large" tip={t("spin")} />
      ) : (
        <Row gutter={[16, 16]}>
          {cardObjList.map((card) => (
            <Col key={card.title} xs={24} sm={12} md={8} lg={8} xl={4}>
              <Card type="inner" title={card.title}>
                <Text>
                  {card.couponList.length} {t("activeCoupons.text")}
                </Text>
                <br />
                <br />
                {isTesting ? (
                  <button type="button">{t("activeCoupons.button")}</button>
                ) : (
                  <Button
                    disabled={!(card.couponList.length > 0)}
                    onClick={() =>
                      markUsed(
                        card.couponList[card.couponList.length - 1],
                        card.title
                      )
                    }
                    type="primary"
                  >
                    {t("activeCoupons.button")}
                  </Button>
                )}
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default ActiveCoupons;
