import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getProduct } from "../hooks/useProduct";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get("http://localhost:3000/storeData");
    return response.data;
  }
);

export const fetchCart = createAsyncThunk("products/fetchCart", async () => {
  const userId = localStorage.getItem("token");
  const response = await axios.get(
    `http://localhost:3000/cart/?userId=${userId}`
  );
  let cartProduct = [];

  if (response.data[0].products.length > 0) {
    const productPromises = response.data[0].products.map((id) =>
      getProduct(id)
    );

    await Promise.all(productPromises)
      .then((products) => {
        //console.log(products);
        cartProduct = products;
        console.log("cartProd ->", cartProduct);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }

  console.log(cartProduct);
  return cartProduct;
  //   console.log(typeof response.data);
});

export const fetchWishList = createAsyncThunk(
  "products/fetchWishList",
  async () => {
    const response = await axios.get("http://localhost:3000/wishlist");
    return response.data;
  }
);

export const addCart = createAsyncThunk("addCart",async({productId})){
    const userId = localStorage.getItem("token");
    try{
        
        const response = await axios.patch(`http://localhost:3000/cart/?userId=${userId}`,productId);

    }catch(e){
        return e
    }
}

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [], //product list
    status: "idle",
    error: null,
    cart: [],
    wishlist: [],
    productsInWishlist: [], //track product in the wishlist
    selectedCategory: null, // Track the selected category
    searchInput: "", // Track the search input
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
    addToWishlist: (state, action) => {
      const productId = action.payload;
      const productToAdd = state.items.find(
        (product) => product.id === productId
      );

      if (productToAdd && !state.productsInWishlist.includes(productId)) {
        state.wishlist.push(productToAdd);
        state.productsInWishlist.push(productId);
      }
    },

    removeFromWishlist: (state, action) => {
      const productId = action.payload;
      state.wishlist = state.wishlist.filter(
        (product) => product.id !== productId
      );
      state.productsInWishlist = state.productsInWishlist.filter(
        (id) => id !== productId
      );
    },
    moveFromWishlistToCart: (state, action) => {
      const productId = action.payload;
      const productToMove = state.wishlist.find(
        (product) => product.id === productId
      );

      if (productToMove) {
        state.productsInWishlist = state.productsInWishlist.filter(
          (id) => id !== productId
        );
        state.cart.push({ ...productToMove, quantity: 1 });
        state.wishlist = state.wishlist.filter(
          (product) => product.id !== productId
        );
      }
    },

    selectCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },

    setProducts: (state, action) => {
      state.cart = action.payload;
    },

    setSearchInput: (state, action) => {
      state.searchInput = action.payload;
    },
    logout: (state) => {
      state.productsInWishlist = [];
      state.wishlist = [];
      state.cart = [];
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
      })
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.status = "succeeded";
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

export const {
  addToCart,
  removeFromCart,
  addToWishlist,
  removeFromWishlist,
  moveFromWishlistToCart,
  selectCategory,
  setSearchInput,
  logout,
  setProducts,
} = productSlice.actions;
export const selectCategoryState = (state) => state.products.selectedCategory;
export default productSlice.reducer;
