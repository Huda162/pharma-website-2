import { useDispatch, useSelector } from "react-redux";
import InputQuantityCom from "../Helpers/InputQuantityCom";
import { addItem, decrementItem, removeItem } from "../../redux/cartSlice";
import image from "../../../public/assets/images/empty-cart.png";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useCartDrawer } from "../../context/CartDrawerContext";
import {
  notifyRemoveCartAr,
  notifyRemoveCartEn,
  notifyRemoveCartHe,
} from "../Helpers/Toasts/NotifyDelete";

export default function ProductsTable({ className }) {
  const { t } = useTranslation();
  const lang = localStorage.getItem("i18nextLng");
  const { closeCartDrawer } = useCartDrawer();
  const cart = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();

  const handleRemoveCart = (index) => {
    dispatch(removeItem(index));
    lang === "ar"
      ? notifyRemoveCartAr()
      : lang === "en"
      ? notifyRemoveCartEn()
      : notifyRemoveCartHe();
  };

  const handleDecrementItem = (index) => {
    dispatch(decrementItem(index));
  };
  const handleIncrementItem = (pro) => {
    // const selectedSizeId = pro.product_sizes?.find(
    //   (size) => size?.size === pro.selectedSize
    // )?.id;

    // const matchingVariant = pro.product_variants.find((variant) => {
    //   if (pro.selectedColor && selectedSizeId) {
    //     return (
    //       variant.product_color_id === pro.selectedColor &&
    //       variant.product_size_id === selectedSizeId
    //     );
    //   } else if (pro.selectedColor && !selectedSizeId) {
    //     return (
    //       variant.product_color_id === pro.selectedColor &&
    //       variant.product_size_id === null
    //     );
    //   } else if (!pro.selectedColor && selectedSizeId) {
    //     return (
    //       variant.product_size_id === selectedSizeId &&
    //       variant.product_color_id === null
    //     );
    //   } else {
    //     return (
    //       variant.product_color_id === null && variant.product_size_id === null
    //     );
    //   }
    // });
    // if (pro.product_colors.length === 0 && pro.product_sizes.length === 0) {
    //   const availableStock = pro.product_stock;
    //   if (pro.quantity < availableStock) {
    //     dispatch(addItem({ newItem: pro }));
    //   } else {
    //     console.log("Cannot exceed available stock");
    //   }
    // } else if (matchingVariant) {
    //   const availableStock = matchingVariant.stock;

    // if (pro.quantity < availableStock) {
    dispatch(addItem({ newItem: pro }));
    // } else {
    // console.log("Cannot exceed available stock");
    // }
    // } else {
    //   console.log("Variant not found for selected options");
    // }
  };

  return (
    <div className={`w-full ${className || ""}`}>
      {cart?.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full py-8">
          <img
            src={image}
            width={200}
            className="opacity-80 mb-4"
            alt="Empty cart"
          />
          <p className="text-lg text-gray-600 font-medium mb-1">
            {t("Your shopping cart is empty!")}
          </p>
          <p className="text-sm text-gray-500">
            {t("Start adding the products you want to buy.")}
          </p>
          <Link
            to="/products"
            className="mt-4 px-6 py-2 bg-main-color text-white rounded-lg hover:bg-main-color-dark transition-colors"
            onClick={closeCartDrawer}
          >
            {t("Browse Products")}
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {cart?.map((item, index) => {
            const selectedColor = item?.product_colors?.find(
              (color) => color.id === item.selectedColor
            );
            const isUnavailable = item.available === "false";

            return (
              <div
                key={`${item.id}-${index}`}
                className={`flex items-start gap-4 p-4 rounded-lg shadow-sm relative ${
                  isUnavailable
                    ? "bg-white/50 border border-gray-200"
                    : "bg-white hover:shadow-md transition-shadow"
                }`}
              >
                {isUnavailable && (
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px] z-10 rounded-lg pointer-events-none"></div>
                )}

                {/* isUnavailable ? "border-gray-300" : "border-gray-100" */}
                <Link
                  to={`/single-product/${item.id}`}
                  className={`flex-shrink-0 w-24 h-24 overflow-hidden rounded-md border relative border-gray-100
                  `}
                  onClick={closeCartDrawer}
                >
                  {/* {isUnavailable && (
                    <div className="absolute inset-0 z-20 flex items-center justify-center">
                      <span className="bg-red-500 text-white text-[10px] font-semibold px-2 py-1 rounded  shadow-sm">
                        {t("out_of_stock") || "Out of stock"}
                      </span>
                    </div>
                  )} */}

                  {/* isUnavailable ? "opacity-60" : "" */}
                  <img
                    src={item?.images?.[0]?.url || image}
                    alt={item.name_en}
                    className={`w-full h-full object-contain 
                    `}
                    onError={(e) => {
                      e.target.onError = null;
                      e.target.src = image;
                    }}
                  />
                </Link>

                {/* isUnavailable ? "relative z-20" : "" */}
                <div
                  className={`flex-1 flex flex-col h-full
                  `}
                >
                  <div className="flex justify-between items-start">
                    <Link
                      to={`/single-product/${item.id}`}
                      onClick={closeCartDrawer}
                      className="group"
                    >
                      {/* isUnavailable
                        ? "text-gray-500"
                        : "text-gray-800 group-hover:text-main-color transition-colors" */}
                      <h3
                        className={`text-lg font-semibold text-gray-800 group-hover:text-main-color transition-colors
                        `}
                      >
                        {lang === "ar"
                          ? item.name_ar
                          : lang === "en"
                          ? item.name_en
                          : item.name_he}
                      </h3>
                      {/* {isUnavailable && (
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-xs text-red-500 font-medium">
                            {t("unavailable")}
                          </span>
                        </div>
                      )} */}
                    </Link>

                    {/* isUnavailable
                      ? "text-gray-500 hover:text-red-500 hover:bg-red-50"
                      : "text-gray-400 hover:text-red-500" */}
                    {/* Delete button - always visible but styled differently for unavailable */}
                    <button
                      onClick={() => handleRemoveCart(index)}
                      className={`transition-colors p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-red-500
                      `}
                      aria-label={t("Remove item")}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6 18L18 6M6 6l12 12"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Color and Size */}
                  {(item.selectedColor || item.selectedSize) && (
                    <div className="flex flex-wrap gap-2 mt-2 mb-3">
                      {item.selectedColor && selectedColor && (
                        // isUnavailable ? "bg-gray-100/80" : "bg-gray-50"
                        <div
                          className={`flex items-center gap-1 px-2 py-1 rounded-md text-sm 
                          `}
                        >
                          {/* isUnavailable ? "text-gray-400" : "text-gray-600" */}
                          <span className={`text-gray-600`}>{t("color")}:</span>
                          <div
                            // isUnavailable
                            //   ? "border-gray-300 opacity-70"
                            //   : "border-gray-200"
                            className={`w-4 h-4 rounded-full overflow-hidden border text-gray-200`}
                          >
                            <img
                              key={selectedColor.id}
                              src={selectedColor?.color_image}
                              alt=""
                              // isUnavailable ? "opacity-70" : ""
                              className={`w-full h-full object-cover `}
                            />
                          </div>
                        </div>
                      )}
                      {item.selectedSize && (
                        <div
                          // isUnavailable ? "bg-gray-100/80" : "bg-gray-50"
                          className={`flex items-center gap-1 px-2 py-1 rounded-md text-sm bg-gray-50`}
                        >
                          {/* isUnavailable ? "text-gray-400" : "text-gray-600" */}
                          <span
                            className={`
                            "text-gray-600
                            `}
                          >
                            {t("size")}:
                          </span>
                          {/* isUnavailable ? "text-gray-500" : "" */}
                          <span
                            className={`font-medium`}
                          >
                            {item.selectedSize}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="mt-auto flex items-center justify-between">
                    <span
                        // isUnavailable ? "text-gray-400" : "text-main-color"
                      className={`text-lg font-bold text-main-color`}
                    >
                      ₪{item.price_nis_retail}
                    </span>

                    {/* {!isUnavailable ? ( */}
                      <div className="flex items-center gap-2">
                        <InputQuantityCom
                          onDecrement={() => handleDecrementItem(index)}
                          quantity={item.quantity}
                          onIncrement={() => handleIncrementItem(item)}
                          className="ml-4"
                        />
                      </div>
                    {/* ) : (
                      <button
                        onClick={() => handleRemoveCart(index)}
                        className="flex items-center gap-2 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 rounded-md transition-colors text-sm font-medium border border-red-200"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                        </svg>
                        {t("delete from cart")}
                      </button>
                    )} */}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
