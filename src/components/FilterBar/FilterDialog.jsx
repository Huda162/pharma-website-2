import Checkbox from "../Helpers/Checkbox";
import { useTranslation } from "react-i18next";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Input,
  Select,
} from "@material-ui/core";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "../../index.css";
import { FilterCheckBox } from "./Checkbox";
import { FilterRadioButton } from "./Radio";
import filter from "../../../public/assets/images/filter.png";

export default function FilterDialog({
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
  isFiltersOpen,
  setIsFiltersOpen,
}) {
  const changePrice = (selValue) => {
    setValue(selValue);
  };
  const { t } = useTranslation();
  return (
    <div
      className="xl:w-[20%] lg:w-[20%] sm:w-full p-4 rounded-lg shadow-md xl:hidden lg:hidden md:block my-2"
      style={{ backgroundColor: "white", marginLeft: "2rem" }}
    >
      <div className="flex justify-start items-center cursor-pointer" onClick={()=>setIsFiltersOpen(true)}>
        <img src={filter} width={20} />
        {t("filter")}
      </div>
      <Dialog
        open={isFiltersOpen}
        onClose={() => setIsFiltersOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="dialogStyle"
      >
        <DialogContent>
          {withCategories && (
            <div class="pb-10 border-b border-qgray-border mt-3">
              <p style={{ paddingBottom: "1rem", fontWeight: "bold" }}>
                {" "}
                {t("filter")}
              </p>
              <nav class="flex min-w-[240px] flex-col gap-1 p-2">
                <FilterRadioButton
                  labelAr={t("all")}
                  labelEn={t("all")}
                  labelHe={t("all")}
                  selected={selectedCategory === mainCategory}
                  id={mainCategory}
                  onClick={() => handleCategorySelect(mainCategory)}
                />
                {categories.map((category, index) => (
                  <FilterRadioButton
                    labelAr={category.name_ar}
                    labelEn={category.name_en}
                    labelHe={category.name_he}
                    id={category.id}
                    selected={selectedCategory === category.id}
                    onClick={() => handleCategorySelect(category.id)}
                  />
                ))}
              </nav>
            </div>
          )}
          <div className="filter-subject-item pb-10 border-b border-qgray-border mt-3">
            <p style={{ paddingBottom: "1rem", fontWeight: "bold" }}>
              {t("Price")}
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginBottom: "1rem",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="min" className="row mx-1">
                  {t("from")}
                </label>
                <span className="border rounded-lg p-1 flex items-center mx-1">
                  ₪
                  <input
                    id="min"
                    value={selectedValue[0]}
                    style={{ width: "95%" }}
                    className="mx-1"
                  />
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="min" className="row mx-1">
                  {t("to")}
                </label>
                <span className="border rounded-lg p-1 flex items-center mx-1">
                  ₪
                  <input
                    id="min"
                    value={selectedValue[1]}
                    style={{ width: "95%" }}
                    className="mx-1"
                  />
                </span>
              </div>
            </div>
            <div className="price-range mb-1">
              <Slider
                range
                trackStyle={{ backgroundColor: "#1d1d1d" }}
                handleStyle={{ borderColor: "#1d1d1d" }}
                min={1}
                max={2000}
                value={selectedValue}
                onChange={changePrice}
              />
            </div>
          </div>{" "}
          <p style={{ paddingBottom: "1rem", fontWeight: "bold" }}>
            {" "}
            {t("sort")}
          </p>
          <div class="relative flex flex-col rounded-xl bg-white">
            <nav class="flex min-w-[240px] flex-col gap-1 p-2">
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
            </nav>
          </div>
        </DialogContent>
        <DialogActions className="flex justify-content-center">
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
              applyFilters();
              setIsFiltersOpen(false);
            }}
          >
            {t("apply")}
          </button>
          <Button
            onClick={() => {
              setIsFiltersOpen(false);
            }}
            style={{ margin: "0.5rem" }}
          >
            <span className="dialogStyle">{t("cancel")}</span>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
