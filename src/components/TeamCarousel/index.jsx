import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "./carousel.css";
import "slick-carousel/slick/slick-theme.css";
import { teamMembers } from "../Team/TeamDetails.js";
import { GithubOutlined, LinkedinFilled } from "@ant-design/icons";
import { Row, Space, Typography } from "antd";
import { useTranslation } from "react-i18next";

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 2,
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

const Carousel = () => {
  const { t } = useTranslation();
  const { Title } = Typography;
  return (
    <div className="sliderTeam">
      <Row justify="center">
        <Title style={{ marginTop: "2em" }} level={2}>
          Team
        </Title>
      </Row>
      <Slider className="sliderrender" {...settings}>
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
                <h1 className="rcorners">{team.name}</h1>
                <div className="rcorners">{t(team.description)}</div>
                <Row align="center" around="xs" className="teamSocial">
                  <Space>
                    <a href={team.github}>
                      <GithubOutlined className="teamSocialIcon" />
                    </a>
                    <a href={team.linkedin}>
                      <LinkedinFilled className="teamSocialIcon" />
                    </a>
                  </Space>
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
