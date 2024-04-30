import { Link } from "react-router-dom";
import "./Home.css";

import ClipLoader from "react-spinners/ClipLoader";
import CategoryLink from "./CategoryLink/CategoryLink";
import useScrollTop from "../../hooks/useScrollTop";
import useGlobalContext from "../../hooks/useGlobalContext";
import Footer from "../../components/Layout/Footer/Footer";
import SkeletonLinks from "./SkeletonLinks/SkeletonLinks";
import { IoMdHeartEmpty, IoMdStarOutline } from "react-icons/io";
import { IoBagCheckOutline } from "react-icons/io5";

const defineGridLayout = (length) => {
  if (length % 4 === 1) return "one";
  if (length % 4 === 2) return "two";
  if (length % 4 === 3) return "three";
  if (length % 4 === 0) return "four";
};

function Home() {
  const { categories, categoriesLoading, navData } = useGlobalContext();
  useScrollTop();

  const extractNavData = (cat) =>
    navData.find((data) => data.name === cat.name);
  return (
    <>
      <div className="Home">
        <section className="hero">
          <div className="container">
            <h1>The Garden Hub</h1>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Reprehenderit, cupiditate!
            </p>
          </div>
        </section>
        <section className="categories">
          <div className="container">
            <h2>Shop Now</h2>
            {categoriesLoading ? (
              <SkeletonLinks />
            ) : (
              <ul
                className={`categories-list ${defineGridLayout(
                  categories.length
                )}`}
              >
                {categories.length ? (
                  categories.map((cat) => (
                    <CategoryLink
                      category={cat}
                      key={cat.id}
                      navData={extractNavData(cat)}
                    />
                  ))
                ) : (
                  <p>
                    We apologise for the inconvenience. Please return to the
                    store later as we update our stock.
                  </p>
                )}
              </ul>
            )}
          </div>
        </section>
        <section className="create-account">
          <div className="container">
            <h2>Create an account</h2>
            <div className="create-account-features">
              <div>
                <h4>
                  <IoMdHeartEmpty /> Save your faves
                </h4>
                <p>
                  Keep your favourite items in one place, ready for your return.
                </p>
              </div>
              <div>
                <h4>
                  <IoMdStarOutline />
                  Leave reviews
                </h4>
                <p>
                  Share your experience with other customers to help us to keep
                  bringing you quality.
                </p>
              </div>
              <div>
                <h4>
                  {" "}
                  <IoBagCheckOutline />
                  Checkout faster
                </h4>
                <p>
                  We'll securely store your details for a fast and smooth
                  checkout experience.
                </p>
              </div>
            </div>

            <button className="btn">
              <Link to="/register">Sign me up!</Link>
            </button>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default Home;
