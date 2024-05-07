import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./SaveToFavouritesBtn.css";
import { GoHeart } from "react-icons/go";
import useAuth from "../../auth/hooks/useAuth";
import useAxiosPrivate from "../../auth/hooks/useAxiosPrivate";
import { USER_ROUTE } from "../../api/endpoints";
import { toast } from "react-toastify";

const iconStyles = {
  backgroundColor: "green",
};

function SaveToFavouritesBtn({ productId }) {
  const { isAuthenticated, auth, setAuth } = useAuth();
  const isChecked = useMemo(() => {
    if (!isAuthenticated) return false;
    return auth?.favourites?.includes(productId) || false;
  }, [isAuthenticated, auth?.favourites, productId]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasChanged, setHasChanged] = useState(false);

  const navigate = useNavigate();

  const axiosPrivate = useAxiosPrivate();

  const handleChange = () => {
    if (isLoading) return;
    if (!isAuthenticated) {
      toast.info("Login or register to use this feature!");
      navigate("/login");
      return;
    }
    if (!isChecked) {
      const addFavourite = async () => {
        try {
          setIsLoading(true);
          const response = await axiosPrivate.post(
            `${USER_ROUTE}/favourites/${productId}`
          );
          setAuth({ ...auth, favourites: response.data.favourites });
          setIsLoading(false);
          if (!hasChanged) setHasChanged(true);
          console.log(response);
        } catch (error) {
          setIsLoading(false);
          console.log(error);
        }
      };
      addFavourite();
    } else {
      const removeFavourite = async () => {
        try {
          setIsLoading(true);
          const response = await axiosPrivate.delete(
            `${USER_ROUTE}/favourites/${productId}`
          );
          setAuth({ ...auth, favourites: response.data.favourites });
          setIsLoading(false);
          if (!hasChanged) setHasChanged(true);
          console.log(response);
        } catch (error) {
          setIsLoading(false);
          console.log(error);
        }
      };
      removeFavourite();
    }
  };
  return (
    <div className="SaveToFavouritesBtn">
      <input
        onChange={handleChange}
        type="checkbox"
        name="favourite"
        id=""
        checked={isChecked}
      />
      <GoHeart
        className={`icon ${isChecked ? "checked" : "unchecked"} ${
          hasChanged ? "animate " : ""
        }`}
        strokeWidth="1px"
      />
    </div>
  );
}

export default SaveToFavouritesBtn;
