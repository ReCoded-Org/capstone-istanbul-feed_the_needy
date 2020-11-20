import React, { useEffect, useState } from "react";
import { Typography } from "antd";
import { useTranslation } from "react-i18next";
import Coupon from "../../components/Coupon";
import firebase from "../../firebaseConfig";
import "./style.css";

const db = firebase.firestore();
const { Title } = Typography;

const CouponsPage = () => {
  const { t } = useTranslation();
  const [availableCoupons, setAvailableCoupons] = useState([]);

  useEffect(() => {
    db.collection("coupons")
      .get()
      .then((querySnapshot) => {
        const couponsArray = [];
        querySnapshot.forEach((doc) => couponsArray.push({ ...doc.data() }));
        const modifiedCouponsArray = couponsArray.map((coupon) => {
          const { amounts } = coupon;
          const amountsArr = [];
          Object.keys(amounts).forEach((x) => {
            if (amounts[x]) {
              amountsArr.push(x);
            }
          });
          return {
            ...coupon,
            amounts: amountsArr,
          };
        });
        setAvailableCoupons(modifiedCouponsArray);
      });
  }, []);

  return (
    <div>
      <div className="couponsPageHeader">
        <Title level={2}>{t("couponsPage.header")}</Title>
      </div>
      <Title style={{ textAlign: "center" }} level={1}>
        {t("couponsPage.restaurants")}
      </Title>
      {availableCoupons.map((coupon) => {
        return (
          <Coupon
            id={coupon.id}
            createdAt={coupon.createdAt}
            amounts={coupon.amounts}
            compName={coupon.compName}
            img={coupon.img}
          />
        );
      })}
    </div>
  );
};

export default CouponsPage;
