import { useEffect, useState } from "react";
import productDatas from "../../data/products.json";
import BreadcrumbCom from "../BreadcrumbCom";
import ProductCardStyleOne from "../Helpers/Cards/ProductCardStyleOne";
import DataIteration from "../Helpers/DataIteration";
import Layout from "../Partials/Layout";
import LayoutHomeTwo from "../Partials/LayoutHomeTwo";
import useFetchData from "../../hooks/fetchData";
import { Link, useParams, useSearchParams } from "react-router-dom";
import ProductCardStyleThree from "../Helpers/Cards/ProductCardStyleThree";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import PageTitle from "../Helpers/PageTitle";
import Pagination from "../Helpers/Pagination";

export default function LatestProducts() {
  const param = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = searchParams.get("page");
  const [currentPage, setCurrentPage] = useState(pageParam ? parseInt(pageParam) : 1);
  const { data, loading } = useFetchData(`latest_products?page=${currentPage}`);
  console.log(data, "data");
  const cart = useSelector((state) => state.cart.value);
  const lang = localStorage.getItem("i18nextLng");
  const { t } = useTranslation();
  useEffect(() => {
    handlePageClick(currentPage)
  }, [currentPage])

  const onPageChange = (page) => {
    setSearchParams({ page: page.toString() });
    handlePageClick(page);
  };
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <LayoutHomeTwo>
        {loading ? (
          <div style={{ height: "100vh" }}>
            <div className="flex space-x-2 justify-center items-center bg-white h-screen">
              <span className="sr-only">Loading...</span>
              <div className="h-8 w-8 bg-main-color  rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="h-8 w-8 bg-main-color  rounded-full animate-bounce [animation-delay:-0.1s]"></div>
              <div className="h-8 w-8 bg-main-color  rounded-full animate-bounce"></div>
            </div>{" "}
          </div>
        ) : data && data?.products?.data.length > 0 ? (
          <div
            className={`products-page-wrapper w-full ${
              cart.length > 0 && "ml-[60px]"
            } `}
          >
            <PageTitle
              title={t("New Arrivals")}
              breadcrumb={[
                { name: t("Home Page"), path: "/" },
                { name: t("New Arrivals"), path: "" },
              ]}
            />
            <div className="container-x mx-auto mt-[30px]">
              <div className="w-full lg:flex lg:space-x-[30px]">
                <div className="flex-1">
                  <div className="grid xl:grid-cols-4 sm:grid-cols-2 grid-cols-1  xl:gap-[30px] gap-5 mb-[40px]">
                    <DataIteration
                      datas={data.products.data}
                      startLength={0}
                      endLength={data.products?.data.length}
                    >
                      {({ datas }) => (
                        <div   key={datas.id}>
                          <ProductCardStyleThree datas={datas} currentPage={currentPage}/>
                        </div>
                      )}
                    </DataIteration>
                  </div>
                </div>
              </div>
              <Pagination
                links={data.products.links}
                handlePageClick={onPageChange}
              />
            </div>
          </div>
        ) : (
          <div lassName="products-page-wrapper w-full">
            <div className="container-x mx-auto mt-[90px] mb-[90px]">
              <div className="flex flex-col items-center justify-center h-full">
                <img src="../../../public/assets/images/saller-7.png" width={250}/>
                <p className="text-lg text-gray-500">لا يوجد بيانات لعرضها</p>
                <p className="text-sm text-gray-400 m-3">
                  <Link to="/">اضغط هنا للعودة إلى الصفحة الرئيسية</Link>
                </p>
              </div>
            </div>
          </div>
        )}
      </LayoutHomeTwo>
    </>
  );
}
