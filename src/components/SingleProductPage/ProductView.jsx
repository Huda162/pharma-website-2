import { useCallback, useEffect, useRef, useState } from "react";
import useFetchData from "../../hooks/fetchData";
import { addItem } from "../../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import BreadcrumbCom from "../BreadcrumbCom";
import card1 from "../../../public/assets/images/card-1.svg";
import card2 from "../../../public/assets/images/card-2.svg";
import card3 from "../../../public/assets/images/card-3.svg";
import card4 from "../../../public/assets/images/card-4.svg";
import whatsapp from "../../../public/assets/images/whatsapp.png";
import ReactPlayer from "react-player";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";
import InnerImageZoom from "react-inner-image-zoom";
import logo from "../../../public/assets/images/logo.png";
import {
  notifyAddCartAr,
  notifyAddCartEn,
  notifyAddCartHe,
  notifyAddFavoriteAr,
  notifyAddFavoriteEn,
  notifyAddFavoriteHe,
} from "../Helpers/Toasts/NotifyAdd";
import { useCartDrawer } from "../../context/CartDrawerContext";
import { addFavorite, removeFavorite } from "../../redux/favoriteSlice";
import {
  notifyRemoveFavoriteAr,
  notifyRemoveFavoriteEn,
  notifyRemoveFavoriteHe,
} from "../Helpers/Toasts/NotifyDelete";
import Slider from "react-slick";

