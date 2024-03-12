import { Outlet } from "react-router-dom";
import Header from "./Header/Header";

import "./Layout.css";

import "react-toastify/dist/ReactToastify.css";

function Layout() {
  return (
    <div className="Layout">
      <Header />
      <Outlet />
    </div>
  );
}

export default Layout;
