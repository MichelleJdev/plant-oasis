import React from "react";
import "./ProductSkeleton.css";
import ClipLoader from "react-spinners/ClipLoader";

function ProductSkeleton() {
  return (
    <div className="ProductSkeleton productPage-container">
      <div className="showcase-skeleton">
        <div className="image-skeleton skel-item">
          <div className="loading-animation">
            <div></div>
          </div>
        </div>
        <div className="summary-skeleton ">
          <div className="summary-upper">
            <div className="name-skeleton skel-item">
              <div className="loading-animation">
                <div></div>
              </div>
            </div>
            <div className="short-description-skeleton">
              <div className="text-line-skeleton skel-item">
                <div className="loading-animation">
                  <div></div>
                </div>
              </div>
              <div className="text-line-skeleton skel-item desktop">
                <div className="loading-animation">
                  <div></div>
                </div>
              </div>
              <div className="text-line-skeleton skel-item desktop">
                <div className="loading-animation">
                  <div></div>
                </div>
              </div>
            </div>
          </div>

          <div className="summary-lower">
            <div className="price-skeleton ">
              £ <ClipLoader size="26" color="rgb(89, 128, 147)" />
            </div>

            <div className="add-basket-skeleton skel-item">
              <div className="loading-animation">
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="description" id="description">
        <h2>Description</h2>
        <div className="description-skeletons">
          <div className="text-line-skeleton skel-item">
            <div className="loading-animation">
              <div></div>
            </div>
          </div>
          <div className="text-line-skeleton skel-item">
            <div className="loading-animation">
              <div></div>
            </div>
          </div>
          <div className="text-line-skeleton skel-item">
            <div className="loading-animation">
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductSkeleton;
