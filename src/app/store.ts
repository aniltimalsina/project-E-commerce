import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/productsSlice";
import authReducer from "../features/authSlice";
import userReducer from "../features/userSlice";
const store = configureStore({
  reducer: {
    products: productReducer,
    auth: authReducer,
    user: userReducer,
  },
});

export default store;
