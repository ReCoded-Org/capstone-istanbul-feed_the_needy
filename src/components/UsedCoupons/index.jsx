import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import { Table, Button, Typography, Spin, Divider, message } from "antd";
import { useTranslation } from "react-i18next";
import firebase from "../../firebaseConfig";
import SearchColumns from "./SearchColumns";

const db = firebase.firestore();
const auth = firebase.auth();
const { Title } = Typography;

const UsedCoupons = ({ isTesting }) => {
  const { t } = useTranslation();
  const [usedCoupons, setUsedCoupons] = useState([]);
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
          .where("isActive", "==", false)
          .onSnapshot((snapshot) => {
            const dataArr = [];
            snapshot.forEach((doc) => {
              dataArr.push({
                ...doc.data(),
                key: doc.id,
                // convert the timestamp into a usable date
                date:
                  doc.data().markDate &&
                  `${doc.data().markDate.toDate().getDate()}/${
                    doc.data().markDate.toDate().getMonth() + 1
                  }/${doc.data().markDate.toDate().getFullYear()}`,
              });
            });
            setUsedCoupons(dataArr);
            setLoading(false);
          });
        return unsubscribe;
      }
      return user;
    });
  }, []);

  const markActive = (id, couponAmount) => {
    // marking coupon in the table as active. So set the isActive true
    db.collection("sampleSoldCoupons")
      .doc(docID.current)
      .collection("coupons")
      .doc(id)
      .update({
        amount: couponAmount,
        isActive: true,
      })
      .then(() => message.success(t("usedCoupons.message.success")))
      .catch(() => message.warning(t("usedCoupons.message.warning")));
  };

  const columns = [
    {
      title: t("usedCoupons.columns.titles.title0"),
      dataIndex: "amount",
      key: "amount",
      width: "30%",
      ...SearchColumns("amount"),
    },
    {
      title: t("usedCoupons.columns.titles.title1"),
      dataIndex: "date",
      key: "date",
      width: "30%",
      ...SearchColumns("date"),
    },
    {
      title: t("usedCoupons.columns.titles.title2"),
      dataIndex: "couponId",
      key: "couponId",
      responsive: ["md"],
    },
    {
      title: t("usedCoupons.columns.titles.title3"),
      key: "action",
      render: (record) => (
        <Button
          onClick={() => markActive(record.couponId, record.amount)}
          type="primary"
        >
          {t("usedCoupons.buttons.button2")}
        </Button>
      ),
    },
  ];

  return (
    <div className="usedCoupons">
      <Divider>
        <Title level={3}>{t("usedCoupons.title")}</Title>
      </Divider>
      {loading ? (
        <Spin className="spin" size="large" tip={t("spin")} />
      ) : isTesting ? (
        <table />
      ) : (
        <Table columns={columns} dataSource={usedCoupons} scroll={{ y: 240 }} />
      )}
    </div>
  );
};

export default UsedCoupons;
