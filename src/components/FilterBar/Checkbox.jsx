export const FilterCheckBox = ({ label, checked, onChange, id }) => {
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
              class="flex items-center cursor-pointer relative"
              for={id}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                class="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-gradient-to-tr checked:from-main-color checked:to-main-color/60 checked:border-main-color/50"
                id={id}
              />
              <span class="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-width="1"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </span>
            </label>
            <label
              class="cursor-pointer ml-2 text-slate-600 text-sm font-semibold mx-1"
              for={id}
            >
              {label}
            </label>
          </div>
        </label>
      </div>
    );
  };
  