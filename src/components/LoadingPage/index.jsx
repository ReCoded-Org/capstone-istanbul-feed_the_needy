import React from "react";
import { Row, Spin } from "antd";
import "./index.css";

const LoadingPage = () => {
  return (
    <div className="loadContainer">
      <Row>
        <div className="spinLoading">
          <Spin size="large" />
        </div>
      </Row>
    </div>
  );
};

export default LoadingPage;
