import { useState, useRef, useEffect } from "react";

const months = [
  { value: "1", label: "January", shortLabel: "Jan" },
  { value: "2", label: "February", shortLabel: "Feb" },
  { value: "3", label: "March", shortLabel: "Mar" },
  { value: "4", label: "April", shortLabel: "Apr" },
  { value: "5", label: "May", shortLabel: "May" },
  { value: "6", label: "June", shortLabel: "Jun" },
  { value: "7", label: "July", shortLabel: "Jul" },
  { value: "8", label: "August", shortLabel: "Aug" },
  { value: "9", label: "September", shortLabel: "Sep" },
  { value: "10", label: "October", shortLabel: "Oct" },
  { value: "11", label: "November", shortLabel: "Nov" },
  { value: "12", label: "December", shortLabel: "Dec" },
];

export default function MonthSelector({ birthMonth, setBirthMonth, t }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedMonth = months.find((month) => month.value === birthMonth);

  return (
    <div className="mb-8">
      <label className="block text-main-color font-semibold mb-4 text-center">
        {t("expected_birth_month")}
      </label>

      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full text-main-color p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white text-center cursor-pointer flex justify-between items-center"
        >
          <span className="flex-1">
            {birthMonth ? t(`${selectedMonth?.label}`) : t("select_month")}
          </span>
          <svg
            className={`w-5 h-5 ml-2 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {isOpen && (
            <div className="absolute z-10 bottom-full mb-2 w-full bg-white border-2 border-gray-200 rounded-lg shadow-lg p-4">
            <div className="grid grid-cols-4 gap-3">
              {months.map((month) => (
                <button
                  key={month.value}
                  type="button"
                  onClick={() => {
                    setBirthMonth(month.value);
                    setIsOpen(false);
                  }}
                  className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all duration-200 ${
                    birthMonth === month.value
                      ? "bg-main-color/10 border-2 border-main-color"
                      : "border border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                  }`}
                >
                  <span className="text-3xl font-bold text-main-color">
                    {month.value}
                  </span>
                  <span className="text-sm text-main-color mt-1">
                    {t(`${month.label}`)}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
