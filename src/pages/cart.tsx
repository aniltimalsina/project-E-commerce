import Header from "../components/header";
import Footer from "../components/footer";
import { PaypalCheckoutBtn } from "../components/paypalCheckoutBtn";
import {
  fetchCart,
  removeProductFromCart,
  addToCart,
  selectCart,
  selectCartTotalItems,
  selectCartTotalPrice,
  increaseQuantityCount,
  decreaseQuantityCount,
} from "../features/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const totalItems = useSelector(selectCartTotalItems);
  const totalPrice = useSelector(selectCartTotalPrice);
  console.log(totalPrice);
  const handleRemoveFromCart = (productId) => {
    console.log("Removing product with ID:", productId);
    console.log("Current cart in state:", cart);
    dispatch(removeProductFromCart(productId));
  };
  const increaseQuantity = (productId) => {
    dispatch(increaseQuantityCount(productId));
  };

  const decreaseQuantity = (productId) => {
    dispatch(decreaseQuantityCount(productId));
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
            {cart.length === 0 ? (
              <p className="text-center text-2xl text-gray-200 font-semibold">
                Currently, your Cart is empty.
              </p>
            ) : (
              <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-8">
                  {cart?.map((item) => {
                    return (
                      <div
                        key={item.product.id}
                        className="card w-96 bg-base-100 shadow-xl"
                      >
                        <figure className="px-10 pt-10">
                          <img
                            src={`/images/${item.product.img}`}
                            alt="Product 1"
                            className="rounded-xl"
                          />
                        </figure>
                        <div className="card-body items-center text-center">
                          <h2 className="card-title">{item.product.name}</h2>
                          <p>
                            Quantity:
                            <button
                              onClick={() => decreaseQuantity(item.product.id)}
                              className="text-blue-500 hover:underline mx-1"
                            >
                              -
                            </button>
                            <span className="border border-gray-300 p-1 rounded-md">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => increaseQuantity(item.product.id)}
                              className="text-blue-500 hover:underline mx-1"
                            >
                              +
                            </button>
                          </p>
                          <p className="text-gray-70">
                            Price: ${item.product.price} each
                          </p>
                          <div className="card-actions">
                            <button
                              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 focus:outline-none focus:shadow-outline-red"
                              onClick={() =>
                                handleRemoveFromCart(item.product.id)
                              }
                            >
                              Remove from Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="lg:flex flex-col sticky top-0 right-0 col-span-1 md:col-span-1 w-full p-4 rounded-md shadow-md">
                  <div className="mt-8">
                    <h2 className="text-2xl font-semibold mb-4">
                      Cart Summary
                    </h2>
                    <p className="text-gray-50 mb-2">
                      Total Items: {totalItems}
                    </p>
                    <p className="text-gray-50">Total Price: ${totalPrice}</p>
                  </div>

                  <div className="mt-8">
                    {/* <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue">
                  Proceed to Checkout
                </button> */}
                    <PaypalCheckoutBtn price={totalPrice} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
