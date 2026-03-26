import { useRef, useState } from "react";
import DataIteration from "../Helpers/DataIteration";
import ProductView from "./ProductView";
import LayoutHomeTwo from "../Partials/LayoutHomeTwo";
import { useLocation, useParams } from "react-router-dom";
import useFetchData from "../../hooks/fetchData";
import { addFavorite } from "../../redux/favoriteSlice";
import { useDispatch, useSelector } from "react-redux";
import ProductCardStyleThree from "../Helpers/Cards/ProductCardStyleThree";
import { useTranslation } from "react-i18next";
import {
  notifyAddFavoriteAr,
  notifyAddFavoriteEn,
  notifyAddFavoriteHe,
} from "../Helpers/Toasts/NotifyAdd";

export default function SingleProductPage() {
  const dispatch = useDispatch();
  const lang = localStorage.getItem("i18nextLng");

  const handleAddFavorite = (item) => {
    dispatch(addFavorite({ newItem: item }));
    {
      lang === "ar"
        ? notifyAddFavoriteAr()
        : lang === "en"
        ? notifyAddFavoriteEn()
        : notifyAddFavoriteHe();
    }
  };
  const handleDecrementItem = (index) => {
    dispatch(decrementItem(index));
  };
  
  const [tab, setTab] = useState("des");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [reviewLoading, setLoading] = useState(false);
  const reviewElement = useRef(null);
  const [report, setReport] = useState(false);
  const reviewAction = () => {
    setLoading(true);
    setTimeout(() => {
      if ((name, message, rating)) {
        setComments((prev) => [
          {
            id: Math.random(),
            author: name,
            comments: message,
            review: rating,
          },
          ...prev,
        ]);
        setLoading(false);
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
        setRating(0);
        setHover(0);
        // window.scrollTo({
        //   top: -reviewElement.current.getBoundingClientRect().top,
        //   left: 0,
        //   behavior: "smooth",
        // });
      }
      setLoading(false);
      return false;
    }, 2000);
  };
  const { t } = useTranslation();

  const param = useParams();

  const { data, loading } = useFetchData(`products/${param.id}`);
  const cart = useSelector((state) => state.cart.value);

  const { state } = useLocation()
  console.log(state)

  return (
    <>
      <LayoutHomeTwo childrenClasses="pt-0 pb-0">
        {loading ? (
          <div style={{ height: "100vh" }}>
            <div className="flex space-x-2 justify-center items-center bg-white h-screen">
              <span className="sr-only">Loading...</span>
              <div className="h-8 w-8 bg-main-color  rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="h-8 w-8 bg-main-color  rounded-full animate-bounce [animation-delay:-0.1s]"></div>
              <div className="h-8 w-8 bg-main-color  rounded-full animate-bounce"></div>
            </div>{" "}
          </div>
        ) : (
          <div
            className={`single-product-wrapper w-full `}
          >
            <div className="product-view-main-wrapper bg-white pt-[10px] xl:pt-[20px] w-full">
              <div className="w-full bg-white pb-[1px]">
                <div className="container-x mx-auto">
                  <ProductView
                    data={data}
                    onAddFavorite={() => handleAddFavorite(data?.product)}
                    onDecrement={() => handleDecrementItem(data?.product?.id)}
                    from = {state?.from}
                    curLocation = {state?.curLocation}
                    curLocationId = {state?.curLocationId}
                  />
                  <div className="container-x mx-auto mb-[10px] mt-[50px]">
                    <div
                       
                      style={{
                        backgroundImage: `url(/assets/images/service-bg.png)`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                      }}
                      className="best-services w-full flex flex-col space-y-10 lg:space-y-0 lg:flex-row lg:justify-between lg:items-center lg:h-[130px] px-10 lg:py-0 py-10"
                    >
                      <div className="item">
                        <div className="flex space-x-5 items-center">
                          <div className="ml-[10px]">
                            <span>
                              <svg
                                width="36"
                                height="36"
                                viewBox="0 0 36 36"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M1 1H5.63636V24.1818H35"
                                  stroke="#95D7DE"
                                  strokeWidth="2"
                                  strokeMiterlimit="10"
                                  strokeLinecap="square"
                                />
                                <path
                                  d="M8.72763 35.0002C10.4347 35.0002 11.8185 33.6163 11.8185 31.9093C11.8185 30.2022 10.4347 28.8184 8.72763 28.8184C7.02057 28.8184 5.63672 30.2022 5.63672 31.9093C5.63672 33.6163 7.02057 35.0002 8.72763 35.0002Z"
                                  stroke="#95D7DE"
                                  strokeWidth="2"
                                  strokeMiterlimit="10"
                                  strokeLinecap="square"
                                />
                                <path
                                  d="M31.9073 35.0002C33.6144 35.0002 34.9982 33.6163 34.9982 31.9093C34.9982 30.2022 33.6144 28.8184 31.9073 28.8184C30.2003 28.8184 28.8164 30.2022 28.8164 31.9093C28.8164 33.6163 30.2003 35.0002 31.9073 35.0002Z"
                                  stroke="#95D7DE"
                                  strokeWidth="2"
                                  strokeMiterlimit="10"
                                  strokeLinecap="square"
                                />
                                <path
                                  d="M34.9982 1H11.8164V18H34.9982V1Z"
                                  stroke="#95D7DE"
                                  strokeWidth="2"
                                  strokeMiterlimit="10"
                                  strokeLinecap="square"
                                />
                                <path
                                  d="M11.8164 7.18164H34.9982"
                                  stroke="#95D7DE"
                                  strokeWidth="2"
                                  strokeMiterlimit="10"
                                  strokeLinecap="square"
                                />
                              </svg>
                            </span>
                          </div>
                          <div>
                            <p className="text-white text-[15px] font-700 tracking-wide mb-1">
                              {t("Payment methods")}
                            </p>
                            <p className="text-sm text-qgray text-white">
                              {t("Cash on delivery")}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="item">
                        <div className="flex space-x-5 items-center">
                          <div className="ml-[20px]">
                            <span>
                              <svg
                                width="32"
                                height="34"
                                viewBox="0 0 32 34"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M31 17.4502C31 25.7002 24.25 32.4502 16 32.4502C7.75 32.4502 1 25.7002 1 17.4502C1 9.2002 7.75 2.4502 16 2.4502C21.85 2.4502 26.95 5.7502 29.35 10.7002"
                                  stroke="#95D7DE"
                                  strokeWidth="2"
                                  strokeMiterlimit="10"
                                />
                                <path
                                  d="M30.7 2L29.5 10.85L20.5 9.65"
                                  stroke="#95D7DE"
                                  strokeWidth="2"
                                  strokeMiterlimit="10"
                                  strokeLinecap="square"
                                />
                              </svg>
                            </span>
                          </div>
                          <div>
                            <p className="text-white text-[15px] font-700 tracking-wide mb-1">
                              {t("Delivery price")}
                            </p>
                            <p className="text-sm text-qgray text-white">
                              <li> {t("West Bank: 20 shekels")} </li>
                              <li> {t("Jerusalem: 30 shekels")} </li>
                              <li> {t("Internal areas: 70 shekels")} </li>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="item">
                        <div className="flex space-x-5 items-center">
                          <div className="ml-[10px]">
                            <span>
                              <svg
                                width="32"
                                height="38"
                                viewBox="0 0 32 38"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M22.6654 18.667H9.33203V27.0003H22.6654V18.667Z"
                                  stroke="#95D7DE"
                                  strokeWidth="2"
                                  strokeMiterlimit="10"
                                  strokeLinecap="square"
                                />
                                <path
                                  d="M12.668 18.6663V13.6663C12.668 11.833 14.168 10.333 16.0013 10.333C17.8346 10.333 19.3346 11.833 19.3346 13.6663V18.6663"
                                  stroke="#95D7DE"
                                  strokeWidth="2"
                                  strokeMiterlimit="10"
                                  strokeLinecap="square"
                                />
                                <path
                                  d="M31 22C31 30.3333 24.3333 37 16 37C7.66667 37 1 30.3333 1 22V5.33333L16 2L31 5.33333V22Z"
                                  stroke="#95D7DE"
                                  strokeWidth="2"
                                  strokeMiterlimit="10"
                                  strokeLinecap="square"
                                />
                              </svg>
                            </span>
                          </div>
                          <div>
                            <p className="text-white text-[15px] font-700 tracking-wide mb-1">
                              {t("Delivery duration")}{" "}
                            </p>
                            <p className="text-sm text-qgray text-white">
                              {t("2-5 days")}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="related-product w-full bg-white">
              <div className="container-x mx-auto">
                <div className="w-full py-[60px]">
                  <h1 className="sm:text-3xl text-xl font-600 text-qblacktext leading-none mb-[30px]">
                    {t("Related Products")}
                  </h1>
                  <div
                     
                    className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-2 xl:gap-[30px] gap-5"
                  >
                    <DataIteration
                      datas={data.related_product}
                      // startLength={5}
                      startLength={0}
                      endLength={4}
                      // endLength={9}
                    >
                      {({ datas }) => (
                        <div key={datas.id} className="item">
                          <ProductCardStyleThree datas={datas} />
                        </div>
                      )}
                    </DataIteration>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* <ToastContainer /> */}
      </LayoutHomeTwo>
    </>
  );
}
