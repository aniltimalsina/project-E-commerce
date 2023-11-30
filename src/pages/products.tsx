import Header from "../components/header";
import Footer from "../components/footer";
import Img1 from "../assets/advertise.jpg";
const Products = () => {
  return (
    <div>
      <Header />
      <div className="container mx-auto py-8 min-h-screen">
        <main className="flex-1">
          <div className="container mx-auto my-8">
            {/* <!-- Product Image --> */}
            <img src={Img1} alt="Product Image" className="w-60 h-60 mb-4" />

            {/* <!-- Product Details --> */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* <!-- Product Description --> */}
              <div>
                <h2 className="text-2xl font-semibold mb-2">Nike Juniper</h2>
                <p className="text-gray-700 mb-4">
                  Men's Waterproof Trail-Running Shoes
                </p>
              </div>

              {/* <!-- Product Price and Add to Cart --> */}
              <div>
                <p className="text-2xl font-semibold mb-2">$99.99</p>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue">
                  Add to Cart
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

export default Products;
