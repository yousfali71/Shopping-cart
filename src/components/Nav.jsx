import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import "../components/CSS/nav.css";
import jacket from "../assets/jacket.svg";
import Cart from "./Cart";
import heartEmpty from "../assets/heart-empty.svg";
import heartFull from "../assets/heart-full.svg";

export default function Navigation({
  cart,
  getTotalQuantity,
  inputNum,
  setInputNum,
  addToCart,
  removeFromCart,
  clearCart,
  formatPrice,
  calculateTotal,
  limitCharacters,
  incrementCart,
  decrementCart,
  likes,
}) {
  const total = getTotalQuantity();

  Navigation.propTypes = {
    cart: PropTypes.array,
    total: PropTypes.number,
    clearCart: PropTypes.func,
    formatPrice: PropTypes.func,
    calculateTotal: PropTypes.func,
    limitCharacters: PropTypes.func,
    incrementCart: PropTypes.func,
    decrementCart: PropTypes.func,
    getTotalQuantity: PropTypes.func,
    inputNum: PropTypes.number,
    setInputNum: PropTypes.func,
    addToCart: PropTypes.func,
    removeFromCart: PropTypes.func,
    likes: PropTypes.array,
  };
  return (
    <>
      <div className="header nav">
        <div className="nav-container">
          <div className="logo-wrapper">
            <Link to="/">
              <img src={jacket} width="60px" />
              <p className="site-name">Jaquette</p>
            </Link>
          </div>
          <Link to="/" className="nav-home">
            Home
          </Link>
          <Link to="shop">Shop</Link>
        </div>
        <div className="cart-likes-container">
          <Link to="likes">
            <div className="heart-container">
              <img
                src={likes.length > 0 ? heartFull : heartEmpty}
                alt="Saved List"
              />
            </div>
          </Link>
          <Cart
            cart={cart}
            total={total}
            inputNum={inputNum}
            setInputNum={setInputNum}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            clearCart={clearCart}
            formatPrice={formatPrice}
            calculateTotal={calculateTotal}
            limitCharacters={limitCharacters}
            incrementCart={incrementCart}
            decrementCart={decrementCart}
          />
        </div>
      </div>
    </>
  );
}
