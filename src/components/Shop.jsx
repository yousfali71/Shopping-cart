import "../components/CSS/Shop.css";
import ProductCard from "./ProductCard";
import DetailsModal from "./DetailsModal";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

export default function Shop() {
  const { addToCart } = useOutletContext();

  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isSelected, setIsSelected] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [prodDetails, setProdDetails] = useState(null);
  const [inputNum, setInputNum] = useState(1);

  function formatPrice(price) {
    return Number(price).toFixed(2);
  }

  function filterByCategory(category) {
    if (category === "All") {
      setProducts(allProducts);
    } else {
      const filteredProducts = allProducts.filter(
        (product) => product.category === category
      );
      setProducts(filteredProducts);
    }
    setIsSelected(category);
  }

  const slicedProducts = products.slice(0, 50);

  // Get Products List
  useEffect(() => {
    fetch("https://fakestoreapi.com/products", { mode: "cors" })
      .then((response) => response.json())
      .then((response) => {
        setProducts(response);
        setAllProducts(response);

        const timeOut = setTimeout(() => {
          setIsLoading(false);
        }, 0);

        return () => clearTimeout(timeOut);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  // Get Categories
  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories", { mode: "cors" })
      .then((response) => response.json())
      .then((response) => {
        setCategories(["All", ...response]);
      })
      .catch((error) => {
        console.log(error);
      });
  });
  return (
    <>
      {isLoading ? (
        <div className="loading-screen">
          <p>Loading products...</p>
          <div className="loader"></div>
        </div>
      ) : (
        <>
          <div className="shop-container">
            <div className="shop-categories">
              <p className="categories-header">Categories</p>
              <div className="categories-list">
                {categories.map((category) => (
                  <p
                    key={category}
                    className={
                      isSelected === category
                        ? "category-item selected"
                        : "category-item"
                    }
                    onClick={() => {
                      filterByCategory(category);
                      setIsSelected(category);
                    }}
                  >
                    {category}
                  </p>
                ))}
              </div>
            </div>
            <div className="shop-products">
              {slicedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  setShowDetails={setShowDetails}
                  setProdDetails={setProdDetails}
                  formatPrice={formatPrice}
                />
              ))}
            </div>
            {showDetails && (
              <DetailsModal
                product={prodDetails}
                setShowDetails={setShowDetails}
                formatPrice={formatPrice}
                inputNum={inputNum}
                setInputNum={setInputNum}
                addToCart={addToCart}
              />
            )}
          </div>
        </>
      )}
    </>
  );
}
