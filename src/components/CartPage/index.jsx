import { Link } from "react-router-dom";
import BreadcrumbCom from "../BreadcrumbCom";
import EmptyCardError from "../EmptyCardError";
import InputCom from "../Helpers/InputCom";
import PageTitle from "../Helpers/PageTitle";
import ProductsTable from "./ProductsTable";
import LayoutHomeTwo from "../Partials/LayoutHomeTwo";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export default function CardPage({ cart = true }) {
  const { t } = useTranslation();
  const carts = useSelector((state) => state.cart.value);
  const [width, setWidth] = useState(window.innerWidth)

  window.addEventListener('resize', function (event) {
    setWidth(window.innerWidth)
  })
  return (
    <LayoutHomeTwo childrenClasses={cart ? "pt-0 pb-0" : ""}>
      {cart === false ? (
        <div className="cart-page-wrapper w-full">
          <div className="container-x mx-auto">
            <BreadcrumbCom
              paths={[
                { name: t("Home Page"), path: "/" },
                { name: t("Cart"), path: "/cart" },
              ]}
            />
            <EmptyCardError />
          </div>
        </div>
      ) : (
        <div className="cart-page-wrapper w-full bg-white pb-[60px]">
          <div className="w-full">
            <PageTitle
              title={t("Cart")}
              breadcrumb={[
                { name: t("Home Page"), path: "/" },
                { name: t("Cart"), path: "/cart" },
              ]}
            />
          </div>
          <div className="w-full mt-[23px] rounded-lg">
            <div
              className={
                carts.length > 0
                  ? width > 768 ? "container-x mx-auto rounded-lg flex flex-row" : "rounded-lg container-x mx-auto"
                  : "container-x mx-auto rounded-lg"
              }
            >
              <ProductsTable className="mb-[30px]" />
              {/* <div className="w-full sm:flex justify-between">
                <div className="discount-code sm:w-[270px] w-full mb-5 sm:mb-0 h-[50px] flex"></div>
              </div> */}
              {carts.length > 0 && (
                <div className="w-full flex sm:justify-end">
                  <div className="sm:w-[370px] w-full border border-[#EDEDED] px-[30px] py-[26px] rounded-lg">
                    <div className="sub-total mb-6">
                      <div className=" flex justify-between mb-6">
                        <p className="text-[15px] font-medium text-qblack">
                          {t("Total")}
                        </p>
                        <p className="text-[15px] font-medium text-qred">
                          ₪
                          {carts?.reduce(
                            (acc, item) =>
                              acc +
                              Number(item.price_nis_retail) * Number(item.quantity),
                            0
                          )}
                        </p>
                      </div>
                      <div className="w-full h-[1px] bg-[#EDEDED]"></div>
                    </div>

                    <Link to="/checkout">
                      <div className="w-full h-[50px] black-btn flex justify-center items-center rounded-lg">
                        <span className="text-sm font-semibold">
                          {t("Click here to confirm the order")}
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {/* <ToastContainer /> */}
    </LayoutHomeTwo>
  );
}
