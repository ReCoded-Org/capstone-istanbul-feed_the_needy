import React from "react";
import { Typography } from "antd";
import "./style.css";
import { useTranslation } from "react-i18next";

const { Title, Text } = Typography;

const WorkingTogether = () => {
  const { t } = useTranslation();

  return (
    <div className="workingTogether">
      <iframe
        className="workingTogetherVideo"
        title="Zero Hunger"
        width="50%"
        height="auto"
        src="https://www.youtube.com/embed/iteCytv0RqY"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      <div className="workingTogetherWrittenContent">
        <Title>{t("workingTogether.title")}</Title>
        <div className="workingTogetherText">
          <Text>{t("workingTogether.text")}</Text>
        </div>
      </div>
    </div>
  );
};

export default WorkingTogether;
