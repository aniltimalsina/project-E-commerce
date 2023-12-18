import Header from "../components/header";
import Footer from "../components/footer";
import { useEffect, useState } from "react";
import { fetchUserOrder } from "../api/orderapi";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrder = async () => {
      const data = await fetchUserOrder();
      setOrders(data);
    };
    getOrder();
  }, []);
  function formatOrderDate(dateString) {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "short",
    };

    return new Date(dateString).toLocaleString("en-US", options);
  }

  return (
    <div className="overflow-x-hidden">
      <Header />
      <div className="mx-auto py-8 min-h-screen">
        <main className="flex-1">
          <div className="container mx-auto my-8">
            {/* <!-- Orders List --> */}
            <div className="space-y-8">
              {orders?.map((order) => (
                <div
                  key={order.id}
                  className="bg-white p-4 rounded-md shadow-md"
                >
                  <h2 className="text-xl font-semibold mb-2">
                    Order #{order.id}
                  </h2>
                  <p className="text-gray-700 mb-2">
                    Date: {formatOrderDate(order.orderDate)}
                  </p>
                  <ul className="list-disc ml-4">
                    {order?.products.map((item) => (
                      <>
                        <li>
                          Product Id: {item.product} - Quantity: {item.quantity}
                        </li>
                      </>
                    ))}
                  </ul>
                  <p className="text-gray-700 mt-2">
                    Total Price: ${order.totalPrice}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Orders;
