import "./MyOrders.css";
import Navbar from "../componenets/Navbar/Navbar";
import Footer from "../componenets/Footer/Footer";
import { useEffect, useState } from "react";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user || !user._id) {
          setLoading(false);
          return;
        }

        const response = await fetch(
          `http://localhost:5000/api/orders/user/${user._id}`
        );

        const data = await response.json();

        console.log("My Orders:", data);

        if (response.ok) {
          setOrders(data.orders);
        }
      } catch (error) {
        console.error("Orders Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <>
      <Navbar />

      <section className="my-orders">
        <h1>My Orders 📦</h1>

        {loading ? (
          <p>Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className="no-orders">No orders found.</p>
        ) : (
          <div className="orders-container">
            {orders.map((order) => (
              <div className="order-card" key={order._id}>
                <h2>Order #{order._id.slice(-6)}</h2>

                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(order.createdAt).toLocaleString("en-IN")}
                </p>

                <p>
                  <strong>Payment:</strong>{" "}
                  {order.paymentMethod.toUpperCase()}
                </p>

                <p>
                  <strong>Status:</strong> Pending
                </p>

                <div className="order-items">
                  {order.items.map((item, index) => (
                    <div key={index} className="order-item">
                      <span>
                        {item.name} × {item.quantity}
                      </span>

                      <span>
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="order-total">
                  Total: ₹{order.total}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </>
  );
};

export default MyOrders;