import { useMemo } from "react";
import "./Header.css";
import { Link, NavLink } from "react-router-dom";
import siteLogo from "../../../assets/images/siteLogo.png";
import useCartContext from "../../../hooks/useCartContext";
import BasketCount from "../../BasketCount/BasketCount";
import useAuth from "../../../auth/hooks/useAuth";
import useGlobalContext from "../../../hooks/useGlobalContext";
import { IoIosLogOut } from "react-icons/io";
import ClipLoader from "react-spinners/ClipLoader";
import PulseLoader from "react-spinners/PulseLoader";
import { BiUser } from "react-icons/bi";
import { BiMenu } from "react-icons/bi";
import { IoCaretDownSharp } from "react-icons/io5";

import useScreenSize from "../../../hooks/useScreenSize";
// import DesktopNav from "./DesktopNav/DesktopNav";

import DropdownMenu from "./DropdownMenu/DropdownMenu";

function Header() {
  const { cartItems } = useCartContext();
  const { isAuthenticated, handleLogout, logoutLoading } = useAuth();

  const { categoriesLoading, navData } = useGlobalContext();
  const { isDesktop } = useScreenSize();

  const totalInCart = useMemo(
    () => cartItems.reduce((acc, curr) => curr.quantity + acc, 0),
    [cartItems]
  );

  return (
    <header className="Header">
      <nav className="nav-container">
        {!isDesktop && (
          <DropdownMenu navItems={[{ name: "Home", route: "/" }, ...navData]}>
            <BiMenu />
          </DropdownMenu>
        )}

        <Link to="/">
          <img src={siteLogo} alt="logo" className="siteLogo" />
        </Link>
        {isDesktop ? (
          <div className="desktop-links">
            <NavLink to="/">Home</NavLink>
            {categoriesLoading ? (
              <div className="loading-categories">
                <PulseLoader size="8px" color="white" />
              </div>
            ) : (
              <DropdownMenu navItems={navData}>
                <div className="shop-btn">
                  <div>Shop</div> <IoCaretDownSharp />
                </div>
              </DropdownMenu>
            )}
          </div>
        ) : null}

        <div className="nav-right">
          <NavLink to="/basket">
            <BasketCount quantity={totalInCart} />
          </NavLink>
          {isAuthenticated ? (
            <button onClick={handleLogout} className="signOut-btn">
              {logoutLoading ? (
                <PulseLoader size="8px" color="white" />
              ) : (
                <IoIosLogOut />
              )}
            </button>
          ) : (
            <div>
              <NavLink to="/login">Login</NavLink>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
