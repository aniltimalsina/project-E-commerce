import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/productsSlice";
import thunk from "redux-thunk";
import authReducer from "../features/authslice";
import userReducer from "../features/userSlice";
export const store = configureStore({
  reducer: {
    products: productReducer,
    auth: authReducer,
    user: userReducer,
  },
  middleware: [thunk],
});
