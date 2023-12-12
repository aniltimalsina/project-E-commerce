import Header from "../components/header";
import Footer from "../components/footer";
import {
  fetchCart,
  removeProductFromCart,
  addToCart,
  selectCart,
  // selectCartTotalItems,
  // selectCartTotalPrice,
} from "../features/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  // const totalItems = useSelector(selectCartTotalItems);
  // const totalPrice = useSelector(selectCartTotalPrice);
  const handleRemoveFromCart = (productId) => {
    console.log("Removing product with ID:", productId);
    console.log("Current cart in state:", cart);
    dispatch(removeProductFromCart(productId));
  };
  const handleAddToCart = (productId) => {
    dispatch(addToCart(productId));
  };
  console.log(cart);
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);
  return (
    <div>
      <Header />
      <div className="mx-auto py-8 min-h-screen">
        <main className="flex-1">
          <div>
            {/* <!-- Cart Items --> */}
            <div className="container mx-auto my-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cart?.map((item) => {
                return (
                  <div key={item.id}>
                    <div className="bg-white p-4 rounded-md shadow-md">
                      <img
                        src={`/images/${item.product.img}`}
                        alt="Product 1"
                        className="w-full h-auto mb-4"
                      />
                      <h2 className="text-xl font-semibold mb-2">
                        {item.name}
                      </h2>
                      <p className="text-gray-700 mb-2">
                        Quantity:
                        <button
                          onClick={() => handleRemoveFromCart(item.product.id)}
                          className="text-blue-500 hover:underline mx-1"
                        >
                          -
                        </button>
                        <span className="border border-gray-300 p-1 rounded-md">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleAddToCart(item.product.id)}
                          className="text-blue-500 hover:underline mx-1"
                        >
                          +
                        </button>
                      </p>
                      <p className="text-gray-700">
                        Price: ${item.product.price} each
                      </p>
                    </div>
                    <button
                      className="mt-4 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 focus:outline-none focus:shadow-outline-red"
                      onClick={() => handleRemoveFromCart(item.product.id)}
                    >
                      Remove from Cart
                    </button>
                  </div>
                );
              })}

              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Cart Summary</h2>
                <p className="text-gray-50 mb-2">Total Items: $100</p>
                <p className="text-gray-50">
                  {/* Total Price: ${totalPrice.toFixed(2)} */}
                  Total Price: $1000
                </p>
              </div>

              <div className="mt-8">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
