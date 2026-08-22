import "./MyOrders.css";
import Navbar from "../componenets/Navbar/Navbar";
import Footer from "../componenets/Footer/Footer";
import React, { useEffect, useState } from "react";

const MyOrders = () => {
    const getStatusStep = (status) => {
        const statuses = [
            "Placed",
            "Confirmed",
            "Preparing",
            "Delivered",
        ];

        return statuses.indexOf(status);
    };
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
                <h1 className="my-orders-title">My Orders 📦</h1>

                <p className="my-orders-subtitle">
                    Check your recent orders and their details
                </p>

                {loading ? (
                    <p className="no-orders">Loading orders...</p>
                ) : orders.length === 0 ? (
                    <div className="no-orders">
                        <p>No orders found.</p>
                    </div>
                ) : (
                    <div className="orders-container">
                        {orders.map((order) => (
                            <div className="order-card" key={order._id}>

                                <div className="order-header">
                                    <h3>Order #{order._id.slice(-6)}</h3>

                                    <span className="order-status">
                                        ✓ {order.status}
                                    </span>
                                </div>

                                <div className="order-info">
                                    <p>
                                        <strong>Date:</strong>{" "}
                                        {new Date(order.createdAt).toLocaleString("en-IN")}
                                    </p>

                                    <p>
                                        <strong>Payment:</strong>{" "}
                                        {order.paymentMethod.toUpperCase()}
                                    </p>
                                </div>

                                <div className="order-items">
                                    {order.items.map((item, index) => (
                                        <div className="order-item" key={index}>
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
                                    <span>Total</span>
                                    <span>₹{order.total}</span>
                                </div>

                               <div className="order-progress">
  {["Placed", "Confirmed", "Preparing", "Delivered"].map(
    (status, index) => {
      const currentStep = getStatusStep(order.status);

      return (
        <React.Fragment key={status}>
          <div
            className={`progress-step ${
              index <= currentStep ? "active" : ""
            }`}
          >
            <div className="progress-dot">
              {index <= currentStep ? "✓" : index + 1}
            </div>

            <span>{status}</span>
          </div>

          {index < 3 && (
            <div
              className={`progress-line ${
                index < currentStep ? "active-line" : ""
              }`}
            ></div>
          )}
        </React.Fragment>
      );
    }
  )}
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