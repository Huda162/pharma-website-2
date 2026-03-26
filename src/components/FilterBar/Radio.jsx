export const FilterRadioButton = ({
  labelAr,
  labelEn,
  labelHe,
  selected,
  onClick,
  id,
}) => {
  const lang = localStorage.getItem("i18nextLng");

  return (
    <div
      role="button"
      class="flex w-full items-center rounded-lg p-0 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
    >
      <label
        for={id}
        class="flex w-full cursor-pointer items-center px-3 py-2"
      >
        <div class="inline-flex items-center">
          <label
            class="relative flex items-center cursor-pointer"
            for={id}
          >
            <input
              // name="framework"
              type="radio"
              checked={selected}
              onClick={onClick}
              value={id}
              class="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-slate-400 transition-all"
              id={id}
            />
            <span class="absolute bg-slate-800 w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
          </label>
          <label
            class="ml-2 text-slate-600 cursor-pointer text-sm mx-1"
            for={id}
          >
            {lang === "ar" ? labelAr : lang === "en" ? labelEn : labelHe}
          </label>
        </div>
      </label>
    </div>
  );
};
