import Header from "../components/header";
import Footer from "../components/footer";
import { useDispatch, useSelector } from "react-redux";
import {
  removeProductFromWishlist,
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
    <div className="overflow-x-hidden">
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
                    <div className="card w-96 bg-base-100 shadow-xl">
                      <figure className="px-10 pt-10">
                        <img
                          src={`/images/${product.img}`}
                          alt="Product 1"
                          className="rounded-xl"
                        />
                      </figure>
                      <div className="card-body items-center text-center">
                        <h2 className="card-title">{product.name}</h2>
                        <p>Price: ${product.price}</p>
                        <div className="card-actions">
                          <button
                            onClick={() => handleRemoveFromWishlist(product.id)}
                            className="btn bg-red-500 hover:bg-red-600 focus:shadow-outline-red  btn-primary"
                          >
                            Remove from wishlist
                          </button>

                          <button
                            onClick={() =>
                              handleAddToCartFromWishlist(product.id)
                            }
                            className="btn btn-primary"
                          >
                            Move to Cart
                          </button>
                        </div>
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
