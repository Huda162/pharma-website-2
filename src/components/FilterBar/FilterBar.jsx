import { useState } from "react";
import { useTranslation } from "react-i18next";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { FilterCheckBox } from "./Checkbox";
import AppSelect from "./FilterSelect";
import useFetchData from "../../hooks/fetchData";

// Chip component for filter options
const FilterChip = ({ label, isSelected, onClick, disabled = false }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`
        px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
        border-2 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-main-color/50
        ${
          isSelected
            ? "bg-main-color text-white border-main-color shadow-sm"
            : "bg-white/50 text-gray-700 border-gray-300 hover:border-main-color hover:text-main-color hover:bg-main-color/5"
        }
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
      `}
    >
      {label}
    </button>
  );
};

// Multi-select chip group component
const ChipGroup = ({
  items,
  selectedItems,
  onToggle,
  translationKey,
  canSelectMultiple = true,
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <FilterChip
          key={item}
          label={t(item) || item}
          isSelected={selectedItems.includes(item)}
          onClick={() => onToggle(item)}
        />
      ))}
    </div>
  );
};

export default function FilterBar({
  minValue,
  maxValue,
  setValue,
  selectedValue,
  sortKeys,
  checkKey,
  applyFilters,
  withCategories = false,
  categories,
  handleCategorySelect,
  mainCategory,
  selectedCategory,
  selectedAgeGroups,
  setSelectedAgeGroups,
  selectedSeasons,
  setSelectedSeasons,
  selectedGender,
  setSelectedGender,
}) {
  const [showFilters, setShowFilters] = useState(false);
  const [hoveredMaterial, setHoveredMaterial] = useState(null);

  const changePrice = (selValue) => {
    setValue(selValue);
  };

  const lang = localStorage.getItem("i18nextLng");
  const { t } = useTranslation();

  // Define filter options
  const ageGroups = ["0-3", "3-6", "6-9", "9-12", "12-18", "18-24", "3y", "4y"];
  const seasons = ["spring", "summer", "autumn", "winter"];
  const genders = ["male", "female"];

  // Handle multiple selection for age groups
  const handleAgeGroupToggle = (ageGroup) => {
    setSelectedAgeGroups((prev) => {
      if (prev.includes(ageGroup)) {
        return prev.filter((item) => item !== ageGroup);
      } else {
        return [...prev, ageGroup];
      }
    });
  };

  // Handle multiple selection for seasons
  const handleSeasonToggle = (season) => {
    setSelectedSeasons((prev) => {
      if (prev.includes(season)) {
        return prev.filter((item) => item !== season);
      } else {
        return [...prev, season];
      }
    });
  };

  // Handle single selection for gender (chips with exclusive selection)
  const handleGenderChange = (gender) => {
    setSelectedGender(selectedGender === gender ? null : gender);
  };

  // Handle gender chip click (toggle)
  const handleGenderToggle = (gender) => {
    if (selectedGender === gender) {
      setSelectedGender(null); // Deselect if clicking the same chip
    } else {
      setSelectedGender(gender); // Select new gender
    }
  };

  const clearAgeGroups = () => setSelectedAgeGroups([]);
  const clearSeasons = () => setSelectedSeasons([]);
  const clearGender = () => setSelectedGender(null);

  const clearAllFilters = () => {
    clearAgeGroups();
    clearSeasons();
    clearGender();
  };

  return (
    <>
      <div
        className="xl:w-[25%] lg:w-[25%] h-fit sm:w-full hidden xl:block lg:block md:hidden bg-gradient-to-tr from-white via-secondary-color/10 to-secondary-color/50 rounded rounded-md shadow shadow-lg px-2"
        style={{ marginLeft: "2rem" }}
      >
        <div className="">
          {withCategories && (
            <div className="pb-6 border-b border-gray-200">
              <h3 className="text-lg font-medium mb-3">{t("filter")}</h3>
              <div className="p-2">
                <AppSelect
                  id="select"
                  onChange={handleCategorySelect}
                  label={t("filter")}
                  options={[
                    { value: "", label: `${t("all")}` },
                    ...categories?.categories.map((item) => ({
                      value: item.id,
                      label:
                        lang === "ar"
                          ? item.name_ar
                          : lang === "en"
                          ? item.name_en
                          : item.name_he,
                    })),
                  ]}
                  value={selectedCategory}
                />
              </div>
            </div>
          )}

          <div className="py-6 border-b border-gray-200  rounded-lg shadow-md bg-white/50 p-5">
            <h3 className="text-lg mb-3 font-bold">{t("Price")}</h3>
            <div className="flex gap-4 mb-4">
              <div className="flex-1">
                <label
                  htmlFor="min"
                  className="block text-sm text-gray-600 mb-1"
                >
                  {t("from")}
                </label>
                <div className="border rounded-lg p-2 flex items-center">
                  <span className="mr-2">₪</span>
                  <input
                    readOnly
                    id="min"
                    value={selectedValue[0]}
                    className="w-full outline-none bg-white/50"
                  />
                </div>
              </div>
              <div className="flex-1">
                <label
                  htmlFor="max"
                  className="block text-sm text-gray-600 mb-1"
                >
                  {t("to")}
                </label>
                <div className="border rounded-lg p-2 flex items-center">
                  <span className="mr-2">₪</span>
                  <input
                    readOnly
                    id="max"
                    value={selectedValue[1]}
                    className="w-full outline-none bg-white/50"
                  />
                </div>
              </div>
            </div>
            <div className="px-2">
              <div className="px-2 py-4">
                <Slider
                  range
                  reverse={lang === "en" ? false : true}
                  min={minValue}
                  max={maxValue}
                  value={selectedValue}
                  onChange={changePrice}
                  trackStyle={[
                    {
                      backgroundColor: "#b58640",
                      height: 4,
                    },
                  ]}
                  handleStyle={[
                    {
                      borderColor: "#b58640",
                      backgroundColor: "#fff",
                      borderWidth: 2,
                      width: 20,
                      height: 20,
                      marginTop: -8,
                      boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                      opacity: 1,
                    },
                    {
                      borderColor: "#b58640",
                      backgroundColor: "#fff",
                      borderWidth: 2,
                      width: 20,
                      height: 20,
                      marginTop: -8,
                      boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                      opacity: 1,
                    },
                  ]}
                  railStyle={{
                    backgroundColor: "#e5e7eb",
                    height: 4,
                  }}
                  dotStyle={{
                    display: "none",
                  }}
                  activeDotStyle={{
                    display: "none",
                  }}
                />
                <div className="flex justify-between text-sm text-gray-600 mt-3">
                  <span>₪{selectedValue[0]}</span>
                  <span>₪{selectedValue[1]}</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                applyFilters();
                setShowFilters(false);
              }}
              className="w-full bg-main-color text-white py-3 rounded-lg hover:bg-main-color/80 transition-colors font-medium"
            >
              {t("apply")}
            </button>
          </div>

          <div className="my-3 rounded-lg shadow-md bg-white/50 p-5">
            <h3 className="text-lg font-bold mb-3">{t("sort")}</h3>
            <div className="space-y-3">
              <FilterCheckBox
                label={t("most ordered")}
                checked={sortKeys.most_ordered === true}
                onChange={() => checkKey("most_ordered")}
                id="most_ordered"
              />
              <FilterCheckBox
                label={t("highest price")}
                checked={sortKeys.sort_desc === true}
                id="sort_desc"
                onChange={() => checkKey("sort_desc")}
              />
              <FilterCheckBox
                label={t("lowest price")}
                checked={sortKeys.sort_asc === true}
                id="sort_asc"
                onChange={() => checkKey("sort_asc")}
              />
              <FilterCheckBox
                label={t("latest")}
                checked={sortKeys.latest === true}
                id="latest"
                onChange={() => checkKey("latest")}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="lg:hidden block fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center justify-center gap-2 bg-main-color text-white py-3 px-4 rounded-full shadow-lg hover:bg-secondary-color/90 transition-colors"
        >
          {showFilters ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="#ffffff"
              viewBox="0 0 256 256"
            >
              <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
            </svg>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="#ffffff"
                viewBox="0 0 256 256"
              >
                <path d="M230.6,49.53A15.81,15.81,0,0,0,216,40H40A16,16,0,0,0,28.19,66.76l.08.09L96,139.17V216a16,16,0,0,0,24.87,13.32l32-21.34A16,16,0,0,0,160,194.66V139.17l67.74-72.32.08-.09A15.8,15.8,0,0,0,230.6,49.53ZM40,56h0Zm106.18,74.58A8,8,0,0,0,144,136v58.66L112,216V136a8,8,0,0,0-2.16-5.47L40,56H216Z"></path>
              </svg>{" "}
              <span>{t("filter")}</span>
            </>
          )}
        </button>
      </div>

      <div
        className={`fixed inset-0 z-30 transform transition-transform duration-300 ease-in-out ${
          showFilters ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div
          className="absolute inset-0 bg-opacity-50"
          onClick={() => setShowFilters(false)}
        ></div>
        <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">{t("filter")}</h2>
              <button
                onClick={() => setShowFilters(false)}
                className="text-gray-500 hover:text-black"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="#000000"
                  viewBox="0 0 256 256"
                >
                  <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
                </svg>{" "}
              </button>
            </div>

            {withCategories && (
              <div className="pb-6 border-b border-gray-200">
                <h3 className="text-lg font-medium mb-3">{t("filter")}</h3>
                <div className="p-2">
                  <AppSelect
                    id="select"
                    onChange={handleCategorySelect}
                    label={t("filter")}
                    options={[
                      { value: "", label: `${t("all")}` },
                      ...categories?.categories.map((item) => ({
                        value: item.id,
                        label:
                          lang === "ar"
                            ? item.name_ar
                            : lang === "en"
                            ? item.name_en
                            : item.name_he,
                      })),
                    ]}
                    value={selectedCategory}
                  />
                </div>
              </div>
            )}

            <div className="py-6 border-b border-gray-200">
              <h3 className="text-lg font-medium mb-3">{t("Price")}</h3>
              <div className="flex gap-4 mb-4">
                <div className="flex-1">
                  <label
                    htmlFor="min"
                    className="block text-sm text-gray-600 mb-1"
                  >
                    {t("from")}
                  </label>
                  <div className="border rounded-lg p-2 flex items-center">
                    <span className="mr-2">₪</span>
                    <input
                      id="min"
                      value={selectedValue[0]}
                      className="w-full outline-none"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="max"
                    className="block text-sm text-gray-600 mb-1"
                  >
                    {t("to")}
                  </label>
                  <div className="border rounded-lg p-2 flex items-center">
                    <span className="mr-2">₪</span>
                    <input
                      id="max"
                      value={selectedValue[1]}
                      className="w-full outline-none"
                    />
                  </div>
                </div>
              </div>
              <div className="px-2">
                <div className="px-2 py-4">
                  <Slider
                    range
                    min={1}
                    max={2000}
                    value={selectedValue}
                    onChange={changePrice}
                    trackStyle={[
                      {
                        backgroundColor: "#b58640",
                        height: 4,
                      },
                    ]}
                    handleStyle={[
                      {
                        borderColor: "#b58640",
                        backgroundColor: "#fff",
                        borderWidth: 2,
                        width: 20,
                        height: 20,
                        marginTop: -8,
                        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                        opacity: 1,
                      },
                      {
                        borderColor: "#b58640",
                        backgroundColor: "#fff",
                        borderWidth: 2,
                        width: 20,
                        height: 20,
                        marginTop: -8,
                        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                        opacity: 1,
                      },
                    ]}
                    railStyle={{
                      backgroundColor: "#e5e7eb",
                      height: 4,
                    }}
                    dotStyle={{
                      display: "none",
                    }}
                    activeDotStyle={{
                      display: "none",
                    }}
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-3">
                    <span>₪{selectedValue[0]}</span>
                    <span>₪{selectedValue[1]}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="py-6">
              <h3 className="text-lg font-medium mb-3">{t("sort")}</h3>
              <div className="space-y-3">
                <FilterCheckBox
                  label={t("most ordered")}
                  checked={sortKeys.most_ordered === true}
                  onChange={() => checkKey("most_ordered")}
                  id="most_ordered"
                />
                <FilterCheckBox
                  label={t("highest price")}
                  checked={sortKeys.sort_desc === true}
                  id="sort_desc"
                  onChange={() => checkKey("sort_desc")}
                />
                <FilterCheckBox
                  label={t("lowest price")}
                  checked={sortKeys.sort_asc === true}
                  id="sort_asc"
                  onChange={() => checkKey("sort_asc")}
                />
                <FilterCheckBox
                  label={t("latest")}
                  checked={sortKeys.latest === true}
                  id="latest"
                  onChange={() => checkKey("latest")}
                />
              </div>
            </div>

            <button
              onClick={() => {
                applyFilters();
                setShowFilters(false);
              }}
              className="w-full bg-main-color text-white py-3 rounded-lg hover:bg-main-color/80 transition-colors font-medium"
            >
              {t("apply")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
