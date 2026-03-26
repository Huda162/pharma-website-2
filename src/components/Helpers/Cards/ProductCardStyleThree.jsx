import React, { useEffect } from "react";
import QuickViewIco from "../icons/QuickViewIco";
import ThinLove from "../icons/ThinLove";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../../redux/cartSlice";
import { addFavorite, removeFavorite } from "../../../redux/favoriteSlice";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import Ads from "../../Home/Ads";
import ModalImage from "../../HomeThree/Ads";
import { useTranslation } from "react-i18next";
import Compair from "../icons/Compair";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Dialog,
} from "@material-ui/core";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import logo from "../../../../public/assets/images/logo.png";
import ThinBag from "../icons/ThinBag";
import "../../../index.css";
import {
  notifyRemoveFavoriteAr,
  notifyRemoveFavoriteEn,
  notifyRemoveFavoriteHe,
} from "../Toasts/NotifyDelete";
import {
  notifyAddCartAr,
  notifyAddCartEn,
  notifyAddCartHe,
  notifyAddFavoriteAr,
  notifyAddFavoriteEn,
  notifyAddFavoriteHe,
} from "../Toasts/NotifyAdd";
import { CartDrawer } from "../CartDrawer";
import { useCartDrawer } from "../../../context/CartDrawerContext";
import out_of_stock from "../../../../public/assets/images/out-of-stock.png";
import cart_add from "../../../../public/assets/images/cart-add.png";
import { dir } from "i18next";
import { ShoppingCart } from "lucide-react";

