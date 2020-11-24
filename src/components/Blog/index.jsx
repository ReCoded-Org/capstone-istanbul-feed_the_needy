import React from "react";
import { Row, Col, Typography, Image, Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import BlogPost2 from "./images/blogpost2.png";
import BlogPost1 from "./images/blogpost1.png";
import "./style.css";
import { useHistory } from "react-router-dom";

const { Title, Text, Paragraph } = Typography;

const Blog = ({ isTesting }) => {
  const { t } = useTranslation();
  const history = useHistory();

  return (
    <div className="blogSection">
      <Row justify="center">
        <Title level={2}>{t("footer.headers.header2")}</Title>
      </Row>
      <Row justify="center" align="middle">
        <Col xs={20} sm={20} md={10} xl={10} className="blogSectionPost">
          <Image src={BlogPost1} alt="BlogPost1" />
          <div className="blogSectionText">
            <Title level={4}>{t("blog.blog0.title")}</Title>
            <Paragraph>{t("blog.blog0.paragraph")}</Paragraph>
            <div className="blogSectionFooter">
              <Text style={{ marginLeft: "1em" }}>21 September 2019</Text>
              {isTesting ? (
                <button type="button">Read more </button>
              ) : (
                <Button
                  type="primary"
                  onClick={() => history.push("/blog")}
                  style={{
                    backgroundColor: "#5a7282",
                    borderRadius: 0,
                    borderWidth: 0,
                  }}
                >
                  {t("blog.readMoreBtn")}
                  <ArrowRightOutlined />
                </Button>
              )}
            </div>
          </div>
        </Col>
        <Col xs={20} sm={20} md={10} xl={10} className="blogSectionPost">
          <Image src={BlogPost2} alt="BlogPost2" />
          <div className="blogSectionText">
            <Title level={4}>{t("blog.blog1.title")}</Title>
            <Paragraph>{t("blog.blog1.paragraph")}</Paragraph>
          </div>
          <div className="blogSectionFooter">
            <Text style={{ marginLeft: "1em" }}>09 June 2020</Text>
            {isTesting ? (
              <button type="button">Read more </button>
            ) : (
              <Button
                type="primary"
                onClick={() => history.push("/blog")}
                style={{
                  backgroundColor: "#5a7282",
                  borderRadius: 0,
                  borderWidth: 0,
                }}
              >
                {t("blog.readMoreBtn")}
                <ArrowRightOutlined />
              </Button>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Blog;
