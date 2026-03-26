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
import Pagination from "../Helpers/Pagination";

export default function SearchProductPage() {
  const [filters, setFilter] = useState({
    mobileLaptop: false,
    gaming: false,
    imageVideo: false,
    vehicles: false,
    furnitures: false,
    sport: false,
    foodDrinks: false,
    fashion: false,
    toilet: false,
    makeupCorner: false,
    babyItem: false,
    apple: false,
    samsung: false,
    walton: false,
    oneplus: false,
    vivo: false,
    oppo: false,
    xiomi: false,
    others: false,
    sizeS: false,
    sizeM: false,
    sizeL: false,
    sizeXL: false,
    sizeXXL: false,
    sizeFit: false,
  });

  const checkboxHandler = (e) => {
    const { name } = e.target;
    setFilter((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };
  const [volume, setVolume] = useState({ min: 200, max: 500 });

  const [storage, setStorage] = useState(null);
  const filterStorage = (value) => {
    setStorage(value);
  };
  const [filterToggle, setToggle] = useState(false);

  // const { products } = productDatas;
  const param = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = searchParams.get("page");
  const [currentPage, setCurrentPage] = useState(
    pageParam ? parseInt(pageParam) : 1
  );
  const { data, loading } = useFetchData(
    `filter_products?name=${param.value}&page=${currentPage}`
  );
  const cart = useSelector((state) => state.cart.value);
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
              <div className="h-8 w-8 bg-[#306c6c] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="h-8 w-8 bg-[#306c6c] rounded-full animate-bounce [animation-delay:-0.1s]"></div>
              <div className="h-8 w-8 bg-[#306c6c] rounded-full animate-bounce"></div>
            </div>{" "}
          </div>
        ) : data && data?.products?.data?.length > 0 ? (
          <div
            className={`products-page-wrapper w-full ${
              cart.length > 0 && "ml-[60px]"
            } `}
          >
            <div className="container-x mx-auto mt-[60px]">
              {/* <BreadcrumbCom /> */}
              <div className="w-full lg:flex lg:space-x-[30px]">
                <div className="flex-1">
                  <div className="grid xl:grid-cols-4 sm:grid-cols-2 grid-cols-2  xl:gap-[30px] gap-5 mb-[40px]">
                    <DataIteration
                      datas={data.products?.data}
                      startLength={0}
                      endLength={data.products.data?.length}
                    >
                      {({ datas }) => (
                        <div key={datas.id}>
                          <ProductCardStyleThree datas={datas} currentPage={currentPage}/>
                        </div>
                      )}
                    </DataIteration>
                  </div>
                </div>
              </div>
              <Pagination
                links={data?.products?.links}
                handlePageClick={onPageChange}
              />
            </div>
          </div>
        ) : (
          <div lassName="products-page-wrapper w-full">
            <div className="container-x mx-auto mt-[90px] mb-[90px]">
              <div className="flex flex-col items-center justify-center h-full">
                <img
                  src="../../../public/assets/images/saller-7.png"
                  width={250}
                />
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
