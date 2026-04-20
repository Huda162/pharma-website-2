import SectionStyleOneHmFour from "../components/Helpers/SectionStyleOneHmFour";
import SectionStyleThreeHmFour from "../components/Helpers/SectionStyleThreeHmFour";
import ViewMoreTitle from "../components/Helpers/ViewMoreTitle";
import Banner from "../components/HomeFive/Banner";
import CategoriesSection from "../components/HomeTwo/CategoriesSection";
import LayoutHomeTwo from "../components/Partials/LayoutHomeTwo";
import datas from "../data/products.json";
import Star from "../components/Helpers/icons/Star";
import CustomerFeedback from "../components/CustomerFeedback";
import useFetchData from "../hooks/fetchData";
import SectionStyleOne from "../components/Helpers/SectionStyleOne";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Ads from "../components/Home/Ads";
import { useTranslation } from "react-i18next";
import CampaignCountDown from "../components/HomeTwo/CampaignCountDown";
import Cart from "../components/Cart";
import { useSelector } from "react-redux";
import BrandSection from "../components/Home/BrandSection";
import { useEffect } from "react";
import BannersRow from "../components/HomeFive/BannersRow";
import PreparationKitBar from "../components/HomeFive/PreparationKit";

const HomePage = () => {
  const { products } = datas;
  const url = "homepage";
  const { data, loading } = useFetchData(url);
  const getSettings = async () => {
    try {
      const url = `https://pharmaglows.com/adminv2/api/settings`;
      const response = await fetch(url);
      const item = await response.json();
      item["settings"].forEach((element) => {
        switch (element.name) {
          case "logo":
            localStorage.setItem("alanaqa_logo", element.value);
            break;
          default:
            break;
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  useEffect(() => {
    getSettings();
  }, []);
  const { data: productByCategories, loading: loadingProducts } = useFetchData(
    "products_by_categories"
  );
  const cart = useSelector((state) => state.cart.value);
  const { t } = useTranslation();
  // console.log(data?.banners?.[2], '');
  const lang = localStorage.getItem("i18nextLng");

  return (
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
        <div>
          {/* <Ads /> */}
          <Banner className="xl:mb-[60px] mb-[10px]" sliders={data.sliders} />
          <ViewMoreTitle
            className="my-categories mb-[10px]"
            seeMoreUrl="/all-categories"
            categoryTitle={t("Categories")}
          >
            <CategoriesSection
              categories={data.categories
                ?.filter((category) => category.parent_id === 0)
                .slice(0, 12)}
            />
          </ViewMoreTitle>

          <ViewMoreTitle
            className="my-categories mb-[10px]"
            seeMoreUrl="/all-brands"
            categoryTitle={t("Brands")}
          >
            <BrandSection
              className="brand-section-wrapper mb-[10px]"
              brands={data.brands
                ?.filter((item) => item?.have_product === true)
                .slice(0, 6)}
            />
          </ViewMoreTitle>

          <SectionStyleOne
            // categoryBackground={`${
            //   import.meta.env.VITE_PUBLIC_URL
            // }/assets/images/section-category-2.jpg`}
            products={data.best_sellers_products?.slice(0, 4)}
            brands={data.categories}
            categoryTitle="Electronics"
            sectionTitle={`${t("Most popular sales")}`}
            seeMoreUrl="/best-seller-products"
            className="category-products mb-[10px]"
          />
          {/* <SectionStyleThreeHmFour
            sectionTitle={`${t("New Arrivals")}`}
            seeMoreUrl="/latest-products"
            products={data.latest_products?.slice(4, 8)}
            className="mb-[60px]"
            /> */}
          {/* <div
            className="lg:block hidden container-x mx-auto h-full pt-[180px] pb-[180px] section-bg2 section-padding30 section-over1 ml-15 mr-15 mb-[100px] "
            style={{
              backgroundImage: `url(${data?.banners?.[0]?.image ?? ""})`,
              backgroundSize: "cover",
              }}
              >
              
              </div>
              <div
              className="lg:hidden block mx-auto h-full md:pt-[160px] md:pb-[160px] md:h-[320px] md:w-[680px] pt-[80px] pb-[80px] h-[160px] w-[340px] section-bg2 section-padding30 section-over1 ml-15 mr-15"
              style={{
                backgroundImage: `url(${data?.banners?.[0]?.image_mobile ?? ""})`,
                backgroundSize: "cover",
                }}
                >
                </div> */}
          <SectionStyleThreeHmFour
            sectionTitle={`${t("Our Products")}`}
            seeMoreUrl="/all-categories"
            products={data.latest_products?.slice(0, 8)}
            className="mb-[60px]"
          />
          <BannersRow banners={data.banners} />
          {/* <div
            className="xl:block hidden container-x mx-auto h-full pt-[170px] pb-[150px] section-bg2 section-padding30 section-over1 ml-15 mr-15 mb-[100px] "
            style={{
              backgroundImage: `url(${data?.banners?.[1]?.image ?? ""})`,
              backgroundSize: "cover",
            }}
            data-aos="fade-right"
          >
            <div className="row justify-content-center">
              <div className="col-xl-7 col-lg-9">
                <div className="text-center flex flex-col justify-center items-center">
                  <h1
                    className="h1 mb-5 flex flex-col"
                     
                    style={{ fontSize: "2.5rem" }}
                  >
                  </h1>
                </div>
              </div>
            </div>
          </div> */}
          {/* <div
            className="lg:hidden block mx-auto h-full md:pt-[160px] md:pb-[160px] md:h-[320px] md:w-[680px] pt-[80px] pb-[80px] h-[160px] w-[340px] section-bg2 section-padding30 section-over1 ml-15 mr-15"
            style={{
              backgroundImage: `url(${data?.banners?.[1]?.image_mobile ?? ""})`,
              backgroundSize: "cover",
            }}
          ></div> */}
          {productByCategories?.categories?.map((category, index) => (
            <>
              {category?.products?.length > 3 && (
                <SectionStyleThreeHmFour
                  key={index}
                  sectionTitle={
                    lang === "ar"
                      ? category.name_ar
                      : lang === "en"
                      ? category.name_en
                      : category.name_he
                  }
                  seeMoreUrl={`/sub-categories/${category.id}/${
                    lang === "ar"
                      ? category.name_ar
                      : lang === "en"
                      ? category.name_en
                      : category.name_he
                  }`}
                  products={category.products?.slice(0, 4)}
                  className="mb-[60px]"
                />
              )}
            </>
          ))}
          {/* <ToastContainer /> */}
        </div>
      )}
    </LayoutHomeTwo>
  );
};

export default HomePage;
