import React, { useState } from "react";
import { Typography, Button, Row, Col, Card } from "antd";

const { Title } = Typography;

const SingleCoupon = ({
  coupon,
  deleteSingleCoupon,
  setTotalAmount,
  changeAmount,
  isTesting,
}) => {
  const [amount, setAmount] = useState(1);

  return (
    <div>
      <Row>
        <Col>
          <Card hoverable align="center" className="couponCards">
            <Row>
              <Col>
                {isTesting ? (
                  <button type="button">x</button>
                ) : (
                  <Button
                    className="cardDeleteButton"
                    type="primary"
                    onClick={() => {
                      changeAmount(coupon.amount * amount, "decrement");
                      deleteSingleCoupon(coupon.id);
                    }}
                  >
                    X
                  </Button>
                )}
              </Col>
            </Row>
            <Title>{coupon ? coupon.organizationName : null}</Title>
            <img src={coupon ? coupon.img : null} alt="logo" width="120em" />
            <Title>
              {coupon ? coupon.amount : null}
              <span>₺</span>
            </Title>
            {isTesting ? (
              <button type="button">-</button>
            ) : (
              <Button
                className="cardButton"
                type="primary"
                onClick={() => {
                  if (amount > 1) {
                    setAmount(amount - 1);
                    changeAmount(coupon ? coupon.amount : null, "decrement");
                  }
                }}
              >
                -
              </Button>
            )}
            <span className="couponAmount">{amount}</span>
            {isTesting ? (
              <button type="button">+</button>
            ) : (
              <Button
                className="cardButton"
                type="primary"
                onClick={() => {
                  setAmount(amount + 1);
                  changeAmount(coupon ? coupon.amount : null, "increment");
                }}
              >
                +
              </Button>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SingleCoupon;
