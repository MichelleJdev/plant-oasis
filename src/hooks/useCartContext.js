import { useContext } from "react";
import CartContext from "../contexts/CartContext";

function useCartContext() {
  return useContext(CartContext);
}

export default useCartContext;
