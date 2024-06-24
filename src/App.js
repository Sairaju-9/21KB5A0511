// src/App.js
import React, { useState, useEffect } from "react";
import {
  fetchTopProducts,
  fetchProductDetails,
} from "./services/productService";
import "./App.css";

const App = () => {
  const [category, setCategory] = useState("Laptop");
  const [products, setProducts] = useState([]);
  const [n, setN] = useState(10);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [productDetails, setProductDetails] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await fetchTopProducts(
          category,
          n,
          minPrice,
          maxPrice,
          page,
          sortBy,
          sortOrder
        );
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [category, n, minPrice, maxPrice, page, sortBy, sortOrder]);

  const handleProductClick = async (productId) => {
    try {
      const details = await fetchProductDetails(category, productId);
      setProductDetails(details);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  return (
    <div className="App">
      <h1>Top Products in {category}</h1>
      <div>
        <label>
          Category:
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </label>
        <label>
          Number of Products:
          <input
            type="number"
            value={n}
            onChange={(e) => setN(e.target.value)}
          />
        </label>
        <label>
          Min Price:
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </label>
        <label>
          Max Price:
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </label>
        <label>
          Page:
          <input
            type="number"
            value={page}
            onChange={(e) => setPage(e.target.value)}
          />
        </label>
        <label>
          Sort By:
          <input
            type="text"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          />
        </label>
        <label>
          Sort Order:
          <input
            type="text"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          />
        </label>
      </div>
      <div className="product-list">
        {products.map((product) => (
          <div
            key={product.id}
            className="product-item"
            onClick={() => handleProductClick(product.id)}
          >
            <h2>{product.productName}</h2>
            <p>Price: ${product.price}</p>
            <p>Rating: {product.rating}</p>
            <p>Discount: {product.discount}%</p>
            <p>Availability: {product.availability}</p>
          </div>
        ))}
      </div>
      {productDetails && (
        <div className="product-details">
          <h2>{productDetails.productName}</h2>
          <p>Price: ${productDetails.price}</p>
          <p>Rating: {productDetails.rating}</p>
          <p>Discount: {productDetails.discount}%</p>
          <p>Availability: {productDetails.availability}</p>
        </div>
      )}
    </div>
  );
};

export default App;
