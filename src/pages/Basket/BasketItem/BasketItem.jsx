import "./BasketItem.css";
import { Link } from "react-router-dom";
import ProductBtnGroup from "../../../components/ProductBtnGroup/ProductBtnGroup";

function BasketItem({ item }) {
  const { id, imageUrl, name, quantity, formattedPrice } = item;
  return (
    <li className="BasketItem" key={id}>
      <div className="item_image-container">
        <img src={imageUrl} alt="" />
      </div>
      <div className="item_details">
        <div>
          <Link to={`/store/${id}`}>
            {" "}
            <h3>{name}</h3>
          </Link>

          <div className="item_price">{`${formattedPrice}`}</div>
          <div className="item_quantity">{`QTY: ${quantity}`}</div>
        </div>

        <ProductBtnGroup id={id} key={id} />
      </div>
    </li>
  );
}

export default BasketItem;
