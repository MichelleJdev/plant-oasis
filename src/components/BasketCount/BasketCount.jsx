import React from "react";
import { BiBasket } from "react-icons/bi";
import ClipLoader from "react-spinners/ClipLoader";
import "./BasketCount.css";
const override = {
  display: "block",
  margin: "0 auto",
  height: "0.75rem",
  width: "0.75rem",
};
function BasketCount({ quantity, color, loading }) {
  const textColor = color || "inherit";
  return (
    <span className="BasketCount" style={{ color: textColor }}>
      <BiBasket />
      <span className="BasketCount-qty">
        {loading ? (
          <ClipLoader
            cssOverride={override}
            loading={loading}
            color="rgb(200, 192, 192)"
          />
        ) : (
          quantity
        )}
      </span>
    </span>
  );
}

export default BasketCount;
