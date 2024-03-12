import React from "react";
import { motion } from "framer-motion";

function PageAnimator({ pageName, children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.75,
      }}
      className={pageName}
    >
      {children}
    </motion.div>
  );
}

export default PageAnimator;
