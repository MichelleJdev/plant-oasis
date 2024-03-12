import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BiUser } from "react-icons/bi";
import { BiMenu } from "react-icons/bi";
import "./DropdownMenu.css";

// ! menuType prop REQUIRED
function DropdownMenu({ children, navItems }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <div className="Dropdown">
      <button className="dropdown-btn" onClick={toggleDropdown}>
        {children}
      </button>
      <div
        className={`dropdown-modal ${isOpen && "open"}`}
        onClick={closeDropdown}
      ></div>
      <ul className={`dropdown-menu ${isOpen && "open"}`}>
        {navItems.map((item) => (
          <li key={item.name}>
            <Link to={item.route}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DropdownMenu;
