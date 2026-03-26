import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SimpleSlider from "../Helpers/SliderCom";
import i18n from "i18next";

export default function BrandSection({ className, brands }) {
  const sliderRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1280); // xl breakpoint

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1280); // 1280px is xl breakpoint in Tailwind
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Slider settings for mobile/tablet
  const settings = {
    infinite: true,
    autoplay: true,
    arrows: false,
    dots: true,
    autoplaySpeed: 3000,
    rtl: i18n.language === "ar",
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode:true,
    responsive: [
      {
        breakpoint: 640, // sm
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // md
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024, // lg
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1280, // xl
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (!brands?.length) return null;

  return (
    <div className={`w-full ${className || ""}`}>
      <div className="container-x mx-auto">
        <div className="section-title flex justify-between items-center mb-5"></div>
        
        {/* Desktop Grid - hidden on mobile/tablet, visible on xl screens */}
        <div className="hidden xl:grid xl:grid-cols-6 gap-10 mb-[46px]">
          {brands.map((item, index) => (
            <div key={index} className="flex justify-center">
              <Link to={`/all-products/brand/${item.id}/${item.name}`}>
                <div className="w-[130px] h-[130px] p-1 mt-3 bg-white border border-primarygray bg-[#EEF1F1] hover:bg-main-color transition-colors duration-300 flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Mobile/Tablet Slider - visible below xl screens */}
        <div className="xl:hidden">
          <SimpleSlider settings={settings} selector={sliderRef}>
            {brands.map((item, index) => (
              <div key={index} className="px-2">
                <div className="flex justify-center">
                  <Link to={`/all-products/brand/${item.id}/${item.name}`}>
                    <div className="w-[130px] h-[130px] p-1 mt-3 bg-white border border-primarygray bg-[#EEF1F1] hover:bg-main-color transition-colors duration-300 flex items-center justify-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </SimpleSlider>
        </div>
      </div>
    </div>
  );
}