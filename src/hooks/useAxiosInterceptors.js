import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

function useAxiosInterceptors() {
  const navigate = useNavigate();

  useEffect(() => {
    const responseInterceptor = axiosInstance.interceptors.response.use(
      (res) => res,
      (err) => {
        if (err.message === "canceled") {
          return Promise.reject(err);
        }

        if (err.response?.status === 404) {
          navigate("/not-found");
        }

        if (err.response?.status === 500) {
          navigate("/server-error");
        }

        return Promise.reject(err);
      }
    );
    return () => axiosInstance.interceptors.response.eject(responseInterceptor);
  }, []);
  return axiosInstance;
}

export default useAxiosInterceptors;
