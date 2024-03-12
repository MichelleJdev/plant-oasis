import { useEffect, useState, useMemo, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../api/axiosInstance";
import BeatLoader from "react-spinners/BeatLoader";
import ShowHidePassBtn from "../../components/ShowHidePassBtn/ShowHidePassBtn";
import { FaQuestion } from "react-icons/fa";
import Joi from "joi";
import "./Register.css";
import { REGISTER_ROUTE } from "../../api/endpoints";
import {
  SUCCESSFUL_REG_MSG,
  USER_EXISTS_ERROR_MSG,
  REG_ERROR_MSG,
  PASSWORD_HINT,
} from "../../data/data";

const nameSchema = Joi.string()
  .min(1)
  .pattern(/^[A-Za-z]+$/)
  .required();
const emailSchema = Joi.string()
  .email({ tlds: { allow: false } })
  .required();
const passwordSchema = Joi.string()
  .pattern(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  )
  .required();

function Register() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassHint, setShowPassHint] = useState("");

  const navigate = useNavigate();

  const nameRef = useRef();

  const validName = useMemo(() => {
    const { error } = nameSchema.validate(name);
    return !error;
  }, [name]);

  const validEmail = useMemo(() => {
    const { error } = emailSchema.validate(email);
    return !error;
  }, [email]);

  const validPassword = useMemo(() => {
    const { error } = passwordSchema.validate(password);
    return !error;
  }, [password]);

  const validPasswordMatch = useMemo(() => {
    const { error } = passwordSchema.validate(passwordMatch);
    if (!error && password === passwordMatch) return true;
    return false;
  }, [password, passwordMatch]);

  const disabled =
    !validEmail ||
    !validPassword ||
    !validPasswordMatch ||
    !validName ||
    loading;

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  const togglePassHint = (evt) => {
    evt.preventDefault();
    setShowPassHint(!showPassHint);
  };

  const toggleShowPass = (evt) => {
    evt.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (disabled) return;
    const registerUser = async () => {
      try {
        setLoading(true);
        await axiosInstance.post(REGISTER_ROUTE, {
          user: {
            name,
            email: email?.toLowerCase(),
            password,
          },
        });
        setLoading(false);
        toast.success(SUCCESSFUL_REG_MSG);
        navigate("/login");
      } catch (error) {
        if (error.response?.status === 400) {
          toast.error(USER_EXISTS_ERROR_MSG);
        } else {
          toast.error(REG_ERROR_MSG);
          setName("");
          setPassword("");
          setPasswordMatch("");
        }
        setEmail("");
        setLoading(false);
      }
    };
    registerUser();
  };

  const handleNameChange = (evt) => {
    setName(evt.target.value.trim());
  };
  const handleEmailChange = (evt) => {
    setEmail(evt.target.value.trim());
  };
  const handlePasswordChange = (evt) => {
    setPassword(evt.target.value);
  };
  const handlePasswordMatchChange = (evt) => {
    setPasswordMatch(evt.target.value);
  };
  return (
    <div className="Register">
      <div className="container">
        <div className="img-container"></div>
        <div className="form-container">
          <div className="pass-hint">
            <button
              onClick={togglePassHint}
              className={`pass-hint-btn ${showPassHint ? "active" : ""}`}
            >
              <FaQuestion />
            </button>
            {showPassHint ? (
              <p className={`${showPassHint ? "active" : ""}`}>
                {PASSWORD_HINT}
              </p>
            ) : null}
          </div>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="name">First Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={handleNameChange}
                ref={nameRef}
              />
            </div>
            <div className="input-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <div className="input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <ShowHidePassBtn
                  showPassword={showPassword}
                  handleClick={toggleShowPass}
                />
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="password-match">Confirm Password</label>
              <div className="input-container">
                <input
                  className="password"
                  type={showPassword ? "text" : "password"}
                  id="password-match"
                  value={passwordMatch}
                  onChange={handlePasswordMatchChange}
                />
                <ShowHidePassBtn
                  showPassword={showPassword}
                  handleClick={toggleShowPass}
                />
              </div>
            </div>
            <button disabled={disabled} type="submit" className="login-reg-btn">
              {loading ? (
                <BeatLoader color="white" speedMultiplier={0.7} size={13} />
              ) : (
                "Register"
              )}
            </button>
          </form>
          <p className="login-reg-option">
            Already got an account? <Link to="/login">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
