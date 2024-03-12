import React from "react";
import "./SortAndFilter.css";

function SortAndFilter({ searchParams, setSearchParams, metaData }) {
  const handleChange = (evt) => {
    setSearchParams({
      pageNum: 1,
      pageSize: evt.target.value,
      category: searchParams.get("category"),
    });
  };
  return (
    <div className="SortAndFilter">
      <div className="sortFilter-container">
        <div className="perPageSelector">
          <label htmlFor="filter">Items per page</label>
          <select
            name="filter"
            id="filter"
            onChange={handleChange}
            value={searchParams.get("pageSize")}
          >
            <option value="6">6</option>
            <option value="12">12</option>
            <option value="24">24</option>
          </select>
        </div>

        <p className="total-products">Results: {metaData.totalProducts}</p>
      </div>
    </div>
  );
}

export default SortAndFilter;
