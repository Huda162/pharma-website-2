import { useSelector } from "react-redux";
import Cart from "../../../Cart";
import Compair from "../../../Helpers/icons/Compair";
import ThinBag from "../../../Helpers/icons/ThinBag";
import ThinLove from "../../../Helpers/icons/ThinLove";
import ThinPeople from "../../../Helpers/icons/ThinPeople";
import SearchBox from "../../../Helpers/SearchBox";
import { Link } from "react-router-dom";
import i18n from "i18next";
import logo from "../../../../../public/assets/images/logo-white.png";
import { useState } from "react";
import Selectbox from "../../../Helpers/Selectbox";
import Arrow from "../../../Helpers/icons/Arrow";
import { useTheme } from "@material-ui/core";
import Cookies from "universal-cookie";
import { useEffect } from "react";
import LanguageSwitchIcon from "../../../Helpers/icons/Language";
import "../../../../index.css";
import language from "../../../../../public/assets/images/language.svg";
import { useCartDrawer } from "../../../../context/CartDrawerContext";
import { useTranslation } from "react-i18next";
import userIcon from "../../../../../public/assets/images/user.png";
import useFetchData from "../../../../hooks/fetchData";

export default function Middlebar({ className }) {
  // const [toggleCart, setToggle] = useState(false);
  // const cartHandler = () => {
  //   setToggle(!toggleCart);
  // };
  const { data, loading } = useFetchData(`products_offers?1`);
  const showOffersPage = data.products?.data?.length > 0 ? true : false;

  const cart = useSelector((state) => state.cart.value);
  const favorite = useSelector((state) => state.favorit.items);
  const [toggle, setToggle] = useState(false);
  const theme = useTheme();
  const [toggleLang, setToggleLang] = useState(false);
  const lang = localStorage.getItem("i18nextLng");
  const logStatus = JSON.parse(localStorage.getItem("alanaqa_log_status"));
  const storedLogo = localStorage.getItem("alanaqa_logo") || logo;

  document.body.dir = i18n.dir();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    document.body.dir = i18n.dir();
    theme.direction = i18n.dir();
    const language = localStorage.setItem("language", lng);
    setToggleLang(false);
  };
  const { openCartDrawer, closeCartDrawer, toggleCartDrawer } = useCartDrawer();

  const datas = [
    { code: "ar", label: "العربية" },
    { code: "en", label: "English" },
    { code: "he", label: "Hebrew" },
  ];

  const { t } = useTranslation();
  return (
    <div
      className={`w-full h-[10vh] bg-white ${className} flex justify-center top-0 fixed z-40 bg-gradient-to-r from-main1-color via-secondary-color to-main1-color`}
    >
      <div className=" h-full w-[100%]">
        <div className=" mx-6 relative h-full ">
          <div className="flex justify-between items-center h-full">
            <div className="mx-3">
              <Link to="/">
                <img width="150" src={logo} alt="logo" />
              </Link>
            </div>
            <div className="nav">
              <ul className="nav-wrapper flex xl:space-x-5 space-x-5 text-black">
                <li className="relative">
                  <Link to="/">
                    <span className="nav-item flex items-center text-sm 2xl:text-[15px] font-600 transition-all  duration-300 ease-in-out cursor-pointer ml-[40px] mr-[40px] lg:ml-[20px] lg:mr-[20px] lg:text-xs">
                      <span>{t("Home Page")}</span>
                      <span className="ml-1.5 "></span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to="/all-categories">
                    <span className="nav-item flex items-center text-sm 2xl:text-[15px] font-600 cursor-pointer lg:text-xs">
                      <span>{t("Categories")}</span>
                    </span>
                  </Link>
                </li>

                <li>
                  <Link to="/all-brands">
                    <span className="nav-item flex items-center text-sm 2xl:text-[15px] font-600 cursor-pointer lg:text-xs">
                      <span>{t("brands")} </span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to="/products">
                    <span className="nav-item flex items-center text-sm 2xl:text-[15px] font-600 cursor-pointer lg:text-xs">
                      <span>{t("Our Products")} </span>
                    </span>
                  </Link>
                </li>
                {showOffersPage && (
                  <li>
                    <Link to="/offers">
                      <span className="nav-item flex items-center text-sm 2xl:text-[15px] font-600 cursor-pointer lg:text-xs">
                        <span>{t("Offers")} </span>
                      </span>
                    </Link>
                  </li>
                )}
                <li>
                  <Link to="/about">
                    <span className="nav-item flex items-center text-sm 2xl:text-[15px] font-600 cursor-pointer lg:text-xs">
                      <span>{t("About Us")} </span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to="/contact">
                    <span className="nav-item flex items-center text-sm 2xl:text-[15px] font-600 cursor-pointer lg:text-xs">
                      <span>{t("Contact Us")}</span>
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="w-[20vw] h-[44px]">
              <SearchBox className="search-com" />
            </div>
            <div className="flex space-x-6 items-center">
              {logStatus === "true" && (
                <div className="relative pl-5">
                  <Link to="/profile">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="#000"
                        viewBox="0 0 256 256"
                      >
                        <path d="M128,26A102,102,0,1,0,230,128,102.12,102.12,0,0,0,128,26ZM71.44,198a66,66,0,0,1,113.12,0,89.8,89.8,0,0,1-113.12,0ZM94,120a34,34,0,1,1,34,34A34,34,0,0,1,94,120Zm99.51,69.64a77.53,77.53,0,0,0-40-31.38,46,46,0,1,0-51,0,77.53,77.53,0,0,0-40,31.38,90,90,0,1,1,131,0Z"></path>
                      </svg>
                    </span>
                  </Link>
                </div>
              )}
              <div className="relative mx-5">
                <div
                  onClick={() => setToggleLang(!toggleLang)}
                  className="cursor-pointer"
                >
                  <span className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      fill="#000"
                      viewBox="0 0 256 256"
                    >
                      <path d="M128,26A102,102,0,1,0,230,128,102.12,102.12,0,0,0,128,26Zm81.57,64H169.19a132.58,132.58,0,0,0-25.73-50.67A90.29,90.29,0,0,1,209.57,90ZM218,128a89.7,89.7,0,0,1-3.83,26H171.81a155.43,155.43,0,0,0,0-52h42.36A89.7,89.7,0,0,1,218,128Zm-90,87.83a110,110,0,0,1-15.19-19.45A124.24,124.24,0,0,1,99.35,166h57.3a124.24,124.24,0,0,1-13.46,30.38A110,110,0,0,1,128,215.83ZM96.45,154a139.18,139.18,0,0,1,0-52h63.1a139.18,139.18,0,0,1,0,52ZM38,128a89.7,89.7,0,0,1,3.83-26H84.19a155.43,155.43,0,0,0,0,52H41.83A89.7,89.7,0,0,1,38,128Zm90-87.83a110,110,0,0,1,15.19,19.45A124.24,124.24,0,0,1,156.65,90H99.35a124.24,124.24,0,0,1,13.46-30.38A110,110,0,0,1,128,40.17Zm-15.46-.84A132.58,132.58,0,0,0,86.81,90H46.43A90.29,90.29,0,0,1,112.54,39.33ZM46.43,166H86.81a132.58,132.58,0,0,0,25.73,50.67A90.29,90.29,0,0,1,46.43,166Zm97,50.67A132.58,132.58,0,0,0,169.19,166h40.38A90.29,90.29,0,0,1,143.46,216.67Z"></path>
                    </svg>
                  </span>
                </div>
                {toggleLang === true && (
                  <div className="absolute top-full -end-[50%] mt-2 w-40 bg-white rounded-xl shadow-lg border border-gray-200 z-20 overflow-hidden">
                    {[
                      { code: "ar", label: "العربية", flag: "🇵🇸" },
                      { code: "en", label: "English", flag: "🇺🇸" },
                      { code: "he", label: "עִברִית", flag: "🇮🇱" },
                    ].map((item) => (
                      <button
                        key={item.code}
                        onClick={() => changeLanguage(item.code)}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                          lang === item.code
                            ? "bg-gradient-to-r from-main-color/10 to-secondary-color/10 text-main-color font-semibold"
                            : "text-gray-700"
                        }`}
                      >
                        <span className="text-sm">{item.label}</span>
                        {lang === item.code && (
                          <div className="ml-auto w-2 h-2 rounded-full bg-main-color" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="favorite relative mx-5">
                <Link to="/wishlist">
                  <span>
                    <ThinLove fill="#000" />
                  </span>
                </Link>
                <span className="w-[18px] h-[18px] rounded-full bg-secondary-color absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] text-main-color">
                  {favorite.length}
                </span>
              </div>
              <div className="cart-wrapper group relative py-4">
                <div className="cart relative cursor-pointer">
                  <button onClick={() => openCartDrawer()}>
                    <span>
                      <ThinBag fill="#000" />
                    </span>
                  </button>
                  <span className="w-[18px] h-[18px] rounded-full bg-secondary-color absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] text-main-color">
                    {cart?.length || 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
