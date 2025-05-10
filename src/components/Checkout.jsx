import { useOutletContext } from "react-router-dom";
import sadFace from "../assets/sad.svg";
import "../components/CSS/Checkout.css";

export default function Checkout() {
  const {
    cart,
    decrementCart,
    incrementCart,
    clearCart,
    formatPrice,
    calculateTotal,
  } = useOutletContext();
  return (
    <>
      <div className="main-cart-container">
        <div className="header-total-container">
          <div className="cart-header">Your Cart:</div>
          <div className="total-cost">${formatPrice(calculateTotal(cart))}</div>
        </div>
        <div className="checkout-items-list">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div key={item.id} className="cart-item-card">
                <div className="cart-img-container">
                  <img src={item.image} />
                </div>
                <div className="cart-item-details">
                  <p className="cart-item-title">{item.title}</p>
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
            <div className="empty-cart-checkout">
              Your cart is empty. <img src={sadFace} width="100px" />
            </div>
          )}
        </div>
        <button
          className="btn-primary"
          onClick={() =>
            alert(
              "Sorry, this is a fake store and you can't actually check out. Thanks for coming this far, though! Have a spectacular day!"
            )
          }
        >
          Checkout
        </button>
      </div>
    </>
  );
}
