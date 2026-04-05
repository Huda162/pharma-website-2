import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LayoutHomeTwo from "../Partials/LayoutHomeTwo";
import PageTitle from "../Helpers/PageTitle";
import axios from "axios";
import image from "../../../public/assets/images/saller-7.png";
import DataIteration from "../Helpers/DataIteration";
import ProductCardStyleThree from "../Helpers/Cards/ProductCardStyleThree";
import MonthSelector from "./monthSelection";
import { HandHeart } from "lucide-react";

export default function PreparationPage() {
  const param = useParams();
  const { t, i18n } = useTranslation();
  const lang = localStorage.getItem("i18nextLng");
  const [gender, setGender] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [suggestionData, setSuggestionData] = useState();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isWarningOpen, setIsWarningOpen] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://pharmaglows.com/adminv2/api/suggest-baby-package?gender=${gender}&month=${birthMonth}`
      );
      setSuggestionData(response.data);
      setShowSuggestions(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReset = () => {
    setShowSuggestions(false);
    setSuggestionData(null);
    setGender("");
    setBirthMonth("");
  };

  const getGenderText = (gender) => {
    return gender === "male" ? t("boy") : gender === "female" ? t("girl") : "";
  };

  const getMonthName = (monthNumber) => {
    const months = [
      t("January"),
      t("February"),
      t("March"),
      t("April"),
      t("May"),
      t("June"),
      t("July"),
      t("August"),
      t("September"),
      t("October"),
      t("November"),
      t("December"),
    ];
    return months[parseInt(monthNumber) - 1] || monthNumber;
  };

  const getCategoryName = (category) => {
    if (lang === "ar") return category.name_ar;
    if (lang === "he") return category.name_he;
    return category.name_en;
  };

  const months = [
    { value: "1", label: t("January") },
    { value: "2", label: t("February") },
    { value: "3", label: t("March") },
    { value: "4", label: t("April") },
    { value: "5", label: t("May") },
    { value: "6", label: t("June") },
    { value: "7", label: t("July") },
    { value: "8", label: t("August") },
    { value: "9", label: t("September") },
    { value: "10", label: t("October") },
    { value: "11", label: t("November") },
    { value: "12", label: t("December") },
  ];

  const getTotalProductsCount = () => {
    if (!suggestionData?.categories) return 0;
    return suggestionData.categories.reduce(
      (total, category) => total + (category.products?.length || 0),
      0
    );
  };
  const closeAlert = () => {
    setIsWarningOpen(false);
  };
  return (
    <LayoutHomeTwo>
      {isWarningOpen && (
        <div
          className="fixed bottom-4 left-1/2 lg:-right-[10rem] transform -translate-x-1/2 z-50 w-11/12 max-w-md
                  bg-gradient-to-r from-secondary-color/95 to-main-color/15 rounded-2xl shadow-lg 
                  border border-main-color p-4 flex items-center justify-between animate-slide-up"
        >
          <div className="flex items-center gap-2">
            <div className="text-main-color">
              <HandHeart />
            </div>
            <div className="text-main-color">{t("we recommend")}</div>
          </div>
          <button
            onClick={closeAlert}
            className="text-main-color hover:text-main-color/50 transition"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="#b58640"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}
      <div className="products-page-wrapper w-full bg-gray-50 min-h-[90vh]">
        <PageTitle
          title={t("baby preparation kit")}
          breadcrumb={[
            { name: t("home"), path: "/" },
            { name: t("baby preparation kit"), path: "/" },
          ]}
        />
        {showSuggestions ? (
          <div className="container-x mx-auto px-4 py-8">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border-l-4 border-main-color">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{t("gender")}:</span>
                      <span
                        className={`px-2 py-1 rounded-full ${
                          suggestionData?.gender === "male"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-pink-100 text-pink-800"
                        }`}
                      >
                        {getGenderText(suggestionData?.gender)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{t("month")}:</span>
                      <span className="px-2 py-1 bg-main-color/10 text-main-color rounded-full">
                        {getMonthName(suggestionData?.month)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">
                        {t("total_products")}:
                      </span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                        {getTotalProductsCount()}
                      </span>
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-gray-800 mb-2">
                    {lang === "ar"
                      ? suggestionData?.package_name_ar
                      : lang === "en"
                      ? suggestionData?.package_name_en
                      : suggestionData?.package_name_he}
                  </h4>
                </div>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200 font-medium"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  {t("reset_search")}
                </button>
              </div>
            </div>

            <div className="flex-1">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  {t("recommended_products")} ({getTotalProductsCount()})
                </h2>
              </div>

              {suggestionData?.categories &&
              suggestionData.categories?.length > 0 ? (
                <div className="space-y-10">
                  {suggestionData.categories
                    .filter((category) => category?.products?.length > 0)
                    .map((category) => (
                      <div key={category.id} className="category-section">
                        <div className="flex items-center gap-3 mb-6 pb-3 border-b border-gray-200">
                          {category.image && (
                            <div className="w-12 h-12 flex-shrink-0">
                              <img
                                src={category.image}
                                alt={getCategoryName(category)}
                                className="w-full h-full object-cover rounded-lg"
                              />
                            </div>
                          )}
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-gray-800">
                              {getCategoryName(category)}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {category.products?.length || 0} {t("products")}
                            </p>
                          </div>
                        </div>

                        {/* Products Grid for this Category */}
                        {category.products && category.products.length > 0 ? (
                          <div className="grid xl:grid-cols-4 lg:grid-cols-4 sm:grid-cols-2 grid-cols-2 xl:gap-[30px] gap-5">
                            <DataIteration
                              datas={category.products}
                              startLength={0}
                              endLength={category.products.length}
                            >
                              {({ datas }) => (
                                <div key={datas.id}>
                                  <ProductCardStyleThree
                                    datas={datas}
                                    currentPage={1}
                                  />
                                </div>
                              )}
                            </DataIteration>
                          </div>
                        ) : (
                          <div className="text-center py-8 text-gray-500">
                            {t("no_products_in_category")}
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              ) : (
                <div className="products-page-wrapper w-full flex align-center justify-center">
                  <div className="container-x mx-auto mt-[90px] mb-[90px]">
                    <div className="flex flex-col items-center justify-center h-full">
                      <img src={image} alt="" width={250} />
                      <p className="text-lg text-gray-500 mt-4">
                        {t("no data found")}
                      </p>
                      <button
                        onClick={handleReset}
                        className="mt-6 px-6 py-2 bg-main-color text-white rounded-lg hover:bg-main-color/80 transition-colors duration-200"
                      >
                        {t("try_again")}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="container-x mx-auto px-4 py-8">
            <div className="max-w-md mx-auto">
              <form
                onSubmit={handleSubmit}
                className="bg-gradient-to-tr from-main-color/30 via-secondary-color/30 to-main1-color/30 rounded-xl shadow-lg p-6 md:p-8"
              >
                <h2 className="text-xl md:text-2xl font-bold text-center text-main-color mb-4">
                  {t("tell_us_about_baby")}
                </h2>

                <p className="text-sm text-main-color text-center mb-8 leading-relaxed">
                  {t("select_gender_and_month")}
                </p>

                <div className="mb-8">
                  <label className="block text-main-color font-semibold text-main-color mb-4 text-center">
                    {t("baby_gender")}
                  </label>
                  <div className="flex justify-center gap-4">
                    <div
                      className={`flex flex-col items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                        gender === "male"
                          ? "border-blue-500 bg-blue-50 scale-105"
                          : "border-gray-200 hover:border-blue-300 hover:bg-blue-25"
                      }`}
                      onClick={() => setGender("male")}
                    >
                      <div className="w-12 h-12 mb-2 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-2xl">👶</span>
                      </div>
                      <span className="text-sm font-medium text-main-color">
                        {t("boy")}
                      </span>
                    </div>

                    <div
                      className={`flex flex-col items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                        gender === "female"
                          ? "border-pink-500 bg-pink-50 scale-105"
                          : "border-gray-200 hover:border-pink-300 hover:bg-pink-25"
                      }`}
                      onClick={() => setGender("female")}
                    >
                      <div className="w-12 h-12 mb-2 bg-pink-100 rounded-full flex items-center justify-center">
                        <span className="text-2xl">👧</span>
                      </div>
                      <span className="text-sm font-medium text-main-color">
                        {t("girl")}
                      </span>
                    </div>
                  </div>
                </div>

                <MonthSelector
                  birthMonth={birthMonth}
                  setBirthMonth={setBirthMonth}
                  t={t}
                />

                <div className="text-center">
                  <button
                    type="submit"
                    disabled={!gender || !birthMonth}
                    className={`text-main-color font-bold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 ${
                      gender && birthMonth
                        ? "bg-gradient-to-tr from-main-color/50 via-secondary-color to-main1-color text-main-color shadow-lg hover:shadow-xl cursor-pointer"
                        : "bg-gray-300 text-main-color cursor-not-allowed"
                    }`}
                  >
                    {t("get_recommendations")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </LayoutHomeTwo>
  );
}
