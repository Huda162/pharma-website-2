import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
  
export default function SectionTitle({
  categoryTitle = "",
  className,
  children,
}) {
  const { t } = useTranslation();

  return (
    <div className={`section-wrapper w-full ${className || ""}`}>
      <div className="container-x mx-auto">
        <div className=" section-title flex xl:justify-between justify-center items-center mb-5 ">
          <div className="flex items-center mt-[20px] mb-[10px] w-[100%]">
            <div className="border-b-2 border-[#EDEDED] w-[5%]"></div>
            <h1 className="sm:text-3xl text-xl font-600 text-qblacktext leading-none text-center w-[20%]">
              {categoryTitle}
            </h1>
            <div className="border-b-2 border-[#EDEDED] w-[75%]"></div>
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