function ProductCardStyleThree({ datas, currentPage }) {
  const dispatch = useDispatch();
  const [isOpenDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t, i18n } = useTranslation();
  const { openCartDrawer, closeCartDrawer } = useCartDrawer();
  const images = datas?.images?.filter((item) => item.type === "image") ?? [];
  const settings = {
    dots: true,
    infinite: true,
    initialSlide: i18n.language === "en" ? 0 : images.length - 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    rtl: i18n.language !== "en",
  };

  const handleAddcart = (pro, quantity) => {
    setLoading(true);
    console.log(selectedColor, datas.product_colors?.length);
    const updatedProduct = {
      ...pro,
      price_nis_retail: selectedPrice,
    };
    if (selectedPrice) {
      if (
        (datas.product_colors?.length > 0 && selectedColor !== "") ||
        (datas.product_sizes?.length > 0 && selectedSize !== "")
      ) {
        dispatch(
          addItem({
            newItem: {
              ...updatedProduct,
              selectedColor,
              quantity,
              selectedSize,
            },
          })
        );
      } else {
        dispatch(addItem({ newItem: { ...updatedProduct, quantity } }));
      }
    } else {
      if (
        (datas.product_colors?.length > 0 && selectedColor !== "") ||
        (datas.product_sizes?.length > 0 && selectedSize !== "")
      ) {
        dispatch(
          addItem({
            newItem: { ...pro, selectedColor, quantity, selectedSize },
          })
        );
      } else {
        dispatch(addItem({ newItem: { ...pro, quantity } }));
      }
    }
    // {
    //   lang === "ar"
    //     ? notifyAddCartAr()
    //     : lang === "en"
    //     ? notifyAddCartEn()
    //     : notifyAddCartHe();
    // }
    openCartDrawer();
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    if (datas.is_offer === "true") {
      setSelectedPrice(
        datas.price_nis_retail -
          (datas.price_nis_retail * datas.discount_percentage) / 100
      );
    }
  }, []);

  const handleAddFavorite = (item) => {
    const isFavorite = favorite.some(
      (favoriteItem) => favoriteItem.id === item.id
    );

    if (isFavorite) {
      const itemIndex = favorite.findIndex(
        (favoriteItem) => favoriteItem.id === item.id
      );
      dispatch(removeFavorite(itemIndex));
      {
        lang === "ar"
          ? notifyRemoveFavoriteAr()
          : lang === "en"
          ? notifyRemoveFavoriteEn()
          : notifyRemoveFavoriteHe();
      }
    } else {
      dispatch(addFavorite({ newItem: item }));
      {
        lang === "ar"
          ? notifyAddFavoriteAr()
          : lang === "en"
          ? notifyAddFavoriteEn()
          : notifyAddFavoriteHe();
      }
    }
  };
  const isButtonDisabled = () => {
    if (datas.product_sizes?.length > 0 && selectedSize === "") return true;
    if (datas.product_colors?.length > 0 && selectedColor === "") return true;

    return false;
  };
  const [displayedImage, setDisplayedImage] = useState(
    datas.images?.[0]?.url || logo
  );
  const favorite = useSelector((state) => state.favorit.items);
  const isFavorite = favorite.some((item) => item.id === datas?.id);
  const cart = useSelector((state) => state.cart.value);
  // console.log(favorite, "favorite");
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [qty, setQTY] = useState(1);
  const lang = localStorage.getItem("i18nextLng");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedSizeId, setSelectedSizeId] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [variantStock, setColorStock] = useState(
    datas?.product_variants?.length > 0
      ? datas?.product_variants?.reduce((total, e) => {
          return total + e.stock;
        }, 0)
      : 0
  );
  const location = useLocation();
  const pathParts = location.pathname.split("/").filter((part) => part !== "");
  const from =
    pathParts[0] === "sub-categories"
      ? "category"
      : pathParts[1] === "brand"
      ? "brand"
      : "products";
  const curLocation =
    pathParts[0] === "sub-categories"
      ? pathParts[2]
      : pathParts[1] === "brand"
      ? pathParts[3]
      : "";
  const curLocationId =
    pathParts[0] === "sub-categories"
      ? pathParts[1]
      : pathParts[1] === "brand"
      ? pathParts[2]
      : "";

  return (
    <>
      <div
        className="product-card w-full bg-white shadow-md rounded-lg overflow-hidden flex flex-col h-full 
    transition-all duration-300 ease-in-out transform hover:scale-[1.03] hover:shadow-xl items-center justify-between"
      >
        <div className="w-full h-[220px] xl:h-[280px] md:h-[230px] xl:bg-white mb relative overflow-hidden rounded-lg">
          {datas.available === false && (
            <div
              className="w-full h-[15%] absolute text-center pt-1 text-bold"
              style={{
                backgroundColor: "#b5ac8fab",
              }}
            >
              {t("out of stock")}
            </div>
          )}
          {/* {datas.product_stock === 0 && variantStock === 0 && (
            <div className="absolute inset-0 bg-white bg-opacity-80 z-10 flex items-center justify-center">
              <div className=" text-black py-2 px-4 rounded-lg font-bold text-lg flex flex-col items-center justify-center gap-2">
                {t("Out of stock")}
                <img src={out_of_stock} width={50} />
              </div>
            </div>
          )} */}
          {datas.is_offer === "true" && (
            <div className="w-[2.5rem] h-[2.5rem] absolute text-white text-center pt-2 font-bold rounded-md  bg-red-500 top-5 left-5">
              {datas.discount_percentage}%
            </div>
          )}
          {datas.product_colors?.length > 0 && (
            <div className="h-full h-[15%] absolute text-center p-3 font-bold flex flex-col aling-end justify-end z-20">
              {datas.product_colors.slice(0, 4).map((color, index) => (
                <div
                  onClick={() => {
                    setDisplayedImage(color?.color_image);
                  }}
                  key={index}
                  className="cursor-pointer xl:h-[35px] xl:w-[35px] md:h-[25px] md:w-[25px] border border-solid border-slate-300 flex rounded-full justify-center align-center mb-1 z-10"
                >
                  <img
                    src={color?.color_image}
                    onError={(e) => {
                      e.target.onError = null;
                      e.target.src = logo;
                    }}
                    alt={`Product color ${index + 1}`}
                    className="xl:h-[33px] xl:w-[33px] md:h-[23px] md:w-[23x] h-[35px] w-[35px] rounded-full"
                  />
                </div>
              ))}
            </div>
          )}
          <Link
            to={`/single-product/${datas.id}`}
            state={{
              fromPage: currentPage,
              from: from,
              curLocation: curLocation,
              curLocationId: curLocationId,
            }}
          >
            <div className="rounded-lg text-center">
              {images.length > 1 ? (
                <Slider
                  {...settings}
                  className="xl:max-w-[270px] md:max-w-[200px] m-auto"
                >
                  {images.map((image, index) => (
                    <div key={index}>
                      <img
                        src={image.url}
                        alt={`Product image ${index + 1}`}
                        className="w-[200px] h-[200px] xl:w-[267px] xl:h-[267px] rounded-md object-cover m-auto p-1"
                      />
                    </div>
                  ))}
                </Slider>
              ) : (
                <img
                  src={displayedImage}
                  onError={(e) => {
                    e.target.onError = null;
                    e.target.src = logo;
                  }}
                  alt=""
                  className="xl:min-h-[267px] rounded-md xl:min-w-[267px] md:min-w-[200px] md:min-h-[200px] w-[200px] h-[200px] m-auto object-cover p-1"
                />
              )}
            </div>
          </Link>

          {/* <div className="quick-access-btns flex flex-col xl:space-y-2 absolute group-hover:right-4 -right-10 top-20  transition-all duration-300 ease-in-out">
          </div> */}
          {/* <div
            onClick={() => handleAddcart(datas, 1)}
            className="add-cart-btn absolute w-full h-10 px-[15px] left-0 -bottom-10 group-hover:bottom-3 transition-all duration-300 ease-in-out sm:none"
          ></div> */}
        </div>
        <Link
          to={`/single-product/${datas.id}`}
          state={{
            fromPage: currentPage,
            from: from,
            category: from === "category" && pathParts[1],
          }}
        >
          <h2 className="xl:text-xl text-center md:text-lg leading-6 font-medium text-main1-color mb-2 mt-[5px] mr-2 hover:text-main-color cursor-pointer flex items-center justify-center font-semibold">
            {lang === "ar" && (
              <>
                {datas.name_ar?.length >= 28
                  ? `${datas.name_ar.substring(0, 28)}...`
                  : datas.name_ar}
              </>
            )}
            {lang === "en" && (
              <>
                {datas.name_en?.length >= 28
                  ? `${datas.name_en.substring(0, 28)}...`
                  : datas.name_en}
              </>
            )}
            {lang === "he" && (
              <>
                {datas.name_he?.length >= 28
                  ? `${datas.name_he.substring(0, 28)}...`
                  : datas.name_he}
              </>
            )}
          </h2>
        </Link>
        <div className="flex justify-center xl:mt-[30px] mt-[10px] mb-1 mx-1 self-end w-full">
          <p className="mx-1 flex items-center justify-center w-[50%] flex-wrap">
            {datas.is_offer === "true" ? (
              <>
                <span className="offer-price text-qred font-600 xl:text-[20px] md:text-[18px] ml-1 ">
                  ₪
                  {datas.price_nis_retail -
                    (datas.price_nis_retail *
                      Number(datas.discount_percentage)) /
                      100}
                </span>
                <span className="main-price text-qgray line-through font-600 xl:text-[18px] md:text-[16px]">
                  ₪{datas.price_nis_retail}
                </span>
              </>
            ) : (
              <span className="offer-price text-grad-a font-600 xl:text-[20px] md:text-[18px] ml-2 ">
                ₪{datas.price_nis_retail}
              </span>
            )}
          </p>
          {/* datas.product_stock === 0 && variantStock === 0 ? "w-[40%]":"w-[20%] */}
          <div
            className={`flex xl:min-w-[40%] md:min-w-[55%]  w-[20%]
             rounded-lg `}
          >
            {loading ? (
              <div
                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
              >
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                  Loading...
                </span>
              </div>
            ) : (
              // datas.product_stock === 0 && variantStock === 0
              //   ? "border border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed"
              //   : "bg-gradient-to-tl from-main-color to-main-color/70 text-white"

              <button
                type="button"
                className={`rounded-lg px-1 md:px-0 w-[100%] flex justify-center items-center ml-1 transition-all duration-200 bg-gradient-to-tl from-main-color to-main-color/70 text-white
                `}
                // disabled={datas.product_stock === 0 && variantStock === 0}
                onClick={() => {
                  if (
                    datas.product_sizes?.length > 0 ||
                    datas.product_colors?.length > 0
                  ) {
                    setOpenDialog(true);
                  } else {
                    handleAddcart(datas, qty);
                    {
                      lang === "ar"
                        ? notifyAddCartAr()
                        : lang === "en"
                        ? notifyAddCartEn()
                        : notifyAddCartHe();
                    }
                  }
                }}
              >
                <div className="flex items-center space-x-2">
                  {/* {datas.product_stock === 0 && variantStock === 0 && (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  )} */}
                  <span className="xl:text-[14px] text-[12px]">
                    {/* {datas.product_stock === 0 && variantStock === 0 ? (
                      t("Out of stock")
                    ) : (
                      <div className="flex items-center justify-center gap-1">
                        <ShoppingCart size={18} />
                        <p className="hidden md:block">{t("Add to cart")}</p>
                      </div>
                      )} */}
                    <div className="flex items-center justify-center gap-1">
                      <ShoppingCart size={18} />
                      <p className="hidden md:block">{t("Add to cart")}</p>
                    </div>
                  </span>
                </div>
              </button>
            )}
          </div>
          <div className="flex border xl:px-3 mx-1 md:px-1 w-[20%] rounded-lg justify-center align-center">
            <div onClick={() => handleAddFavorite(datas)}>
              <span className="quick-view-ico w-5 h-10 flex justify-center items-center rounded cursor-pointer">
                {/* <ThinLove /> */}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill={isFavorite ? "#ef262c" : "none"}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17 1C14.9 1 13.1 2.1 12 3.7C10.9 2.1 9.1 1 7 1C3.7 1 1 3.7 1 7C1 13 12 22 12 22C12 22 23 13 23 7C23 3.7 20.3 1 17 1Z"
                    stroke={isFavorite ? "#ef262c" : "#3e3e3e"}
                    strokeWidth="2"
                    strokeMiterlimit="10"
                    strokeLinecap="square"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
      <Dialog
        open={isOpenDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="dialogStyle"
      >
        <DialogTitle
          id="customized-dialog-title"
          color="black"
          className="w-[100%]  text-xl text-center"
        >
          <div className="flex justify-between items-center">
            <span className="dialogStyle font-bold text-2xl">
              {t("select size and color")}
            </span>
            <span>
              <Link
                to={`/single-product/${datas.id}`}
                state={{
                  fromPage: currentPage,
                  from: from,
                  category: from === "category" && pathParts[1],
                }}
                className="dialogStyle underline-offset-2  hover:underline-offset-8 transition-all duration-300 underline text-sm text-qgray"
              >
                {t("show product")}...
              </Link>
            </span>
          </div>
        </DialogTitle>
        <DialogContent>
          {datas?.product_sizes?.length > 0 && (
            <div>
              <div className="mt-[1rem]">{t("sizes")}:</div>

              <div
                style={{
                  maxHeight: "200px",
                  overflowY: "auto",
                  paddingRight: "8px",
                }}
                className="text-qgray md:text-[18px] text-xs font-normal uppercase tracking-wider mb-2"
              >
                <div className="xl:grid grid xl:grid-cols-7 md:grid-cols-10 lg:grid-cols-7 grid-cols-5 gap-3 mb-[46px]">
                  {datas?.product_sizes?.map((item, index) => {
                    const allSizeStock = datas?.product_variants?.reduce(
                      (total, e) => {
                        return e.product_size_id === item.id
                          ? total + e.stock
                          : total;
                      },
                      0
                    );
                    const sizeStockWithColor =
                      selectedColor &&
                      selectedColor !== undefined &&
                      selectedColor !== ""
                        ? datas?.product_variants?.reduce((total, e) => {
                            return e.product_size_id === item.id &&
                              e.product_color_id === selectedColor
                              ? total + e.stock
                              : total;
                          }, 0)
                        : 0;

                    const sizeStock =
                      selectedColor &&
                      selectedColor !== undefined &&
                      selectedColor !== ""
                        ? sizeStockWithColor
                        : allSizeStock;
                    const isOutOfStock = sizeStock === 0;
                    const isSelected = selectedSize === item.size;
                    const isLowStock = sizeStock > 0 && sizeStock < 10;
                    return (
                      <div
                        key={index}
                        className={`${
                          isSelected && "text-black"
                        } flex flex-col justify-center items-center text-sm group relative`}
                      >
                        {/* isOutOfStock ? "opacity-80" : "" */}
                        <span
                          className={`rounded-md flex justify-center items-center m-1 relative  py-1 px-2 
                          `}
                          style={
                            isSelected
                              ? {
                                  border: "1px solid #b58640",
                                  cursor: "pointer",
                                }
                              : {
                                  border: "1px solid #efefef",
                                  cursor: "pointer",
                                }
                          }
                          onClick={() => {
                            // if (!isOutOfStock) {
                            const currentScroll = window.scrollY;
                            setSelectedSize(item.size);
                            setSelectedSizeId(item.id);
                            if (datas?.is_offer === "true") {
                              setSelectedPrice(
                                item.size_price_nis -
                                  (item.size_price_nis *
                                    datas?.discount_percentage) /
                                    100
                              );
                              setActualPrice(item.size_price_nis);
                            } else {
                              setSelectedPrice(item.size_price_nis);
                            }
                            requestAnimationFrame(() => {
                              window.scrollTo(0, currentScroll);
                            });
                            // }
                          }}
                        >
                          {/* {isOutOfStock && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-full h-full rounded-md bg-red-300 bg-opacity-10"></div>
                              <div className="absolute text-red-600 font-bold text-2xl"></div>
                            </div>
                          )} */}

                          {item.size}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
          {datas?.product_colors?.length > 0 && (
            <div>
              <div className="mt-[1rem]">{t("colors")}:</div>
              <div
                style={{
                  maxHeight: "200px",
                  overflowY: "auto",
                  paddingRight: "8px",
                }}
                className="text-qgray md:text-[18px] text-xs font-normal uppercase tracking-wider mb-2"
              >
                <div className="xl:grid grid xl:grid-cols-7 md:grid-cols-10 lg:grid-cols-7 grid-cols-5 gap-3 mb-[46px]">
                  {datas?.product_colors?.map((item, index) => {
                    const allColorStock = datas?.product_variants?.reduce(
                      (total, e) => {
                        return e.product_color_id === item.id
                          ? total + e.stock
                          : total;
                      },
                      0
                    );
                    const colorStockWithSize =
                      selectedSizeId &&
                      selectedSizeId !== undefined &&
                      selectedSize !== ""
                        ? datas?.product_variants?.reduce((total, e) => {
                            return e.product_color_id === item.id &&
                              e.product_size_id === selectedSizeId
                              ? total + e.stock
                              : total;
                          }, 0)
                        : 0;
                    const colorStock =
                      selectedSizeId &&
                      selectedSizeId !== undefined &&
                      selectedSize !== ""
                        ? colorStockWithSize
                        : allColorStock;
                    const isOutOfStock = colorStock === 0;
                    const isSelected = selectedColor === item.id;
                    const isLowStock = colorStock > 0 && colorStock < 10;

                    return (
                      <div
                        key={index}
                        className={`${
                          isSelected && "text-black"
                        } flex flex-col justify-center items-center text-sm group relative`}
                      >
                        {/* isOutOfStock ? "opacity-80" : "" */}
                        <span
                          className={`rounded-md flex justify-center items-center h-[4rem] w-[4rem] m-1 relative
                          `}
                          style={
                            isSelected
                              ? {
                                  border: "1px solid #b58640",
                                  cursor: "pointer",
                                }
                              : {
                                  border: "1px solid #efefef",
                                  cursor: "pointer",
                                }
                          }
                          onClick={(e) => {
                            e.preventDefault();
                            // if (!isOutOfStock) {
                            const currentScroll = window.scrollY;
                            setSelectedColor(item.id);
                            changeImgHandler(item.color_image);
                            requestAnimationFrame(() => {
                              window.scrollTo(0, currentScroll);
                            });
                            // }
                          }}
                        >
                          {/* isOutOfStock ? "grayscale-[70%]" : "" */}
                          <img
                            src={item.color_image}
                            className={`h-[3.25rem] w-[3.25rem] rounded-md object-cover
                            `}
                            alt="Color variant"
                            onError={(e) => {
                              e.target.onError = null;
                              e.target.src = logo;
                            }}
                          />

                          {/* {isOutOfStock && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-full h-full rounded-md bg-red-300 bg-opacity-10"></div>
                              <div className="absolute text-red-600 font-bold text-2xl"></div>
                            </div>
                          )} */}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
        <DialogActions className="flex justify-content-center">
          {loading ? (
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
          ) : (
            <Button
              onClick={() => {
                handleAddcart(datas, 1);
                setOpenDialog(false);
                notifyAdd();
              }}
              disabled={isButtonDisabled()}
              className="dialogStyle"
              style={{
                backgroundColor: "#1d1d1d",
                borderColor: "#1d1d1d",
                color: "white",
              }}
            >
              <span className="dialogStyle">{t("Add to cart")}</span>
            </Button>
          )}
          <Button
            onClick={() => {
              setOpenDialog(false);
            }}
            style={{ margin: "0.5rem" }}
          >
            <span className="dialogStyle">{t("cancel")}</span>
          </Button>
        </DialogActions>
      </Dialog>
      {open && <Ads close={() => setOpen(false)} />}
      {openModal && (
        <ModalImage
          image={`${datas?.images?.[0]?.url ?? ""}`}
          handler={() => setOpenModal(false)}
        />
      )}
      {/* <ToastContainer /> */}
    </>
  );
}

export default ProductCardStyleThree;
