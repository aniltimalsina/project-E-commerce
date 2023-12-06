import Header from "../components/header";
import Footer from "../components/footer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/productsSlice";
const Products = () => {
  const dispatch = useDispatch();
  const {
    items: products,
    status,
    error,
  } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

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
          <div className="container mx-auto my-8">
            {products.map((product) => {
              return (
                <>
                  {/* <!-- Product Image --> */}
                  <img
                    src={product.img}
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
                      <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </>
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
