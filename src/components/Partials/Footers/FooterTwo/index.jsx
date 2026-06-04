import { Link } from "react-router-dom";
import Facebook from "../../../Helpers/icons/Facebook";
import Instagram from "../../../Helpers/icons/Instagram";
import Youtube from "../../../Helpers/icons/Youtube";
import logo from "../../../../../public/assets/images/logo-white.png";
import useFetchData from "../../../../hooks/fetchData";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { data } = useFetchData("socials");
  const { t } = useTranslation();

  return (
    <footer className="footer-section-wrapper bg-gradient-to-r from-main1-color via-secondary-color to-main1-color">
      <div className="container-x mx-auto pt-[40px] px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          
          <div className="flex justify-center lg:justify-start">
            <Link to="/">
              <img src={logo} alt="logo" className="max-w-[180px] w-full" />
            </Link>

          </div>

          <div className="text-center lg:text-start">
            <h6 className="text-[18px] font-extrabold text-black mb-4">
              {t("About Us")}
            </h6>
            <p className="text-black text-sm leading-6">
              {t(
                "Our mission is to provide our customers with quality products, exceptional service, and an enjoyable shopping experience. We strive to meet the diverse needs of our community by offering a wide range of products."
              )}
            </p>
          </div>

          <div className="text-center lg:text-start">
            <h6 className="text-[18px] font-bold text-black mb-4">
              Pharma Glow
            </h6>
            <ul className="flex flex-col space-y-4">
              <li>
                <Link to="/latest-products">
                  <span className="text-black text-[13px] hover:text-black border-b border-transparent hover:border-white">
                    {t("New Arrivals")}
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/best-seller-products">
                  <span className="text-black text-[13px] hover:text-black border-b border-transparent hover:border-white">
                    {t("Most popular sales")}
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/all-categories">
                  <span className="text-black text-[13px] hover:text-black border-b border-transparent hover:border-white">
                    {t("Our Products")}
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-center lg:text-start">
            <h6 className="text-[18px] font-bold text-black mb-4">
              {t("Useful Links")}
            </h6>
            <ul className="flex flex-col space-y-4">
              <li>
                <Link to="/">
                  <span className="text-black text-[13px] hover:text-black border-b border-transparent hover:border-white">
                    {t("Secure payment")}
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy">
                  <span className="text-black text-[13px] hover:text-black border-b border-transparent hover:border-white">
                    {t("privacy policy")}
                  </span>
                </Link>
              </li>
             
              
            </ul>
          </div>

        </div>
      </div>

      <div className="container-x mx-auto px-4 mt-8">
        <div className="border-t border-black py-5 flex flex-col lg:flex-row justify-between items-center gap-4">

          <div className="flex flex-col sm:flex-row sm:space-x-6 items-center text-center">
            <div className="flex space-x-5 mb-3 sm:mb-0">
              {data?.socials?.map((social) => (
                <Link to={social.url} key={social.name}>
                  {social.name === "instagram" && (
                    <Instagram className="fill-current text-qgray hover:text-black w-6 h-6" />
                  )}
                  {social.name === "facebook" && (
                    <Facebook className="fill-current text-qgray hover:text-black w-6 h-6" />
                  )}
                  {social.name === "tiktok" && (
                    <div className="cursor-pointer text-qgray hover:text-black w-6 h-6">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 448 550"
                      >
                        <path d="M448 209.9a210.1 210.1 0 0 1 -122.8-39.3V349.4A162.6 162.6 0 1 1 185 188.3V278.2a74.6 74.6 0 1 0 52.2 71.2V0h88a121.2 121.2 0 0 0 1.9 22.2 122.2 122.2 0 0 0 63.1 80.2 121.4 121.4 0 0 0 67 20.1z" />
                      </svg>
                    </div>
                  )}
                </Link>
              ))}
            </div>

            <span className="text-[12px] sm:text-base text-black">
              ©{new Date().getFullYear()} {t("All rights reserved")}
            </span>
          </div>
          {t("עולם פרפש בע״מ")}

          <span className="text-[12px] sm:text-base text-black">
            <a
              href="https://perfectadv.ps/"
              target="_blank"
              rel="noreferrer"
              className="font-bold text-black"
            >
              Powered By Perfect Co
            </a>
          </span>

        </div>
      </div>
    </footer>
  );
}
