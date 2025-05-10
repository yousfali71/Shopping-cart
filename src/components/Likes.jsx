import { useOutletContext } from "react-router-dom";
import "../components/CSS/Likes.css";
import ProductCard from "./ProductCard";
import sadFace from "../assets/sad.svg";

export default function Likes() {
  const { likes, formatPrice } = useOutletContext();
  return (
    <>
      <div className="main-likes-container">
        <p className="likes-title">Your Saved Items:</p>
        <div className="liked-list">
          {likes.length > 0 ? (
            likes.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                formatPrice={formatPrice}
              />
            ))
          ) : (
            <div className="empty-cart">
              No saved products yet. <img src={sadFace} width="100px" />
            </div>
          )}
        </div>{" "}
      </div>
    </>
  );
}
