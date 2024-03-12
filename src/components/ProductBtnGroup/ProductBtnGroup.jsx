import React from "react";
import useCartContext from "../../hooks/useCartContext";
import BasketCount from "../BasketCount/BasketCount";
import { motion } from "framer-motion";
import "./ProductBtnGroup.css";

function ProductBtnGroup({ id }) {
  const { addToCart, decrementProduct, getProductQty } = useCartContext();
  const qty = getProductQty(id);

  return (
    <motion.div
      className="ProductBtnGroup"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.5,
      }}
    >
      <button onClick={() => decrementProduct(id)}>-</button>
      <div className="count">
        <BasketCount quantity={qty} />
      </div>

      <button onClick={() => addToCart(id)}>+</button>
    </motion.div>
  );
}

export default ProductBtnGroup;
