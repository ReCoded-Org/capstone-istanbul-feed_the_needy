import React from "react";
import { Button, Row, Col, Popover } from "antd";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import "./style.css";
import { useTranslation } from "react-i18next";
import heart from "./heart.png";

const Newsletter = (isTesting) => {
  const { t } = useTranslation();
  const content = (
    <div className="newsletterContent mc_embed_signup">
      <Row justify="space-around">
        <Col>
          <img src={heart} alt="heart" className="popoverImage hidden-mobile" />
        </Col>
        <Col>
          <h1>{t("newsletter.title0")}</h1>
          <br />
          <br />
          <MailchimpSubscribe
            url={process.env.REACT_APP_MAILCHIMP_URL}
            className="mailchimp"
          />
        </Col>
      </Row>
    </div>
  );

  return (
    <div justify="center" align="center">
      <Popover
        content={content}
        className="popover"
        title="Subscribe to our newsletter!"
      >
        {isTesting ? (
          <button type="button" className="myButton subscribeNewsletterButton">
            {t("newsletter.button0")}
          </button>
        ) : (
          <Button>{t("newsletter.button0")}</Button>
        )}
      </Popover>
    </div>
  );
};

export default Newsletter;
