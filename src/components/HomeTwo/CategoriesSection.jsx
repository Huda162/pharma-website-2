import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import SimpleSlider from "../Helpers/SliderCom";
import { useRef } from "react";
import i18n from "i18next";
import { useSelector } from "react-redux";

export default function CategoriesSection({ categories }) {
  CategoriesSection.propTypes = {
    categories: PropTypes.instanceOf(Array).isRequired,
  };
  const sliderRef = useRef(null);
  const lang = localStorage.getItem("i18nextLng");
  const settings = {
    infinite: true,
    autoplay: true,
    // fade: true,
    arrows: false,
    dots: true,
    autoplaySpeed: 3000,
    rtl: i18n.language === "ar",
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1366,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
        },
      },
    ],
  };
  const cart = useSelector((state) => state.cart.value);

  return (
    <>
      <div
        className={`categories-section-wrapper w-full ${
          cart.length > 0 && "ml-[60px]"
        } `}
      >
        <div className="container-x mx-auto">
          <div className="w-full categories-iems">
            <div className="xl:grid xl:grid-cols-6 lg:hidden hidden grid-cols-3 gap-10 mb-[46px]">
              {categories?.map((item, index) => (
                <Link
                  to={`/sub-categories/${item.id}/${
                    lang === "ar"
                      ? item.name_ar
                      : lang === "en"
                      ? item.name_en
                      : item.name_he
                  }`}
                >
                  <div className="item w-full group cursor-pointer">
                    <div className="w-full flex justify-center">
                      <div className="w-[110px] h-[110px] rounded-full bg-[#EEF1F1] group-hover:bg-main-color mb-2.5 flex justify-center items-center">
                        <span className="text-qblack group-hover:text-white">
                          <img
                            src={item.image}
                            className="w-[100px] h-[100px]"
                            style={{ borderRadius: "50%" }}
                          />
                        </span>
                      </div>
                    </div>
                    <div className="w-full flex justify-center">
                      <p className="text-base text-qblack whitespace-nowrap ">
                        {lang === "ar"
                          ? item.name_ar
                          : lang === "en"
                          ? item.name_en
                          : item.name_he}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="xl:hidden">
              <SimpleSlider settings={settings} selector={sliderRef}>
                {categories?.map((item, index) => (
                  <Link
                    to={`/sub-categories/${item.id}/${
                      lang === "ar"
                        ? item.name_ar
                        : lang === "en"
                        ? item.name_en
                        : item.name_he
                    }`}
                  >
                    <div className="item w-full group cursor-pointer">
                      <div className="w-full flex justify-center">
                        <div className="w-[110px] h-[110px] rounded-full bg-[#EEF1F1] group-hover:bg-main-color mb-2.5 flex justify-center items-center">
                          <span className="text-qblack group-hover:text-white">
                            <img
                              src={item.image}
                              className="w-[100px] h-[100px] rounded-full"
                            />
                          </span>
                        </div>
                      </div>
                      <div className="w-full flex justify-center">
                        <p className="text-base text-qblack ">
                          {lang === "ar"
                            ? item.name_ar
                            : lang === "en"
                            ? item.name_en
                            : item.name_he}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </SimpleSlider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
