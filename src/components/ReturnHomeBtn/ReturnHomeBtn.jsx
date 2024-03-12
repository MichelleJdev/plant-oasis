import React from "react";
import { useNavigate } from "react-router-dom";
import "./ReturnHomeBtn.css";

function ReturnHomeBtn() {
  const navigate = useNavigate();
  return (
    <button className="ReturnHomeBtn returnBtn" onClick={() => navigate("/")}>
      Return to home
    </button>
  );
}

export default ReturnHomeBtn;
