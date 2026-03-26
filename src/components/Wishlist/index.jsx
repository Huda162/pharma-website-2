import { useSelector } from "react-redux";
import BreadcrumbCom from "../BreadcrumbCom";
import EmptyWishlistError from "../EmptyWishlistError";
import PageTitle from "../Helpers/PageTitle";
import Layout from "../Partials/Layout";
import LayoutHomeTwo from "../Partials/LayoutHomeTwo";
import ProductsTable from "./ProductsTable";
import { useTranslation } from "react-i18next";

export default function Wishlist({ wishlist = true }) {
  const cart = useSelector((state) => state.cart.value);
  const { t } = useTranslation();

  return (
    <LayoutHomeTwo childrenClasses={wishlist ? "pt-0 pb-0" : ""}>
      {wishlist === false ? (
        <div className="wishlist-page-wrapper w-full">
          <div className="container-x mx-auto">
            <BreadcrumbCom
              paths={[
                { name: t("Home Page"), path: "/" },
                { name: t("wishlist"), path: "/wishlist" },
              ]}
            />
            <EmptyWishlistError />
          </div>
        </div>
      ) : (
        <div
          className={`wishlist-page-wrapper w-full bg-white pb-[60px] ${
            cart.length > 0 && "ml-[60px]"
          } `}
        >
          <div className="w-full">
            <PageTitle
              title={t("wishlist")}
              breadcrumb={[
                { name: t("Home Page"), path: "/" },
                { name: t("wishlist"), path: "/wishlist" },
              ]}
            />
          </div>
          <div className="w-[full] mt-[23px]">
            <div className="container-x mx-auto">
              <ProductsTable className="mb-[30px]" />
              {/* <div className="w-full mt-[30px] flex sm:justify-end justify-start">
                <div className="sm:flex sm:space-x-[30px] items-center">
                  <button type="button">
                    <div className="w-full text-sm font-semibold text-qred mb-5 sm:mb-0">
                      Clean Wishlist
                    </div>
                  </button>
                  <div className="w-[180px] h-[50px]">
                    <button type="button" className="yellow-btn">
                      <div className="w-full text-sm font-semibold">
                        Add to Cart All
                      </div>
                    </button>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      )}
    </LayoutHomeTwo>
  );
}
