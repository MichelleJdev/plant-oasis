import { createContext, useEffect, useState } from "react";
import useAuth from "../auth/hooks/useAuth";
import useAxiosPrivate from "../auth/hooks/useAxiosPrivate";
import axiosInstance from "../api/axiosInstance";
import { toast } from "react-toastify";

import { BASKET_ROUTE_AUTH, BASKET_ROUTE_GUEST } from "../api/endpoints";
import { OUT_OF_STOCK_MSG } from "../data/data";
const createStockMsg = (updatedQuantity) =>
  `Oops, looks like there are only ${updatedQuantity} of these available!`;

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cartInitialized, setCartInitialized] = useState(false);
  const { auth, isAuthenticated } = useAuth();

  const axiosPrivate = useAxiosPrivate();

  // SET INITIAL CART
  useEffect(() => {
    setCartInitialized(false);
    const controller = new AbortController();
    const getUserCart = async () => {
      try {
        setLoading(true);
        const response = await axiosPrivate.get(BASKET_ROUTE_AUTH, {
          signal: controller.signal,
        });

        const stateFormattedCart = response.data?.cart.map((item) => ({
          id: item.product,
          quantity: item.quantity,
        }));
        setCartItems(stateFormattedCart);
        setCartInitialized(true);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    const getLocalCart = () => {
      const localCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItems(localCart);
      setCartInitialized(true);
    };
    if (auth?.accessToken) {
      getUserCart();
    } else {
      getLocalCart();
    }

    return () => controller.abort();
  }, [isAuthenticated]);

  const getProductQty = (id) => {
    const quantity = cartItems.find((item) => item.id === id)?.quantity;
    return quantity || 0;
  };

  // UPDATE CART - AUTH
  const updateCartAuth = async (basketUpdate) => {
    try {
      if (basketUpdate.quantity === 0) {
        setLoading(true);
        const response = await axiosPrivate.delete(
          `${BASKET_ROUTE_AUTH}/${basketUpdate.id}`
        );
        const stateFormattedCart = response.data?.updatedCart?.map((item) => ({
          id: item.product,
          quantity: item.quantity,
        }));
        setCartItems(stateFormattedCart);
        setLoading(false);
      } else {
        setLoading(true);
        const response = await axiosPrivate.patch(BASKET_ROUTE_AUTH, {
          item: basketUpdate,
        });

        const stateFormattedCart = response.data?.updatedCart?.map((item) => ({
          id: item.product,
          quantity: item.quantity,
        }));
        if (response.data.outOfStock) {
          toast.error(OUT_OF_STOCK_MSG);
        }
        if (response.data.quantityChange) {
          toast.info(createStockMsg(response.data.updatedQuantity));
        }

        setCartItems(stateFormattedCart);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // UPDATE CART - GUEST
  const updateCartGuest = async (basketUpdate) => {
    let updatedCart;
    if (basketUpdate.quantity === 0) {
      updatedCart = cartItems.filter((item) => item.id !== basketUpdate.id);
    } else {
      setLoading(true);
      const response = await axiosPrivate.post(BASKET_ROUTE_GUEST, {
        item: basketUpdate,
      });
      const updatedCartItem = response.data.updatedItem;

      if (response.data.outOfStock) {
        updatedCart = cartItems.filter((item) => item.id !== basketUpdate.id);
        toast.error(OUT_OF_STOCK_MSG);
      } else {
        const currentQuantity = getProductQty(updatedCartItem.id);
        if (currentQuantity === 0) {
          updatedCart = [...cartItems, { ...updatedCartItem }];
        } else {
          updatedCart = cartItems.map((item) =>
            item.id !== updatedCartItem.id
              ? item
              : {
                  ...updatedCartItem,
                }
          );
        }
      }
      if (response.data.quantityChange) {
        toast.info(
          `Oops, looks like there are only ${updatedCartItem.quantity} of these available!`
        );
      }
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems([...updatedCart]);
    setLoading(false);
  };

  // ADD TO CART
  const addToCart = (id) => {
    const currentQuantity = getProductQty(id);
    const basketUpdate = { id, quantity: currentQuantity + 1 };

    if (!auth?.accessToken) {
      updateCartGuest(basketUpdate);
    } else {
      updateCartAuth(basketUpdate);
    }
  };

  // SUBTRACT FROM CART
  const decrementProduct = (id) => {
    const currentQuantity = getProductQty(id);
    if (currentQuantity === 0) return;
    const basketUpdate = {
      id,
      quantity: currentQuantity - 1,
    };

    if (!auth?.accessToken) {
      updateCartGuest(basketUpdate);
    } else {
      updateCartAuth(basketUpdate);
    }
  };

  const value = {
    loading,
    cartItems,
    setCartItems,
    addToCart,
    getProductQty,
    decrementProduct,
    cartInitialized,
    setCartInitialized,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;
