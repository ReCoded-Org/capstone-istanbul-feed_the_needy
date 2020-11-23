import React from "react";
import { Row, Col, Image, Button } from "antd";
import { NavLink } from "react-router-dom";
import "./index.css";
import { useTranslation } from "react-i18next";

const SingleColCard = ({ post, order, isTesting }) => {
  const { t } = useTranslation();

  return (
    <>
      <Row className="justify-content-md-center articleContainer2">
        <div className="containerBlog2">
          <Col lg={{ span: 3, order: order }} className="articleImage">
            <Image
              src={post.jetpack_featured_media_url}
              className="roundImage2"
              roundedCircle
            />
          </Col>
          <Col lg="6" className="blogCardBox2">
            <h3
              className="articleTitle2"
              dangerouslySetInnerHTML={{
                __html: post.title.rendered,
              }}
            ></h3>
            <span
              className="articleBody2"
              dangerouslySetInnerHTML={{
                __html: post.excerpt.rendered,
              }}
            ></span>
            <NavLink to={`/blogs/${post.id}`}>
              {isTesting ? (
                <button type="button">{}</button>
              ) : (
                <Button type="button" className="readMoreButton2">
                  {t("blogSingleCard.button")}
                </Button>
              )}
            </NavLink>
          </Col>
        </div>
      </Row>
    </>
  );
};

export default SingleColCard;
