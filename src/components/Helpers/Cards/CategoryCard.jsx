import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function CategoryCard({ background, title, brands = [] }) {
  const { t } = useTranslation();

  return (
    <div
      className="category-card-wrappwer w-full h-full p-[30px] flex items-center justify-center"
      style={{
        background: `url("https://images.unsplash.com/photo-1527493324787-47372b893452?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzl8fHBlb3BsZSUyMHN1cGVybWFya2V0fGVufDB8fDB8fHww") no-repeat`,
        backgroundSize: "cover",
      }}
    >
      <div>
        <h1 className="text-base font-600 tracking-wide mb-2">{title}</h1>
        <div className="brands-list mb-[7px]">
          {/* <ul>
            {brands.map((brand) => (
              <li key={brand + Math.random()}>
                <Link to="/best-seller-products">
                  <span className="text-sm text-qgray hober:text-qBlack border-b border-transparent hover:border-qblack hover:text-qblack capitalize">
                    {brand}
                  </span>
                </Link>
              </li>
            ))}
          </ul> */}
          <Link to="/best-seller-products" passhref="true">
            <div rel="noopener noreferrer"  >
              <div className="flex justify-center items-center bg-qh5-bwhite w-[160px] h-[52px] group rounded-lg hover:text-white relative transition-all duration-300 ease-in-out overflow-hidden cursor-pointer">
                <div className="flex space-x-1 items-center transition-all duration-300 ease-in-out relative z-10">
                  <span className="text-sm font-600 tracking-wide leading-7 mr-2">
                    {t("Browse more")}
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
          </Link>
        </div>
      </div>
    </div>
  );
}
