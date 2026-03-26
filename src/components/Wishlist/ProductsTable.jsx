import { useDispatch, useSelector } from "react-redux";
import InputQuantityCom from "../Helpers/InputQuantityCom";
import {
  addFavorite,
  decrementFavorite,
  removeFavorite,
} from "../../redux/favoriteSlice";
import { addItem } from "../../redux/cartSlice";
import { toast, ToastContainer } from "react-toastify";
import image from "../../../public/assets/images/empty-wishlist.jpg";
import Arrow from "../Helpers/icons/Arrow";
import DataIteration from "../Helpers/DataIteration";
import ProductCardStyleThree from "../Helpers/Cards/ProductCardStyleThree";
import { t } from "i18next";

export default function ProductsTable({ className }) {
  const favorite = useSelector((state) => state.favorit.items);
  console.log(favorite, "f");
  const dispatch = useDispatch();
  const handleRemoveFavorite = (index) => {
    dispatch(removeFavorite(index));
  };
  const handleDecrementItem = (index) => {
    dispatch(decrementFavorite(index));
  };
  const handleIncrementItem = (pro) => {
    dispatch(addFavorite({ newItem: pro }));
  };
  const handleAddcart = (pro) => {
    dispatch(addItem({ newItem: pro }));
    notifyAdd();
  };
  const notifyAdd = () =>
    toast("تمت إضافة المنتج إلى السلة بنجاح", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      className: "custom-toast",
      style: {
        backgroundColor: "rgb(45 111 109)",
        color: "white",
        textAlign: "center",
      },
    });
  const lang = localStorage.getItem("i18nextLng");

  return (
    <div className={`w-full ${className || ""}`}>
      <div className="relative w-full overflow-x-auto border border-[#EDEDED] p-3">
        {favorite.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <img src={image} width={300} />
            <p className="text-lg text-gray-500">
              {t("your wishlist is empty")}
            </p>
            <p className="text-sm text-gray-400 m-3">
              {t("start now adding your favorite items")}
            </p>
          </div>
        ) : (
          <div className="w-full lg:flex lg:space-x-[30px]">
            <div className="flex-1">
              <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-2 xl:gap-[30px] gap-5">
                <DataIteration
                  datas={favorite}
                  startLength={0}
                  endLength={favorite?.length}
                >
                  {({ datas }) => (
                    <div   key={datas.id}>
                      <ProductCardStyleThree datas={datas} />
                    </div>
                  )}
                </DataIteration>
              </div>
            </div>
          </div>
        )}
        {}
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
}
