import { useState } from "react";
import LayoutHomeTwo from "../Partials/LayoutHomeTwo";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import logo from "../../../public/assets/images/logo.png";
import { Dialog, DialogActions, DialogContent } from "@material-ui/core";
import loginImage from "../../../public/assets/images/logo.png";
import view from "../../../public/assets/images/view.png";
import hide from "../../../public/assets/images/hide.png";

export default function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const storedLogo = localStorage.getItem("alanaqa_logo") || logo;

  const login = async () => {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const response = await axios.post(
        `https://pharmaglows.com/adminv2/api/login`,
        {
          phone: phone,
          password: password,
        },
        { headers }
      );
      
      if (response.status === 200) {
        const token = response.data.access_token;
        const status = response.data.status;
        const { name, id } = response.data.id;
        localStorage.setItem("alanaqa_access_token", JSON.stringify(token));
        localStorage.setItem("alanaqa_name", JSON.stringify(name));
        localStorage.setItem("alanaqa_id", JSON.stringify(id));
        localStorage.setItem("alanaqa_log_status", JSON.stringify(status));
        navigate("/");
      } else {
        console.log("Invalid login details");
      }
    } catch (error) {
      console.error(error);
      setIsErrorOpen(true);
    }
  };

  return (
    <LayoutHomeTwo childrenClasses="pt-0 pb-0">
      <div className="flex flex-col-reverse lg:flex-row justify-center items-center container-x mx-auto mt-[10vh] p-4">
        {/* Left side - Image */}
        <div className="hidden lg:flex w-1/2 justify-center rounded-md p-3">
          <img
            src={loginImage}
            alt="Login Illustration"
            className="max-w-md rounded rounded-md"
          />
        </div>

        {/* Right side - Login Form */}
        <div className="p-6 w-full lg:w-1/2 max-w-md">
          <div className="text-2xl font-bold w-full text-center mb-6">
            {t("login")}
          </div>

          {/* Phone Input */}
          <label className="block text-sm font-medium text-gray-700">
            {t("Phone")}
          </label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border rounded-lg p-3 w-full text-sm my-2 focus:outline-none focus:ring-2 focus:ring-main-color"
          />

          {/* Password Input */}
          <div className="relative w-full">
            <label className="block text-sm font-medium text-gray-700">
              {t("password")}
            </label>
            <div className="relative">
              <input
                value={password}
                type={showPassword ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
                className="border rounded-lg p-3 w-full text-sm my-2 focus:outline-none focus:ring-2 focus:ring-main-color"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 left-3 flex items-center text-gray-500"
              >
                {showPassword ? (
                  <img src={hide} width={20} />
                ) : (
                  <img src={view} width={20} />
                )}
              </button>
            </div>
          </div>

          {/* <Link
            to="/forgot-password"
            className="text-start text-main-color underline cursor-pointer w-full flex items-center justify-start gap-1 mt-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
              />
            </svg>
            {t("forgot password")}
          </Link> */}

          {/* Login Button */}
          <button
            onClick={login}
            className="w-full my-4 bg-main-color text-white rounded-md p-3 font-semibold hover:bg-opacity-90 transition"
          >
            {t("login")}
          </button>

          {/* Divider */}
          <div className="flex items-center justify-center my-4">
            <div className="border-b border-qgray w-1/4" />
            <div className="mx-2 text-gray-600">
              {t("don't have an account?")}
            </div>
            <div className="border-b border-qgray w-1/4" />
          </div>

          {/* Registration Info */}
          <div className="text-center text-gray-600 my-2">
            {t(
              "an account will be created automatically once you order for the first time"
            )}
          </div>
        </div>
      </div>

      {/* Error Dialog */}
      <Dialog
        open={isErrorOpen}
        onClose={() => setIsErrorOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="dialogStyle"
      >
        <DialogContent>
          <div className="text-center">
            <p>
              {t("phone number or password is incorrect, check and try again")}
            </p>
          </div>
        </DialogContent>
        <DialogActions className="flex justify-center items-center">
          <button
            onClick={() => setIsErrorOpen(false)}
            className="rounded-lg bg-main-color text-white px-4 py-2 hover:bg-opacity-90"
          >
            <span className="dialogStyle">{t("ok")}</span>
          </button>
        </DialogActions>
      </Dialog>
    </LayoutHomeTwo>
  );
}