import { useState } from "react";
import Navigation from "./Nav";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  const [cart, setCart] = useState([]);
  const [likes, setLikes] = useState([]);

  function addToCart(product, quantity) {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(
        (item) => item.id === product.id
      );
      if (existingProductIndex >= 0) {
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += quantity;
        return updatedCart;
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });
  }

  function toggleLikes(product) {
    setLikes((prevLikes) => {
      const alreadyLiked = prevLikes.some(
        (likedItem) => likedItem.id === product.id
      );

      if (alreadyLiked) {
        return prevLikes.filter((likedItem) => likedItem.id !== product.id);
      } else return [...prevLikes, product];
    });
  }

  function removeFromCart(product, quantity) {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(
        (item) => item.id === product.id
      );
      if (existingProductIndex >= 0) {
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity -= quantity;
        return updatedCart;
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });
  }

  function clearCart(productId) {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  }

  function getTotalQuantity() {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }

  function formatPrice(price) {
    return Number(price).toFixed(2);
  }

  function calculateTotal(cart) {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  function limitCharacters(str) {
    return str.length > 40 ? str.substring(0, 40) + "..." : str;
  }

  function incrementCart(product) {
    addToCart(product, 1);
  }

  function decrementCart(product) {
    if (product.quantity > 0) {
      removeFromCart(product, 1);
    } else return;
  }

  return (
    <div className="main-content">
      <Navigation
        cart={cart}
        getTotalQuantity={getTotalQuantity}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        formatPrice={formatPrice}
        calculateTotal={calculateTotal}
        limitCharacters={limitCharacters}
        incrementCart={incrementCart}
        decrementCart={decrementCart}
        likes={likes}
      />
      <Outlet
        context={{
          cart,
          setCart,
          addToCart,
          removeFromCart,
          getTotalQuantity,
          incrementCart,
          decrementCart,
          clearCart,
          formatPrice,
          calculateTotal,
          toggleLikes,
          likes,
        }}
      />
      <Footer />
    </div>
  );
}
