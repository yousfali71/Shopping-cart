import PropTypes from "prop-types";
import "../components/CSS/DetailsModal.css";
import heartEmpty from "../assets/heart-empty.svg";
import heartFull from "../assets/heart-full.svg";
import QuantityInput from "./QuantityInput";
import { useOutletContext } from "react-router-dom";
import { useState } from "react";

export default function DetailsModal({
  product,
  setShowDetails,
  formatPrice,
  addToCart,
  inputNum,
  setInputNum,
}) {
  DetailsModal.propTypes = {
    product: PropTypes.object,
    setShowDetails: PropTypes.func,
    formatPrice: PropTypes.func,
    inputNum: PropTypes.number,
    setInputNum: PropTypes.func,
    addToCart: PropTypes.func,
  };

  const { likes, toggleLikes } = useOutletContext();
  const [added, setAdded] = useState(false);

  function modalAddToCart(product, inputNum) {
    //Added button text change, delay on close
    addToCart(product, inputNum);
    setInputNum(1);
    setAdded((prev) => !prev);

    setTimeout(() => {
      setAdded(false);
      setShowDetails(false);
    }, 500);
  }
  return (
    <>
      {" "}
      <div className="modal">
        <div className="modal-content">
          <div className="close">
            <span
              onClick={() => {
                setShowDetails(false);
                setInputNum(1);
              }}
            >
              &times;
            </span>
          </div>
          <div className="product-details">
            <div className="img-container">
              <img src={product.image} className="product-img" />
            </div>
            <div className="details-container">
              <div className="title-price">
                <p className="product-title">{product.title}</p>
                <p className="mod-product-price">
                  ${formatPrice(product.price)}
                </p>
                <img
                  src={
                    likes.some((likedItem) => likedItem.id === product.id)
                      ? heartFull
                      : heartEmpty
                  }
                  className="mod-product-fav"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLikes(product);
                  }}
                />{" "}
              </div>
              <p className="mod-product-desc">{product.description}</p>

              <QuantityInput setInputNum={setInputNum} inputNum={inputNum} />
              <button
                className="btn-primary"
                onClick={() => modalAddToCart(product, inputNum)}
              >
                {added ? "Added!" : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
