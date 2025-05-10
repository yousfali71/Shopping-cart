import PropTypes from "prop-types";
import "../components/CSS/ProductCard.css";
import heartEmpty from "../assets/heart-empty.svg";
import heartFull from "../assets/heart-full.svg";
import defaultImage from "../assets/27002.jpg";
import { useOutletContext } from "react-router-dom";
import { useState } from "react";

//Need to validate props
export default function ProductCard({
  product,
  setShowDetails,
  setProdDetails,
  formatPrice,
}) {
  ProductCard.propTypes = {
    product: PropTypes.object,
    setShowDetails: PropTypes.func,
    setProdDetails: PropTypes.func,
    formatPrice: PropTypes.func,
  };

  const { addToCart, likes, toggleLikes } = useOutletContext();
  const [added, setAdded] = useState(false);

  function limitCharacters(str) {
    return str.length > 50 ? str.substring(0, 50) + "..." : str;
  }
  function showProdDetails() {
    setShowDetails(true);
    setProdDetails(product);
  }

  function addedAnimation() {
    setAdded((prev) => !prev);

    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <>
      <div className="product-wrapper" onClick={showProdDetails}>
        <div className="product-img">
          <img
            src={product.image}
            alt={product.title}
            className="prod-img"
            onError={(e) => (e.target.src = defaultImage)} //Shows default image if link is broken from API
          />
        </div>
        <div className="product-info">
          <div className="product-price-fav">
            <img
              src={
                likes.some((likedItem) => likedItem.id === product.id)
                  ? heartFull
                  : heartEmpty
              }
              alt="Add/Remove from Saved List"
              className="product-fav"
              onClick={(e) => {
                e.stopPropagation();
                toggleLikes(product);
              }}
            />
            <p className="product-price">${formatPrice(product.price)}</p>
          </div>
          <div className="product-name">
            <p className="product-name">{limitCharacters(product.title)}</p>
          </div>
          <div className="buttons">
            <button
              className="btn-primary"
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product, 1);
                addedAnimation();
              }}
            >
              {added ? "Added!" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
