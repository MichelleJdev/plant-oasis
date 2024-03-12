import React from "react";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";

function PersistLogin({ children }) {
  const [loading, setLoading] = useState(false);
  const refresh = useRefreshToken();

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("persist")) === true) {
      const getAuthStatus = async () => {
        try {
          setLoading(true);
          await refresh();
          setLoading(false);
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      };
      getAuthStatus();
    }
  }, []);

  return loading ? <h1>loading</h1> : children;
}

export default PersistLogin;
