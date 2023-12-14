import axios from "axios";
import { getProduct } from "../hooks/useProduct";

const BASE_URL = "http://localhost:3000";

export const createOrder = async (orderData) => {
  console.log("order data ->", orderData);
  const response = await axios.post(`${BASE_URL}/orders`, orderData);
  console.log("res ->", response.data);
  return response.data;
};

export const fetchUserOrder = async () => {
  try {
    const userId = localStorage.getItem("token");
    const response = await axios.get(`${BASE_URL}/orders/?userId=${userId}`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const fetchUserOrderSerializer = async () => {
  try {
    const userId = localStorage.getItem("token");
    const response = await axios.get(`${BASE_URL}/orders/?userId=${userId}`);
    let orderProduct = [];
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
    console.log("from my api ->", orderProduct);
    return orderProduct;
  } catch (e) {
    console.log(e);
  }
};
