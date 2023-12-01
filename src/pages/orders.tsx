import Header from "../components/header";
import Footer from "../components/footer";

const Orders = () => {
  return (
    <div>
      <Header />
      <div className="mx-auto py-8 min-h-screen">
        <main className="flex-1">
          <div className="container mx-auto my-8">
            {/* <!-- Orders List --> */}
            <div className="space-y-8">
              {/* <!-- Order 1 --> */}
              <div className="bg-white p-4 rounded-md shadow-md">
                <h2 className="text-xl font-semibold mb-2">Order #12345</h2>
                <p className="text-gray-700 mb-2">Date: June 15, 2023</p>
                <ul className="list-disc ml-4">
                  <li>Product Name 1 - $49.99</li>
                  <li>Product Name 2 - $29.99</li>
                </ul>
                <p className="text-gray-700 mt-2">Total Price: $79.98</p>
                <p className="text-gray-700 mt-2">Status: Shipped</p>
              </div>

              {/* <!-- Order 2 --> */}
              <div className="bg-white p-4 rounded-md shadow-md">
                <h2 className="text-xl font-semibold mb-2">Order #12346</h2>
                <p className="text-gray-700 mb-2">Date: June 10, 2023</p>
                <ul className="list-disc ml-4">
                  <li>Product Name 3 - $39.99</li>
                  <li>Product Name 4 - $19.99</li>
                </ul>
                <p className="text-gray-700 mt-2">Total Price: $59.98</p>
                <p className="text-gray-700 mt-2">Status: Delivered</p>
              </div>

              {/* <!-- Add more orders as needed --> */}
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Orders;
