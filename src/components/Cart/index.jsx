import { useSelector, useDispatch } from "react-redux";
import { removeItem } from "../../redux/cartSlice";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
export default function Cart({ className, type }) {
  const cart = useSelector((state) => state.cart.value);
  const total = cart?.reduce(
    (acc, item) => acc + item.price_nis_retail * item.quantity,
    0
  );
  const dispatch = useDispatch();
  const handleRemoveCart = (index) => {
    dispatch(removeItem(index));
  };
  const { t } = useTranslation();
  const lang = localStorage.getItem('i18nextLng')

  return (
    <>
      <div
        // style={{ boxShadow: " 0px 15px 50px 0px rgba(0, 0, 0, 0.14)" }}
        className={`w-[130px] h-full bg-white border-t-[3px] ${
          type === 3 ? "border-qh3-blue" : "cart-wrappwer"
        }  ${className || ""}`}
      >
        <div className="w-full h-full">
          <div className="product-items xl:h-[550px] 2xl:h-[720px]  overflow-y-scroll">
            <ul>
              {cart?.map((item, index) => (
                <li className="w-full h-full flex flex-col items-center">
                  <div className="w-[100px] h-full">
                    <img
                      src={`${item?.images?.[0]?.url ?? ""}`}
                      alt=""
                      // className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex space-x-[6px] justify-center items-center">
                    <div className=" ">
                      <p className="price text-center">
                        <span className="offer-price text-qred font-600 text-[10px]">
                          ₪ {item.price_nis_retail}
                        </span>
                      </p>
                      <p className="title mb-2 text-[10px] font-600 text-qblack leading-4 line-clamp-2 hover:text-blue-600 text-center cursor-pointer">
                        {lang === "ar"
                          ? item.name_ar
                          : lang === "en"
                          ? item.name_en
                          : item.name_he}
                      </p>
                    </div>
                  </div>
                  <span
                    className="inline-flex cursor-pointer px-[5px] py-[3px] border border rounded-md"
                    onClick={() => handleRemoveCart(index)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="15"
                      height="15"
                      viewBox="0 0 48 48"
                    >
                      <path d="M 24 4 C 20.491685 4 17.570396 6.6214322 17.080078 10 L 10.238281 10 A 1.50015 1.50015 0 0 0 9.9804688 9.9785156 A 1.50015 1.50015 0 0 0 9.7578125 10 L 6.5 10 A 1.50015 1.50015 0 1 0 6.5 13 L 8.6386719 13 L 11.15625 39.029297 C 11.427329 41.835926 13.811782 44 16.630859 44 L 31.367188 44 C 34.186411 44 36.570826 41.836168 36.841797 39.029297 L 39.361328 13 L 41.5 13 A 1.50015 1.50015 0 1 0 41.5 10 L 38.244141 10 A 1.50015 1.50015 0 0 0 37.763672 10 L 30.919922 10 C 30.429604 6.6214322 27.508315 4 24 4 z M 24 7 C 25.879156 7 27.420767 8.2681608 27.861328 10 L 20.138672 10 C 20.579233 8.2681608 22.120844 7 24 7 z M 11.650391 13 L 36.347656 13 L 33.855469 38.740234 C 33.730439 40.035363 32.667963 41 31.367188 41 L 16.630859 41 C 15.331937 41 14.267499 40.033606 14.142578 38.740234 L 11.650391 13 z M 20.476562 17.978516 A 1.50015 1.50015 0 0 0 19 19.5 L 19 34.5 A 1.50015 1.50015 0 1 0 22 34.5 L 22 19.5 A 1.50015 1.50015 0 0 0 20.476562 17.978516 z M 27.476562 17.978516 A 1.50015 1.50015 0 0 0 26 19.5 L 26 34.5 A 1.50015 1.50015 0 1 0 29 34.5 L 29 19.5 A 1.50015 1.50015 0 0 0 27.476562 17.978516 z"></path>
                    </svg>
                  </span>
                  <div className="w-full mb-[20px] mt-[10px]">
                    <div className="h-[2px] bg-[#F0F1F3]"></div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full px-4 mt-[20px] mb-[12px]">
            <div className="h-[1px] bg-[#F0F1F3]"></div>
          </div>
          <div className="product-actions px-4 mb-[30px]">
            <div className="total-equation flex justify-between items-center mb-[28px]">
              <span className="text-[15px] font-500 text-qblack">
                {t("Total")}
              </span>
              <span className="text-[15px] font-500 text-qred ">₪ {total}</span>
            </div>
            <div className="product-action-btn">
              <Link to="/cart">
                <div className="bg-main-color text-white  w-full h-[50px] mb-[10px] flex justify-center items-center rounded-sm ">
                  <span> {t("View Cart")}</span>
                </div>
              </Link>
              {/* <a href="#">
                <div className="w-full h-[50px]">
                  <div className={type === 3 ? "blue-btn" : "yellow-btn"}>
                    <span className="text-sm">Checkout Now</span>
                  </div>
                </div>
              </a> */}
            </div>
          </div>
          <div className="w-full px-4 mt-[20px]">
            <div className="h-[1px] bg-[#F0F1F3]"></div>
          </div>
          {/* <div className="flex justify-center py-[15px]">
            <p className="text-[13px] font-500 text-qgray">
              Get Return within <span className="text-qblack">30 days</span>
            </p>
          </div> */}
        </div>
      </div>
    </>
  );
}
