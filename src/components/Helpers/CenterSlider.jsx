import React, { Component } from "react";
import Slider from "react-slick";

function CenterMode() {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {children}
      </Slider>
    </div>
  );
}

export default CenterMode;
