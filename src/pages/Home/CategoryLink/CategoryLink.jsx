import React from "react";
import { Link } from "react-router-dom";
import "./CategoryLink.css";

function CategoryLink({ category, navData }) {
  const { id, name, description, imageUrl } = category;
  return (
    <li className="CategoryLink">
      <Link to={navData.route}>
        <div
          className="container"
          style={{
            background: `linear-gradient(to right bottom, rgba(100, 100, 100, 0.3) , rgba(0, 0, 0, 0.9)),url(${imageUrl})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <h2>{name}</h2>
          <p>{description}</p>
        </div>
      </Link>
    </li>
  );
}

export default CategoryLink;
