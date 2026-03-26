import { useEffect, useState } from "react";
import LayoutHomeTwo from "../Partials/LayoutHomeTwo";
import useFetchData from "../../hooks/fetchData";
import { Link, useNavigate } from "react-router-dom";
import PageTitle from "../Helpers/PageTitle";
import { useTranslation } from "react-i18next";
import exit from "../../../public/assets/images/exit.png";
import left from "../../../public/assets/images/left-arrow.png";
import right from "../../../public/assets/images/right-arrow.png";
import { Dialog, DialogActions, DialogContent } from "@material-ui/core";
import { DialogHeader } from "@material-tailwind/react";
import userIcon from "../../../public/assets/images/user.png";
import phoneIcon from "../../../public/assets/images/phone.png";
import InputCom from "../Helpers/InputCom";
import edit from "../../../public/assets/images/edit.png";
import {
  notifyEditDataAr,
  notifyEditDataEn,
  notifyEditDataHe,
} from "../Helpers/Toasts/NotifyAdd";
import {
  notifyDataNotEditedAr,
  notifyDataNotEditedEn,
  notifyDataNotEditedHe,
} from "../Helpers/Toasts/NotifyDelete";
import usePostData from "../../hooks/postData";

export default function ProfilePage() {
  //   const { data: data2, loading: loading2 } = useFetchData(
  //     `filter_products?brand_id=${param.id}&page=${currentPage}`
  //   );
  const { t } = useTranslation();
  const lng = localStorage.getItem("i18nextLng");
  const name = JSON.parse(localStorage.getItem("alanaqa_name"));
  const phone = "05" + JSON.parse(localStorage.getItem("form_phone"));
  const id = JSON.parse(localStorage.getItem("alanaqa_id"));
  const [detailsDialog, setDetailsDialog] = useState(false);
  const [orderDetails, setOrderDetails] = useState([]);
  const [passwordDialog, setPasswordDialog] = useState(false);
  const [userDialog, setUserDialog] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");
  const [customerName, setCustomerName] = useState(name);
  const [customerPhone, setCustomerPhone] = useState(phone);
  const { data, loading } = useFetchData(`orders_user_id/${id}`);
  const navigate = useNavigate();
  const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(true);
  const [isOldPasswordCorrect, setIsOldPasswordCorrect] = useState(true);

  const logout = () => {
    localStorage.setItem("alanaqa_access_token", JSON.stringify(null));
    localStorage.setItem("alanaqa_name", JSON.stringify(null));
    localStorage.setItem("alanaqa_id", JSON.stringify(null));
    localStorage.setItem("alanaqa_log_status", JSON.stringify(false));
    navigate("/");
  };

  const editUserData = async () => {
    const formData = new FormData();

    formData.append("phone", customerPhone);
    formData.append("name", customerName);
    formData.append("user_id", id);
    formData.append("role_id", 2);

    try {
      const resposne = await usePostData("update_user", formData);
      {
        lng === "ar"
          ? notifyEditDataAr()
          : lng === "en"
          ? notifyEditDataEn()
          : notifyEditDataHe();
      }
      localStorage.setItem("alanaqa_name", JSON.stringify(customerName));
      localStorage.setItem("form_name", customerName);
      localStorage.setItem("form_phone", customerPhone.slice(2));
      setCustomerName(name);
      setCustomerPhone(phone);
      navigate("/");
    } catch (error) {
      console.log(error);
      {
        lng === "ar"
          ? notifyDataNotEditedAr()
          : lng === "en"
          ? notifyDataNotEditedEn()
          : notifyDataNotEditedHe();
      }
    }
  };
  const changePassword = async () => {
    const data = {
      current_password: oldPassword,
      new_password: newPassword,
      new_password_confirmation: newPasswordConfirmation,
    };

    try {
      const resposne = await usePostData("change-password", data);
      if (resposne.status === 400) {
        setIsOldPasswordCorrect(false);
      } else {
        {
          lng === "ar"
          ? notifyEditDataAr()
          : lng === "en"
          ? notifyEditDataEn()
          : notifyEditDataHe();
        }
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      setIsOldPasswordCorrect(false);
      {
        lng === "ar"
          ? notifyDataNotEditedAr()
          : lng === "en"
          ? notifyDataNotEditedEn()
          : notifyDataNotEditedHe();
      }
    }
  };

  useEffect(() => {
    if (newPassword.trim() !== "" && newPasswordConfirmation.trim() !== "") {
      if (newPassword === newPasswordConfirmation) {
        setIsPasswordConfirmed(true);
      } else {
        setIsPasswordConfirmed(false);
      }
    } else {
      setIsPasswordConfirmed(null);
    }
  }, [newPassword, newPasswordConfirmation]);

  return (
    <>
      <LayoutHomeTwo>
        <PageTitle
          title={`${t("profile")}`}
          breadcrumb={[
            { name: t("Home Page"), path: "/" },
            { name: t("profile"), path: "" },
          ]}
        />
        <div className="flex flex-col sm:flex-col xl:flex-row gap-2 container-x mx-auto mt-[30px]">
          <div className="bg-white rounded-md shadow-md p-2 w-full xl:w-[20vw]">
            <div className="w-full flex flex-col justify-center items-center">
              <div className="text-[1.25rem] font-bold w-full flex items-center justify-between">
                {t("user info")}
                <img
                  src={edit}
                  width={20}
                  className="cursor-pointer"
                  onClick={() => setUserDialog(true)}
                />
              </div>
              <div className="text-start w-full mt-3 flex flex-col gap-2">
                <div className="flex gap-2">
                  <img src={userIcon} width={25} height={20} />
                  <p className="text-[17px]">
                    <b>{name}</b>
                  </p>
                </div>
                <div className="flex gap-2">
                  <img src={phoneIcon} width={25} height={20} />
                  <p className="text-[17px]">
                    <b>{phone}</b>
                  </p>
                </div>
              </div>
              <button
                onClick={() => setPasswordDialog(true)}
                className="w-full m-3 bg-black text-white rounded-md p-2"
              >
                {t("change password")}
              </button>
              <button
                onClick={logout}
                className="w-full m-3 border flex border-black rounded-md p-2 items-center justify-center gap-2"
              >
                <img src={exit} width={18} />
                {t("logout")}
              </button>
            </div>
          </div>
          <div className="bg-white rounded-md shadow-md p-2 w-full xl:w-[80vw]">
            <div className="text-[1.25rem] font-bold w-full">
              {t("order history")}
            </div>
            <div>
              {data?.data?.map((order, index) => (
                <div
                  onClick={() => {
                    setOrderDetails(order.order_details);
                    setDetailsDialog(true);
                  }}
                  className="w-full border rounded-md py-2 px-4 mt-2 flex justify-between items-center cursor-pointer"
                >
                  <div>
                    <p className="font-bold text-[20px]">
                      {t("order number")} #{index + 1}
                    </p>
                    <p>
                      {t("total products")}: {order?.order_details?.length}
                    </p>
                    <p>
                      {t("Total")}: {order?.total}₪
                    </p>
                  </div>
                  <div className="text-center flex gap-2">
                    <div>
                      <p className="font-bold">{t("order status")}</p>
                      {order.status === "pending" ? (
                        `${t("pending")}`
                      ) : order.status === "in_progress" ? (
                        `${t("in progress")}`
                      ) : order.status === "done" ? (
                        `${t("done")}`
                      ) : order.status === "delivered" ? (
                        `${t("delivered")}`
                      ) : order.status === "cancelled" ? (
                        `${t("cancelled")}`
                      ) : (
                        <></>
                      )}
                    </div>
                    <div className="flex justify-center items-center">
                      {lng === "ar" ? (
                        <img src={left} width={20} />
                      ) : (
                        <img src={right} width={20} />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Dialog
          open={detailsDialog}
          onClose={() => setDetailsDialog(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className="dialogStyle"
        >
          <DialogHeader>{t("order details")}</DialogHeader>
          <DialogContent>
            {orderDetails.map((item, index) => (
              <Link
                to={`/single-product/${item.product.id}`}
                className="w-[70vw] xl:w-[25vw] flex gap-2"
              >
                <div className="w-[25%]">
                  <img src={item.product.image} />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="font-bold text-lg">
                    {lng === "ar"
                      ? item.product.name_ar
                      : lng === "en"
                      ? item.product.name_en
                      : item.product.name_he}
                  </p>
                  <div className="flex">
                    <p className="text-lg">{item.product.price_nis_retail}₪ </p>x
                    <p className="text-lg"> {item.qty}</p>
                  </div>
                  {typeof item?.selected_color === "object" && (
                    <div className="flex items-center gap-1">
                      {t("color")}: {item?.selected_color?.color_code}{" "}
                      <span
                        style={{
                          backgroundColor: "#fff",
                          borderRadius: "20px",
                          width: "1.5rem",
                          height: "1.5rem",
                          display: "inline-block",
                        }}
                      >
                        <div
                          className="h-full w-full rounded-full"
                          style={{
                            backgroundColor: `${item?.selected_color?.color}`,
                          }}
                        />
                      </span>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </DialogContent>
          <DialogActions className="flex justify-center items-center p-10">
            <button
              onClick={() => {
                setDetailsDialog(false);
              }}
              className="rounded-lg"
              style={{
                marginTop: "1rem",
                width: "25%",

                padding: "0.5rem",
              }}
            >
              <span className="dialogStyle">{t("close")}</span>
            </button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={passwordDialog}
          onClose={() => setPasswordDialog(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className="dialogStyle"
        >
          <DialogHeader>{t("change password")}</DialogHeader>
          <DialogContent>
            <div className="w-[25vw]">
              <InputCom
                label={t("old password")}
                type="password"
                value={oldPassword}
                placeholder={t("enter old password")}
                inputHandler={(e) => setOldPassword(e.target.value)}
              />
              <InputCom
                label={t("new password")}
                type="password"
                value={newPassword}
                placeholder={t("enter new password")}
                inputHandler={(e) => setNewPassword(e.target.value)}
              />
              <InputCom
                label={t("confirm new password")}
                type="password"
                value={newPasswordConfirmation}
                placeholder={t("confim new password")}
                inputHandler={(e) => setNewPasswordConfirmation(e.target.value)}
              />
            </div>
            {isPasswordConfirmed === true && (
              <div className="text-qgreen">{t("password confirmed")}</div>
            )}
            {isPasswordConfirmed === false && (
              <div className="text-qred">{t("password not confirmed")}</div>
            )}
            {isOldPasswordCorrect === false && 
            <div className=" w-full text-qred text-cetner">
              {t("old password is incorrect")}
            </div>}
          </DialogContent>
          <DialogActions className="flex justify-center items-center p-10">
            <button
              className="rounded-lg"
              style={
                isPasswordConfirmed
                  ? {
                      backgroundColor: "#1d1d1d",
                      marginTop: "1rem",
                      width: "25%",
                      color: "white",
                      padding: "0.5rem",
                    }
                  : {
                      backgroundColor: "#4d4d4d",
                      marginTop: "1rem",
                      width: "25%",
                      color: "white",
                      padding: "0.5rem",
                    }
              }
              disabled={isPasswordConfirmed === false}
              onClick={() => {
                changePassword();
              }}
            >
              {t("save")}
            </button>
            <button
              onClick={() => {
                setPasswordDialog(false);
              }}
              className="rounded-lg"
              style={{
                marginTop: "1rem",
                width: "25%",

                padding: "0.5rem",
              }}
            >
              <span className="dialogStyle">{t("close")}</span>
            </button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={userDialog}
          onClose={() => setUserDialog(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className="dialogStyle"
        >
          <DialogHeader>{t("edit user info")}</DialogHeader>
          <DialogContent>
            <div className="w-[25vw]">
              <InputCom
                label={t("Name")}
                type="text"
                value={customerName}
                inputHandler={(e) => setCustomerName(e.target.value)}
              />
              <InputCom
                label={t("Phone")}
                type="text"
                value={customerPhone}
                inputHandler={(e) => setCustomerPhone(e.target.value)}
              />
            </div>
          </DialogContent>
          <DialogActions className="flex justify-center items-center p-10">
            <button
              className="rounded-lg"
              style={{
                backgroundColor: "#1d1d1d",
                marginTop: "1rem",
                width: "25%",
                color: "white",
                padding: "0.5rem",
              }}
              onClick={() => {
                editUserData();
                setUserDialog(false);
              }}
            >
              {t("save")}
            </button>
            <button
              onClick={() => {
                setUserDialog(false);
              }}
              className="rounded-lg"
              style={{
                marginTop: "1rem",
                width: "25%",

                padding: "0.5rem",
              }}
            >
              <span className="dialogStyle">{t("close")}</span>
            </button>
          </DialogActions>
        </Dialog>
      </LayoutHomeTwo>
    </>
  );
}
