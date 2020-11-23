import React from "react";
import { Row, Col, Image } from "antd";
import { NavLink } from "react-router-dom";
import "./index.css";
import { useTranslation } from "react-i18next";

const SingleBlogCard = ({ post, order }) => {
  const { t } = useTranslation();

  return (
    <>
      <Row className="justify-content-md-center articleContainer">
        <div className="containerBlog">
          <Col lg={{ span: 3, order: order }} className="articleImage">
            <Image
              src={post.jetpack_featured_media_url}
              className="roundImage"
              roundedCircle
            />
          </Col>
          <Col lg="6" className="blogCardBox">
            <h3
              className="articleTitle"
              dangerouslySetInnerHTML={{
                __html: post.title.rendered,
              }}
            ></h3>
            <NavLink to={`/blogs/${post.id}`}>
              <button type="button" className="readMoreButton">
                {t("blogSingleCard.button")}
              </button>
            </NavLink>
          </Col>
        </div>
      </Row>
    </>
  );
};

export default SingleBlogCard;
