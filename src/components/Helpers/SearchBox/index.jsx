import { useState } from "react";
import useFetchData from "../../../hooks/fetchData";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCartDrawer } from "../../../context/CartDrawerContext";

export default function SearchBox({ className, type }) {
  const [value, setValue] = useState("");
  const navigate = useNavigate("");
  const { isCartOpen, openCartDrawer, closeCartDrawer } = useCartDrawer();
  const handleSearchProduct = () => {
    closeCartDrawer();
    navigate(`/search-products/${value}`);
  };
  const lang = localStorage.getItem("i18nextLng");

  const { t } = useTranslation();
  return (
    <>
      <div
        className={`w-full h-full flex items-center  bg-white rounded-full p-1 ${
          className || ""
        }`}
      >
        <div className="flex-1 bg-white rounded-full h-full">
          <form onSubmit={handleSearchProduct} className="h-full">
            <input
              type="text"
              className="search-input rounded-full pr-[10px]"
              placeholder={`${t("Search Product")}...`}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </form>
        </div>
        <button
          className={` h-[35px] w-[35px] md:w-[35px] h-full text-sm font-600 bg-gradient-to-br from-main-color to-main-color/50 text-white rounded rounded-full flex items-center justify-center p-1`}
          type="button"
          onClick={handleSearchProduct}
        >
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#ffffff" viewBox="0 0 256 256"><path d="M232.49,215.51,185,168a92.12,92.12,0,1,0-17,17l47.53,47.54a12,12,0,0,0,17-17ZM44,112a68,68,0,1,1,68,68A68.07,68.07,0,0,1,44,112Z"></path></svg>
        </button>
      </div>
    </>
  );
}
