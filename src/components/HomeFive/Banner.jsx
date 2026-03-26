import { Link } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import SimpleSlider from "../Helpers/SliderCom";
import PropTypes from "prop-types";
import i18n from "i18next";
import { useSelector } from "react-redux";

export default function Banner({ className, sliders }) {
  Banner.propTypes = {
    sliders: PropTypes.instanceOf(Array),
  };
  
  const sliderRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 50);
    
    return () => clearTimeout(timer);
  }, []);

  const settings = {
    infinite: true,
    arrows: false,
    dots: true,
    autoplaySpeed: 3000,
    rtl: i18n.language === "ar",
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          dots: true,
        },
      },
    ],
  };
  
  const cart = useSelector((state) => state.cart.value);

  const isVideoSlider = (slider) => {
    return slider.media_type === 'video';
  };

  const isVideoByUrl = (url) => {
    if (!url) return false;
    const videoExtensions = ['mp4', 'webm', 'ogg', 'mov', 'avi'];
    const extension = url.split('.').pop().toLowerCase();
    return videoExtensions.includes(extension);
  };

  const getVideoUrl = (slider) => {
    if (slider.video) {
      return slider.video;
    }
    if (isVideoByUrl(slider.image)) {
      return slider.image;
    }
    return null;
  };

  const getDesktopMediaUrl = (slider) => {
    if (isVideoSlider(slider)) {
      const videoUrl = getVideoUrl(slider);
      return videoUrl || slider.image; 
    }
    return slider.image;
  };

  const getMobileImageUrl = (slider) => {
    return slider.image_mobile;
  };

  return (
    <>
      <div
        className={`hero-slider-wrapper hero-slider-wrapper w-[100%] ${className || ""}`}
      >
        <div className="main-wrapper w-full h-full sm:block">
          <div
            className={`${
              cart.length > 0
                ? `xl:h-full mb-10 xl:mb-0 w-full relative col-span-3 mt-[70px] xl:mt-[20px] hidden xl:block`
                : `xl:h-full mb-10 xl:mb-0 w-full relative col-span-3 mt-[70px] xl:mt-[20px] hidden xl:block`
            }`}
          >
            <SimpleSlider settings={settings} selector={sliderRef} className='w-full'>
              {sliders?.map((item, index) => (
                <div
                  className={`${
                    cart.length > 0
                      ? "w-full h-[200px] xl:h-[90vh] overflow-hidden"
                      : "w-full xl:h-[90vh] h-[200px] overflow-hidden"
                  }`}
                  key={index}
                >
                  {isVideoSlider(item) ? (
                    <div className="w-full h-full relative">
                      <video
                        className={`w-full h-full object-cover ${
                          isLoaded ? 'animate-zoomOut' : 'scale-110 opacity-0'
                        }`}
                        autoPlay
                        muted
                        loop
                        playsInline
                        style={{
                          textAlign: i18n.language === "en" ? "left" : "right",
                          direction: i18n.language === "ar" ? "rtl" : "ltr",
                        }}
                      >
                        <source src={getDesktopMediaUrl(item)} type="video/mp4" />
                        <source src={getDesktopMediaUrl(item)} type="video/webm" />
                        <source src={getDesktopMediaUrl(item)} type="video/ogg" />
                        Your browser does not support the video tag.
                      </video>
                      <div className="container-x mx-auto flex items-center absolute inset-0 h-full">
                        <div className="w-full h-full xl:flex items-center pt-20 xl:pt-0"></div>
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`w-full h-full relative md:bg-center ${
                        isLoaded ? 'animate-zoomOut' : 'scale-110 opacity-0'
                      }`}
                      style={{
                        backgroundImage: `url(${getDesktopMediaUrl(item)})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        textAlign: i18n.language === "en" ? "left" : "right",
                        direction: i18n.language === "ar" ? "rtl" : "ltr",
                      }}
                    >
                      <div className="container-x mx-auto flex items-center h-full">
                        <div className="w-full h-full xl:flex items-center pt-20 xl:pt-0"></div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </SimpleSlider>
          </div>
          
          <div className="xl:h-full mb-10 xl:mb-0 w-full relative col-span-3 mt-[70px] xl:mt-[20px] xl:hidden lg:mt-[100px]">
            <SimpleSlider settings={settings} selector={sliderRef}>
              {sliders?.map((item, index) => (
                <div className="item w-full xl:h-[600px] h-[300px] overflow-hidden" key={index}>
                  <div
                    className={`w-full h-full relative md:bg-center xl:border-8 border-main-color ${
                      isLoaded ? 'animate-zoomOut' : 'scale-110 opacity-0'
                    }`}
                    style={{
                      backgroundImage: `url(${getMobileImageUrl(item)})`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      textAlign: i18n.language === "en" ? "left" : "right",
                      direction: i18n.language === "ar" ? "rtl" : "ltr",
                    }}
                  >
                    <div className="container-x mx-auto flex items-center h-full">
                      <div className="w-full h-full xl:flex items-center pt-20 xl:pt-0"></div>
                    </div>
                  </div>
                </div>
              ))}
            </SimpleSlider>
          </div>
        </div>
      </div>
    </>
  );
}