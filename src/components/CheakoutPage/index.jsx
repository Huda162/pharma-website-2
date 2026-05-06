import InputCom from "../Helpers/InputCom";
import PageTitle from "../Helpers/PageTitle";
import Layout from "../Partials/Layout";
import LayoutHomeTwo from "../Partials/LayoutHomeTwo";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  useLoadScript,
  MarkerF,
} from "@react-google-maps/api";
import usePostData from "../../hooks/postData";
import { ToastContainer, toast } from "react-toastify";
import { clearCart } from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  notifyConfirmOrderAr,
  notifyConfirmOrderEn,
  notifyConfirmOrderHe,
} from "../Helpers/Toasts/NotifyAdd";
import {
  notifyNotConfirmOrderAr,
  notifyNotConfirmOrderEn,
  notifyNotConfirmOrderHe,
} from "../Helpers/Toasts/NotifyDelete";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Input,
} from "@material-ui/core";
import axios from "axios";
import useFetchData from "../../hooks/fetchData";
import "../../index.css";
import { Spinner } from "@material-tailwind/react";

const notifyAdd = () =>
  toast(t("order confirmed successfully"), {
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

const notifyError = () =>
  toast(t("failed to confirm order"), {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    className: "custom-toast",
    style: {
      backgroundColor: "#ff3a31",
      color: "white",
      textAlign: "center",
    },
  });

export default function CheakoutPage() {
  const dispatch = useDispatch();
  const [markerPosition, setMarkerPosition] = useState({ lng: 0, lat: 0 });
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data, loading: loadingArea } = useFetchData("areas");
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCbU4UQT_reh3zLwsTZDYLmRrpseZQUGfw" || "",
  });

  const lang = localStorage.getItem("i18nextLng");

  const cart = useSelector((state) => state.cart.value);
  const [city, setCity] = useState(localStorage.getItem("form_city") || "");
  const [phone, setPhone] = useState(localStorage.getItem("form_phone") || "");
  const [area, setArea] = useState(localStorage.getItem("form_area") || "");
  const [near, setNear] = useState(localStorage.getItem("form_near") || "");
  const [note, setNote] = useState("");
  const [name, setName] = useState(localStorage.getItem("form_name") || "");
  const [shippingCost, setShippingCost] = useState(
    JSON.parse(localStorage.getItem("form_shippingcost")) || ""
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [emptyPhone, setEmptyPhone] = useState(false);
  const [emptyName, setEmptyName] = useState(false);
  const [emptyCity, setEmptyCity] = useState(false);
  const [emptyNear, setEmptyNear] = useState(false);
  const [emptyArea, setEmptyArea] = useState(false);
  const [emptyShippingCost, setEmptyShippingCost] = useState(false);
  const [fillPhone, setfillPhone] = useState(false);
  const [fillName, setfillName] = useState(false);
  const [fillCity, setfillCity] = useState(false);
  const [fillNear, setfillNear] = useState(false);
  const [fillArea, setfillArea] = useState(false);
  const [fillShippingCost, setfillShippingCost] = useState(false);
  const [password, setPassword] = useState("123");
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [phoneExist, setPhoneExist] = useState(false);
  const [loginRequiredModal, setLoginRequiredModal] = useState(false);
  const log_status = JSON.parse(localStorage.getItem("alanaqa_log_status"));
  const [phoneIncorrect, setPhoneIncorrect] = useState(false);
  const [coponCode, setCoponCode] = useState("");
  const [coponId, setCoponId] = useState(0);
  const [validationMessage, setValidationMessage] = useState("");
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [loadCode, setLoadCode] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  
  // New state for payment method
  const [paymentMethod, setPaymentMethod] = useState("visa"); // 'cash' or 'card'

  const handleCodeChange = (e) => {
    const value = e.target.value;
    setCoponCode(value);
    console.log(value);
    setValidationMessage("");

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    setLoadCode(true);
    const newTimeout = setTimeout(() => {
      checkCoupon(value);
    }, 3000);

    setDebounceTimeout(newTimeout);
  };
  
  const token = JSON.parse(localStorage.getItem("alanaqa_access_token"));

  const checkCoupon = async (coupon) => {
    try {
      const response = await axios.post(
        `https://pharmaglows.com/adminv2/api/copons/check`,
        { code: coupon },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (response.status === 200) {
        const data = response.data;
        setValidationMessage(data.message);
        setDiscount(
          Number(
            data.copon.type === "static_value"
              ? data.copon.value
              : (cart?.reduce(
                  (acc, item) => acc + item.price_nis_retail * item.quantity,
                  0
                ) *
                  data.copon.value) /
                  100
          )
        );
        setCoponId(data.copon.id);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setValidationMessage(
          error.response.data.message || `${t("copon not found")}`
        );
        setDiscount(0);
        setCoponId(0);
      } else {
        setDiscount(0);
        setCoponId(0);
        setValidationMessage("An error occurred. Please try again later.");
      }
    }
    setLoadCode(false);
  };

  const handleChangePhone = (e) => {
    const inputValue = e.target.value;

    if (/^\d*$/.test(inputValue) && inputValue.length <= 8) {
      setPhone(inputValue);
    }
  };

  const handleChangeName = (e) => {
    const inputValue = e.target.value;

    if (/^[\p{L} ]*$/u.test(inputValue)) {
      setName(inputValue);
    }
  };

  // Updated handleSubmitOrder to handle payment method
  const handleSubmitOrder = async () => {
    setLoadingSubmit(true);
    
    // Validate required fields
    const requiredFields = [];
    if (!name) {
      requiredFields.push(t("Name"));
      setEmptyName(true);
    }
    if (!phone) {
      requiredFields.push(t("Phone"));
      setEmptyPhone(true);
    }
    if (!city) {
      requiredFields.push(t("City"));
      setEmptyCity(true);
    }
    if (!area) {
      requiredFields.push(t("Region"));
      setEmptyArea(true);
    }
    if (!shippingCost) {
      requiredFields.push(t("Area (Interior, Jerusalem, West Bank)"));
      setEmptyShippingCost(true);
    }
    
    if (requiredFields.length > 0) {
      const errorMessage = `${t("Please fill out the following fields")}   : ${requiredFields.join(", ")}`;
      setErrorMessage(errorMessage);
      setLoadingSubmit(false);
      return;
    }

    try {
      const response = await axios.get(
        `https://pharmaglows.com/adminv2/api/check_phone?phone=05${phone}`
      );
      console.log(response.data.message);
      if (response.data.message === "Phone number is available.") {
        handleAddAccount();
      } else {
        setPhoneExist(true);
        if (log_status === "true") {
          await handleAddOrder();
        } else {
          login();
        }
      }
    } catch (error) {
      console.log(error);
      setLoadingSubmit(false);
    }
  };

  useEffect(() => {
    if (name) {
      setfillName(true);
    }
    if (phone) {
      setfillPhone(true);
    }
    if (city) {
      setfillCity(true);
    }
    if (near) {
      setfillNear(true);
    }
    if (shippingCost) {
      setfillShippingCost(true);
    }
    if (area) {
      setfillArea(true);
    }
  }, [name, phone, city, near, shippingCost, area]);

  const handleAddAccount = async () => {
    const fullPhone = "05" + phone;

    const formData = new FormData();
    formData.append("phone", fullPhone);
    formData.append("password", password);
    formData.append("name", name);
    formData.append("email", "");
    formData.append("role_id", 3);

    const resGet = await axios
      .post(`https://pharmaglows.com/adminv2/api/register`, formData)
      .then((response) => {
        login();
      })
      .catch((err) => {
        console.error(err);
        setLoadingSubmit(false);
      });
  };

  // Updated handleAddOrder to accept payment method and return order data
  const handleAddOrder = async (paymentMethodType = paymentMethod) => {
    setLoadingSubmit(true);
    const fullPhone = "05" + phone;

    localStorage.setItem("form_phone", phone);
    localStorage.setItem("form_name", name);
    localStorage.setItem("form_city", city);
    localStorage.setItem("form_area", area);
    localStorage.setItem("form_near", near);
    localStorage.setItem("form_shippingcost", JSON.stringify(shippingCost));
    
    const formData = new FormData();
    const sum = cart?.reduce(
      (acc, item) => acc + item.price_nis_retail * item.quantity,
      0
    );

    formData.append("city", city);
    formData.append("customer_name", name);
    formData.append("phone", fullPhone);
    formData.append("geoarea", shippingCost.text);
    formData.append("delivery_price", shippingCost.price);
    formData.append("area", area);
    formData.append("near", near);
    formData.append("note", note);
    formData.append("user_id", JSON.parse(localStorage.getItem("alanaqa_id")));
    formData.append("payment_method", paymentMethodType); // Add payment method to order
    
    if (markerPosition && markerPosition.lat && markerPosition.lng) {
      formData.append("lattitude", markerPosition.lat);
      formData.append("longitude", markerPosition.lng);
    } else {
      formData.append("lattitude", "0");
      formData.append("longitude", "0");
    }
    formData.append("coupon_id", coponId);
    formData.append("source", "website");
    formData.append("sum", sum);
    formData.append("area_id", shippingCost.id);
    formData.append("customer_name", name);

    cart?.forEach((element, index) => {
      formData.append(`product_id[${index}]`, element.id);
      formData.append(`price[${index}]`, element.price_nis_retail);
      formData.append(`qty[${index}]`, element.quantity);
      element.selectedColor &&
        formData.append(`selected_color[${index}]`, element.selectedColor);
      element.selectedSize &&
        formData.append(`selected_size[${index}]`, element.selectedSize);
    });

    try {
      const response = await usePostData("add_order", formData);
      
      // Calculate total amount
      const total = cart?.reduce(
        (acc, item) => acc + item.price_nis_retail * item.quantity,
        0
      ) - discount + Number(shippingCost.price);
      
      const orderResult = {
        order: response,
        total: total,
        orderId: response.id || response.order_id,
        customer_name: name,
        phone: fullPhone,
        email: user?.email || "",
        order_details: cart,
        city: city,
        area: area,
        near: near,
        geoarea: shippingCost.text,
        delivery_price: shippingCost.price,
        discount: discount,
        coupon_id: coponId
      };

      // Handle navigation based on payment method
      if (paymentMethodType === "cash") {
        // Cash payment - clear cart and go to homepage
        dispatch(clearCart());
        setLoadingSubmit(false);
        
        // Show success notification
        lang === "ar"
          ? notifyConfirmOrderAr()
          : lang === "en"
          ? notifyConfirmOrderEn()
          : notifyConfirmOrderHe();
        
        // Navigate to homepage
        navigate("/");
      } 
      else if (paymentMethodType === "visa") {
        // Card payment - store order in sessionStorage and navigate to Tranzila
        sessionStorage.setItem("pendingOrder", JSON.stringify({ 
          result: orderResult, 
          total: total 
        }));
        
        setLoadingSubmit(false);
        
        // Navigate to Tranzila payment page
        navigate("/tranzila", { 
          state: { 
            result: orderResult, 
            total: total 
          } 
        });
      }
      
      return orderResult;
      
    } catch (error) {
      console.log(error);
      setLoadingSubmit(false);
      lang === "ar"
        ? notifyNotConfirmOrderAr()
        : lang === "en"
        ? notifyNotConfirmOrderEn()
        : notifyNotConfirmOrderHe();
      throw error;
    }
  };

  const login = async () => {
    console.log("entered login");
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const fullPhone = "05" + phone;
      const response = await axios.post(
        `https://pharmaglows.com/adminv2/api/login`,
        {
          phone: fullPhone,
          password: password,
        },
        { headers }
      );
      console.log(response);
      if (response.status === 200) {
        const token = response.data.access_token;
        const status = response.data.status;
        const { name, id } = response.data.id;
        localStorage.setItem("alanaqa_access_token", JSON.stringify(token));
        localStorage.setItem("alanaqa_name", JSON.stringify(name));
        localStorage.setItem("alanaqa_id", JSON.stringify(id));
        localStorage.setItem("alanaqa_log_status", JSON.stringify(status));
        await handleAddOrder();
      } else {
        console.log("Invalid login details");
        setLoadingSubmit(false);
      }
    } catch (error) {
      console.error(error);
      setLoadingSubmit(false);
    }
  };

  const handleClickGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setMarkerPosition(
          {
            lng: position.coords.longitude,
            lat: position.coords.latitude,
          },
          (error) => console.error(error)
        );
      });
    }
  };

  const handleSelectChange = (e) => {
    const selectedText = e.target.options[e.target.selectedIndex].text;
    const selectedValue = e.target.value;
    const sum = cart?.reduce(
      (acc, item) => acc + item.price_with_tax?.toFixed(2) * item.quantity,
      0
    );

    const cost = data?.areas?.find(
      (area) => Number(area.id) === Number(selectedValue)
    ).delivery_price;
    setShippingCost({
      text: selectedText,
      id: selectedValue,
      price: Number(cost),
    });
    setEmptyShippingCost(false);
  };
  
  console.log(shippingCost);

  // Calculate totals for display
  const subtotal = cart?.reduce(
    (acc, item) => acc + item.price_nis_retail * item.quantity,
    0
  );
  
  const totalAfterDiscount = subtotal - discount;
  const finalTotal = totalAfterDiscount + (shippingCost?.price || 0);
  
  // Get user from localStorage if exists
  const user = JSON.parse(localStorage.getItem("alanaqa_id")) ? 
    { id: JSON.parse(localStorage.getItem("alanaqa_id")) } : null;

  return (
    <LayoutHomeTwo childrenClasses="pt-0 pb-0">
      <div className="page-title mb-10">
        <PageTitle
          title={t("Checkout")}
          breadcrumb={[
            { name: t("Home Page"), path: "/" },
            { name: t("Checkout"), path: "/checkout" },
          ]}
        />
      </div>
      <div className="checkout-page-wrapper w-full pb-[60px]">
        <div className="checkout-main-content w-full">
          <div className="container-x mx-auto">
            <div className="w-full sm:mb-10 mb-5"></div>
            <div className="w-full lg:flex lg:space-x-[30px]">
              <div className="lg:w-1/2 w-full">
                <h1 className="sm:text-2xl text-xl text-qblack font-medium mb-5">
                  {t("Contact Information")}
                </h1>
                <div className="form-area">
                  <form>
                    <div className="sm:flex sm:space-x-5 items-center mb-6">
                      <div className="sm:w-1/2  mb-5 sm:mb-0 xl:ml-[20px]">
                        <InputCom
                          label={t("Name")}
                          placeholder={t("Name")}
                          inputClasses="w-full h-[70px]"
                          isEmpty={emptyName}
                          value={name}
                          inputHandler={(e) => {
                            handleChangeName(e);
                            setEmptyName(false);
                          }}
                          isFill={fillName}
                        />
                      </div>
                      <div className="flex-1">
                        <InputCom
                          label={t("Phone")}
                          placeholder={t("Phone")}
                          inputClasses="w-full h-[70px]"
                          value={phone}
                          inputHandler={(e) => {
                            handleChangePhone(e);
                            setEmptyPhone(false);
                          }}
                          name="phone"
                          isEmpty={emptyPhone}
                          isFill={phone.length === 8}
                          isPhone={true}
                        />
                      </div>
                    </div>
                    <div className="sm:flex sm:space-x-5 items-center mb-6">
                      <div className="sm:w-1/2  mb-5 sm:mb-0 xl:ml-[20px]">
                        <label className="text-qgray text-[13px] font-bold ">
                          <span style={{ color: "red", fontSize: "1rem" }}>
                            *
                          </span>
                          {t("Select a region")}
                        </label>
                        <div
                          className={`input-wrapper border ${
                            emptyShippingCost
                              ? "bg-[#faeaeb] transition-all duration-300"
                              : fillShippingCost
                              ? "bg-[#ddf9e2]"
                              : "border-gray-400"
                          } w-full h-full overflow-hidden relative rounded mt-[10px]`}
                        >
                          <select
                            onChange={handleSelectChange}
                            value={shippingCost.id}
                            id="countries"
                            className={`input-field placeholder:text-sm text-sm px-6 text-dark-gray w-full h-full font-normal ${
                              emptyShippingCost
                                ? "bg-[#faeaeb]"
                                : fillShippingCost
                                ? "bg-[#ddf9e2]"
                                : "bg-white"
                            }  focus:ring-0 focus:outline-none`}
                          >
                            <option disabled selected>
                              {t("Select a region")}
                            </option>
                            {data?.areas?.map((area) => (
                              <option
                                key={area?.id}
                                value={area?.id}
                                data-price={area.delivery_price}
                              >
                                {lang === "ar"
                                  ? area?.area_name_ar
                                  : lang === "en"
                                  ? area?.area_name_en
                                  : area?.area_name}{" "}
                                ({area?.delivery_price}₪)
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="flex-1">
                        <InputCom
                          label={t("City")}
                          placeholder={t("City")}
                          inputClasses="w-full h-[70px]"
                          name="city"
                          value={city}
                          inputHandler={(e) => {
                            setCity(e.target.value);
                            setEmptyCity(false);
                          }}
                          isEmpty={emptyCity}
                          isFill={fillCity}
                        />
                      </div>
                    </div>

                    <div className="sm:flex sm:space-x-5 items-center mb-6">
                      <div className="sm:w-1/2  mb-5 sm:mb-0 xl:ml-[20px]">
                        <InputCom
                          label={t("Area")}
                          placeholder={t("Area")}
                          inputClasses="w-full h-[70px]"
                          name="area"
                          value={area}
                          inputHandler={(e) => {
                            setArea(e.target.value);
                            setEmptyArea(false);
                          }}
                          isEmpty={emptyArea}
                          isFill={fillArea}
                        />
                      </div>
                      <div className="sm:w-1/2  mb-5 sm:mb-0 xl:ml-[20px]">
                        <InputCom
                          label={t("Near")}
                          placeholder={t("Near")}
                          inputClasses="w-full h-[70px]"
                          name="near"
                          value={near}
                          inputHandler={(e) => {
                            setNear(e.target.value);
                            setEmptyNear(false);
                          }}
                          required={false}
                          isEmpty={emptyNear}
                          isFill={fillNear}
                        />
                      </div>
                    </div>
                    <div className="sm:flex sm:space-x-5 items-center mb-6">
                      <div className="sm:w-full mb-5 sm:mb-0 xl:ml-[20px]">
                        <InputCom
                          label={t("Copon Code")}
                          inputClasses="w-full h-[70px]"
                          name="copon"
                          value={coponCode}
                          inputHandler={handleCodeChange}
                          isCode
                          isLoading={loadCode}
                          required={false}
                        />
                        {coponCode.trim() !== "" && !loadCode && (
                          <>
                            {validationMessage &&
                            validationMessage === "Coupon is valid" ? (
                              <p className="text-sm text-green-600 mt-2">
                                {t("Coupon is valid")}
                              </p>
                            ) : (
                              <p className="text-sm text-red-600 mt-2">
                                {t("Coupon not found")}
                              </p>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                    
                  {/* Payment Method Selection - Using existing classes */}
<div className="mb-6 xl:ml-[20px]">
  <label className="text-qgray text-[13px] font-bold block mb-2">
    <span style={{ color: "red", fontSize: "1rem" }}>*</span>
    {t("Payment Method")}
  </label>
  
  <div className="flex flex-col space-y-3">
    {/* Credit Card Option */}
    <label 
      className={`border-2 p-4 rounded-lg cursor-pointer transition-all flex items-center gap-3 ${
        paymentMethod === "visa" 
          ? "border-green-500 bg-green-50" 
          : "border-gray-300 hover:border-green-300 bg-white"
      }`}
    >
      <input
        type="radio"
        name="paymentMethod"
        value="visa"
        checked={paymentMethod === "visa"}
        onChange={(e) => setPaymentMethod(e.target.value)}
        className="w-4 h-4 text-green-600 focus:ring-green-500"
      />
      <div className="flex-1">
        <span className={`font-medium ${paymentMethod === "visa" ? "text-green-700" : "text-qblack"}`}>
          {t("Credit Card / Bit")}
        </span>
        <p className="text-xs text-qgray mt-1">
          {t("Pay securely with credit card or Bit")}
        </p>
      </div>
      {paymentMethod === "visa" && (
        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
        </svg>
      )}
    </label>

    {/* Cash on Delivery Option */}
    <label 
      className={`border-2 p-4 rounded-lg cursor-pointer transition-all flex items-center gap-3 ${
        paymentMethod === "cash" 
          ? "border-green-500 bg-green-50" 
          : "border-gray-300 hover:border-green-300 bg-white"
      }`}
    >
      <input
        type="radio"
        name="paymentMethod"
        value="cash"
        checked={paymentMethod === "cash"}
        onChange={(e) => setPaymentMethod(e.target.value)}
        className="w-4 h-4 text-green-600 focus:ring-green-500"
      />
      <div className="flex-1">
        <span className={`font-medium ${paymentMethod === "cash" ? "text-green-700" : "text-qblack"}`}>
          {t("Cash on Delivery")}
        </span>
        <p className="text-xs text-qgray mt-1">
          {t("Pay when you receive your order")}
        </p>
      </div>
      {paymentMethod === "cash" && (
        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
        </svg>
      )}
    </label>
  </div>
</div>
                    
                    <div className="flex-1 ml-4">
                      <div className="mb-5">
                        <h6 className="text-qgray text-[13px] font-bold ">
                          {t("Notes")}
                        </h6>
                        <textarea
                          name="note"
                          value={note}
                          onChange={(e) => setNote(e.target.value)}
                          placeholder={t("Type your message here")}
                          className="w-full h-[105px] focus:ring-0 focus:outline-none p-3 border border-gray-400 placeholder:text-sm mt-[10px]"
                        ></textarea>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="flex-1">
                <h1 className="sm:text-2xl text-xl text-qblack font-medium mb-5">
                  {t("Invoice details")}
                </h1>

                <div className="w-full px-10 py-[30px] border border-[#EDEDED]">
                  <div className="sub-total mb-6">
                    <div className=" flex justify-between mb-5">
                      <p className="text-[13px] font-medium text-qblack uppercase">
                        {t("Product")}
                      </p>
                      <p className="text-[13px] font-medium text-qblack uppercase">
                        {t("Total")}
                      </p>
                    </div>
                    <div className="w-full h-[1px] bg-[#EDEDED]"></div>
                  </div>
                  <div className="product-list w-full mb-[30px]">
                    <ul className="flex flex-col space-y-5">
                      {cart?.map((item, index) => (
                        <li key={index}>
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="text-[15px] text-qblack mb-2.5">
                                {lang === "ar"
                                  ? item.name_ar
                                  : lang === "en"
                                  ? item.name_en
                                  : item.name_he}

                                <sup className="text-[13px] text-qgray ml-2 mt-2">
                                  x{item.quantity}
                                </sup>
                              </h4>
                            </div>
                            <div>
                              <span className="text-[15px] text-qblack font-medium">
                                ₪ {item.price_nis_retail}
                              </span>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="w-full h-[1px] bg-[#EDEDED]"></div>
                  <div className="mt-[30px]">
                    <div className=" flex justify-between mb-5">
                      <p className="text-2xl font-medium text-qblack">
                        {t("Subtotal")}
                      </p>
                      <p className="text-2xl font-medium text-qred">
                        ₪{subtotal.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="w-full h-[1px] bg-[#EDEDED]"></div>
                  <div className="mt-[30px]">
                    <div className=" flex justify-between mb-5">
                      <p className="text-xl font-medium text-qblack">
                        {t("Discount")}
                      </p>
                      <p className="text-2xl font-medium text-green-600">
                        -₪{discount.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="w-full h-[1px] bg-[#EDEDED]"></div>
                  <div className="mt-[30px]">
                    <div className=" flex justify-between mb-5">
                      <p className="text-xl font-medium text-qblack">
                        {t("Delivery price")}
                      </p>
                      <p className="text-2xl font-medium text-qred">
                        ₪{shippingCost?.price?.toFixed(2) || "0"}
                      </p>
                    </div>
                  </div>
                  <div className="w-full h-[1px] bg-[#EDEDED]"></div>
                  <div className="mt-[30px]">
                    <div className=" flex justify-between mb-5">
                      <p className="text-xl font-medium text-qblack font-bold">
                        {t("Total")}
                      </p>
                      <p className="text-2xl font-medium text-qred font-bold">
                        ₪{finalTotal.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  
                  {errorMessage && (
                    <div
                      className="mb-[30px]"
                      style={{ color: "red", marginTop: "10px" }}
                    >
                      {errorMessage}
                    </div>
                  )}
                  {phoneIncorrect && (
                    <div
                      className="mb-[30px]"
                      style={{ color: "red", marginTop: "10px" }}
                    >
                      {t("phone number must start with 05")}
                    </div>
                  )}
                  
                  {/* Payment Method Info Box */}
                  <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      {paymentMethod === "cash" 
                        ? t("You will pay cash upon delivery. Order will be confirmed immediately.")
                        : t("You will be redirected to secure payment page to complete your transaction.")}
                    </p>
                  </div>
                  
                  <button
                    className={`w-full h-[50px] ${
                      loadingSubmit ? "bg-qgray" : "black-btn"
                    } flex justify-center items-center cursor-pointer`}
                    onClick={handleSubmitOrder}
                    disabled={loadingSubmit}
                  >
                    <span className="text-sm font-semibold">
                      {loadingSubmit ? (
                        <>
                          <Spinner />
                        </>
                      ) : (
                        <>{paymentMethod === "cash" ? t("Confirm Order") : t("Proceed to Payment")}</>
                      )}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Dialog
        open={isPasswordDialogOpen}
        onClose={() => setIsPasswordDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="dialogStyle"
      >
        <DialogContent>
          <div className="text-center">
            <p>
              {t(
                "a new account will be created automatically using your entered phone number"
              )}
            </p>
            <p>{t("enter a password for your account")}</p>

            <input
              className="border rounded-lg p-3 flex items-center mx-1 w-full text-sm m-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t("password")}
            />
          </div>
        </DialogContent>
        <DialogActions className="flex justify-center items-center">
          <button
            className="rounded-lg"
            style={{
              backgroundColor: "#1d1d1d",
              marginTop: "1rem",
              width: "25%",
              color: "white",
              padding: "0.5rem",
            }}
            disabled={password.trim() === "" ? true : false}
            onClick={() => {
              handleAddAccount();
              setIsPasswordDialogOpen(false);
            }}
          >
            {t("confirm")}
          </button>
          <button
            onClick={() => {
              setIsPasswordDialogOpen(false);
            }}
            className="rounded-lg"
            style={{
              marginTop: "1rem",
              width: "25%",
              padding: "0.5rem",
            }}
          >
            <span className="dialogStyle">{t("cancel")}</span>
          </button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={loginRequiredModal}
        onClose={() => setLoginRequiredModal(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="dialogStyle"
      >
        <DialogContent>
          <div className="text-center">
            <p>{t("there is an account attached to this phone number")}</p>
            <p>{t("please login to your account first")}</p>
          </div>
        </DialogContent>
        <DialogActions className="flex justify-center items-center">
          <button
            className="rounded-lg"
            style={{
              backgroundColor: "#1d1d1d",
              marginTop: "1rem",
              color: "white",
              padding: "0.5rem",
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/login-customer");
            }}
          >
            {t("go to login")}
          </button>
          <button
            onClick={() => {
              setLoginRequiredModal(false);
            }}
            className="rounded-lg"
            style={{
              marginTop: "1rem",
              width: "25%",
              padding: "0.5rem",
            }}
          >
            <span className="dialogStyle">{t("cancel")}</span>
          </button>
        </DialogActions>
      </Dialog>
    </LayoutHomeTwo>
  );
}