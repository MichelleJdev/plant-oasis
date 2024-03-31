import React from "react";
import useCartContext from "../../hooks/useCartContext";
import BasketCount from "../BasketCount/BasketCount";
import { motion } from "framer-motion";
import "./ProductBtnGroup.css";

function ProductBtnGroup({ id }) {
  const {
    addToCart,
    decrementProduct,
    getProductQty,
    loading: cartLoading,
    currentlyUpdating,
  } = useCartContext();
  const qty = getProductQty(id);

  const currentItemLoading = id === currentlyUpdating;

  return (
    <motion.div
      className="ProductBtnGroup"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.5,
      }}
    >
      <button disabled={cartLoading} onClick={() => decrementProduct(id)}>
        -
      </button>
      <div className="count">
        <BasketCount quantity={qty} loading={currentItemLoading} />
      </div>

      <button disabled={cartLoading} onClick={() => addToCart(id)}>
        +
      </button>
    </motion.div>
  );
}

export default ProductBtnGroup;
