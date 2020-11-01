import React from "react";
import { Link } from "react-router-dom";
import {
  TwitterOutlined,
  FacebookFilled,
  InstagramFilled,
  LinkedinFilled,
  YoutubeFilled,
} from "@ant-design/icons";
import { Space, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { ReactComponent as LogoSvg } from "../../images/logo.svg";
import { ReactComponent as FoodOnCouponSvg } from "../../images/foodOnCoupon.svg";
import { ReactComponent as LocationSvg } from "./images/location.svg";
import { ReactComponent as PhoneSvg } from "./images/phone.svg";
import { ReactComponent as MailSvg } from "./images/mail.svg";
import "./style.css";

const { Text } = Typography;

const Footer = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="footer">
        <div style={{ margin: "3rem 3rem 0 3rem", width: "min-content" }}>
          <div className="footerLogo">
            <Space size="middle">
              <LogoSvg />
              <FoodOnCouponSvg />
            </Space>
          </div>
          <Text className="footerSummary">{t("footer.summary")}</Text>
        </div>
        <div className="footerMiddle">
          <div
            style={{ marginTop: "4rem", height: "min-content" }}
            className="footerLinks"
          >
            <Space size={50}>
              <Link to="/">{t("footer.headers.header0")}</Link>
              <Link to="/coupons">{t("footer.headers.header1")}</Link>
              <Link to="/blog">{t("footer.headers.header2")}</Link>
            </Space>
          </div>
          <div className="footerContact">
            <div>
              <LocationSvg />
              <Text>{t("footer.location")}</Text>
            </div>
            <div>
              <PhoneSvg />
              <Text>+229-995-4438</Text>
            </div>
            <div>
              <MailSvg />
              <Text>team@fonCoupon.com</Text>
            </div>
          </div>
        </div>
        <div className="footerSocial">
          <Space>
            <TwitterOutlined />
            <FacebookFilled />
            <InstagramFilled />
            <LinkedinFilled />
            <YoutubeFilled />
          </Space>
        </div>
      </div>
      <div className="footerBottom">
        <Text style={{ marginLeft: "2rem" }}>{t("footer.rights")}</Text>
      </div>
    </>
  );
};

export default Footer;
