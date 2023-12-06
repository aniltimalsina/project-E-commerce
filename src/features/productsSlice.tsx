import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get("http://localhost:3000/storeData");
    return response.data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    status: "idle",
    error: null,
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const productId = action.payload;
      const productToAdd = state.items.find(
        (product) => product.id === productId
      );

      if (productToAdd) {
        const existingProduct = state.cart.find(
          (product) => product.id === productId
        );
        if (existingProduct) {
          existingProduct.quantity += 1;
        } else {
          state.cart.push({ ...productToAdd, quantity: 1 });
        }
      }
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      const existingProduct = state.cart.find(
        (product) => product.id === productId
      );
      if (existingProduct) {
        existingProduct.quantity = Math.max(existingProduct.quantity - 1, 1);

        if (existingProduct.quantity === 1) {
          state.cart = state.cart.filter((product) => product.id !== productId);
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectCart = (state) => state.products.cart;

export const selectCartTotalItems = (state) =>
  state.products.cart.reduce((total, product) => total + product.quantity, 0);

export const selectCartTotalPrice = (state) =>
  state.products.cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

export const { addToCart, removeFromCart } = productSlice.actions;
export default productSlice.reducer;
