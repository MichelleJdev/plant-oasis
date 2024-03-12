import React from "react";
import useCartContext from "../../hooks/useCartContext";
import CartLoading from "../CartLoading/CartLoading";

function PersistCart({ children }) {
  const { cartInitialized } = useCartContext();
  return !cartInitialized ? (
    <>
      <CartLoading />
    </>
  ) : (
    children
  );
}

export default PersistCart;
