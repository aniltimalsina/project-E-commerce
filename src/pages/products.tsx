import Header from "../components/header";
import Footer from "../components/footer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchProducts,
  selectCart,
  selectCategory,
  setSearchInput,
  selectCategoryState,
  addCart,
  removeProductFromCart,
  addWishlist,
  selectWishlist,
  removeProductFromWishlist,
} from "../features/productsSlice";

const Products = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedCategory = useSelector(selectCategoryState);
  console.log("Selected Category in ProductsPage:", selectedCategory);
  const {
    items: products,
    status,
    error,
    productsInWishlist,
    searchInput,
  } = useSelector((state) => state.products);
  const cart = useSelector(selectCart);
  const wishlist = useSelector(selectWishlist);
  console.log("----->", wishlist);

  useEffect(() => {
    dispatch(fetchProducts(selectedCategory)); // Pass selectedCategory to fetchProducts
  }, [dispatch, selectedCategory]);

  const handleAddToCart = (productId) => {
    const existingProduct = cart.find((item) => item.product.id === productId);

    if (localStorage.getItem("token")) {
      if (existingProduct) {
        dispatch(removeProductFromCart(productId));
      } else {
        dispatch(addCart(productId));
      }
    } else {
      navigate("/login");
    }
  };
  const handleAddToWishlist = (productId) => {
    if (localStorage.getItem("token")) {
      if (wishlist.find((item) => item.id === productId)) {
        dispatch(removeProductFromWishlist(productId));
      } else {
        dispatch(addWishlist(productId));
      }
    } else {
      navigate("/login");
    }
  };

  const handleSearchInputChange = (input) => {
    dispatch(setSearchInput(input));
  };

  const handleClearFilters = () => {
    dispatch(selectCategory(null));
    dispatch(setSearchInput(""));
  };

  const filteredProducts = products.filter((product) => {
    const hasType = product.type !== undefined && product.type !== null;
    const typeMatch =
      !selectedCategory || (hasType && product.type === selectedCategory);

    const nameMatch = product.name
      .toLowerCase()
      .includes(searchInput.toLowerCase());

    return typeMatch && nameMatch;
  });

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
            className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500"
            type="text"
            placeholder="Search"
            value={searchInput}
            onChange={(e) => handleSearchInputChange(e.target.value)}
          />
          <button
            type="button"
            className="flex ml-auto text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2"
            onClick={handleClearFilters}
          >
            Clear Filters
          </button>

          <div className="container mx-auto my-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => {
              return (
                <div
                  key={product.id}
                  className="card card-compact w-96 h-2/3 bg-base-100 shadow-xl mb-1"
                >
                  <figure>
                    <img src={`/images/${product.img}`} alt="Product Image" />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">{product.name}</h2>
                    <p>{product.text}</p>
                    <p>${product.price}</p>
                    <div className="card-actions justify-end">
                      <button
                        className={`btn btn-primary ${
                          cart?.some((item) => item.product.id === product.id)
                            ? "bg-red-500"
                            : "bg-blue-500"
                        }`}
                        onClick={() => handleAddToCart(product.id)}
                      >
                        {cart?.some((item) => item.product.id === product.id)
                          ? "Remove from Cart"
                          : "Add to Cart"}
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleAddToWishlist(product.id)}
                      >
                        {wishlist?.some((item) => item.id === product.id)
                          ? "Added to Wishlist"
                          : "Add to Wishlist"}
                      </button>
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
