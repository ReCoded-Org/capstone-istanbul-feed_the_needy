import React from "react";
import { Typography } from "antd";
import { useTranslation } from "react-i18next";
import ShowCart from "../../components/ShowCart";

const { Title } = Typography;

const Cart = () => {
  const { t } = useTranslation();

  return (
    <>
      <Title>{t("cartCont.title")}</Title>
      <ShowCart />
    </>
  );
};

export default Cart;
