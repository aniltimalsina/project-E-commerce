import { login, logout } from "../features/authSlice";
import axios from "axios";

export const loginUser = (credentials) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/login",
      credentials
    );
    dispatch(login(response.data));
  } catch (error) {
    console.log(error, "You got login error");
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    await axios.post("http://localhost:3000/logout");
    dispatch(logout());
  } catch (error) {
    console.log(error, "You got logout error");
  }
};

export const registerUser = (userData) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/register",
      userData
    );
    dispatch(login(response.data));
  } catch (error) {
    console.log(error, "You got registration error");
  }
};
