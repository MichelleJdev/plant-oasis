import React from "react";
import { NavLink } from "react-router-dom";
import "./DesktopNav.css";
import { navCategories } from "../../../../data/data";

function DesktopNav() {
  return (
    <ul className="navigation">
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      {navCategories.map((category) => (
        <li key={category.name}>
          <NavLink to={category.route}>{category.name}</NavLink>
        </li>
      ))}
    </ul>
  );
}

export default DesktopNav;
