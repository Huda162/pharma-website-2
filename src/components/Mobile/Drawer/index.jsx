  import { useState, useEffect } from "react";
  import { Link } from "react-router-dom";
  import useFetchData from "../../../hooks/fetchData";
  import { useSelector } from "react-redux";
  import i18n from "i18next";
  import { useTranslation } from "react-i18next";
  import language from "../../../../public/assets/images/language.svg";
  import userIcon from "../../../../public/assets/images/user.png";
  import SearchBox from "../../Helpers/SearchBox";
  import {
    X,
    Home,
    Package,
    Grid3x3,
    Tag,
    Star,
    TrendingUp,
    Heart,
    User,
    LogIn,
    Globe,
    Facebook,
    Instagram,
    MessageCircle,
    ChevronRight,
    Menu,
    Layers,
  } from "lucide-react";

  export default function Drawer({ className, open, action }) {
    const [tab, setTab] = useState("menu");
    const [toggleLang, setToggleLang] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const { data, loading } = useFetchData("categories");
    const { data: data2, loading: loading2 } = useFetchData("socials");
    const favorite = useSelector((state) => state.favorit.items);
    const lang = localStorage.getItem("i18nextLng");
    const { t } = useTranslation();
    const logStatus = JSON.parse(localStorage.getItem("alanaqa_log_status"));

    // Handle closing animation
    useEffect(() => {
      if (!open) {
        setIsClosing(true);
        const timer = setTimeout(() => {
          setIsClosing(false);
        }, 300);
        return () => clearTimeout(timer);
      }
    }, [open]);

    const changeLanguage = (lng) => {
      i18n.changeLanguage(lng);
      document.body.dir = i18n.dir();
      localStorage.setItem("language", lng);
      setToggleLang(false);
      action();
    };

    // Navigation items for menu tab
    const menuItems = [
      { icon: <Home className="w-5 h-5" />, label: t("Home Page"), path: "/" },
      {
        icon: <Package className="w-5 h-5" />,
        label: t("Our Products"),
        path: "/products",
      },
      {
        icon: <Grid3x3 className="w-5 h-5" />,
        label: t("Categories"),
        path: "/all-categories",
      },
      {
        icon: <Tag className="w-5 h-5" />,
        label: t("brands"),
        path: "/all-brands",
      },
      {
        icon: <Star className="w-5 h-5" />,
        label: t("Most popular sales"),
        path: "/best-seller-products",
      },
      {
        icon: <TrendingUp className="w-5 h-5" />,
        label: t("New Arrivals"),
        path: "/latest-products",
      },
    ];

    return (
      <>
        {/* Backdrop */}
        <div
          className={`fixed inset-0 bg-black transition-all duration-300 z-40 ${
            open ? "opacity-40" : "opacity-0 pointer-events-none"
          } ${isClosing ? "opacity-0" : ""}`}
          onClick={action}
        />

        <div
          className={`fixed inset-y-0 ${
            lang === "en" ? "left-0" : "right-0"
          } w-[320px] max-w-full h-screen bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out ${
            open
              ? "translate-x-0"
              : lang === "en"
              ? "-translate-x-full"
              : "translate-x-full"
          } ${className || ""}`}
        >
          <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {logStatus === "true" ? (
                  <Link
                    to="/profile"
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                    onClick={action}
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-main-color to-secondary-color flex items-center justify-center text-white">
                      <User className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {t("Profile")}
                    </span>
                  </Link>
                ) : (
                  <Link
                    to="/login-customer"
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                    onClick={action}
                  >
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <LogIn className="w-5 h-5 text-gray-600" />
                    </div>
                  </Link>
                )}
              </div>

              <div className="flex items-center gap-4">
                <Link
                  to="/wishlist"
                  className="relative p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  onClick={action}
                >
                  <Heart className="w-6 h-6 text-gray-700" />
                  {favorite.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {favorite.length}
                    </span>
                  )}
                </Link>

                <div className="relative">
                  <button
                    onClick={() => setToggleLang(!toggleLang)}
                    className="p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Globe className="w-6 h-6 text-gray-700" />
                  </button>

                  {toggleLang && (
                    <div className="absolute top-full left-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-gray-200 z-20 overflow-hidden">
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

                <button
                  onClick={action}
                  className="p-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <X className="w-6 h-6 text-gray-700" />
                </button>
              </div>
            </div>

            <div className="mt-4">
              <SearchBox className="search-com" />
            </div>
          </div>

          <div className="h-[calc(100vh-140px)] overflow-y-auto px-4 pb-20">
            <div className="sticky top-0 bg-white pt-4 pb-2 border-b border-gray-100 ">
              <div className="flex rounded-lg bg-gray-100 p-1">
                <button
                  onClick={() => setTab("menu")}
                  className={`flex-1 py-2.5 rounded-md text-sm font-medium transition-all duration-300 ${
                    tab === "menu"
                      ? "bg-white shadow-sm text-main-color"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {t("menu")}
                </button>
                <button
                  onClick={() => setTab("category")}
                  className={`flex-1 py-2.5 rounded-md text-sm font-medium transition-all duration-300 ${
                    tab === "category"
                      ? "bg-white shadow-sm text-main-color"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {t("Categories")}
                </button>
              </div>
            </div>

            {tab === "category" ? (
              <div className="mt-4 space-y-1">
                {data.categories
                  ?.filter((category) => category.parent_id === 0)
                  .map((item, index) => (
                    <Link
                      key={index}
                      to={`/sub-categories/${item.id}/${
                        lang === "ar"
                          ? item.name_ar
                          : lang === "en"
                          ? item.name_en
                          : item.name_he
                      }`}
                      onClick={action}
                    >
                      <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-gradient-to-r hover:from-main-color/5 hover:to-secondary-color/5 transition-all duration-300 group">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
                          <img
                            src={item.image}
                            alt={
                              lang === "ar"
                                ? item.name_ar
                                : lang === "en"
                                ? item.name_en
                                : item.name_he
                            }
                            className="w-8 h-8 object-contain"
                            onError={(e) => {
                              e.target.onError = null;
                              e.target.src =
                                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='3' width='18' height='18' rx='2' ry='2'%3E%3C/rect%3E%3Ccircle cx='8.5' cy='8.5' r='1.5'%3E%3C/circle%3E%3Cpolyline points='21 15 16 10 5 21'%3E%3C/polyline%3E%3C/svg%3E";
                            }}
                          />
                        </div>
                        <span className="flex-1 text-sm font-medium text-gray-700 group-hover:text-main-color transition-colors">
                          {lang === "ar"
                            ? item.name_ar
                            : lang === "en"
                            ? item.name_en
                            : item.name_he}
                        </span>
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-main-color transition-colors" />
                      </div>
                    </Link>
                  ))}
              </div>
            ) : (
              <div className="mt-4 space-y-1">
                {menuItems.map((item, index) => (
                  <Link key={index} to={item.path} onClick={action}>
                    <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-gradient-to-r hover:from-main-color/5 hover:to-secondary-color/5 transition-all duration-300 group">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-main-color/10 to-secondary-color/10 flex items-center justify-center">
                        <div className="text-main-color">{item.icon}</div>
                      </div>
                      <span className="flex-1 text-sm font-medium text-gray-700 group-hover:text-main-color transition-colors">
                        {item.label}
                      </span>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-main-color transition-colors" />
                    </div>
                  </Link>
                ))}
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-gray-100">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-3">
                {t("Follow Us")}
              </h3>
              <div className="flex gap-3 px-3">
                {data2?.socials?.[0]?.url && (
                  <a
                    href={data2.socials[0].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-gradient-to-br from-pink-50 to-pink-100 text-pink-600 hover:from-pink-100 hover:to-pink-200 transition-all duration-300 hover:scale-105"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                )}

                {data2?.socials?.[1]?.url && (
                  <a
                    href={data2.socials[1].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 hover:from-blue-100 hover:to-blue-200 transition-all duration-300 hover:scale-105"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                )}

                {data2?.socials?.[2]?.url && (
                  <a
                    href={`https://api.whatsapp.com/send?phone=${data2.socials[2].url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-gradient-to-br from-green-50 to-green-100 text-green-600 hover:from-green-100 hover:to-green-200 transition-all duration-300 hover:scale-105"
                  >
                    <MessageCircle className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>

            <div className="mt-8 px-3">
              <div className="text-center text-xs text-gray-500">
                <p>© {new Date().getFullYear()} pharmaglows.com</p>
                <p className="mt-1">{t("All rights reserved")}</p>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .overflow-y-auto {
            scrollbar-width: thin;
            scrollbar-color: var(--main-color) transparent;
          }
          .overflow-y-auto::-webkit-scrollbar {
            width: 4px;
          }
          .overflow-y-auto::-webkit-scrollbar-track {
            background: transparent;
          }
          .overflow-y-auto::-webkit-scrollbar-thumb {
            background-color: var(--main-color);
            border-radius: 20px;
          }
        `}</style>
      </>
    );
  }
