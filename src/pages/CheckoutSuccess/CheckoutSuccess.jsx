import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useCartContext from "../../hooks/useCartContext";
import { BiCheckCircle } from "react-icons/bi";
import "./CheckoutSuccess.css";
import ReturnHomeBtn from "../../components/ReturnHomeBtn/ReturnHomeBtn";
import PageAnimator from "../../components/PageAnimator";
import useAuth from "../../auth/hooks/useAuth";
import useAxiosPrivate from "../../auth/hooks/useAxiosPrivate";
import { EMPTY_CART_ROUTE } from "../../api/endpoints";

function CheckoutSuccess() {
  const { setCartItems } = useCartContext();
  const { isAuthenticated } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    if (isAuthenticated) {
      const emptyBasket = async () => {
        const response = await axiosPrivate.post(EMPTY_CART_ROUTE);
      };
      emptyBasket();
    }
    setCartItems([]);
  }, [isAuthenticated]);

  return (
    <PageAnimator>
      <div className="CheckoutSuccess">
        <div className="container">
          <div>
            <h2>
              Checkout Successful <BiCheckCircle />
            </h2>
            <ReturnHomeBtn />
          </div>
        </div>
      </div>
    </PageAnimator>
  );
}

export default CheckoutSuccess;
