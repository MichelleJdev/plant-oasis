import React from "react";
import { BiBasket } from "react-icons/bi";
import useCartContext from "../../hooks/useCartContext";
import ClipLoader from "react-spinners/ClipLoader";
import "./BasketCount.css";
const override = {
  display: "block",
  margin: "0 auto",
  height: "1rem",
  width: "1rem",
};
function BasketCount({ quantity, color }) {
  const { loading, cartItems } = useCartContext();

  const textColor = color || "inherit";
  return (
    <span className="BasketCount" style={{ color: textColor }}>
      {loading ? (
        <ClipLoader cssOverride={override} loading={loading} />
      ) : (
        <>
          <BiBasket />
          <span className="BasketCount-qty">{quantity}</span>
        </>
      )}
    </span>
  );
}

export default BasketCount;
