import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    totalItem: 0,
    totalPrice: 0,
  },
  reducers: {},
});

export default cartSlice.reducer;
