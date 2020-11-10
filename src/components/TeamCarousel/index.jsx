import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { teamMembers } from "../Team/TeamDetails.js";
import {
  InstagramOutlined,
  FacebookFilled,
  TwitterCircleFilled,
  LinkedinFilled,
} from "@ant-design/icons";
import { Row, Col } from "antd";
import { useTranslation } from "react-i18next";

var settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 4,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const Carousel = (props) => {
  const { t } = useTranslation();
  return (
    <div className="sliderTeam">
      <Slider {...settings} className="sliderrender">
        {teamMembers.map((team) => (
          <div className="teamBorder">
            <div>
              <img
                className="teamImage"
                src={team.imgFile}
                alt="imageforTeam"
              />
            </div>
            <div className="teamSection">
              <div className="teamText">
                <h2 className="rcorners">{team.name}</h2>
                <div className="rcorners">{t(team.description)}</div>
                <Row align="center" around="xs">
                  <Col span={4}>
                    <InstagramOutlined href="#" /> {team.instagram}
                  </Col>
                  <Col span={4}>
                    <FacebookFilled href="#" /> {team.facebook}
                  </Col>
                  <Col span={4}>
                    <TwitterCircleFilled href="#" /> {team.twitter}
                  </Col>
                  <Col span={4}>
                    <LinkedinFilled href="#" /> {team.linkedin}
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;



