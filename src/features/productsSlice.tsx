import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getProduct } from "../hooks/useProduct";
import {
  fetchUserCart,
  fetchUserCartSerializer,
  updateCart,
} from "../api/cartapi";
import {
  fetchUserWishlist,
  fetchUserWishlistSerializer,
  updateWishlist,
} from "../api/wishlistapi";

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
  console.log(response.data);
  const cartData = await fetchUserCartSerializer();
  console.log("cart-data ->", cartData);
  return cartData;
});

export const fetchWishList = createAsyncThunk(
  "products/fetchWishList",
  async () => {
    const response = await axios.get(
      "http://localhost:3000/wishlist?userId=${userId}"
    );
    const wishlistData = await fetchUserWishlistSerializer();
    console.log("wishlist -data ", wishlistData);
    return wishlistData;
  }
);

export const addCart = createAsyncThunk(
  "addCart",
  async (productId, { rejectWithValue }) => {
    try {
      const existingData = await fetchUserCart();
      const productObj = {
        product: parseInt(productId),
        quantity: 1,
      };
      existingData[0].products.push(productObj);
      const response = await updateCart(existingData[0]);
      const productData = await getProduct(parseInt(productId));
      const product = {
        product: productData,
        quantity: response.products[response.products.length - 1].quantity,
      };
      return product;
    } catch (error) {
      console.log("add - cart ", error);
    }
  }
);

export const moveToCart = createAsyncThunk(
  "moveCart",
  async (productId, { rejectWithValue }) => {
    try {
      let doesExist = false;
      const existingData = await fetchUserCart();
      const wishlistData = await fetchUserWishlist();
      existingData[0].products.forEach((element) => {
        if (element.product === parseInt(productId)) {
          element.quantity += 1;
          doesExist = true;
        }
      });
      console.log("cart update ", existingData[0]);
      if (!doesExist) {
        const productObj = {
          product: parseInt(productId),
          quantity: 1,
        };
        existingData[0].products.push(productObj);
        const response = await updateCart(existingData[0]);

        const productData = await getProduct(parseInt(productId));
        const product = {
          product: productData,
          quantity: response.products[response.products.length - 1].quantity,
        };
        wishlistData[0].products = wishlistData[0].products.filter(
          (p) => p !== parseInt(productId)
        );
        await updateWishlist(wishlistData[0]);
        const wishlistDatas = await fetchUserWishlistSerializer();

        return wishlistDatas;
      }
      await updateCart(existingData[0]);
      wishlistData[0].products = wishlistData[0].products.filter(
        (p) => p !== parseInt(productId)
      );
      await updateWishlist(wishlistData[0]);
      const wishlistDatas = await fetchUserWishlistSerializer();

      return wishlistDatas;
    } catch (error) {
      console.log("add - cart ", error);
    }
  }
);

export const addWishlist = createAsyncThunk(
  "addWishlist",
  async (productId, { rejectWithValue }) => {
    try {
      const existingData = await fetchUserWishlist();
      existingData[0].products.push(parseInt(productId));
      await updateWishlist(existingData[0]);
      const productData = await getProduct(parseInt(productId));
      return productData;
    } catch (error) {
      console.log("add - cart ", error);
    }
  }
);

export const increaseQuantityCount = createAsyncThunk(
  "cart/product/quantity-add",
  async (productId) => {
    try {
      const existingData = await fetchUserCart();

      existingData[0].products.forEach((item) => {
        if (item.product === parseInt(productId)) {
          item.quantity += 1;
        }
      });
      await updateCart(existingData[0]);
      const cartData = await fetchUserCartSerializer();

      return cartData;
    } catch (e) {
      console.log(e);
    }
  }
);

export const decreaseQuantityCount = createAsyncThunk(
  "cart/product/quantity-minus",
  async (productId) => {
    try {
      const existingData = await fetchUserCart();

      existingData[0].products.forEach((item) => {
        if (item.product === parseInt(productId)) {
          if (item.quantity > 1) {
            item.quantity -= 1;
          }
        }
      });
      const response = await updateCart(existingData[0]);
      const cartData = await fetchUserCartSerializer();

      return cartData;
    } catch (e) {
      console.log(e);
    }
  }
);

export const removeProductFromCart = createAsyncThunk(
  "products/removeProductFromCart",
  async (productId, { getState, rejectWithValue }) => {
    try {
      const existingData = await fetchUserCart();
      console.log("existing-data-> ", existingData);
      existingData[0].products = existingData[0].products.filter(
        (p) => p.product !== parseInt(productId)
      );
      console.log("existing-data ->", existingData[0]);
      const response = await updateCart(existingData[0]);
      const cartData = await fetchUserCartSerializer();

      return cartData;
    } catch (e) {
      console.log(e);
    }
  }
);

export const removeProductFromWishlist = createAsyncThunk(
  "products/removeProductFromWhishlist",
  async (productId, { getState, rejectWithValue }) => {
    try {
      const existingData = await fetchUserWishlist();
      console.log("existing-data-> ", existingData);
      existingData[0].products = existingData[0].products.filter(
        (p) => p !== parseInt(productId)
      );
      console.log("existing-data ->", existingData[0]);
      await updateWishlist(existingData[0]);
      const wishlistData = await fetchUserWishlistSerializer();

      return wishlistData;
    } catch (e) {
      console.log(e);
    }
  }
);
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
        console.log("Fetched cart:", action.payload);
      })
      .addCase(addCart.fulfilled, (state, action) => {
        // const productAdded = getProduct(action.payload.id);
        state.cart.push(action.payload);
        state.status = "succeeded";
      })
      .addCase(addCart.pending, (state) => {
        state.status = "pending";
      })
      .addCase(addCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // action.payload contains the error message
      })

      .addCase(removeProductFromCart.fulfilled, (state, action) => {
        console.log("state ->", state.cart);
        console.log("action ", action.payload);
        state.cart = action.payload;
        state.status = "succeeded";
        // Find the user's cart in the state
        // const userCart = state.cart.find(
        //   (cartItem) =>
        //     cartItem.userId === parseInt(localStorage.getItem("token"))
        // );

        // if (userCart) {
        //   // Update only the products array for the specific user in the state
        //   userCart.products = action.payload;
        //   state.status = "succeeded";
        // }
      })
      .addCase(removeProductFromCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(increaseQuantityCount.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.status = "succeeded";
      })
      .addCase(decreaseQuantityCount.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.status = "succeeded";
      })
      .addCase(addWishlist.fulfilled, (state, action) => {
        state.wishlist.push(action.payload);
        state.status = "succeeded";
      })
      .addCase(fetchWishList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.wishlist = action.payload;
      })
      .addCase(removeProductFromWishlist.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.wishlist = action.payload;
      })
      .addCase(moveToCart.fulfilled, (state, action) => {
        // const productAdded = getProduct(action.payload.id);
        // const newData = action.payload;
        // if (Array.isArray(newData)) {
        //   state.wishlist = action.payload;
        // } else {
        //   state.cart.push(action.payload);
        // }
        state.wishlist = action.payload;
        state.status = "succeeded";
      });
  },
});

export const selectCart = (state) => state.products.cart;
export const selectWishlist = (state) => state.products.wishlist;

export const selectCartTotalItems = (state) =>
  state.products.cart.reduce((total, item) => total + item.quantity, 0);

export const selectCartTotalPrice = (state) => {
  return state.products.cart.reduce((total, item) => {
    const productPrice = item.product.price || 0; // Ensure there's a default value if the price is missing
    return total + productPrice * item.quantity;
  }, 0);
};

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
