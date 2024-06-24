// src/services/productService.js
import axios from "axios";

const API_URL = "http://localhost:5000/categories";

export const fetchTopProducts = async (
  category,
  n,
  minPrice,
  maxPrice,
  page,
  sortBy,
  sortOrder
) => {
  try {
    const response = await axios.get(`${API_URL}/${category}/products`, {
      params: {
        n,
        minPrice,
        maxPrice,
        page,
        sortBy,
        sortOrder,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const fetchProductDetails = async (category, productId) => {
  try {
    const response = await axios.get(
      `${API_URL}/${category}/products/${productId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching product details:", error);
    throw error;
  }
};
//h
