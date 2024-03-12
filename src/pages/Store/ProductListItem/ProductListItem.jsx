import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
// import PageAnimator from "../../../components/PageAnimator";
import "./ProductListItem.css";

function ProductListItem({ product, category }) {
  const { id, name, imageUrl, formattedPrice } = product;
  return (
    // <PageAnimator>
    <motion.div
      className="Product"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.75,
      }}
    >
      <div className="img-container">
        <Link to={`/store/${category}/${id}`}>
          <img src={imageUrl} alt={name} />
        </Link>
      </div>

      <div className="Product-lower">
        <Link to={`/store/${category}/${id}`}>
          <h5 className="name">{name}</h5>
        </Link>
        <div className="price">{formattedPrice}</div>
      </div>
    </motion.div>
    // </PageAnimator>
  );
}

export default ProductListItem;
