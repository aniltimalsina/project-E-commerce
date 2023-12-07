import Header from "../components/header";
import Footer from "../components/footer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  addToCart,
  removeFromCart,
  selectCart,
  addToWishlist,
  removeFromWishlist,
  selectCategory,
  setSearchInput,
} from "../features/productsSlice";

const Products = () => {
  const dispatch = useDispatch();
  const {
    items: products,
    status,
    error,
    wishlist,
    productsInWishlist,
    selectedCategory,
    searchInput,
  } = useSelector((state) => state.products);
  const cart = useSelector(selectCart);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = (productId) => {
    const existingProduct = cart.find((product) => product.id === productId);

    if (existingProduct) {
      dispatch(removeFromCart(productId));
    } else {
      dispatch(addToCart(productId));
    }
  };
  const handleAddToWishlist = (productId) => {
    if (productsInWishlist.includes(productId)) {
      dispatch(removeFromWishlist(productId));
    } else {
      dispatch(addToWishlist(productId));
    }
  };

  const handleSearchInputChange = (input) => {
    dispatch(setSearchInput(input));
  };

  const filteredProducts = products
    .filter(
      (product) => !selectedCategory || product.category === selectedCategory
    ) // Filter based on selected category
    .filter((product) =>
      product.name.toLowerCase().includes(searchInput.toLowerCase())
    ); // Filter based on search input

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Header />
      <div className="container mx-auto py-8 min-h-screen">
        <main className="flex-1">
          <input
            type="text"
            placeholder="Search"
            value={searchInput}
            onChange={(e) => handleSearchInputChange(e.target.value)}
          />
          <div className="container mx-auto my-8">
            {filteredProducts.map((product) => {
              return (
                <div key={product.id} className="border-2">
                  {/* <!-- Product Image --> */}
                  <img
                    src={`/images/${product.img}`}
                    alt="Product Image"
                    className="w-60 h-60 mb-4"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* <!-- Product Description --> */}
                    <div>
                      <h2 className="text-2xl font-semibold mb-2">
                        {product.name}
                      </h2>
                      <p className="text-gray-700 mb-4">{product.text}</p>
                    </div>

                    {/* <!-- Product Price and Add to Cart, Add to Wishlist --> */}
                    <div>
                      <p className="text-2xl font-semibold mb-2">
                        ${product.price}
                      </p>
                      <button
                        className="bg-blue-500 text-white px-4 py-2 m-2 rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                        onClick={() => handleAddToCart(product.id)}
                      >
                        {cart.some((p) => p.id === product.id)
                          ? "Remove from Cart"
                          : "Add to Cart"}
                      </button>
                      <button
                        className="bg-blue-500 text-white px-4 py-2 m-2 rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                        onClick={() => handleAddToWishlist(product.id)}
                      >
                        {productsInWishlist.includes(product.id)
                          ? "Added to Wishlist"
                          : "Add to Wishlist"}
                      </button>

                      {cart.some((p) => p.id === product.id) && (
                        <p>
                          Quantity in Cart:{" "}
                          {cart.find((p) => p.id === product.id).quantity}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Products;
