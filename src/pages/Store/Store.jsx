import { useState, useEffect, useRef } from "react";
import {
  useSearchParams,
  useLocation,
  useParams,
  useNavigate,
} from "react-router-dom";
import ProductListItem from "./ProductListItem/ProductListItem.jsx";
import SortAndFilter from "./SortAndFilter/SortAndFilter.jsx";
import PageSelector from "./PageSelector/PageSelector.jsx";
import useScrollTop from "../../hooks/useScrollTop.js";

import truncateString from "../../utils/truncateString.js";

import Footer from "../../components/Layout/Footer/Footer.jsx";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs.jsx";
import { toast } from "react-toastify";
import axios from "../../api/axiosInstance";
import { SERVER_ERROR_MSG } from "../../data/data.js";
import "./Store.css";

// TODO - ensure category exists
const SERVER_ENDPOINT = "/products";

function Store() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const productsList = useRef();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams({
    pageNum: 1,
    pageSize: 6,
    // category: "Plants",
  });
  const { category } = useParams();
  // const category = searchParams.get("category");
  const pageSize = searchParams.get("pageSize");
  const pageNum = searchParams.get("pageNum");

  const [metaData, setMetaData] = useState({
    totalProducts: 0,
    totalPages: 0,
  });

  const crumbs = [
    {
      text: "Store",
      link: "/",
    },
    {
      text: category,
      link: `/store/${category}`,
    },
  ];

  useScrollTop();

  useEffect(() => {
    const controller = new AbortController();
    const getProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${SERVER_ENDPOINT}/${category}?pageSize=${pageSize || 6}&page=${
            pageNum || 1
          }`,
          {
            signal: controller.signal,
          }
        );
        setProducts(response.data.products);
        setMetaData(response.data.metaData);
        setLoading(false);
      } catch (error) {
        if (error.response?.status === 404) {
          navigate("/not-found");
        }
        setLoading(false);
      }
    };

    getProducts();
    return () => controller.abort();
  }, [searchParams, category, pageNum, pageSize, navigate]);

  return (
    <>
      <div className="Store">
        <Breadcrumbs crumbs={crumbs} />

        <section className="products-section" ref={productsList}>
          <SortAndFilter
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            metaData={metaData}
          />
          <h1 className="banner">{category}</h1>
          <div className="products-container">
            {loading
              ? "Loading products..."
              : products.length === 0
              ? "0 products to display"
              : products.map((product) => (
                  <ProductListItem
                    key={product._id}
                    product={product}
                    category={category}
                  />
                ))}
          </div>
        </section>
        <PageSelector
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          metaData={metaData}
        />
      </div>
      <Footer />
    </>
  );
}

export default Store;
