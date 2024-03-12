import React from "react";
import { NavLink } from "react-router-dom";
import "./DesktopNav.css";
import useAuth from "../../../../auth/hooks/useAuth";
import useScreenSize from "../../../../hooks/useScreenSize";
import { navCategories } from "../../../../data/data";

function DesktopNav() {
  const { auth } = useAuth();
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
      {auth?.isAdmin && (
        <li>
          <NavLink to="/admin">Dashboard</NavLink>
        </li>
      )}
    </ul>
  );
}

export default DesktopNav;
