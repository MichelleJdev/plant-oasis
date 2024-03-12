import { createContext, useState } from "react";
import axios from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SERVER_ERROR_MSG } from "../data/data";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [logoutLoading, setLogoutLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      setLogoutLoading(true);
      await axios.get("/auth/logout", {
        withCredentials: true,
      });
      localStorage.setItem("persist", JSON.stringify(false));
      setAuth(null);
      setLogoutLoading(false);

      navigate("/");
    } catch (error) {
      toast.error(SERVER_ERROR_MSG);
      setLogoutLoading(false);
      navigate("/");
    }
  };
  const isAuthenticated = !!auth?.accessToken;

  const authState = {
    auth,
    setAuth,
    handleLogout,
    isAuthenticated,
    logoutLoading,
    setLogoutLoading,
  };
  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
