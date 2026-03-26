import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function ViewMoreTitle({
  categoryTitle = "",
  className,
  children,
  seeMoreUrl = "",
}) {
  const { t } = useTranslation();

  return (
    <div className={`section-wrapper w-full ${className || ""}`}>
      <div className="container-x mx-auto">
        <div className=" section-title flex xl:justify-between justify-center items-center mb-5 ">
          <div className="flex items-center mt-[20px] mb-[10px] w-[100%]">
            <div className="border-b-2 border-[#EDEDED] w-[10%]"></div>
            <h1 className="sm:text-3xl text-xl font-600 text-qblacktext leading-none text-center w-[31%]">
              {categoryTitle}
            </h1>
            <div className="border-b-2 border-[#EDEDED] xl:w-[60%] md:w-[50%] w-[20%]"></div>
            <div className="ml-[20px] mr-[20px] w-[8%]">
              {" "}
              <Link to={seeMoreUrl}>
                <div rel="noopener noreferrer">
                  <div className="flex justify-center items-center w-[110px] h-[40px] text-slate-900 group rounded-lg hover:text-white relative transition-all duration-300 ease-in-out overflow-hidden cursor-pointer">
                    <div className="flex space-x-1 items-center transition-all duration-300 ease-in-out relative z-10">
                      <span className="text-sm font-600 tracking-wide leading-7 mr-2 	">
                        {t("View More")}
                      </span>
                      <span></span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                    </div>
                    <div
                      style={{
                        transition: `transform 0.25s ease-in-out`,
                      }}
                      className="w-full h-full bg-black absolute top-0 left-0 right-0 bottom-0 transform scale-x-0 group-hover:scale-x-100 origin-[center_left] group-hover:origin-[center_right]"
                    ></div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="border-b-2 border-[#EDEDED] w-[10%] xl:w-[10%] md-w-[10%]"></div>
          </div>

          {/* <img 
              src={border}
              alt=""
              className="w-[200px] xl:w-[200px] mt-[10px] hidden xl:flex"
            /> */}
        </div>

        <div>
          {/* <Link to={seeMoreUrl}>
              <div className="flex space-x-2 items-center">
                <p className="text-base font-600 text-qblack">
                  {t("View More")}{" "}
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                  />
                </svg>
              </div>
            </Link> */}
        </div>
        <div className="section-content">{children && children}</div>
      </div>
    </div>
  );
}
