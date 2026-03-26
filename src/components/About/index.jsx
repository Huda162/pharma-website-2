import { useRef } from "react";
import { Link } from "react-router-dom";
import BlogCard from "../Helpers/Cards/BlogCard";
import Star from "../Helpers/icons/Star";
import PageTitle from "../Helpers/PageTitle";
import SimpleSlider from "../Helpers/SliderCom";
import Layout from "../Partials/Layout";

import blog from "../../data/blogs.json";
import DataIteration from "../Helpers/DataIteration";
import LayoutHomeTwo from "../Partials/LayoutHomeTwo";
import useFetchData from "../../hooks/fetchData";
import { useTranslation } from "react-i18next";
import logo from '../../../public/assets/images/logo.png'

export default function About() {
  const settings = {
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    dots: false,
    responsive: [
      {
        breakpoint: 1026,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          centerMode: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
        },
      },

      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ],
  };

  const slider = useRef(null);
  const prev = () => {
    slider.current.slickPrev();
  };
  const next = () => {
    slider.current.slickNext();
  };
  const url = "about";
  const { data, loading } = useFetchData(url);
  const { t } = useTranslation();
  const lang = localStorage.getItem("i18nextLng");

  return (
    <LayoutHomeTwo childrenClasses="pt-0 pb-0">
      <div className="about-page-wrapper w-full">
        <div className="title-area w-full">
          <PageTitle
            title={t("About Us")}
            breadcrumb={[
              { name: t("Home Page"), path: "/" },
              { name: t("About Us"), path: "/about" },
            ]}
          />
        </div>

        <div className="aboutus-wrapper w-full">
          <div className="container-x mx-auto">
            <div className="w-full min-h-[50vh] lg:flex lg:space-x-12 items-center pb-10 lg:pb-0">
              <div className="md:w-[500px] w-full md:h-[500px] h-auto rounded overflow-hidden my-5 lg:my-0 ml-5">
                <img
                  src={data?.about?.[0].image}
                  alt="about"
                  className="w-full h"
                  onError={(e) => {
                    e.target.onError = null;
                    e.target.src = logo;
                  }}
                />
              </div>
              <div className="content flex-1">
                {/* <h1 className="text-[18px] font-medium text-qblack mb-2.5">
                  What is e-commerce business?
                </h1> */}
                <p className="text-[15px] text-qgraytwo leading-7 mb-2.5">
                  {/* {item.body_ar} */}
                  {lang === "ar" ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: data?.about?.[0]?.body_ar ?? "",
                      }}
                    />
                  ) : lang === "en" ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: data?.about?.[0]?.body_en ?? "",
                      }}
                    />
                  ) : (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: data?.about?.[0]?.body_he ?? "",
                      }}
                    />
                  )}
                </p>
                {/* <ul className="text-[15px] text-qgraytwo leading-7 list-disc ml-5 mb-5">
                  <li>slim body with metal cover</li>
                  <li>
                    latest Intel Core i5-1135G7 import.metaor (4 cores / 8
                    threads)
                  </li>
                  <li>8GB DDR4 RAM and fast 512GB PCIe SSD</li>
                  <li>
                    NVIDIA GeForce MX350 2GB GDDR5 graphics card backlit
                    keyboard
                  </li>
                </ul> */}

                {/* <Link to="/contact">
                  <div className="w-[121px] h-10">
                    <span className="text-sm font-600 tracking-wide leading-7 mr-2">
                      اتصل بنا
                    </span>{" "}
                  </div>
                </Link> */}
              </div>
            </div>
          </div>
        </div>
      

      
      </div>
    </LayoutHomeTwo>
  );
}
