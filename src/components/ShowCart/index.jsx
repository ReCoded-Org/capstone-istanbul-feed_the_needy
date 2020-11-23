import React, { useState, useEffect } from "react";
import "./style.css";
import { Button, Row, Col, Empty } from "antd";
import { useTranslation } from "react-i18next";
import SingleCoupon from "../SingleCoupon";
import CheckoutDrawer from "../CheckoutDrawer";

const ShowCart = ({ isTesting }) => {
  const { t } = useTranslation();
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const adjustCouponQuantity = (id, operation) => {
    const modifiedCart = cart.map((coupon) => {
      if (coupon.id === id) {
        operation === "increment"
          ? (coupon.quantity += 1)
          : (coupon.quantity -= 1);
        return coupon;
      }
      return coupon;
    });
    setCart(modifiedCart);
    const modifiedCartJson = JSON.stringify(modifiedCart);
    localStorage.setItem("cart", modifiedCartJson);
  };

  useEffect(() => {
    const cartJSON = localStorage.getItem("cart");
    const cartParsed = JSON.parse(cartJSON);
    if (cartParsed) {
      setCart(cartParsed);
      setTotalAmount((totalAmount) => {
        let sum = 0;
        for (let i = 0; i < cartParsed.length; i++) {
          sum += cartParsed[i].amount * cartParsed[i].quantity;
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
        {cart.length < 1 ? (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            imageStyle={{
              height: 100,
            }}
            description={<span>Cart is empty</span>}
          />
        ) : (
          cart.map((coupon) => (
            <SingleCoupon
              coupon={coupon}
              changeAmount={changeAmount}
              deleteSingleCoupon={deleteSingleCoupon}
              setTotalAmount={setTotalAmount}
              adjustCouponQuantity={adjustCouponQuantity}
            />
          ))
        )}
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
                setCart([]);
                setTotalAmount(0);
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
            <Button
              onClick={showDrawer}
              className="checkoutButton"
              type="primary"
            >
              {t("cartCont.showCartComp.goToCheckout")}
            </Button>
          )}
        </Col>
      </Row>
      <CheckoutDrawer
        setCart={setCart}
        setTotalAmount={setTotalAmount}
        cart={cart}
        setDrawerVisible={setDrawerVisible}
        drawerVisible={drawerVisible}
      />
    </>
  );
};

export default ShowCart;
