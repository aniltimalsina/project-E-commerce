import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage";
import About from "./pages/about";
import Products from "./pages/products";
import Cart from "./pages/cart";
import Wishlist from "./pages/wishlist";
import Orders from "./pages/orders";
import Login from "./pages/login";
import Registration from "./pages/registration";
import { PrivateRoute, NaviageToLoginPage } from "./components/privateroute";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

function App() {
  return (
    <PayPalScriptProvider
      options={{ clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID }}
    >
      <BrowserRouter>
        <Routes>
          <Route>
            <Route index element={<Homepage />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route
              path="/cart"
              element={
                <NaviageToLoginPage>
                  <Cart />
                </NaviageToLoginPage>
              }
            />
            <Route
              path="/wishlist"
              element={
                <NaviageToLoginPage>
                  <Wishlist />
                </NaviageToLoginPage>
              }
            />
            <Route
              path="/login"
              element={
                <PrivateRoute>
                  <Login />
                </PrivateRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <NaviageToLoginPage>
                  <Orders />
                </NaviageToLoginPage>
              }
            />
            <Route path="/register" element={<Registration />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </PayPalScriptProvider>
  );
}

export default App;
