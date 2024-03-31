import { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useCartContext from "../../hooks/useCartContext";
import useAuth from "../../auth/hooks/useAuth";
import axios from "../../api/axiosInstance";
import useAxiosPrivate from "../../auth/hooks/useAxiosPrivate";
import BasketItem from "./BasketItem/BasketItem";
import CartLoading from "../../components/CartLoading/CartLoading";
import PageAnimator from "../../components/PageAnimator";
import ClipLoader from "react-spinners/ClipLoader";
import PulseLoader from "react-spinners/PulseLoader";
import { toast } from "react-toastify";
import {
  SERVER_ERROR_MSG,
  NONE_AVAILABLE_MSG,
  OUT_OF_STOCK_MSG,
  SIGN_IN_MSG,
} from "../../data/data";
import {
  BASKET_SUMMARY_ROUTE,
  SYNC_CART_ROUTE,
  CHECKOUT_ROUTE,
  CHECKOUT_ROUTE_AUTH,
} from "../../api/endpoints";
import "./Basket.css";

const totalLoaderOverride = {
  margin: "0 auto",
  height: "0.75rem",
  width: "0.75rem",
};

function Basket() {
  const { cartItems, setCartItems, loading: cartLoading } = useCartContext();
  const { auth, setAuth, isAuthenticated } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [stockReconciled, setStockReconciled] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [cartDetails, setCartDetails] = useState([]);
  const [cartDetailsLoading, setCartDetailsLoading] = useState(false);
  const [cartDetailsInitialized, setCartDetailsInitialzed] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const cartPriceSum = useMemo(() => {
    if (!cartDetails.length) return 0;
    return parseFloat(
      cartDetails.reduce(
        (acc, curr) => curr.unitAmount * curr.quantity + acc,
        0
      ) / 100
    ).toLocaleString("en-GB", {
      style: "currency",
      currency: "GBP",
    });
  }, [cartDetails]);

  const handleCheckout = async () => {
    if (!cartItems.length) return;
    try {
      let response;
      setCheckoutLoading(true);
      if (isAuthenticated) {
        response = await axiosPrivate.post(CHECKOUT_ROUTE_AUTH, {
          cartItems,
        });
      } else {
        response = await axios.post(CHECKOUT_ROUTE, {
          cartItems,
        });
      }

      window.location.href = response.data.paymentUrl;
    } catch (error) {
      setCheckoutLoading(false);
      if (error.response.message === "no available products") {
        return toast.error(NONE_AVAILABLE_MSG);
      }
      if (isAuthenticated && error.response.status === 404) {
        setAuth(null);
        localStorage.setItem("persist", JSON.stringify(false));
        toast.info(SIGN_IN_MSG);
        navigate("/login", { state: { from: location }, replace: true });
        return;
      }
      toast.error(SERVER_ERROR_MSG);
    }
  };

  useEffect(() => {
    if (!cartItems.length) return setStockReconciled(true);
    const controller = new AbortController();
    if (!stockReconciled) {
      const reconcileCartWithStock = async () => {
        if (isAuthenticated) {
          const reconcileStockAuth = async () => {
            try {
              const response = await axiosPrivate.post(
                `${SYNC_CART_ROUTE}/auth`,
                { cartItems },
                {
                  signal: controller.signal,
                }
              );
              const reconciledCart = response.data?.cart;
              setCartItems([...reconciledCart]);
              setStockReconciled(true);
              if (response.data?.messages?.outOfStock?.length) {
                toast.info(OUT_OF_STOCK_MSG);
              }
            } catch (error) {
              console.log(error);
            }
          };
          reconcileStockAuth();
        } else {
          const reconcileStockGuest = async () => {
            try {
              const response = await axios.post(
                `${SYNC_CART_ROUTE}/guest`,
                {
                  cartItems,
                },
                {
                  signal: controller.signal,
                }
              );
              const revisedCart = response.data?.cart;
              setCartItems([...revisedCart]);
              localStorage.setItem("cart", JSON.stringify(revisedCart));
              setStockReconciled(true);
              if (response.data?.messages?.outOfStock?.length) {
                toast.info(OUT_OF_STOCK_MSG);
              }
            } catch (error) {
              console.log(error);
            }
          };
          reconcileStockGuest();
        }
      };
      reconcileCartWithStock();
    }
    return () => controller.abort();
  }, [
    cartItems,
    stockReconciled,
    auth,
    setCartItems,
    setStockReconciled,
    isAuthenticated,
    axiosPrivate,
  ]);

  useEffect(() => {
    if (!stockReconciled) return;
    if (!cartItems.length) {
      setCartDetails([]);
      setCartDetailsLoading(false);
      setCartDetailsInitialzed(true);
      return;
    }
    const controller = new AbortController();
    const getCartDetails = async () => {
      try {
        setCartDetailsLoading(true);
        const response = await axios.post(
          BASKET_SUMMARY_ROUTE,
          {
            cartItems,
          },
          {
            signal: controller.signal,
          }
        );
        let additionalCartData = response.data?.cartDetails;
        additionalCartData = cartItems.map((item) => {
          const matchedItem = additionalCartData.find(
            (product) => product.id === item.id
          );
          return {
            ...item,
            name: matchedItem.name,
            unitAmount: matchedItem.unitAmount,
            formattedPrice: matchedItem.formattedPrice,
            imageUrl: matchedItem.imageUrl,
            category: matchedItem.category.name,
          };
        });
        setCartDetails([...additionalCartData]);
        setCartDetailsLoading(false);
        setCartDetailsInitialzed(true);
      } catch (error) {
        toast.error(SERVER_ERROR_MSG);
      }
    };
    getCartDetails();
    return () => controller.abort();
  }, [cartItems, stockReconciled]);

  return (
    <PageAnimator>
      <div className="Basket">
        <div className="container">
          {!cartDetailsInitialized ? (
            <CartLoading />
          ) : cartDetails.length === 0 ? (
            <p>Basket Empty</p>
          ) : (
            <>
              <ul className="basket-list">
                {cartDetails.map((item) => (
                  <BasketItem item={item} key={item.id} />
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
      {cartItems.length && (
        <footer className="basket-footer">
          <div className="container">
            <div>
              <div className="total">
                Total:{" "}
                <span>
                  {cartPriceSum}{" "}
                  {cartLoading || cartDetailsLoading ? (
                    <div className="total-loader">
                      <ClipLoader
                        cssOverride={totalLoaderOverride}
                        color="rgb(137, 137, 137)"
                      />
                    </div>
                  ) : null}
                </span>
              </div>
              <button
                className="checkout-btn"
                onClick={handleCheckout}
                disabled={checkoutLoading}
              >
                {checkoutLoading ? (
                  <PulseLoader color="white" size="10" />
                ) : (
                  "Checkout"
                )}
              </button>
            </div>
          </div>
        </footer>
      )}
    </PageAnimator>
  );
}

export default Basket;