export default function ProductView({
  className,
  data,
  from,
  curLocation,
  curLocationId,
}) {
  const dispatch = useDispatch();
  const favorite = useSelector((state) => state.favorit.items);
  const [src, setSrc] = useState(data?.product?.images?.[0]?.url);
  const [qty, setQTY] = useState(1);
  const { t, i18n } = useTranslation();
  const [selectedPrice, setSelectedPrice] = useState("");
  const [actualPrice, setActualPrice] = useState("");
  const { data: data2 } = useFetchData("socials");
  const [variantStock, setColorStock] = useState(
    data.product?.product_variants?.length > 0
      ? data.product?.product_variants?.reduce((total, e) => {
          return total + e.stock;
        }, 0)
      : 0
  );
  const isRTL = ["ar", "he"].includes(i18n.language);

  const totalSlides =
    (data?.product?.images?.length || 0) +
    (data?.product?.product_colors?.length || 0);
  const [currentSlide, setCurrentSlide] = useState(isRTL ? totalSlides - 1 : 0);
  const allSlides = [
    ...(data?.product?.images || []),
    ...(data?.product?.product_colors || []).map((color) => ({
      url: color.color_image,
      type: "image",
    })),
  ];
  const sliderRef = useRef();
  const slides = isRTL ? [...allSlides].reverse() : allSlides;

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

  const handleDecrementItem = () => {
    if (qty > 1) {
      setQTY(qty - 1);
    }
  };

  const handleIncrementItem = () => {
    const selectedSizeId = data.product.product_sizes?.find(
      (size) => size?.size === selectedSize
    )?.id;

    const matchingVariant = data.product.product_variants.find((variant) => {
      if (selectedColor && selectedSizeId) {
        return (
          variant.product_color_id === selectedColor &&
          variant.product_size_id === selectedSizeId
        );
      } else if (selectedColor && !selectedSizeId) {
        return (
          variant.product_color_id === selectedColor &&
          variant.product_size_id === null
        );
      } else if (!selectedColor && selectedSizeId) {
        return (
          variant.product_size_id === selectedSizeId &&
          variant.product_color_id === null
        );
      } else {
        return (
          variant.product_color_id === null && variant.product_size_id === null
        );
      }
    });
    if (
      data.product.product_colors.length === 0 &&
      data.product.product_sizes.length === 0
    ) {
      const availableStock = data.product.product_stock;
      if (qty < availableStock) {
        setQTY(qty + 1);
      } else {
        console.log("Cannot exceed available stock 1");
      }
    } else if (matchingVariant) {
      const availableStock = matchingVariant.stock;

      if (qty < availableStock) {
        setQTY(qty + 1);
      } else {
        console.log("Cannot exceed available stock");
      }
    } else {
      console.log("Variant not found for selected options");
    }
  };

  const handleAddcart = (pro, quantity) => {
    const updatedProduct = {
      ...pro,
      price_nis_retail: selectedPrice,
    };
    if (selectedPrice) {
      if (
        (data.product.product_colors?.length > 0 && selectedColor !== "") ||
        (data.product.product_sizes?.length > 0 && selectedSize !== "")
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
        (data.product.product_colors?.length > 0 && selectedColor !== "") ||
        (data.product.product_sizes?.length > 0 && selectedSize !== "")
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
    {
      lang === "ar"
        ? notifyAddCartAr()
        : lang === "en"
        ? notifyAddCartEn()
        : notifyAddCartHe();
    }
    openCartDrawer();
    setQTY(1);
  };

  const changeImgHandler = useCallback(
    (current) => {
      const scrollPosition = window.scrollY;
      if (current?.preventDefault) current.preventDefault();
      requestAnimationFrame(() => {
        setSrc(current);

        // Also update the slider to match the selected image
        if (sliderRef.current) {
          const slideIndex = allSlides.findIndex(
            (slide) => slide.url === current
          );
          if (slideIndex !== -1) {
            const targetIndex = isRTL
              ? totalSlides - 1 - slideIndex
              : slideIndex;
            sliderRef.current.slickGoTo(targetIndex);
          }
        }

        requestAnimationFrame(() => {
          window.scrollTo({
            top: scrollPosition,
            behavior: "instant",
          });
        });
      });
    },
    [isRTL, totalSlides]
  );

  const isButtonDisabled = () => {
    if (data?.product?.product_sizes.length > 0 && selectedSize === "")
      return true;
    if (data?.product?.product_colors.length > 0 && selectedColor === "")
      return true;
    // if (data?.product?.product_stock === 0 && variantStock === 0) return true;

    return false;
  };

  const isFavorite = favorite.some((item) => item.id === data?.product?.id);
  const lang = localStorage.getItem("i18nextLng");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedSizeId, setSelectedSizeId] = useState("");

  const { openCartDrawer } = useCartDrawer();

  useEffect(() => {
    if (data.product?.is_offer === "true") {
      setSelectedPrice(
        data.product?.price_nis_retail -
          (data.product?.price_nis_retail * data.product?.discount_percentage) /
            100
      );
      setActualPrice(data?.product?.price_nis_retail);
    }
  }, []);

  const [showWarning, setShowWarning] = useState(false);

  const message =
    lang === "ar"
      ? "مرحبا أنا مهتم بالمنتج التالي من موقع فارما، هل يمكنك تزويدي بمزيد من التفاصيل أو مساعدتي في طلبي\n" +
        `${data?.product?.price_nis_retail} :السعر،${data?.product?.name_ar} :المنتج \n` +
        `تحقق من ذلك : https://pharmaglows.com/single-product/${data?.product?.id} \n`
      : "Hello! I am interested in the following product from Pharma Glow website, Could you please provide me with more details or assist me with my order?\n" +
        `Product name:  ${data?.product?.name_en}, price : ${data?.product?.price_nis_retail}\n` +
        `Check it out: https://pharmaglows.com/single-product/${data?.product?.id} \n`;

  const encodedMessage = encodeURIComponent(message);

  const settings = {
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    afterChange: (index) => {
      setCurrentSlide(index);
      // Update the main image src when slider changes
      const actualIndex = isRTL ? totalSlides - 1 - index : index;
      if (allSlides[actualIndex]) {
        setSrc(allSlides[actualIndex].url);
      }
    },
    rtl: isRTL,
  };

  useEffect(() => {
    if (sliderRef.current) {
      setCurrentSlide(sliderRef.current.innerSlider.state.currentSlide);
    }
  }, []);

  // Helper function to check if a thumbnail is active
  const isThumbnailActive = (imageUrl) => {
    return src === imageUrl;
  };

  return (
    <div
      className={`product-view w-full lg:flex justify-between lg:mt-[40px]  ${
        className || ""
      }`}
    >
      <div className=" md:hidden mb-6">
        <BreadcrumbCom
          paths={[
            { name: t("Home Page"), path: "/" },
            from !== "products"
              ? {
                  name:
                    lang === "en"
                      ? data?.product?.categories_data[0]?.name_en
                      : lang === "ar"
                      ? data?.product?.categories_data[0]?.name_ar
                      : data?.product?.categories_data[0]?.name_he,
                  path: `/sub-categories/${
                    data?.product?.categories_data[0]?.id
                  }/${
                    lang === "en"
                      ? data?.product?.categories_data[0]?.name_en
                      : lang === "ar"
                      ? data?.product?.categories_data[0]?.name_ar
                      : data?.product?.categories_data[0]?.name_he
                  }`,
                }
              : {
                  name: t("Our Products"),
                  path: `/products`,
                },
            {
              name:
                lang === "en"
                  ? data?.product?.name_en
                  : lang === "ar"
                  ? data?.product?.name_ar
                  : data?.product?.name_he,
              path: `/`,
            },
          ]}
        />

        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight block sm:hidden">
          {lang === "ar"
            ? data?.product?.name_ar
            : lang === "en"
            ? data?.product?.name_en
            : data?.product?.name_he}
        </h1>
      </div>
      <div data-aos="fade-right" className="lg:w-1/2 xl:mr-[10px] lg:mr-[10px]">
        <div className="w-full h-[450px] lg:h-[550px] border border-main1-color border-4 rounded rounded-3xl overflow-hidden relative mb-3 shadow shadow-lg">
          <div className=" flex justify-center absolute z-20 top-5 end-5">
            <button
              onClick={() => handleAddFavorite(data.product)}
              type="button"
              className={`w-full h-[35px] flex justify-center items-center border-2 rounded-full transition-all min-w-[35px]
              ${
                isFavorite
                  ? "border-red-200 bg-red-50"
                  : "border-gray-200 hover:border-amber-300 hover:bg-amber-50/50"
              }`}
              aria-label={
                isFavorite ? "Remove from favorites" : "Add to favorites"
              }
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill={isFavorite ? "#ef262c" : "none"}
                className="transition-colors"
              >
                <path
                  d="M17 1C14.9 1 13.1 2.1 12 3.7C10.9 2.1 9.1 1 7 1C3.7 1 1 3.7 1 7C1 13 12 22 12 22C12 22 23 13 23 7C23 3.7 20.3 1 17 1Z"
                  stroke={isFavorite ? "#ef262c" : "#D5D5D5"}
                  strokeWidth="2"
                  strokeMiterlimit="10"
                  strokeLinecap="square"
                />
              </svg>
            </button>
          </div>
          {data?.product?.is_offer === "true" && (
            <span className="bg-red-100 text-red-700 text-sm font-semibold px-3 py-1 rounded-full absolute top-5 start-5 z-20">
              -{data?.product?.discount_percentage}%
            </span>
          )}
          <div className="xl:hidden block h-full relative">
            <div className="relative">
              <Slider ref={sliderRef} {...settings} className="h-full">
                {slides.map((item, index) => (
                  <div
                    key={`slide-${index}`}
                    className="h-[450px] lg:h-[550px] flex justify-center items-center"
                  >
                    {item.type === "video" ? (
                      <div className="w-full h-full">
                        <ReactPlayer
                          url={item.url}
                          controls
                          width="100%"
                          height="100%"
                          playing={false}
                        />
                      </div>
                    ) : (
                      <img
                        src={item.url}
                        alt={`Slide ${index + 1}`}
                        className="w-full h-[450px] object-contain"
                        onError={(e) => {
                          e.target.onError = null;
                          e.target.src = logo;
                        }}
                      />
                    )}
                  </div>
                ))}
              </Slider>

              <div
                className={`absolute bottom-5 bg-black bg-opacity-50 text-white text-sm px-2 py-1 rounded ${
                  isRTL ? "left-2" : "right-2"
                }`}
              >
                {isRTL ? totalSlides - currentSlide : currentSlide + 1}/
                {totalSlides}
              </div>
            </div>
          </div>

          <div className="hidden xl:flex justify-center items-center h-full">
            {data?.product?.images?.map((item, index) => (
              <div key={`desk-img-${index}`}>
                {item.type === "video" ? (
                  src === item.url && (
                    <ReactPlayer
                      url={src}
                      controls
                      width="100%"
                      height="550px"
                    />
                  )
                ) : src === item.url ? (
                  <InnerImageZoom
                    src={src}
                    zoomSrc={src}
                    zoomType="hover"
                    zoomPreload={true}
                    onError={(e) => {
                      e.target.onError = null;
                      e.target.src = logo;
                    }}
                  />
                ) : null}
              </div>
            ))}
            {data?.product?.product_colors?.map((item, index) => (
              <div key={`desk-color-${index}`}>
                {src === item.color_image && (
                  <InnerImageZoom
                    src={src}
                    zoomSrc={src}
                    zoomType="hover"
                    zoomPreload={true}
                    onError={(e) => {
                      e.target.onError = null;
                      e.target.src = logo;
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-8 md:grid-cols-5 lg:grid-cols-6 gap-1 md:gap-3 mt-1 mb-1 md:mt-4">
          {/* Image Thumbnails */}
          {data?.product?.images?.map((img) => (
            <div
              key={`thumb-img-${img.id}`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                changeImgHandler(img.url);
              }}
              className={`
                aspect-square rounded-xl overflow-hidden border-2 cursor-pointer
                transition-all duration-200 hover:shadow-lg
                ${
                  isThumbnailActive(img.url)
                    ? "border-main-color shadow-md scale-105"
                    : "border-gray-200 hover:border-main-color/50"
                }
              `}
            >
              {img.type === "video" ? (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center relative group">
                  <img
                    src="https://cdn.pixabay.com/photo/2014/10/09/13/14/video-481821_1280.png"
                    alt="Video thumbnail"
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity"
                    onError={(e) => {
                      e.target.onError = null;
                      e.target.src = logo;
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 bg-black/50 rounded-full flex items-center justify-center">
                      <div className="w-0 h-0 border-t-6 border-b-6 border-l-8 border-transparent border-l-white ml-1"></div>
                    </div>
                  </div>
                </div>
              ) : (
                <img
                  src={img.url}
                  alt="Product thumbnail"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onError = null;
                    e.target.src = logo;
                  }}
                />
              )}
            </div>
          ))}

          {/* Color Variant Thumbnails */}
          {data?.product?.product_colors?.map((color) => (
            <div
              key={`thumb-color-${color.id}`}
              onClick={() => changeImgHandler(color.color_image)}
              className={`
                aspect-square rounded-xl overflow-hidden border-2 cursor-pointer
                transition-all duration-200 hover:shadow-lg
                ${
                  isThumbnailActive(color.color_image)
                    ? "border-main-color shadow-md scale-105"
                    : "border-gray-200 hover:border-main-color/50"
                }
              `}
            >
              <img
                src={color.color_image}
                alt="Color variant"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onError = null;
                  e.target.src = logo;
                }}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 px-5 lg:px-0 lg:ps-8 xl:ps-12">
        {/* ... rest of your component remains the same ... */}
        <div className="product-details max-w-2xl">
          {/* Breadcrumb */}
          <div className="hidden md:block mb-6">
            <BreadcrumbCom
              paths={[
                { name: t("Home Page"), path: "/" },
                from !== "products"
                  ? {
                      name:
                        lang === "en"
                          ? data?.product?.categories_data[0]?.name_en
                          : lang === "ar"
                          ? data?.product?.categories_data[0]?.name_ar
                          : data?.product?.categories_data[0]?.name_he,
                      path: `/sub-categories/${
                        data?.product?.categories_data[0]?.id
                      }/${
                        lang === "en"
                          ? data?.product?.categories_data[0]?.name_en
                          : lang === "ar"
                          ? data?.product?.categories_data[0]?.name_ar
                          : data?.product?.categories_data[0]?.name_he
                      }`,
                    }
                  : {
                      name: t("Our Products"),
                      path: `/products`,
                    },
                {
                  name:
                    lang === "en"
                      ? data?.product?.name_en
                      : lang === "ar"
                      ? data?.product?.name_ar
                      : data?.product?.name_he,
                  path: `/`,
                },
              ]}
            />
          </div>

          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight hidden sm:block">
            {lang === "ar"
              ? data?.product?.name_ar
              : lang === "en"
              ? data?.product?.name_en
              : data?.product?.name_he}
          </h1>

          <div className="mb-6 mt-6 sm:mt-2">
            {data?.product?.is_offer === "true" ? (
              <div className="flex items-center gap-4 flex-wrap">
                <span className="text-3xl font-bold text-red-600">
                  ₪{selectedPrice || data?.product?.price_nis_retail}
                </span>
                <span className="text-xl text-gray-400 line-through">
                  ₪{actualPrice}
                </span>
              </div>
            ) : (
              <span className="text-3xl font-bold text-gray-900">
                ₪{selectedPrice || data?.product?.price_nis_retail}
              </span>
            )}
          </div>

          {/* Description */}
          <div className="mb-8">
            <p className="text-gray-600 leading-relaxed">
              {lang === "ar"
                ? data?.product?.description_ar
                : lang === "en"
                ? data?.product?.description_en
                : data?.product?.description_he}
            </p>
          </div>

          {/* Variants Section */}
          <div className="space-y-6 mb-8">
            {/* Sizes */}
            {data?.product?.product_sizes.length > 0 && (
              <div>
                <div className="text-sm font-medium text-gray-700 mb-3">
                  {t("sizes")}:
                </div>
                <div className="flex flex-wrap gap-2">
                  {data.product.product_sizes.map((item) => {
                    const allSizeStock = data.product?.product_variants?.reduce(
                      (total, e) =>
                        e.product_size_id === item.id ? total + e.stock : total,
                      0
                    );
                    const sizeStockWithColor =
                      selectedColor && selectedColor !== ""
                        ? data.product?.product_variants?.reduce(
                            (total, e) =>
                              e.product_size_id === item.id &&
                              e.product_color_id === selectedColor
                                ? total + e.stock
                                : total,
                            0
                          )
                        : 0;
                    const sizeStock =
                      selectedColor && selectedColor !== ""
                        ? sizeStockWithColor
                        : allSizeStock;
                    const isOutOfStock = sizeStock === 0;
                    const isSelected = selectedSize === item.size;

                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          // if (!isOutOfStock) {
                          const currentScroll = window.scrollY;
                          setSelectedSize(item.size);
                          setSelectedSizeId(item.id);
                          if (data.product?.is_offer === "true") {
                            setSelectedPrice(
                              item.size_price_nis -
                                (item.size_price_nis *
                                  data.product?.discount_percentage) /
                                  100
                            );
                            setActualPrice(item.size_price_nis);
                          } else {
                            setSelectedPrice(item.size_price_nis);
                          }
                          requestAnimationFrame(() =>
                            window.scrollTo(0, currentScroll)
                          );
                          // }
                        }}
                        // disabled={isOutOfStock}
                        className={`
                          min-w-[3.5rem] px-4 py-2.5 text-sm font-medium rounded-lg
                          transition-all duration-200 border-2
                          ${
                            isSelected
                              ? "border-amber-600 bg-amber-50 text-amber-800"
                              : "border-gray-200 hover:border-amber-300 hover:bg-amber-50/50 text-gray-700"
                          }
                        `}
                      >
                        {item.size}
                        {/* {isOutOfStock && (
                          <span className="ml-1 text-xs">({t("out")})</span>
                        )} */}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Colors */}
            {data?.product?.product_colors.length > 0 && (
              <div>
                <div className="text-sm font-medium text-gray-700 mb-3">
                  {t("colors")}:
                </div>
                <div className="flex flex-wrap gap-3">
                  {data.product.product_colors.map((item) => {
                    const allColorStock =
                      data.product?.product_variants?.reduce(
                        (total, e) =>
                          e.product_color_id === item.id
                            ? total + e.stock
                            : total,
                        0
                      );
                    const colorStockWithSize =
                      selectedSizeId && selectedSize !== ""
                        ? data.product?.product_variants?.reduce(
                            (total, e) =>
                              e.product_color_id === item.id &&
                              e.product_size_id === selectedSizeId
                                ? total + e.stock
                                : total,
                            0
                          )
                        : 0;
                    const colorStock =
                      selectedSizeId && selectedSize !== ""
                        ? colorStockWithSize
                        : allColorStock;
                    const isOutOfStock = colorStock === 0;
                    const isSelected = selectedColor === item.id;

                    return (
                      <button
                        key={item.id}
                        onClick={(e) => {
                          e.preventDefault();
                          // if (!isOutOfStock) {
                          const currentScroll = window.scrollY;
                          setSelectedColor(item.id);
                          changeImgHandler(item.color_image);
                          requestAnimationFrame(() =>
                            window.scrollTo(0, currentScroll)
                          );
                          // }
                        }}
                        // disabled={isOutOfStock}
                        className="group relative focus:outline-none"
                      >
                        <div
                          className={`
                            w-[2.25rem] h-[2.25rem] rounded-full overflow-hidden border-2 transition-all flex items-center justify-center
                         ${
                              isSelected
                                ? "border-amber-600 shadow-md"
                                : "border-gray-200 hover:border-amber-300"
                            }
                          `}
                        >
                          <div
                            className={`h-[1.75rem] w-[1.75rem] rounded-full object-cover 
                            `}
                            style={{ backgroundColor: item.color }}
                          ></div>
                          {/* 
                          {isOutOfStock && (
                            <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
                              <span className="text-[10px] font-bold text-red-600 bg-white/80 px-1 py-0.5 rounded">
                                {t("out of stock")}
                              </span>
                            </div>
                          )} */}
                        </div>
                        <span className="text-xs">{item.color_code}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="border border-[#EDEDED] my-8"></div>

          <div className="quantity-actions w-full flex flex-col sm:flex-row items-center gap-3 mb-8">
            {/* Quantity Selector */}
            <div className="w-full sm:w-auto flex-shrink-0">
              <div className="w-full sm:w-[120px] h-[50px] px-4 flex items-center border border-gray-200 rounded-lg bg-white">
                <div className="flex justify-between items-center w-full">
                  <button
                    onClick={() => handleDecrementItem(data.product.id)}
                    type="button"
                    className="text-xl text-gray-500 hover:text-amber-600 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="text-lg font-medium text-gray-800">
                    {qty}
                  </span>
                  <button
                    onClick={() => handleIncrementItem(data?.product?.id)}
                    type="button"
                    className="text-xl text-gray-500 hover:text-amber-600 transition-colors"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons - Now all in one row */}
            <div className="w-full flex flex-row gap-2 sm:gap-3">
              {/* Add to Cart Button */}
              <div className="flex-1 relative">
                <button
                  onMouseOver={() =>
                    (data?.product?.product_colors.length > 0 ||
                      data?.product?.product_sizes.length > 0) &&
                    // data?.product?.product_stock !== 0 ||
                    // variantStock !== 0
                    setShowWarning(true)
                  }
                  onMouseLeave={() =>
                    (data?.product?.product_colors.length > 0 ||
                      data?.product?.product_sizes.length > 0) &&
                    // data?.product?.product_stock !== 0 ||
                    // variantStock !== 0
                    setShowWarning(false)
                  }
                  disabled={isButtonDisabled()}
                  onClick={() => handleAddcart(data?.product, qty)}
                  type="button"
                  className={`w-full h-[50px] text-sm font-semibold rounded-lg transition-all duration-200 ${
                    isButtonDisabled()
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-black hover:bg-gray-800 text-white hover:scale-[1.02]"
                  }`}
                >
                  {/* {isButtonDisabled() &&
                    data?.product?.product_stock === 0 &&
                    variantStock === 0
                      ? t("out of stock") */}
                  {t("Add to cart")}
                </button>

                {/* Warning Tooltip */}
                {showWarning && isButtonDisabled() && (
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-red-500 text-white text-xs px-3 py-2 rounded-full whitespace-nowrap shadow-md animate-bounce">
                      {data?.product?.product_colors.length > 0 &&
                      data?.product?.product_sizes.length > 0
                        ? t("select color and size")
                        : data?.product?.product_colors.length > 0
                        ? t("select color")
                        : t("select size")}
                    </div>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-3 h-3 bg-red-500 rotate-45"></div>
                  </div>
                )}
              </div>

              {/* WhatsApp Button */}
              <div className="flex-1">
                <a
                  href={`https://api.whatsapp.com/send?phone=${data2?.socials?.[2]?.url}&text=${encodedMessage}`}
                  className="w-full h-[50px] flex justify-center items-center bg-[#46c957] hover:bg-[#3aa849] text-white font-semibold rounded-lg transition-colors px-1 md:px-4 gap-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={whatsapp}
                    width={24}
                    height={24}
                    alt="WhatsApp"
                    className="mr"
                  />
                  <span className="text-xs md:text-sm">
                    {t("order whatsapp")}
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border border-[#EDEDED] my-8"></div>

          {/* Payment Methods */}
          <div className="componentWrapper">
            <div className="header text-sm font-medium text-gray-700 mb-4">
              {t("Payment Method")}
            </div>
            <div className="flex justify-center flex-wrap gap-2">
              <img
                src={card1}
                onError={(e) => {
                  e.target.onError = null;
                  e.target.src = logo;
                }}
                alt="card1"
                width={40}
                className="m-2 hover:scale-110 transition-transform"
              />
              <img
                src={card2}
                onError={(e) => {
                  e.target.onError = null;
                  e.target.src = logo;
                }}
                alt="card2"
                width={40}
                className="m-2 hover:scale-110 transition-transform"
              />
              <img
                src={card3}
                onError={(e) => {
                  e.target.onError = null;
                  e.target.src = logo;
                }}
                alt="card3"
                width={40}
                className="m-2 hover:scale-110 transition-transform"
              />
              <img
                src={card4}
                onError={(e) => {
                  e.target.onError = null;
                  e.target.src = logo;
                }}
                alt="card4"
                width={40}
                className="m-2 hover:scale-110 transition-transform"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
