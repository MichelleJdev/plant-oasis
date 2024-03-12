import useAuth from "./useAuth";

import axios from "../../api/axiosInstance";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

function useRefreshToken() {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const refresh = async () => {
    try {
      const response = await axios.get("/auth/refresh", {
        withCredentials: true,
      });
      setAuth({
        accessToken: response.data.accessToken,
        isAdmin: response.data.isAdmin,
        name: response.data.name,
        emailAddress: response.data.email,
      });
      return response.data.accessToken;
    } catch (error) {
      localStorage.setItem("persist", JSON.stringify(false));
      setAuth(null);
      toast.info("Signed out");
      // navigate("/login", { state: { from: location }, replace: true });
      return Promise.reject(error);
    }
  };

  return refresh;
}

export default useRefreshToken;
