import { Route, Routes } from "react-router-dom";
import About from "./components/About";
import AllProductPage from "./components/AllProductPage";
import Login from "./components/Auth/Login/index";
import Profile from "./components/Auth/Profile";
import Signup from "./components/Auth/Signup";
import BecomeSaller from "./components/BecomeSaller";
import Blogs from "./components/Blogs";
import Blog from "./components/Blogs/Blog.jsx";
import CardPage from "./components/CartPage";
import CheakoutPage from "./components/CheakoutPage";
import Contact from "./components/Contact";
import Faq from "./components/Faq";
import FlashSale from "./components/FlashSale";
import FourZeroFour from "./components/FourZeroFour";
import Home from "./components/Home";
import HomeTwo from "./components/HomeTwo";
import PrivacyPolicy from "./components/PrivacyPolicy";
import ProductsCompaire from "./components/ProductsCompaire/index";
import SallerPage from "./components/SallerPage";
import Sallers from "./components/Sellers";
import SingleProductPage from "./components/SingleProductPage";
import TermsCondition from "./components/TermsCondition/index";
import TrackingOrder from "./components/TrackingOrder";
import Wishlist from "./components/Wishlist";
import HomeThree from "./components/HomeThree";
import HomeFour from "./components/HomeFour";
import HomeFive from "./components/HomeFive";
import HomePage from "./views/HomePage.jsx";
import AllCategoryPage from "./components/AllCategoryPage/index.jsx";
import BestSellerProduct from "./components/BestSellerProduct/index.jsx";
import LatestProducts from "./components/LatestProducts/index.jsx";
import SearchProductPage from "./components/SearchProduct/index.jsx";
import AllBrandsPage from "./components/AllBrandsPage/index.jsx";
import SubCategoriesPage from "./components/SubCategoriesPage/index.jsx";
import ProductsPage from "./components/products/ProductsPage.jsx";
import Offers from "./components/OfferPage/index.jsx";
import ProfilePage from "./components/profile/profile.jsx";
import LoginPage from "./components/Login/login.jsx";
import PreparationPage from "./components/Preparation/index.jsx";
export default function Routers() {
  return (
    <Routes>
      <Route exact path="/" element={<HomePage />} />
      <Route exact path="/home-screen" element={<HomePage />} />
      <Route exact path="/home-two" element={<HomePage />} />
      <Route exact path="/all-products/:by/:id/:name" element={<AllProductPage />} />
      <Route exact path="/products" element={<ProductsPage />} />
      <Route exact path="/all-categories" element={<AllCategoryPage />} />
      <Route exact path="/all-brands" element={<AllBrandsPage />} />
      <Route exact path="/sub-categories/:id/:name" element={<SubCategoriesPage />} />
      <Route exact path="/single-product/:id" element={<SingleProductPage />} />
      <Route exact path="/about" element={<About />} />
      <Route exact path="/contact" element={<Contact />} />
      <Route exact path="/cart" element={<CardPage />} />
      <Route exact path="/checkout" element={<CheakoutPage />} />
      <Route exact path="/wishlist" element={<Wishlist />} />
      <Route exact path="/profile" element={<ProfilePage />} />
      <Route exact path="/login-customer" element={<LoginPage />} />
      <Route exact path="/preparation" element={<PreparationPage />} />
      <Route exact path="/privacy-policy" element={<PrivacyPolicy />} />


      <Route
        exact
        path="/best-seller-products"
        element={<BestSellerProduct />}
      />
      <Route
        exact
        path="/offers"
        element={<Offers />}
      />
      <Route exact path="/latest-products" element={<LatestProducts />} />
      <Route
        exact
        path="/search-products/:value"
        element={<SearchProductPage />}
      />
      {/* <Route
        exact
        path="/product-compair"
        element={<ProductsCompaire/>}
      /> */}
    </Routes>
  );
}
