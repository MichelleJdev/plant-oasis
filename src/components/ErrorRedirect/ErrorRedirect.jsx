import React from "react";
import { Link } from "react-router-dom";
import "./ErrorRedirect.css";

function ErrorRedirect({ status, message }) {
  return (
    <div className="ErrorRedirect">
      <div className="container">
        <h1>{status}</h1>
        <p>{message}</p>
        <button>
          <Link to="/">Return to Home</Link>
        </button>
      </div>
    </div>
  );
}

export default ErrorRedirect;
