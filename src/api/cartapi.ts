import axios from "axios";

const BASE_URL = "http://localhost:3000";

export const registerCart = async (cartData) => {
  const response = await axios.post(`${BASE_URL}/cart`, cartData);
  return response.data;
};
