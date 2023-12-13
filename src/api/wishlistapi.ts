import axios from "axios";
import { getProduct } from "../hooks/useProduct";

const BASE_URL = "http://localhost:3000";

export const updateWishlist = async (updateWishlist) => {
  try {
    const wishlistId = updateWishlist.id;
    const response = await axios.put(
      `${BASE_URL}/wishlist/${wishlistId}`,
      updateWishlist
    );
    console.log("updated response ->", response.data);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const fetchUserWishlist = async () => {
  try {
    const userId = localStorage.getItem("token");
    const response = await axios.get(`${BASE_URL}/wishlist/?userId=${userId}`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const fetchUserWishlistSerializer = async () => {
  try {
    const userId = localStorage.getItem("token");
    const response = await axios.get(`${BASE_URL}/wishlist/?userId=${userId}`);
    let wishlistProduct = [];

    if (response.data[0].products.length > 0) {
      const productPromises = await response.data[0].products.map((p) =>
        getProduct(p)
      );

      await Promise.all(productPromises).then((products) => {
        wishlistProduct = products;
      });
    }
    console.log("from my api ->", wishlistProduct);
    return wishlistProduct;
  } catch (e) {
    console.log(e);
  }
};
