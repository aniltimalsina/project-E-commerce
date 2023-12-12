import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getProduct } from "../hooks/useProduct";
import { fetchUserCart, updateCart } from "../api/cartapi";

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
  console.log("response -data ->", response.data);

  if (response.data[0].products.length > 0) {
    const productPromises = await response.data[0].products.map((p) =>
      getProduct(p.product)
    );

    await Promise.all(productPromises)
      .then((products) => {
        console.log("products ->", products);
        for (let i = 0; i < products.length; i++) {
          const productObj = {
            product: products[i],
            quantity: response.data[0].products[i].quantity,
          };
          cartProduct.push(productObj);
        }
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }

  console.log("cart ->", cartProduct);
  return cartProduct;
});

export const fetchWishList = createAsyncThunk(
  "products/fetchWishList",
  async () => {
    const response = await axios.get("http://localhost:3000/wishlist");
    return response.data;
  }
);

export const addCart = createAsyncThunk(
  "addCart",
  async (productId, { rejectWithValue }) => {
    try {
      const existingData = await fetchUserCart();
      console.log("existing-data-> ", existingData);
      const productObj = {
        product: parseInt(productId),
        quantity: 1,
      };
      existingData[0].products.push(productObj);
      console.log("existing-data ->", existingData[0]);
      const response = await updateCart(existingData[0]);
      console.log("response from api ", response);
      const productData = await getProduct(parseInt(productId));
      const product = {
        product: productData,
        quantity: response.products[response.products.length - 1].quantity,
      };
      console.log("new Prod -> ", productData);
      return product;
    } catch (error) {
      console.log("add - cart ", error);
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

      let cartProduct = [];

      if (existingData[0].products.length > 0) {
        const productPromises = existingData[0].products.map((p) =>
          getProduct(p.product)
        );

        await Promise.all(productPromises).then((products) => {
          console.log("cartProd ->", cartProduct);
          for (let i = 0; i < products.length; i++) {
            const productObj = {
              product: products[i],
              quantity: response.products[i].quantity,
            };
            cartProduct.push(productObj);
          }
        });
        return cartProduct;
      }
    } catch (error) {
      return error;
    }
  }
  // try {
  //   const state = getState();
  //   const userId = localStorage.getItem("token");
  //   console.log(parseInt(userId));
  //   // Find the user's cart in the state
  //   const userCart = state.products.cart.find((cartItem) => {
  //     console.log(cartItem);
  //     return cartItem.id === productId;
  //   });
  //   console.log(userCart);
  //   console.log(state.products.cart);
  //   if (userCart) {
  //     // Filter out the product to be removed
  //     const updatedProducts = state.products.cart.filter(
  //       (item) => item.id !== productId
  //     );
  //     console.log(updatedProducts);
  //     // Update only the products array for the specific user in the backend
  //     await updateCart({
  //       userId,
  //       products: updatedProducts,
  //       id: userCart.id,
  //     });

  //     // Return the updated products array
  //     return updatedProducts;
  //   }

  // If the user's cart is not found, handle accordingly
  //     return rejectWithValue("User's cart not found");
  //   } catch (error) {
  //     // Handle any errors during the process
  //     console.error("Error removing product from cart:", error);
  //     throw error;
  //   }
  // }
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
      });
  },
});

export const selectCart = (state) => state.products.cart;

// export const selectCartTotalItems = (state) =>
//   state.products.cart.reduce((total, product) => total + product.quantity, 0);

// export const selectCartTotalPrice = (state) =>
//   state.products.cart.reduce(
//     (total, product) => total + product.price * product.quantity,
//     0
//   );

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
