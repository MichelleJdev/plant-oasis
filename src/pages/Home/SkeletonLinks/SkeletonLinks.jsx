import React from "react";
import "./SkeletonLinks.css";

function SkeletonLinks() {
  return (
    <ul className="SkeletonLinks">
      <li className="link-one">
        <div className="skeleton-heading"></div>
        <div className="skeleton-text">
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="loading-animation">
          <div></div>
        </div>
      </li>
      <li className="link-two">
        <div className="skeleton-heading"></div>
        <div className="skeleton-text">
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="loading-animation">
          <div></div>
        </div>
      </li>
      <li className="link-three">
        <div className="skeleton-heading"></div>
        <div className="skeleton-text">
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="loading-animation">
          <div></div>
        </div>
      </li>
      <li className="link-four">
        <div className="skeleton-heading"></div>
        <div className="skeleton-text">
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="loading-animation">
          <div></div>
        </div>
      </li>
    </ul>
  );
}

export default SkeletonLinks;
