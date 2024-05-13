import { useState, useRef, useEffect, useMemo } from "react";
import useAuth from "../../auth/hooks/useAuth";
import axios from "../../api/axiosInstance";
import "./Login.css";
import { useLocation, useNavigate } from "react-router-dom";
import Joi from "joi";
import useCartContext from "../../hooks/useCartContext";
import BeatLoader from "react-spinners/BeatLoader";
import ShowHidePassBtn from "../../components/ShowHidePassBtn/ShowHidePassBtn";

import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { SERVER_ERROR_MSG } from "../../data/data";

const LOGIN_ENDPOINT = "/auth/login";

const emailSchema = Joi.string()
  .email({ tlds: { allow: false } })
  .required();

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [keepCart, setKeepCart] = useState(true);
  const [trustDevice, setTrustDevice] = useState(false);

  const { setAuth } = useAuth();
  const { cartItems, setCartItems } = useCartContext();

  const emailRef = useRef();

  const location = useLocation();
  const navigate = useNavigate();

  const validEmail = useMemo(() => {
    const { error } = emailSchema.validate(email);
    console.log(`email validated = ${!error}`);
    return !error;
  }, [email]);

  const redirectUrl = location.state?.from || "/";

  // !! Handle validation
  const validPassword = !!password;

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const disabled = loading || !validPassword || !validEmail;

  const toggleShowPass = (evt) => {
    evt.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (disabled) return;
    try {
      setLoading(true);
      const preservedCartItems =
        cartItems.length >= 1 && keepCart
          ? cartItems.map((item) => ({
              product: item.id,
              quantity: item.quantity,
            }))
          : [];
      const response = await axios.post(
        LOGIN_ENDPOINT,
        {
          user: {
            email,
            password,
            cart: preservedCartItems,
          },
        },
        {
          withCredentials: true,
        }
      );

      const { name, accessToken, isAdmin, emailAddress, favourites } =
        response.data;

      localStorage.setItem("cart", JSON.stringify([]));
      localStorage.setItem("persist", JSON.stringify(trustDevice));
      setLoading(false);
      // setCartInitialized(false);
      setAuth({ name, accessToken, emailAddress, favourites });
      setCartItems([]);
      navigate(redirectUrl);
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        toast.error("Incorrect email or password");
      } else {
        toast.error(SERVER_ERROR_MSG);
      }
      setLoading(false);
    }
  };

  const handleEmailChange = (evt) => {
    setEmail(evt.target.value);
  };
  const handlePasswordChange = (evt) => {
    setPassword(evt.target.value);
  };

  return (
    <div className="Login">
      <div className="container">
        <div className="img-container"></div>
        <div className="form-container">
          {/* <div>
            {JSON.stringify(validEmail) + " " + JSON.stringify(validPassword)}
          </div> */}
          <h1 className="form-text">Enjoy the full user experience.</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                ref={emailRef}
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <div className="input-container">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                  className="password"
                />
                <ShowHidePassBtn
                  showPassword={showPassword}
                  handleClick={toggleShowPass}
                />
              </div>
            </div>

            <button type="submit" className="login-reg-btn" disabled={disabled}>
              {loading ? (
                <BeatLoader color="white" speedMultiplier={0.7} size={13} />
              ) : (
                "Sign In"
              )}
            </button>

            {cartItems.length >= 1 && (
              <div className="cart-checkbox checkbox">
                <label htmlFor="">Keep my basket</label>
                <input
                  type="checkbox"
                  checked={keepCart}
                  onChange={() => setKeepCart((keepVal) => !keepVal)}
                />
              </div>
            )}
            <div className="trust-device checkbox">
              <label htmlFor="trust">Trust this device</label>
              <input
                id="trust"
                type="checkbox"
                checked={trustDevice}
                onChange={() => setTrustDevice((persistVal) => !persistVal)}
              />
            </div>
            <div>
              <p className="login-reg-option">
                Need an account? <Link to="/register">Register</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
