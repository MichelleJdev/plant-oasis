import { useEffect, useState } from "react";
import "./Favourites.css";
import useAxiosPrivate from "../../auth/hooks/useAxiosPrivate";
import ProductListItem from "../../components/ProductListItem/ProductListItem";
import useAuth from "../../auth/hooks/useAuth";
import { USER_ROUTE } from "../../api/endpoints";
import Footer from "../../components/Layout/Footer/Footer";
function Favourites() {
  const [favouritesData, setFavouritesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();

  const { auth } = useAuth();

  useEffect(() => {
    const getFavouritesData = async () => {
      try {
        const response = await axiosPrivate.get(`${USER_ROUTE}/favourites`);
        console.log(response);
        setFavouritesData([...response.data.favouritesData]);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getFavouritesData();
  }, [auth.favourites]);

  return (
    <>
      <div className="Favourites">
        <h1 className="heading">Favourites</h1>
        {favouritesData.length > 0 ? (
          <div className="products-container">
            {favouritesData.map((favourite) => (
              <ProductListItem
                key={favourite._id}
                product={favourite}
                category={favourite.category.name}
              />
            ))}
          </div>
        ) : (
          <div className="container">
            <p>Add your favourite items to view them here.</p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Favourites;
