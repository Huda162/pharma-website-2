import { useTranslation } from "react-i18next";

export default function Dialog({ removeItem, closeDialog }) {
  const { t } = useTranslation();

  return (
    <>
      <div className="w-full h-full flex fixed left-0 top-0 justify-center z-40 items-center">
        <div
          // onClick={handler}
          className="w-full h-full fixed left-0 right-0 bg-black bg-opacity-35"
        ></div>
        <div className="md:w-[400px] w-[410px] md:h-[150px] relative z-50 bg-white md:pl-10 pl-3 py-[50px] flex flex-col justify-between  px-[30px]">
          <div className="mt-[40px]">
            <div className="flex justify-between mt-[]">
              {/* <Link to="/cart" passhref="true"> */}
              <div rel="noopener noreferrer" onClick={removeItem}>
                <div className="flex justify-center items-center bg-[#F34336] w-[110px] h-[40px] group rounded-lg hover:text-white relative transition-all duration-300 ease-in-out overflow-hidden cursor-pointer">
                  <div className="flex space-x-1 items-center transition-all duration-300 ease-in-out relative z-10">
                    <span className="text-sm font-600 tracking-wide leading-7 mr-2">
                      {t("Yes, of course")}
                    </span>
                    <span></span>
                  </div>
                  <div
                    style={{
                      transition: `transform 0.25s ease-in-out`,
                    }}
                    className="w-full h-full bg-black absolute top-0 left-0 right-0 bottom-0 transform scale-x-0 group-hover:scale-x-100 origin-[center_left] group-hover:origin-[center_right]"
                  ></div>
                </div>
              </div>
              {/* </Link> */}
              {/* <Link to="/all-categories" passhref="true"> */}
              <div rel="noopener noreferrer" onClick={closeDialog}>
                <div className="flex justify-center items-center bg-qh5-bwhite w-[110px] h-[40px] group rounded-lg hover:text-white relative transition-all duration-300 ease-in-out overflow-hidden cursor-pointer">
                  <div className="flex space-x-1 items-center transition-all duration-300 ease-in-out relative z-10">
                    <span className="text-sm font-600 tracking-wide leading-7 mr-2">
                      {t("Cancel")}
                    </span>
                    <span></span>
                  </div>
                  <div
                    style={{
                      transition: `transform 0.25s ease-in-out`,
                    }}
                    className="w-full h-full bg-black absolute top-0 left-0 right-0 bottom-0 transform scale-x-0 group-hover:scale-x-100 origin-[center_left] group-hover:origin-[center_right]"
                  ></div>
                </div>
              </div>
              {/* </Link> */}
              <div></div>
            </div>
          </div>
          <div className="absolute right-5 top-5 flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              className="w-6 h-6 m-1"
              stroke="#2d6f6d"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
              />
            </svg>
            <h1 className="md:text-[20px] text-xl font-bold text-qblack mb-1 ml-[30px] mr-[10px]  text-qh2-green">
              {t("Are you sure you want to delete this product from the cart?")}
            </h1>
            <svg
              onClick={closeDialog}
              width="30"
              height="30"
              viewBox="0 0 54 54"
              fill="none"
              className="cursor-pointer ml-[20px]"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M26.9399 53.9996C12.0678 53.9827 -0.0210736 41.8265 2.75822e-05 26.912C0.0211287 12.0502 12.1965 -0.0320829 27.115 -0.000426215C41.9703 0.0312305 54.0401 12.2148 54 27.1399C53.9599 41.9447 41.7972 54.0186 26.9399 53.9996ZM18.8476 16.4083C17.6765 16.44 16.9844 16.8705 16.6151 17.7189C16.1952 18.6876 16.3893 19.574 17.1363 20.3253C19.0966 22.2901 21.0252 24.2908 23.0425 26.1965C23.7599 26.874 23.6397 27.2201 23.0045 27.83C21.078 29.6788 19.2148 31.5951 17.3241 33.4797C16.9211 33.8807 16.5581 34.3007 16.4505 34.8853C16.269 35.8835 16.6953 36.8332 17.5456 37.3102C18.4382 37.8124 19.5038 37.6626 20.3394 36.8416C22.3673 34.843 24.3866 32.836 26.3723 30.7994C26.8513 30.3077 27.1298 30.2866 27.6193 30.791C29.529 32.7579 31.4851 34.6784 33.4201 36.6179C33.8463 37.0442 34.2831 37.4431 34.9098 37.5486C35.9184 37.7196 36.849 37.2891 37.3196 36.4259C37.7964 35.5543 37.6677 34.5075 36.8912 33.714C34.9731 31.7555 33.0677 29.7801 31.0631 27.9145C30.238 27.1462 30.3688 26.7474 31.1031 26.053C32.9896 24.2655 34.8022 22.3977 36.6338 20.5511C37.7922 19.384 37.8914 17.9827 36.9081 17.0288C35.9501 16.1002 34.5975 16.2141 33.4623 17.3411C31.5188 19.2743 29.5649 21.199 27.6594 23.1659C27.1446 23.6978 26.8492 23.6957 26.3343 23.1659C24.4267 21.1969 22.4664 19.2806 20.5336 17.3369C19.9997 16.7966 19.4258 16.3661 18.8476 16.4083Z"
                fill="#F34336"
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}
