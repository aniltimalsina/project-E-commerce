import axios from "axios";

const BASE_URL = "http://localhost:3000";

export const registerUser = async (userData) => {
  const response = await axios.post(`${BASE_URL}/users`, userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.get(`${BASE_URL}/users`, {
      params: {
        username: credentials.username,
        password: credentials.password,
      },
    });

    const user = response.data[0];
    console.log(user);

    if (user) {
      return user;
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    throw new Error("Login error");
  }
};

export const fetchUserData = async (userId) => {
  const response = await axios.get(`${BASE_URL}/users/${userId}`);
  return response.data;
};
