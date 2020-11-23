import React from "react";
import { Typography, Image, Button } from "antd";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import JoinHands from "./images/joinHands.png";
import "./style.css";

const JoinUs = ({ isTesting }) => {
  const { t } = useTranslation();
  const { Title, Paragraph } = Typography;
  const history = useHistory();

  return (
    <div className="joinUsSection">
      <Image className="joinUsSectionImg" src={JoinHands} alt="JoinHands" />
      <div className="joinUsSectionDescription">
        <div style={{ margin: "1em" }}>
          <Title style={{ color: "#f4f6f6" }} level={2}>
            {t("joinUs.title")}
          </Title>
          <Paragraph style={{ color: "#f4f6f6" }}>
            {t("joinUs.description")}
          </Paragraph>
          {isTesting ? (
            <button type="button">Create account</button>
          ) : (
            <Button
              onClick={() => history.push("/register")}
              className="joinUsSectionBtn"
              type="primary"
            >
              {t("joinUs.button")}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default JoinUs;
