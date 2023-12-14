import axios from "axios";
import { getProduct } from "../hooks/useProduct";

const BASE_URL = "http://localhost:3000";

export const registerCart = async (cartData) => {
  const response = await axios.post(`${BASE_URL}/cart`, cartData);
  return response.data;
};

export const updateCart = async (updateCart) => {
  try {
    const cartId = updateCart.id;
    const response = await axios.put(`${BASE_URL}/cart/${cartId}`, updateCart);
    console.log("updated response ->", response.data);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const fetchUserCart = async () => {
  try {
    const userId = localStorage.getItem("token");
    const response = await axios.get(`${BASE_URL}/cart/?userId=${userId}`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const fetchUserCartSerializer = async () => {
  try {
    const userId = localStorage.getItem("token");
    const response = await axios.get(`${BASE_URL}/cart/?userId=${userId}`);
    let cartProduct = [];
    console.log("response -data ->", response.data);

    if (response.data[0].products.length > 0) {
      const productPromises = await response.data[0].products.map((p) =>
        getProduct(p.product)
      );

      await Promise.all(productPromises).then((products) => {
        console.log("products ->", products);
        for (let i = 0; i < products.length; i++) {
          const productObj = {
            product: products[i],
            quantity: response.data[0].products[i].quantity,
          };
          cartProduct.push(productObj);
        }
      });
    }
    console.log("from my api ->", cartProduct);
    return cartProduct;
  } catch (e) {
    console.log(e);
  }
};

export const clearCartItems = async () => {
  const cartData = await fetchUserCart();
  cartData[0].products = [];
  console.log("cart-data ->", cartData[0]);
  const response = await updateCart(cartData[0]);
  console.log("response -> ", response.data);
  return response.data;
};
