import React from "react";
import "./ShowHidePassBtn.css";

import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

function ShowHidePassBtn({ showPassword, handleClick }) {
  return (
    <button className="ShowHidePassword" onClick={handleClick}>
      {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
    </button>
  );
}

export default ShowHidePassBtn;
