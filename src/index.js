import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

import { AuthProvider } from "./auth/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { GlobalProvider } from "./contexts/GlobalContext";
import PersistLogin from "./auth/components/PersistLogin";
import PersistCart from "./components/PersistCart/PersistCart";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

if (process.env.NODE_ENV === "production") disableReactDevTools();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <GlobalProvider>
        <AuthProvider>
          <PersistLogin>
            <CartProvider>
              <PersistCart>
                <App />
              </PersistCart>
            </CartProvider>
          </PersistLogin>
        </AuthProvider>
      </GlobalProvider>
    </Router>
  </React.StrictMode>
);
