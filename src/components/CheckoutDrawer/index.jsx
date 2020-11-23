import React from "react";
import { Drawer, Form, Input, Button } from "antd";
import { CardElement } from "@stripe/react-stripe-js";
import { useTranslation } from "react-i18next";
import firebase from "../../firebaseConfig";
import "./style.css";

const db = firebase.firestore();

const CheckoutDrawer = ({
  drawerVisible,
  setDrawerVisible,
  cart,
  isTesting,
}) => {
  const { t } = useTranslation();

  const onClose = () => {
    setDrawerVisible(false);
  };

  const tailLayout = {
    wrapperCol: {
      offset: 2,
      span: 24,
    },
  };

  const options = {
    style: {
      base: {
        fontSize: "16px",
        color: "#424770",
        letterSpacing: "0.025em",
        fontFamily: "Source Code Pro, monospace",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#9e2146",
      },
    },
  };

  const handleSubmit = () => {
    const todaysDate = new Date();
    const todaysMonthIndex = todaysDate.getMonth();
    cart.forEach((coupon) => {
      db.collection("sampleSoldCoupons")
        .doc(coupon.restaurantId)
        .set({
          compName: coupon.organizationName,
        })
        .then(() => {
          for (let i = 0; i < coupon.quantity; i++) {
            db.collection("sampleSoldCoupons")
              .doc(coupon.restaurantId)
              .collection("coupons")
              .add({
                amount: `${coupon.amount}₺`,
                isActive: true,
              });
          }
        })
        .then(() => {
          const couponStatistics = [];
          db.collection("soldCoupons")
            .doc(coupon.restaurantId)
            .get()
            .then((doc) => couponStatistics.push(doc.data()))
            .then(() => {
              const sinlgePriceStatistics =
                couponStatistics[0][`${coupon.amount}₺`];
              sinlgePriceStatistics[todaysMonthIndex] += coupon.quantity;
              db.collection("soldCoupons")
                .doc(coupon.restaurantId)
                .update({
                  [`${coupon.amount}₺`]: sinlgePriceStatistics,
                });
            });
        });
    });
  };

  return (
    <>
      {isTesting ? (
        <button type="submit">Pay</button>
      ) : (
        <Drawer
          width={window.innerWidth > 600 ? 720 : 300}
          title="Check out"
          placement="right"
          onClose={onClose}
          visible={drawerVisible}
        >
          <Form onFinish={handleSubmit}>
            <Form.Item
              label={t("checkoutDrawer.nameLabel")}
              name="fullname"
              rules={[
                {
                  required: true,
                  message: t("checkoutDrawer.nameErr"),
                },
              ]}
            >
              <Input className="checkoutInput" />
            </Form.Item>

            <Form.Item
              label={t("checkoutDrawer.emailLabel")}
              name="email"
              rules={[
                {
                  type: "email",
                  required: true,
                  message: t("checkoutDrawer.emailErr"),
                },
              ]}
            >
              <Input className="checkoutInput" />
            </Form.Item>

            <Form.Item
              label={t("checkoutDrawer.creditLabel")}
              name="remember"
              valuePropName="checked"
            >
              <CardElement className="checkoutInput" options={options} />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                {t("checkoutDrawer.pay")}
              </Button>
            </Form.Item>
          </Form>
        </Drawer>
      )}
    </>
  );
};

export default CheckoutDrawer;
