import React, { useState, useEffect } from "react";
import "./style.css";
import { Button, Row, Col } from "antd";
import { useTranslation } from "react-i18next";
import SingleCoupon from "../SingleCoupon";

const ShowCart = ({ isTesting }) => {
  const { t } = useTranslation();
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const cartJSON = localStorage.getItem("cart");
    const cartParsed = JSON.parse(cartJSON);
    if (cartParsed) {
      setCart(cartParsed);
      setTotalAmount((totalAmount) => {
        let sum = 0;
        for (let i = 0; i < cartParsed.length; i++) {
          sum += cartParsed[i].amount;
        }
        return sum;
      });
    }
  }, []);

  const changeAmount = (amount, operation) => {
    if (operation === "increment") {
      setTotalAmount(totalAmount + amount);
    } else if (operation === "decrement") {
      setTotalAmount(totalAmount - amount);
    }
  };

  const deleteSingleCoupon = (id) => {
    setCart((prevCart) => {
      let newCart = [...prevCart];
      newCart = newCart.filter((coupon) => coupon.id !== id);
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  return (
    <>
      <br />
      <Row gutter={[24, 40]} justify="space-around">
        {cart.map((coupon) => (
          <SingleCoupon
            coupon={coupon}
            changeAmount={changeAmount}
            deleteSingleCoupon={deleteSingleCoupon}
            setTotalAmount={setTotalAmount}
          />
        ))}
      </Row>
      <Row gutter={[48, 48]} justify="center">
        <Col className="totalAmount">
          {t("cartCont.showCartComp.totalAmount")}
          {totalAmount}
          <span>₺</span>
        </Col>
      </Row>
      <br />
      <br />
      <Row gutter={[48, 48]} justify="center" align="bottom">
        <Col>
          {isTesting ? (
            <button type="button">{}</button>
          ) : (
            <Button
              onClick={() => {
                localStorage.removeItem("cart");
              }}
              className="clearCartButton"
            >
              {t("cartCont.showCartComp.clearCart")}
            </Button>
          )}
        </Col>
        <Col>
          {isTesting ? (
            <button type="button">{}</button>
          ) : (
            <Button className="checkoutButton" type="primary">
              {t("cartCont.showCartComp.goToCheckout")}
            </Button>
          )}
        </Col>
      </Row>
    </>
  );
};

export default ShowCart;
