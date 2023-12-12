import axios from "axios";

const BASE_URL = "http://localhost:3000";

export const registerCart = async (cartData) => {
  const response = await axios.post(`${BASE_URL}/cart`, cartData);
  return response.data;
};

export const updateCart = async (updateCart) => {
  try {
    const cartId = updateCart.id;
    const response = await axios.put(`${BASE_URL}/cart/${cartId}`, updateCart);
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
