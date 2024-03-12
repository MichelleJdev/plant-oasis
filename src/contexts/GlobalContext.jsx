import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { CATEGORIES_ROUTE } from "../api/endpoints";
import useAxiosInterceptors from "../hooks/useAxiosInterceptors";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [error, setError] = useState(null);

  const axios = useAxiosInterceptors();

  const navData = categories.map((category) => {
    return {
      name: category.name,
      route: `/store/${category.name}?pageNum=1&pageSize=6`,
    };
  });

  const navigate = useNavigate();
  // SET INITIAL CART
  useEffect(() => {
    const controller = new AbortController();
    const getCategories = async () => {
      try {
        setCategoriesLoading(true);
        const response = await axios.get(CATEGORIES_ROUTE, {
          signal: controller.signal,
        });

        setCategories([...response.data]);
        setTimeout(() => setCategoriesLoading(false), 4000);
      } catch (error) {
        console.error(error);
        setError({
          status: error.response?.status,
          message: error.response?.message,
        });
        if (error.response?.status === 500) return navigate("/server-error");

        setCategoriesLoading(false);
      }
    };

    getCategories();

    return () => controller.abort();
  }, [setCategoriesLoading, setCategories]);

  const value = {
    categoriesLoading,
    categories,
    setCategories,
    setCategoriesLoading,
    navData,
    error,
    setError,
  };
  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export default GlobalContext;
