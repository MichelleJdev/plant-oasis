import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useScreenSize from "../../hooks/useScreenSize";
import useCartContext from "../../hooks/useCartContext";
import useAxiosInterceptors from "../../hooks/useAxiosInterceptors";
import PageAnimator from "../../components/PageAnimator";
import truncateString from "../../utils/truncateString";
import Footer from "../../components/Layout/Footer/Footer";
import { motion } from "framer-motion";
import "./ProductPage.css";
import ProductBtnGroup from "../../components/ProductBtnGroup/ProductBtnGroup";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";

const ENDPOINT = "/products";

function ProductPage() {
  const { category, id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const { isDesktop } = useScreenSize();

  const descriptionCharLimit = isDesktop ? 140 : 60;
  const axios = useAxiosInterceptors();

  const { addToCart, getProductQty } = useCartContext();
  const quantity = getProductQty(id);

  const crumbs = [
    {
      text: "Store",
      link: "/",
    },
    {
      text: category,
      link: `/store/${category}`,
    },
    {
      text: product?.name || id,
      link: `/store/${category}/id`,
    },
  ];

  // find category with product id and set name

  useEffect(() => {
    const controller = new AbortController();
    const getProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${ENDPOINT}/details/${id}`, {
          signal: controller.signal,
        });

        setProduct(response.data.product);
        setLoading(false);
      } catch (error) {
        if (error.message === "canceled") return;
        setLoading(false);
      }
    };

    getProduct();

    return () => controller.abort();
  }, [id]);

  // TODO - check for product before rendering
  return (
    <PageAnimator pageName="ProductPage">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Breadcrumbs crumbs={crumbs} />
          <div className="productPage-container">
            <main className="product-showcase">
              <div className="image-container">
                <img src={product.imageUrl} alt="" />
              </div>
              <div className="product-summary">
                <div>
                  <h1 className="product-name">{product.name}</h1>
                  <p className="short-description">
                    {truncateString(
                      descriptionCharLimit,
                      product.description,
                      "..."
                    )}
                    {product.description.length >= descriptionCharLimit && (
                      <span>
                        <a href="#description">read more</a>
                      </span>
                    )}
                  </p>
                </div>

                <div>
                  <p className="product-price">{product.formattedPrice}</p>
                  {quantity === 0 ? (
                    <motion.button
                      className="addTo-btn"
                      onClick={() => addToCart(product.id)}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        duration: 0.5,
                      }}
                    >
                      Add to basket
                    </motion.button>
                  ) : (
                    <ProductBtnGroup id={product.id} />
                  )}
                </div>
              </div>
            </main>
            <section className="description" id="description">
              <h2>Description</h2>
              <p>
                {product.description
                  ? product.description
                  : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam et iste est recusandae laborum. Eos totam aperiam ratione debitis possimus, dolore sint nobis nisi voluptas, dolorem expedita mollitia accusantium ipsa laborum sapiente autem sequi perspiciatis molestiae fuga maiores voluptatibus illum quos iusto necessitatibus. Quasi perspiciatis doloribus officiis eos laborum omnis."}
              </p>
            </section>
          </div>
        </>
      )}
      <Footer />
    </PageAnimator>
  );
}

export default ProductPage;
