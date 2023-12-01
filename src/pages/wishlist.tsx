import Header from "../components/header";
import Footer from "../components/footer";
import Img1 from "../assets/carousel-2.jpg";
import Img2 from "../assets/carousel-3.jpg";
const Wishlist = () => {
  return (
    <div>
      <Header />
      <div className="mx-auto py-8 min-h-screen">
        <main className="flex-1">
          <div className="container mx-auto my-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-4 rounded-md shadow-md">
                <img
                  src={Img1}
                  alt="Product 1"
                  className="w-full h-auto mb-4"
                />
                <h2 className="text-xl font-semibold mb-2">Product Name 1</h2>
                <p className="text-gray-700 mb-2">Price: $49.99</p>

                <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 focus:outline-none focus:shadow-outline-red">
                  Remove
                </button>
              </div>

              {/* <!-- Wishlist Item 2 --> */}
              <div className="bg-white p-4 rounded-md shadow-md">
                <img
                  src={Img2}
                  alt="Product 2"
                  className="w-full h-auto mb-4"
                />
                <h2 className="text-xl font-semibold mb-2">Product Name 2</h2>
                <p className="text-gray-700 mb-2">Price: $29.99</p>

                <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 focus:outline-none focus:shadow-outline-red">
                  Remove
                </button>
              </div>

              {/* <!-- Add more wishlist items as needed --> */}
            </div>

            {/* <!-- Wishlist Summary --> */}
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Wishlist Summary</h2>
              <p className="text-gray-700 mb-2">Total Items: 2</p>
            </div>

            {/* <!-- Move to Cart Button --> */}
            <div className="mt-8">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue">
                Move to Cart
              </button>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Wishlist;
