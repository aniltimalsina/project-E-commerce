import axios from "axios";

export const getProduct = async (productId) => {
  const resourceURL = `http://localhost:3000/storeData/${productId}`;
  const response = await axios.get(resourceURL);
  return response.data;
};
