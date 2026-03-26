import { useState } from "react";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("first");
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };
  return (
    <div className="rounded border w-full mx-auto mt-[60px]">
      <ul className="inline-flex  w-full border-b">
        <li
          className={`px-4 text-gray-800 font-semibold py-2 rounded-t border-t border-r border-l -mb-px ${
            activeTab === "first" ? "bg-qh2-green" : ""
          }`}
        >
          <a onClick={() => handleTabClick("first")}>الوصف</a>
        </li>
        <li
          className={`px-4 text-gray-800 font-semibold py-2 rounded-t border-t border-r border-l -mb-px ${
            activeTab === "second" ? "bg-qh2-green" : ""
          }`}
        >
          <a onClick={() => handleTabClick("second")}>معلومات أكثر</a>
        </li>
      </ul>
      <div id="tab-contents">
        <div
          id="first"
          className={`p-4 ${activeTab === "first" ? "" : "hidden"}`}
        >
          First tab
        </div>
        <div
          id="second"
          className={`p-4 ${activeTab === "second" ? "" : "hidden"}`}
        >
          Second tab
        </div>
      </div>
    </div>
  );
};

export default Tabs;
