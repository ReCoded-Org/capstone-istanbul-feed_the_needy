import React, { useEffect, useState } from "react";
import "./style.css";
import { Modal, Card, Typography, Button } from "antd";
import { useTranslation } from "react-i18next";
import { LinkOutlined } from "@ant-design/icons";
import firebase from "../../firebaseConfig";
import defaultRestaurantLogo from "../../images/defaultRestaurantLogo.jpg";

const db = firebase.firestore();
const { Text, Title } = Typography;
const { Meta } = Card;

const SingleCouponModal = ({
  compName,
  price,
  visibleModal,
  setVisibleModal,
}) => {
  const { t } = useTranslation();
  const [coupon, setCoupon] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = db
      .collection("restaurants")
      .where("name", "==", compName || null) // this can changed with the restaurant id later
      .onSnapshot((snapshot) => {
        const dataArr = [];
        snapshot.forEach((doc) => {
          dataArr.push({ ...doc.data(), docId: doc.id });
        });
        setCoupon(dataArr[0]);
        setLoading(false);
      });
    return unsubscribe;
  }, [compName]);

  const handleOk = () => {
    setVisibleModal(false);
  };

  const handleCancel = () => {
    setVisibleModal(false);
  };

  return (
    <div className="singleCouponModal">
      <Modal
        title={t("singleCouponModal.title")}
        visible={visibleModal}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button type="primary" key="ok" onClick={handleOk}>
            {t("singleCouponModal.OK")}
          </Button>,
        ]}
      >
        <Card
          loading={loading}
          bordered={false}
          style={{ width: "100%", height: "96.5%" }}
          cover={
            <img
              style={{ maxHeight: "21rem" }}
              alt={t("singleCouponModal.alt")}
              src={coupon.logoURL || defaultRestaurantLogo}
            />
          }
        >
          <Meta title={`${price}₺`} />
          <div className="singleCouponContent">
            <Title level={3}>{coupon.name}</Title>
            <a
              title={t("editOrganization.exampleCoupon.link")}
              target="_blank"
              rel="noopener noreferrer"
              href={coupon.website}
            >
              <LinkOutlined />
            </a>
            <br />
            <Text>{coupon.description}</Text>
          </div>
        </Card>
      </Modal>
    </div>
  );
};

export default SingleCouponModal;
