import React from "react";

const Pagination = ({ links, handlePageClick }) => {
  return (
    <div className="flex justify-center py-4 flex-wrap">
      {links &&
        links.map((item, index) => (
          <button
            className={`px-4 py-2 mx-1 border rounded-md transition-colors 
              ${item.active ? "bg-main-color text-white" : "bg-primarygray text-qblack"} 
              ${item.url == null ? "cursor-not-allowed text-qgray" : "hover:bg-qgraytwo hover:text-white"}`}
            key={index}
            onClick={() => {
              if (item.url) {
                const page = new URL(item.url).searchParams.get("page");
                handlePageClick(Number(page));
              }
            }}
            disabled={item.url == null}
          >
            {item.label === "Next &raquo;" ? (
              <>&raquo;</>
            ) : item.label === "&laquo; Previous" ? (
              <>&laquo;</>
            ) : (
              <>{item.label}</>
            )}
          </button>
        ))}
    </div>
  );
};

export default Pagination;
