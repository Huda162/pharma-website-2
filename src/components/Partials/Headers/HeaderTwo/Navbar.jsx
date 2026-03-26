import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Arrow from "../../../Helpers/icons/Arrow";
import useFetchData from "../../../../hooks/fetchData";
import { useTranslation } from "react-i18next";

export default function Navbar({ className }) {
  const [categoryToggle, setToggle] = useState(false);
  const [elementsSize, setSize] = useState("0px");
  const apiUrl = "categories";
  const { data, loading } = useFetchData(apiUrl);
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const lang = localStorage.getItem('i18nextLng')

  // console.log(pathname, "location");
  // const getItems = document.querySelectorAll(`.categories-list li`).length;
  // if (categoryToggle && getItems > 0) {
  //   setSize(`${40 * getItems}px`);
  // }
  const handler = () => {
    setToggle(!categoryToggle);
  };
  useEffect(() => {
    if (pathname === "/") {
      setToggle(true);
    }
    if (categoryToggle) {
      const getItems = document.querySelectorAll(`.categories-list li`).length;
      if (categoryToggle && getItems > 0) {
        setSize(`${100 * getItems}px`);
      }
      if (pathname === "/") {
        setSize(`${205 * getItems}px`);
      }
    } else {
      setSize(`0px`);
    }
  }, [categoryToggle]);
  return (
    <div
      className={`nav-widget-wrapper w-full bg-main-color h-[60px] relative  ${
        className || ""
      }`}
    >
      <div className="container-x mx-auto h-full">
        <div className="w-full h-full relative">
          <div className="w-full h-full flex justify-between items-center">
            <div className="category-and-nav flex xl:space-x-7 space-x-3 items-center ">
              {/* <div className="category w-[270px] h-[53px] bg-white px-5 rounded-t-md mt-[6px] relative"> */}
                {/* <button
                  onClick={handler}
                  type="button"
                  className="w-full h-full flex justify-between items-center "
                >
                  <div className="flex space-x-3 items-center">
                    <span className="text-qblack ml-3">
                      <svg
                        className="fill-current"
                        width="14"
                        height="9"
                        viewBox="0 0 14 9"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="14" height="1" />
                        <rect y="8" width="14" height="1" />
                        <rect y="4" width="10" height="1" />
                      </svg>
                    </span>
                    <span className="text-sm font-600 text-qblacktext">
                      {t("All Categories")}
                    </span>
                  </div>
                  <div>
                    <Arrow
                      width="5.78538"
                      height="1.28564"
                      className="fill-current text-qblacktext"
                    />
                  </div>
                </button> */}
                {/* {categoryToggle && (
                  <div
                    className=" top-0 left-0 w-full h-full -z-10"
                    onClick={handler}
                  ></div>
                )} */}
                {/* <div
                  className="category-dropdown w-full absolute left-0 top-[53px] overflow-hidden"
                  style={{ height: `${elementsSize} ` }}
                >
                  <ul className="categories-list">
                    {data.categories?.slice(0, 14).map((item, index) => (
                      <Link to={`/all-products/${item.id}`}>
                        <li className="category-item">
                          <a href="">
                            <div className=" flex justify-between items-center px-5 h-10 bg-white hover:bg-main-color transition-all duration-300 ease-in-out cursor-pointer text-qblack hover:text-white">
                              <div className="flex items-center space-x-6">
                                <span>
                                  <img
                                    src={item.image}
                                    alt="categories"
                                    width={20}
                                    className="ml-5"
                                  />
                                </span>
                                <span className="text-xs font-400">
                                  {lang === 'ar' ? item.name_ar: lang==='en'? item.name_en : item.name_he}
                                </span>
                              </div>
                              <div>
                                <span>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    className="w-3 h-6"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      d="M15.75 19.5 8.25 12l7.5-7.5"
                                    />
                                  </svg>
                                </span>
                              </div>
                            </div>
                          </a>
                        </li>
                      </Link>
                    ))}
                    <Link to={`/all-categories`}>
                      <li className="category-item">
                        <a href="">
                          <div className=" flex justify-between items-center px-5 h-10 bg-white hover:bg-main-color transition-all duration-300 ease-in-out cursor-pointer text-qblack hover:text-white">
                            <div className="flex items-center">
                              <span>
                              </span>
                              <span className="text-xs font-400">
                                {t("View More")}
                              </span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="w-7 h-4"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                                />
                              </svg>
                            </div>
                          </div>
                        </a>
                      </li>
                    </Link>
                  </ul>
                </div> */}
              {/* </div> */}
              <div className="nav">
                <ul className="nav-wrapper flex xl:space-x-10 space-x-5">
                  <li className="relative">
                    <Link to="/">
                      <span className="nav-item flex items-center text-sm text-white font-600 transition-all duration-300 ease-in-out cursor-pointer ml-[40px] mr-[40px]">
                        <span>{t("Home Page")}</span>
                        <span className="ml-1.5 ">
                          {/* <Arrow className="fill-current" /> */}
                        </span>
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/all-categories">
                      <span className="nav-item flex items-center text-sm text-white font-600 cursor-pointer ">
                        <span>{t("Categories")}</span>
                      </span>
                    </Link>
                  </li>

                  <li>
                    <Link to="/all-brands">
                      <span className="nav-item flex items-center text-sm text-white font-600 cursor-pointer ">
                        <span>{t("brands")} </span>
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/products">
                      <span className="nav-item flex items-center text-sm text-white font-600 cursor-pointer ">
                        <span>{t("Our Products")} </span>
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/offers">
                      <span className="nav-item flex items-center text-sm text-white font-600 cursor-pointer ">
                        <span>{t("Offers")} </span>
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/about">
                      <span className="nav-item flex items-center text-sm text-white font-600 cursor-pointer ">
                        <span>{t("About Us")} </span>
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact">
                      <span className="nav-item flex items-center text-sm text-white font-600 cursor-pointer ">
                        <span>{t("Contact Us")}</span>
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
