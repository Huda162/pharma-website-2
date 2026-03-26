import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import duck from "../../../public/assets/images/duck.png";

export default function PreparationKitBar() {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  return (
    <div className="container mx-auto w-full py-6 px-4">
      <div className="w-full">
        <div className="bg-gradient-to-tr from-main-color/60 via-secondary-color to-main1-color group overflow-hidden rounded-xl md:rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-1">
          <Link to="/preparation" className="block w-full h-full">
            <div className="flex flex-col sm:flex-row items-center justify-between p-6 sm:p-8 gap-6">
              {/* Image and Text Container */}
              <div className="flex items-center gap-4 sm:gap-6 flex-1">
                <div className="flex-shrink-0">
                  <img
                    src={duck}
                    alt="kit"
                    className="h-20 w-20 sm:h-28 sm:w-28 md:h-36 md:w-36 object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-xl sm:text-2xl font-bold text-main-color mb-2">
                    {t("baby preparation kit")}
                  </h3>
                  <p className="text-main-color/90 text-sm sm:text-base leading-relaxed">
                    {t(
                      "Thoughtfully selected essentials to prepare for your baby’s first years."
                    )}
                  </p>
                </div>
              </div>

              <Link to='/preparation' className="flex-shrink-0">
                <div className="flex items-center gap-2 bg-secondary-color text-main-color hover:bg-main-color hover:text-white px-4 py-3 sm:px-6 sm:py-4 rounded-lg font-semibold transition-all duration-300 ease-in-out transform group-hover:scale-105 shadow-md group-hover:shadow-lg border border-main-color">
                  <span className="text-sm sm:text-base">
                    {t("move to baby preparation kit")}
                  </span>
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Link>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
