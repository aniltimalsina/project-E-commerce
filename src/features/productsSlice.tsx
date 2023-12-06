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
        state.cart.push(productToAdd);
      }
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.cart = state.cart.filter((product) => product.id !== productId);
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

export const { addToCart, removeFromCart } = productSlice.actions;
export default productSlice.reducer;
