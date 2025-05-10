import "../components/CSS/CartDrawer.css";
import PropTypes from "prop-types";
import { useState } from "react";
import cartIcon from "../assets/cart.svg";
import sadFace from "../assets/sad.svg";
import { Link } from "react-router-dom";

export default function Cart({
  cart,
  total,
  clearCart,
  formatPrice,
  calculateTotal,
  limitCharacters,
  incrementCart,
  decrementCart,
}) {
  Cart.propTypes = {
    cart: PropTypes.array,
    total: PropTypes.number,
    clearCart: PropTypes.func,
    formatPrice: PropTypes.func,
    calculateTotal: PropTypes.func,
    limitCharacters: PropTypes.func,
    incrementCart: PropTypes.func,
    decrementCart: PropTypes.func,
  };

  const [showCartDrawer, setShowCartDrawer] = useState(false);

  function toggleCart() {
    setShowCartDrawer((prev) => !prev);
  }

  return (
    <>
      <div className="cart-wrapper">
        <img
          src={cartIcon}
          alt="Cart"
          className="cart-img"
          onClick={() => toggleCart()}
        />
        {total > 0 ? <p className="cart-total">{total}</p> : ""}
      </div>

      {showCartDrawer && (
        <div className="cartDrawer">
          <div className="cartDrawer-content slide-in">
            <div className="cart-top">
              <div className="header-close">
                {" "}
                <p className="cart-header">Your Cart:</p>
                <span
                  className="drawer-close"
                  onClick={() => setShowCartDrawer(false)}
                >
                  &times;
                </span>
              </div>
              <div className="cart-items-list">
                {cart.length > 0 ? (
                  cart.map((item) => (
                    <div key={item.id} className="cart-item-card">
                      <div className="cart-img-container">
                        <img src={item.image} />
                      </div>
                      <div className="cart-item-details">
                        <p className="cart-item-title">
                          {limitCharacters(item.title)}
                        </p>
                        <p>${formatPrice(item.price)}</p>
                        <div className="quantity-edit">
                          <p>Quantity: {item.quantity}</p>
                          <div className="buttons-container">
                            <button
                              className="quantity-buttons"
                              onClick={() => decrementCart(item)}
                            >
                              -
                            </button>
                            <button
                              className="quantity-buttons"
                              onClick={() => incrementCart(item)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <p
                          className="remove-button"
                          onClick={() => clearCart(item.id)}
                        >
                          Remove
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="empty-cart">
                    Your cart is empty. <img src={sadFace} width="100px" />
                  </div>
                )}
              </div>
            </div>
            <div className="order-total">
              <p>Total: ${formatPrice(calculateTotal(cart))}</p>
              <Link to="checkout">
                <button
                  className="btn-primary"
                  onClick={() => setShowCartDrawer(false)}
                >
                  Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
