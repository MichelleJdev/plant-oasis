import React from "react";
import { MdOutlineChevronLeft, MdOutlineChevronRight } from "react-icons/md";
import "./PageSelector.css";

function PageSelector({ searchParams, setSearchParams, metaData }) {
  const pages = Array.from({ length: metaData.totalPages }, (_, i) => i + 1);
  const previousDisabled = parseInt(searchParams.get("pageNum")) <= 1;
  const nextDisabled = parseInt(searchParams.get("pageNum")) >= pages.length;

  const handlePageSelect = (pageNum) => {
    return () => {
      setSearchParams({
        pageSize: searchParams.get("pageSize"),
        pageNum,
        // category: searchParams.get("category"),
      });
    };
  };

  const goToPrevious = () => {
    if (previousDisabled) return;
    setSearchParams({
      pageSize: searchParams.get("pageSize"),
      pageNum: parseInt(searchParams.get("pageNum")) - 1,
      // category: searchParams.get("category"),
    });
  };
  const goToNext = () => {
    if (nextDisabled) return;
    setSearchParams({
      pageSize: searchParams.get("pageSize"),
      pageNum: parseInt(searchParams.get("pageNum")) + 1,
      // category: searchParams.get("category"),
    });
  };

  return (
    <footer className="PageSelector">
      <div className="PageSelector-container">
        <ul className="page-numbers">
          <li key="previous">
            <button
              className={
                previousDisabled ? "btn-disabled page-btn" : "page-btn"
              }
              onClick={goToPrevious}
            >
              <MdOutlineChevronLeft />
            </button>
          </li>

          {pages.map((pageNum) => (
            <li key={pageNum}>
              <button
                className={`${
                  searchParams.get("pageNum") == pageNum
                    ? "current page-btn"
                    : "page-btn"
                }`}
                onClick={handlePageSelect(pageNum)}
              >
                {pageNum}
              </button>
            </li>
          ))}

          <li key="next">
            <button
              className={nextDisabled ? "btn-disabled page-btn" : "page-btn"}
              onClick={goToNext}
            >
              <MdOutlineChevronRight />
            </button>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default PageSelector;
