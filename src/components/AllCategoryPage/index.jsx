import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useFetchData from "../../hooks/fetchData";
import LayoutHomeTwo from "../Partials/LayoutHomeTwo";
import PageTitle from "../Helpers/PageTitle";
import image from "../../../public/assets/images/saller-7.png";

export default function AllCategoryPage() {
  const param = useParams();
  const { data, loading } = useFetchData(`sub_categories/0`);
  const { t } = useTranslation();
  const lang = localStorage.getItem("i18nextLng");

  return (
    <LayoutHomeTwo>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="flex space-x-2">
            <div className="h-8 w-8 bg-main-color rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="h-8 w-8 bg-main-color rounded-full animate-bounce [animation-delay:-0.1s]"></div>
            <div className="h-8 w-8 bg-main-color rounded-full animate-bounce"></div>
          </div>
        </div>
      ) : (
        <div className="products-page-wrapper w-full bg-gray-50 min-h-screen">
          <PageTitle
            title={t("Categories")}
            breadcrumb={[
              { name: t("Home Page"), path: "/" },
              { name: t("Categories"), path: "/wishlist" },
            ]}
          />
          
          <div className="container mx-auto px-4 py-8">
            {data?.categories?.length > 0 ? (
              <div className="categories-grid">
                <div className="grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 gap-6">
                  {data.categories.map((item) => (
                    <Link
                      key={item.id}
                      to={`/sub-categories/${item.id}/${
                        lang === "ar"
                          ? item.name_ar
                          : lang === "en"
                          ? item.name_en
                          : item.name_he
                      }`}
                      className="group"
                    >
                      <div className="category-card bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:transform hover:-translate-y-1">
                        <div className="aspect-square flex items-center justify-center p-4 m-0">
                          <img
                            src={item.image}
                            alt={item.name_ar}
                            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                            style={{ maxHeight: "180px" }}
                          />
                        </div>
                        <div className="p-4 text-center border-t border-gray-100">
                          <h3 className="font-semibold text-lg text-gray-800 line-clamp-2">
                            {lang === "ar"
                              ? item.name_ar
                              : lang === "en"
                              ? item.name_en
                              : item.name_he}
                          </h3>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <div className="empty-state flex flex-col items-center justify-center py-20">
                <img 
                  src={image} 
                  alt="No categories" 
                  width={250}                />
                <p className="text-xl text-gray-600 mb-4">
                  {t("No categories available")}
                </p>
                <Link
                  to="/"
                  className="px-6 py-2 bg-main-color text-white rounded-lg hover:bg-main-color-dark transition-colors"
                >
                  {t("Return to homepage")}
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </LayoutHomeTwo>
  );
}