import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "antd/dist/antd.css";
import { InstagramOutlined } from '@ant-design/icons';

const teamMembers=[
  {
  name:"Gizem Deniz",
  imgFile:'https://media.kommunity.com/avatar/_avatar_5eb06c6384ffd.',
  description: "In oculis quidem faciunt, ut dolore magnam aliquam causam ista, quae sine causa? quae fuerit causa, nollem me ab eo delectu rerum, quem modo ista sis.",
  className:"rcorners"
  },
  {
    name:"Bertaç Severcan",
    imgFile:'https://media.kommunity.com/avatar/_avatar_5eb06c6384ffd.',
    description: "In oculis quidem faciunt, ut dolore magnam aliquam causam ista, quae sine causa? quae fuerit causa, nollem me ab eo delectu rerum, quem modo ista sis.",
    className:"rcorners"
    },
    {
    name:"Ihab Sensei",
    imgFile:'https://media.kommunity.com/avatar/_avatar_5eb06c6384ffd.',
    description: "In oculis quidem faciunt, ut dolore magnam aliquam causam ista, quae sine causa? quae fuerit causa, nollem me ab eo delectu rerum, quem modo ista sis.",
    className:"rcorners"
    },
    {
      name:"Cihan Uygur",
      imgFile:'https://media.kommunity.com/avatar/_avatar_5eb06c6384ffd.',
      description: "In oculis quidem faciunt, ut dolore magnam aliquam causam ista, quae sine causa? quae fuerit causa, nollem me ab eo delectu rerum, quem modo ista sis.",
      className:"rcorners"
    }
    
  ]

  //React-Slider Settings Autoplay example, I'll also add responsive features too.
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
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
    
const Carousel=()=> {
  return (
    <div className="sliderTeam">
      <Slider  {...settings} className="sliderrender">
        {teamMembers.map((team)=>(
      <div className="teamBorder">
        <div className="image">
        <img classname="teamImage" src={team.imgFile}/>
        </div>
        <div className="teamSection">
          <div className="teamText"> 
        <h2 className="rcorners">{team.name}</h2>
        <div className="rcorners">{team.description}</div>
        <InstagramOutlined />
        </div>
        </div>
      </div>
     ))}
      </Slider>
    </div>

  )
}

export default Carousel;