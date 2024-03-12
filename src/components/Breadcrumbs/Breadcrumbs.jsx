import React from "react";
import { Link } from "react-router-dom";
import "./Breadcrumbs.css";

function Breadcrumbs({ crumbs }) {
  return (
    <div className="Breadcrumbs">
      <div className="container">
        {crumbs.map((crumb) => (
          <Link key={crumb.link} to={crumb.link}>
            {crumb.text}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Breadcrumbs;
