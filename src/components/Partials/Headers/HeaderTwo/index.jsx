import { Link } from "react-router-dom";
import ThinBag from "../../../Helpers/icons/ThinBag";
import Middlebar from "./Middlebar";
import Navbar from "./Navbar";
import TopBar from "./TopBar";
import logo from "../../../../../public/assets/images/logo-white.png";
import { useSelector } from "react-redux";
import { useCartDrawer } from "../../../../context/CartDrawerContext";

export default function HeaderTwo({ className, drawerAction }) {
  const cart = useSelector((state) => state.cart.value);
  const {toggleCartDrawer, openCartDrawer, closeCartDrawer} = useCartDrawer()
  const storedLogo = localStorage.getItem('alanaqa_logo') || logo

  return (
    <header
      className={` ${
        className || ""
      } header-section-wrapper absolute top-0 w-full xl:relative z-30`}
    >
      {/* <TopBar className="quomodo-shop-top-bar" /> */}
      <Middlebar className="quomodo-shop-middle-bar lg:hidden hidden xl:block " />
      <div className="quomodo-shop-drawer lg:block xl:hidden  block w-full h-[80px] bg-gradient-to-r from-main1-color via-secondary-color to-main1-color fixed z-999 xl:z-0">
        <div className="w-full h-full flex justify-between items-center px-5">
          <div onClick={drawerAction}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#000"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
              />
            </svg>
          </div>
          <div>
            <Link to="/">
              <img width="150" height="36" src={logo} alt="logo" />
            </Link>
          </div>
          <div className="cart relative cursor-pointer">
            <button onClick={()=>{toggleCartDrawer()}}>
              <span>
                <ThinBag fill="#000"/>
              </span>
            </button>
            <span className="w-[18px] h-[18px] rounded-full bg-secondary-color absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px]">
              {cart.length}
            </span>
          </div>
        </div>
      </div>
      {/* <Navbar className="quomodo-shop-nav-bar xl:block hidden lg:hidden" /> */}
    </header>
  );
}
