import React from "react";
import { useNavigate } from "react-router-dom";
import PageAnimator from "../../components/PageAnimator";
import ReturnHomeBtn from "../../components/ReturnHomeBtn/ReturnHomeBtn";
import "./CheckoutCancelled.css";

function CheckoutCancelled() {
  const navigate = useNavigate();
  return (
    <PageAnimator>
      <div className="CheckoutCancelled">
        <div className="container">
          <h4>Checkout cancelled</h4>
          <div className="cancel-btn-group">
            <button
              className="returnToCart returnBtn"
              onClick={() => navigate("/basket")}
            >
              Return to cart
            </button>
            <ReturnHomeBtn />
          </div>
        </div>
      </div>
    </PageAnimator>
  );
}

export default CheckoutCancelled;
