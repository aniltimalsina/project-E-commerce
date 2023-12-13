import Header from "../components/header";
import Footer from "../components/footer";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromWishlist,
  moveFromWishlistToCart,
  removeProductFromWishlist,
  addCart,
  fetchWishList,
  moveToCart,
} from "../features/productsSlice";
import { useEffect } from "react";

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.products.wishlist);

  const handleRemoveFromWishlist = (productId) => {
    dispatch(removeProductFromWishlist(productId));
  };

  const handleAddToCartFromWishlist = (productId) => {
    dispatch(moveToCart(productId));
  };
  console.log("wishlist ", wishlist);
  useEffect(() => {
    dispatch(fetchWishList());
  }, [dispatch]);

  return (
    <div>
      <Header />
      <div className="mx-auto py-8 min-h-screen">
        <main className="flex-1">
          <div className="container mx-auto my-8">
            {wishlist.length === 0 ? (
              <p className="text-center text-2xl text-gray-200 font-semibold">
                Currently, your wishlist is empty.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {wishlist.map((product) => {
                  return (
                    <div className="bg-white p-4 rounded-md shadow-md">
                      <img
                        src={`/images/${product.img}`}
                        alt="Product 1"
                        className="w-full h-auto mb-4"
                      />
                      <h2 className="text-xl font-semibold mb-2">
                        {product.name}
                      </h2>
                      <p className="text-gray-700 mb-2">
                        Price: ${product.price}
                      </p>

                      <button
                        onClick={() => handleRemoveFromWishlist(product.id)}
                        className="mt-4 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 focus:outline-none focus:shadow-outline-red"
                      >
                        Remove from wishlist
                      </button>
                      <div className="mt-8">
                        <button
                          onClick={() =>
                            handleAddToCartFromWishlist(product.id)
                          }
                          className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                        >
                          Move to Cart
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Wishlist;
