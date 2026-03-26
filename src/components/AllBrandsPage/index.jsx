import { useState } from "react";
import productDatas from "../../data/products.json";
import BreadcrumbCom from "../BreadcrumbCom";
import ProductCardStyleOne from "../Helpers/Cards/ProductCardStyleOne";
import DataIteration from "../Helpers/DataIteration";
import Layout from "../Partials/Layout";
import LayoutHomeTwo from "../Partials/LayoutHomeTwo";
import useFetchData from "../../hooks/fetchData";
import { Link, useParams } from "react-router-dom";
import ProductCardStyleThree from "../Helpers/Cards/ProductCardStyleThree";
import Selectbox from "../Helpers/Selectbox";
import { useTranslation } from "react-i18next";
import PageTitle from "../Helpers/PageTitle";
import image from "../../../public/assets/images/saller-7.png";

export default function AllBrandsPage() {
  const checkboxHandler = (e) => {
    const { name } = e.target;
    setFilter((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };
  const [filterToggle, setToggle] = useState(false);
  const param = useParams();
  const { data, loading } = useFetchData(`brands`);
  const { t } = useTranslation();
  const lang = localStorage.getItem("i18nextLng");

  return (
    <>
      <LayoutHomeTwo>
        {loading ? (
          <div style={{ height: "100vh" }}>
            <div className="flex space-x-2 justify-center items-center bg-white h-screen">
              <span className="sr-only">Loading...</span>
              <div className="h-8 w-8 bg-main-color rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="h-8 w-8 bg-main-color rounded-full animate-bounce [animation-delay:-0.1s]"></div>
              <div className="h-8 w-8 bg-main-color rounded-full animate-bounce"></div>
            </div>{" "}
          </div>
        ) : (
          <div className="products-page-wrapper w-full">
            <PageTitle
              title={t("Brands")}
              breadcrumb={[
                { name: t("Home Page"), path: "/" },
                { name: t("Brands"), path: "/all-brands" },
              ]}
            />
            <div className="container-x mx-auto">
              <div className="breadcrumb-wrapper w-full mt-[30px]">
                <div className="container-x mx-auto">
                  {/* <BreadcrumbCom
                    paths={[
                      { name: t("Home Page"), path: "/" },
                      { name: t("Categories"), path: "" },
                    ]}
                  /> */}
                </div>
              </div>
              {/* <div className="container-x mx-auto   mb-5 sm:mb-0 ml-[] flex p-2">
                <label
                  for="countries"
                  className="block mb-2 text-xl font-bold text-gray-900 dark:text-white"
                >
                  الترتيب
                </label>
                <div
                  className={`input-wrapper border 
                       border-qgray-border
                  } w-[200px] h-[35px] overflow-hidden relative rounded-md mr-[20px]`}
                >
                  <select
                    // onChange={handleSelectChange}
                    // value={shippingCost.price}
                    id="countries"
                    className={`input-field placeholder:text-xl text-sm px-6 text-gray-900  w-full h-full font-bold bg-white
                    }  focus:ring-0 focus:outline-none`}
                  >
                    <option selected>الأحدث وصولاٌ</option>
                    <option value="30">الأكثر مبيعاً </option>
                  </select>
                </div>
              </div> */}
              {data?.brands?.filter((item) => item?.have_product === true)
                .length > 0 ? (
                <div
                  className="grid lg:grid-cols-6 sm:grid-cols-4 grid-cols-2"
                  style={{ marginBottom: "2rem" }}
                >
                  {data.brands?.filter((item) => item?.have_product === true).map((item, index) => (
                    <div
                      className="item"
                      key={index}
                      style={{
                        marginBottom: "2rem",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Link to={`/all-products/brand/${item.id}/${item.name}`}>
                        <div className="w-[130px] h-[130px] p-1 mt-3 bg-white border border-primarygray bg-[#EEF1F1] hover:bg-main-color">
                          <img
                            src={item.image}
                            alt="logo"
                            style={{ height: "100%" }}
                          />
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div lassName="products-page-wrapper w-full">
                  <div className="container-x mx-auto mt-[90px] mb-[90px]">
                    <div className="flex flex-col items-center justify-center h-full">
                      <img src={image} alt="" width={250} />
                      <p className="text-lg text-gray-500">
                        لا يوجد بيانات لعرضها
                      </p>
                      <p className="text-sm text-gray-400 m-3">
                        <Link to="/">اضغط هنا للعودة إلى الصفحة الرئيسية</Link>
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </LayoutHomeTwo>
    </>
  );
}
