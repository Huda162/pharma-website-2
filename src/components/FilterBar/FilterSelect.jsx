import { useTranslation } from "react-i18next";

const AppSelect = ({
  id,
  onChange,
  label,
  options,
  value,
  isSearchable = false,
  placeholder = `select an option`,
}) => {
  const { t } = useTranslation();
  const lang = localStorage.getItem("i18nextLng");

  return (
    <div className="my-2">
      <label for={id} class="block mb-2 text-sm font-bold text-tgray">
        {label}
      </label>
      <select
        id={id}
        onChange={onChange}
        value={value}
        class="border font-semibold border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      >
        {options === undefined ? (
          <>
            <option class="text-sm" selected value="">
              {t("all")}
            </option>
            <option value="true">{t("yes")}</option>
            <option value="false">{t("no")}</option>
          </>
        ) : (
          <>
            {options.map((option, index) => (
              <option key={index} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </>
        )}
      </select>
    </div>
  );
};

export default AppSelect;
