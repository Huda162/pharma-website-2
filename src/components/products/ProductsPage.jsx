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
import image from "../../../public/assets/images/saller-7.png";
import { useSelector } from "react-redux";
import PageTitle from "../Helpers/PageTitle";
import { useTranslation } from "react-i18next";
import FilterBar from "../FilterBar/FilterBar";
import axios from "axios";
import Pagination from "../Helpers/Pagination";
import useFilterData from "../../hooks/filterData";
import FilterDialog from "../FilterBar/FilterDialog";

export default function ProductsPage() {
  const param = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = searchParams.get("page");
  const [currentPage, setCurrentPage] = useState(
    pageParam ? parseInt(pageParam) : 1
  );
  const { data: data2, loading: loading2 } = useFetchData(
    `filter_products?page=${currentPage}`
  );
  const [sortKeys, setSortKeys] = useState({
    most_ordered: false,
    sort_asc: false,
    sort_desc: false,
    latest: false,
  });
  const [selectedSeasons, setSelectedSeasons] = useState([]);
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedAgeGroups, setSelectedAgeGroups] = useState([]);
  useEffect(() => {
    handlePageClick(currentPage);
  }, [currentPage]);

  const onPageChange = (page) => {
    setSearchParams({ page: page.toString() });
    handlePageClick(page);
  };
  const checkKey = (key) => {
    switch (key) {
      case "most_ordered":
        setSortKeys({ ...sortKeys, most_ordered: !sortKeys.most_ordered });
        break;
      case "sort_asc":
        setSortKeys({ ...sortKeys, sort_asc: !sortKeys.sort_asc });
        break;
      case "sort_desc":
        setSortKeys({ ...sortKeys, sort_desc: !sortKeys.sort_desc });
        break;
      case "latest":
        setSortKeys({ ...sortKeys, latest: !sortKeys.latest });
        break;
      default:
        break;
    }

    console.log(key, sortKeys);
  };

  const cart = useSelector((state) => state.cart.value);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const [url, setUrl] = useState(`filter_products?page=${currentPage}`);
  const {
    products,
    loadProducts,
    maxVal,
    setMax,
    minVal,
    setMin,
    selectedValue,
    setValue,
    sortKey,
    setSortKey,
  } = useFilterData(url);
  const { t } = useTranslation();
  const lang = localStorage.getItem("i18nextLng");

  const applyFilters = () => {
    let newUrl = `filter_products?page=${currentPage}&`;

    if (minVal !== selectedValue[0]) {
      newUrl += `&min_price=${selectedValue[0]}`;
    }
    if (maxVal !== selectedValue[1]) {
      newUrl += `&max_price=${selectedValue[1]}`;
    }
    if (sortKeys.latest === true) {
      newUrl += `&latest=true`;
    }
    if (sortKeys.most_ordered === true) {
      newUrl += `&most_ordered=true`;
    }
    if (sortKeys.sort_asc === true) {
      newUrl += `&sort_price=asc`;
    }
    if (sortKeys.sort_desc === true) {
      newUrl += `&sort_price=desc`;
    }
    if (selectedSeasons) {
      newUrl += `&season=${selectedSeasons}`;
    }
    if (selectedAgeGroups) {
      newUrl += `&age=${selectedAgeGroups}`;
    }
    if (selectedGender) {
      newUrl += `&gender=${selectedGender}`;
    }
    setUrl(newUrl);
  };

  useEffect(() => {
    applyFilters();
  }, [
    currentPage,
    selectedAgeGroups,
    selectedSeasons,
    selectedGender,
    sortKeys,
  ]);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <LayoutHomeTwo>
        <PageTitle
          title={t("Our Products")}
          breadcrumb={[
            { name: t("Home Page"), path: "/" },
            { name: t("Our Products"), path: "" },
          ]}
        />
        {loadProducts ? (
          <div style={{ height: "100vh" }}>
            <div className="flex space-x-2 justify-center items-center bg-white h-screen">
              <span className="sr-only">Loading...</span>
              <div className="h-8 w-8 bg-main-color  rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="h-8 w-8 bg-main-color  rounded-full animate-bounce [animation-delay:-0.1s]"></div>
              <div className="h-8 w-8 bg-main-color  rounded-full animate-bounce"></div>
            </div>{" "}
          </div>
        ) : data2.products?.data && data2?.products?.data.length > 0 ? (
          <div
            className={`products-page-wrapper w-full mb-[40px] ${
              cart.length > 0 && "ml-[60px]"
            } `}
          >
            <div className="container-x mx-auto mt-[30px]">
              {/* <BreadcrumbCom /> */}
              <div className="breadcrumb-wrapper w-full ">
                <div className="container-x mx-auto">
                  <p
                    style={{
                      textAlign: "center",
                      fontSize: 20,
                      marginBottom: "1rem",
                    }}
                  ></p>
                  {/* <BreadcrumbCom
                    paths={[
                      { name: "الصفحة الرئيسية", path: "/" },
                      { name: " المنتجات", path: "" },
                    ]}
                  /> */}
                </div>
              </div>
              <div className="w-full lg:flex ">
                <FilterBar
                  minValue={minVal}
                  maxValue={maxVal}
                  selectedValue={selectedValue}
                  setValue={setValue}
                  sortKeys={sortKeys}
                  checkKey={checkKey}
                  setSortKey={setSortKey}
                  applyFilters={() => applyFilters()}
                  selectedAgeGroups={selectedAgeGroups}
                  setSelectedAgeGroups={setSelectedAgeGroups}
                  selectedSeasons={selectedSeasons}
                  setSelectedSeasons={setSelectedSeasons}
                  selectedGender={selectedGender}
                  setSelectedGender={setSelectedGender}
                />
                <div className="flex-1">
                  <div className="grid xl:grid-cols-3 lg:grid-cols-3 sm:grid-cols-2 grid-cols-2 xl:gap-[10px] gap-5">
                    {products.data && products.data?.length > 0 ? (
                      <DataIteration
                        datas={products.data}
                        startLength={0}
                        endLength={products?.data?.length}
                      >
                        {({ datas }) => (
                          <div key={datas.id}>
                            <ProductCardStyleThree
                              datas={datas}
                              currentPage={currentPage}
                            />
                          </div>
                        )}
                      </DataIteration>
                    ) : (
                      <div lassName="products-page-wrapper w-full flex align-center justify-center">
                        <div className="container-x mx-auto mt-[90px] mb-[90px]">
                          <div className="flex flex-col items-center justify-center h-full">
                            <img src={image} alt="" width={250} />
                            <p className="text-lg text-gray-500">
                              {t("no data found")}
                            </p>
                            <p className="text-sm text-gray-400 m-3">
                              <button
                                onClick={() => {
                                  setValue([minVal, maxVal]);
                                  setSortKey("");
                                  applyFilters();
                                }}
                              >
                                {t("click here to reset filters")}
                              </button>
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <Pagination
                links={products.links}
                handlePageClick={onPageChange}
              />
            </div>
          </div>
        ) : (
          <div lassName="products-page-wrapper w-full">
            <div className="container-x mx-auto mt-[90px] mb-[90px]">
              <div className="flex flex-col items-center justify-center h-full">
                <img src={image} alt="" />
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
