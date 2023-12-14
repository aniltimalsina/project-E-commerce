import { PayPalButtons } from "@paypal/react-paypal-js";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { clearCartItems, fetchUserCart } from "../api/cartapi";
import { createOrder } from "../api/orderapi";
import { useNavigate } from "react-router-dom";

export const PaypalCheckoutBtn = ({ price }) => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <PayPalButtons
      createOrder={(data, action) => {
        return action.order.create({
          purchase_units: [
            {
              description: "product_desc",
              amount: {
                value: price,
              },
            },
          ],
        });
      }}
      onApprove={async (data, action) => {
        await action.order?.capture();
        const cartItem = await fetchUserCart();
        const orderItem = {
          userId: localStorage.getItem("token"),
          products: cartItem[0].products,
          totalPrice: price,
          orderDate: new Date(),
        };
        await createOrder(orderItem);
        await clearCartItems();
        navigate("/orders");
      }}
      onError={(err) => {
        setError(err);
      }}
    />
  );
};
