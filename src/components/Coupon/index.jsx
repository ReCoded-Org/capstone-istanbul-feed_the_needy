import React, { useState, useEffect } from "react";
import { Typography, Card, Button } from "antd";
import { useTranslation } from "react-i18next";
import "./style.css";

const { Title, Text } = Typography;

const Coupon = ({ id, createdAt, amounts, compName, img, isTesting }) => {
  const { t } = useTranslation();
  const [isSelected, setIsSelected] = useState({
    price0: false,
    price1: false,
    price2: false,
    price3: false,
  });
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [cart, setCart] = useState([]);

  const handleSelect = (e) => {
    setIsSelected({ [e.target.name]: true });
    setSelectedPrice(parseInt(e.target.value, 10));
  };

  const handleAddToCart = () => {
    const cartCopy = [...cart];
    const isAdded = cartCopy.find(
      (cartCoupon) => cartCoupon.id === id + selectedPrice
    );
    if (!isAdded && selectedPrice) {
      const addedCoupn = {
        id: id + selectedPrice,
        createdAt,
        img,
        organizationName: compName,
        amount: selectedPrice,
      };
      cartCopy.push(addedCoupn);
      setCart(cartCopy);
      const stringCart = JSON.stringify(cartCopy);
      localStorage.setItem("cart", stringCart);
    }
  };

  useEffect(() => {
    const localCart = localStorage.getItem("cart");
    const parsedLocalCart = JSON.parse(localCart);
    if (parsedLocalCart) {
      setCart(parsedLocalCart);
    }
  }, []);

  return (
    <div className="coupon">
      <Title style={{ textAlign: "center" }} level={2}>
        {compName}
      </Title>
      <div className="couponBody">
        <Card className="couponCard" hoverable style={{ width: 350 }}>
          <img width={200} src={img} alt="logo" />
          <Text style={{ fontSize: "2em" }} strong>
            {selectedPrice
              ? selectedPrice + "₺"
              : t("couponsPage.coupon.amount")}
          </Text>
          {isTesting ? (
            <button type="button">Add to cart</button>
          ) : (
            <Button
              onClick={handleAddToCart}
              className="addBtn"
              size="large"
              block
              type="primary"
            >
              {t("couponsPage.coupon.addBtn")}
            </Button>
          )}
        </Card>
        <div className="couponPrices">
          {isTesting ? (
            <button type="button">price</button>
          ) : (
            <>
              {amounts.map((amount, index) => {
                return (
                  <Button
                    type={isSelected[`price${index}`] ? "primary" : "default"}
                    className="singlePrice"
                    size="large"
                    shape="round"
                    name={`price${index}`}
                    onClick={(e) => handleSelect(e)}
                    value={amount}
                  >
                    <b>{amount + "₺"}</b>
                  </Button>
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Coupon;
