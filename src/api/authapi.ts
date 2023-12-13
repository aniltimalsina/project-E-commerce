import axios from "axios";
import bcrypt from "bcryptjs";
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
      },
    });

    const user = response.data[0];

    if (user) {
      const isValidPassword = await bcrypt.compare(
        credentials.password,
        user.password
      );
      if (isValidPassword) {
        return user;
      }
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

export const doesUserExist = async (user) => {
  const { username, email } = user;
  let exist = false;
  const response = await axios.get(`${BASE_URL}/users`);
  response.data.forEach((element) => {
    if (element.username === username) {
      exist = true;
    }
    if (element.email === email) {
      exist = true;
    }
  });
  return exist;
};

export const hashPassword = async ({ password }) => {
  const saltRound = 10;
  const hashedPassword = await bcrypt.hash(password, saltRound);
  console.log("hashed-pass ", hashedPassword);
  return hashedPassword;
};
