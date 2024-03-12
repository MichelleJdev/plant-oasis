import { useEffect } from "react";
import { axiosPrivate } from "../../api/axiosInstance";
import { useNavigate, useLocation } from "react-router-dom";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

function useAxiosPrivate() {
  const { auth, setAuth } = useAuth();

  const refresh = useRefreshToken();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!auth?.accessToken) return;
    // Request Interceptor
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
        }

        return config;
      },
      (err) => Promise.reject(err)
    );

    // Response Inteceptor
    const responseInterceptor = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (err) => {
        const prevRequest = err?.config;
        if (err?.response?.status === 403 && !prevRequest?.sent) {
          try {
            prevRequest.sent = true;
            const newAccessToken = await refresh();
            prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
            return axiosPrivate(prevRequest);
          } catch (error) {
            navigate("/login", { state: { from: location }, replace: true });
            return Promise.reject(error);
          }
        }
        if (err?.response?.status === 403 || err?.response?.status === 401) {
          setAuth(null);
          // toast.info("Signed out");
          localStorage.setItem("persist", JSON.stringify(false));
          navigate("/login", { state: { from: location }, replace: true });
        }
        if (err?.response?.status === 404) {
          navigate("/not-found");
        }
        if (err.message === "canceled") return Promise.reject(err);
        if (err?.response?.status === 500) {
          navigate("/server-error");
        }
        console.log(err);
        return Promise.reject(err);
      }
    );

    // Cleanup
    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptor);
      axiosPrivate.interceptors.response.eject(responseInterceptor);
    };
  }, [refresh, auth, location, setAuth, navigate]);

  return axiosPrivate;
}

export default useAxiosPrivate;
