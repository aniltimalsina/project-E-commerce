import Header from "../components/header";
import Footer from "../components/footer";
import Img1 from "../assets/advertise.jpg";
import Img2 from "../assets/carousel-1.jpg";
const Cart = () => {
  return (
    <div>
      <Header />
      <div className="container mx-auto py-8 min-h-screen">
        <main className="flex-1">
          <div className="container mx-auto my-8">
            {/* <!-- Cart Items --> */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* <!-- Cart Item 1 --> */}
              <div className="bg-white p-4 rounded-md shadow-md">
                <img
                  src={Img1}
                  alt="Product 1"
                  className="w-full h-auto mb-4"
                />
                <h2 className="text-xl font-semibold mb-2">Nike Juniper</h2>
                <p className="text-gray-700 mb-2">Quantity: 2</p>
                <p className="text-gray-700">Price: $49.99 each</p>
              </div>

              {/* <!-- Cart Item 2 --> */}
              <div className="bg-white p-4 rounded-md shadow-md">
                <img
                  src={Img2}
                  alt="Product 2"
                  className="w-full h-auto mb-4"
                />
                <h2 className="text-xl font-semibold mb-2">
                  Easton Prime Series Slo-Pitch Softball Glove
                </h2>
                <p className="text-gray-700 mb-2">Quantity: 1</p>
                <p className="text-gray-700">Price: $29.99 each</p>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Cart Summary</h2>
              <p className="text-gray-700 mb-2">Total Items: 3</p>
              <p className="text-gray-700">Total Price: $129.97</p>
            </div>

            <div className="mt-8">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
