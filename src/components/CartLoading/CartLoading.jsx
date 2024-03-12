import React from "react";
import { BiBasket } from "react-icons/bi";
import PulseLoader from "react-spinners/PulseLoader";
import "./CartLoading.css";
function CartLoading() {
  return (
    <div className="CartLoading">
      <p>Let's see what's in your basket</p>
      <BiBasket />
      <PulseLoader />
    </div>
  );
}

export default CartLoading;
