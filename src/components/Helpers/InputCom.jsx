import { Spinner } from "@material-tailwind/react";
import Lottie from "lottie-react";
import loading_animation from "../../../public/assets/images/loading.json";
import fail_animation from "../../../public/assets/images/fail.json";
import success_animation from "../../../public/assets/images/success.json";

export default function InputCom({
  label,
  type,
  name,
  placeholder,
  children,
  inputHandler,
  value,
  inputClasses,
  labelClasses = "text-qgray text-[13px] font-bold",
  isEmpty,
  isFill,
  required = true,
  isPhone = false,
  isCode = false,
  isLoading = true,
}) {
  const lang = localStorage.getItem("i18nextLng");
  return (
    <div className="input-com w-full h-full">
      {label && (
        <label
          className={`input-label capitalize block mb-2 ${labelClasses}`}
          htmlFor={name}
        >
          {label}{" "}
          {required && (
            <span style={{ color: "red", fontSize: "1rem" }}>*</span>
          )}
        </label>
      )}
      <div
        className={`input-wrapper border ${
          isEmpty ? "bg-[#faeaeb]" : isFill ? "bg-[#ddf9e2]" : "border-gray-400"
        } w-full h-[30px] overflow-hidden relative rounded`}
      >
        {isEmpty ? (
          <div className="absolute top-0 right-0 flex items-center h-full px-2 text-gray-600 text-[13px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#f23047"
              viewBox="0 0 24 24"
              stroke="#f23047"
              className="w-4 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
            {/* {placeholder} */}
          </div>
        ) : (
          ""
        )}
        {isFill ? (
          <div className="absolute top-0 right-0 flex items-center h-full px-2 text-gray-600 text-[13px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 12.75 6 6 9-13.5"
              />
            </svg>

            {/* {placeholder} */}
          </div>
        ) : isCode ? (
          <>
            {" "}
            <div className="absolute left-0 flex items-center justify-center mx-1 h-full w-[10%]">
              {isLoading && (
                <div className="w-[100%] h-full flex items-center justify-center">
                  <Lottie animationData={loading_animation} loop={true} />
                </div>
              )}
            </div>
            <input
              value={value}
              onChange={inputHandler}
              className={`input-field ${
                isEmpty ? "bg-[#faeaeb]" : isFill ? "bg-[#ddf9e2]" : " bg-white"
              } placeholder:text-sm text-sm px-6 text-dark-gray w-full h-full font-normal focus:ring-0 focus:outline-none ${
                inputClasses || ""
              }`}
              type={type}
              id={name}
              placeholder={isEmpty ? placeholder : ""}
            />
          </>
        ) : (
          ""
        )}
        {isPhone ? (
          <div
            className={`input-field ${
              isEmpty ? "bg-[#faeaeb]" : isFill ? "bg-[#ddf9e2]" : " bg-white"
            } placeholder:text-sm flex items-center text-sm px-6 text-dark-gray w-full h-full font-normal focus:ring-0 focus:outline-none flex ${
              lang === "en" && "flex-row-reverse"
            } ${inputClasses || ""}`}
          >
            <input
              value={value}
              onChange={inputHandler}
              className={`input-field ${
                isEmpty ? "bg-[#faeaeb]" : isFill ? "bg-[#ddf9e2]" : " bg-white"
              } placeholder:text-sm ${
                lang === "en" ? "text-start" : "text-end"
              } text-sm px-4 text-dark-gray w-full h-full font-normal focus:ring-0 focus:outline-none ${
                inputClasses || ""
              }`}
              type={type}
              id={name}
              placeholder={isEmpty ? placeholder : ""}
            />

            <div
              className={`border-r border-qgray ${
                lang === "en" ? "ps-0 pe-4" : "ps-4 pe-0"
              }`}
            >
              05
            </div>
          </div>
        ) : (
          <input
            value={value}
            onChange={inputHandler}
            className={`input-field ${
              isEmpty ? "bg-[#faeaeb]" : isFill ? "bg-[#ddf9e2]" : " bg-white"
            } placeholder:text-sm text-sm px-6 text-dark-gray w-full h-full font-normal focus:ring-0 focus:outline-none ${
              inputClasses || ""
            }`}
            type={type}
            id={name}
            placeholder={isEmpty ? placeholder : ""}
          />
        )}
        {children && children}
      </div>
    </div>
  );
}
