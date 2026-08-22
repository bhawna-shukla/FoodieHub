import "./AdminOrders.css";
import Navbar from "../componenets/Navbar/Navbar";
import Footer from "../componenets/Footer/Footer";
import { useEffect, useMemo, useState } from "react";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  // =========================
  // FETCH ALL ORDERS
  // =========================

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/orders"
      );

      const data = await response.json();

      console.log("Admin Orders:", data);

      if (response.ok) {
        setOrders(data.orders || []);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Admin Orders Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // UPDATE ORDER STATUS
  // =========================

  const updateStatus = async (orderId, status) => {
    try {
      setUpdatingId(orderId);

      const response = await fetch(
        `http://localhost:5000/api/orders/${orderId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setOrders((previousOrders) =>
          previousOrders.map((order) =>
            order._id === orderId
              ? { ...order, status: data.order.status }
              : order
          )
        );
      } else {
        alert(data.message || "Failed to update status");
      }
    } catch (error) {
      console.error("Status Update Error:", error);
      alert("Something went wrong");
    } finally {
      setUpdatingId(null);
    }
  };

  // =========================
  // CANCEL ORDER
  // =========================

  const cancelOrder = async (orderId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this order?"
    );

    if (!confirmCancel) {
      return;
    }

    await updateStatus(orderId, "Cancelled");
  };

  // =========================
  // SEARCH
  // =========================

  const filteredOrders = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    if (!searchValue) {
      return orders;
    }

    return orders.filter((order) => {
      return (
        order.customerName
          ?.toLowerCase()
          .includes(searchValue) ||
        order.phone
          ?.toLowerCase()
          .includes(searchValue) ||
        order._id
          ?.toLowerCase()
          .includes(searchValue)
      );
    });
  }, [orders, search]);

  // =========================
  // GROUP ORDERS BY CUSTOMER
  // =========================

  const groupedCustomers = useMemo(() => {
    const groups = {};

    filteredOrders.forEach((order) => {
      const customerKey =
        order.userId ||
        order.phone ||
        order.customerName;

      if (!groups[customerKey]) {
        groups[customerKey] = {
          name: order.customerName,
          phone: order.phone,
          orders: [],
        };
      }

      groups[customerKey].orders.push(order);
    });

    return Object.values(groups);
  }, [filteredOrders]);

  // =========================
  // DASHBOARD SUMMARY
  // =========================

  const totalSales = orders.reduce(
    (sum, order) => sum + Number(order.total || 0),
    0
  );

  const cancelledOrders = orders.filter(
    (order) => order.status === "Cancelled"
  ).length;

  const uniqueCustomers = new Set(
    orders.map(
      (order) =>
        order.userId ||
        order.phone ||
        order.customerName
    )
  ).size;

  return (
    <>
      <Navbar />

      <main className="admin-orders-page">

        {/* HEADER */}

        <div className="admin-page-header">

          <div>
            <h1>Order Management</h1>

            <p>
              Manage all customer orders
            </p>
          </div>

          <div className="admin-search">
            <span>🔍</span>

            <input
              type="text"
              placeholder="Search customer, phone or order ID..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </div>

        </div>

        {/* SUMMARY */}

        <section className="admin-summary">

          <div className="summary-card">
            <div className="summary-icon">
              📦
            </div>

            <div>
              <span>Total Orders</span>
              <strong>{orders.length}</strong>
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-icon">
              👥
            </div>

            <div>
              <span>Customers</span>
              <strong>{uniqueCustomers}</strong>
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-icon">
              💰
            </div>

            <div>
              <span>Total Sales</span>
              <strong>₹{totalSales}</strong>
            </div>
          </div>

          <div className="summary-card cancelled-card">
            <div className="summary-icon">
              ❌
            </div>

            <div>
              <span>Cancelled</span>
              <strong>{cancelledOrders}</strong>
            </div>
          </div>

        </section>

        {/* ORDERS */}

        {loading ? (
          <div className="admin-empty">
            <div className="loader"></div>
            <p>Loading orders...</p>
          </div>
        ) : groupedCustomers.length === 0 ? (
          <div className="admin-empty">

            <div className="empty-icon">
              📦
            </div>

            <h3>No orders found</h3>

            <p>
              There are no orders matching your search.
            </p>

          </div>
        ) : (
          <section className="customers-list">

            {groupedCustomers.map(
              (customer, index) => {

                const customerTotal =
                  customer.orders.reduce(
                    (sum, order) =>
                      sum + Number(order.total || 0),
                    0
                  );

                return (
                  <div
                    className="customer-card"
                    key={index}
                  >

                    {/* CUSTOMER */}

                    <div className="customer-header">

                      <div className="customer-profile">

                        <div className="customer-avatar">
                          {customer.name
                            ?.charAt(0)
                            .toUpperCase()}
                        </div>

                        <div>
                          <h2>
                            {customer.name}
                          </h2>

                          <p>
                            📞 {customer.phone}
                          </p>
                        </div>

                      </div>

                      <div className="customer-stats">

                        <div>
                          <span>Orders</span>

                          <strong>
                            {customer.orders.length}
                          </strong>
                        </div>

                        <div>
                          <span>Total Spent</span>

                          <strong>
                            ₹{customerTotal}
                          </strong>
                        </div>

                      </div>

                    </div>

                    {/* CUSTOMER ORDERS */}

                    <div className="customer-orders">

                      {customer.orders.map(
                        (order) => (

                          <div
                            className="admin-order-row"
                            key={order._id}
                          >

                            {/* ORDER ID */}

                            <div className="order-id">
                              <span>
                                Order ID
                              </span>

                              <strong>
                                #{order._id.slice(-6)}
                              </strong>
                            </div>

                            {/* DATE */}

                            <div className="order-date">
                              <span>
                                Date & Time
                              </span>

                              <strong>
                                {new Date(
                                  order.createdAt
                                ).toLocaleString(
                                  "en-IN"
                                )}
                              </strong>
                            </div>

                            {/* ITEMS */}

                            <div className="order-items-summary">
                              <span>
                                {order.items?.length || 0}{" "}
                                item
                                {order.items?.length !==
                                1
                                  ? "s"
                                  : ""}
                              </span>

                              <p>
                                {order.items
                                  ?.map(
                                    (item) =>
                                      `${item.name} × ${item.quantity}`
                                  )
                                  .join(", ")}
                              </p>
                            </div>

                            {/* PAYMENT */}

                            <div className="order-payment">
                              <span>
                                Payment
                              </span>

                              <strong>
                                {order.paymentMethod?.toUpperCase()}
                              </strong>
                            </div>

                            {/* TOTAL */}

                            <div className="order-amount">
                              <span>
                                Total
                              </span>

                              <strong>
                                ₹{order.total}
                              </strong>
                            </div>

                            {/* STATUS */}

                            <div className="order-status-control">

                              <span>
                                Status
                              </span>

                              <select
                                value={order.status}
                                disabled={
                                  updatingId ===
                                    order._id ||
                                  order.status ===
                                    "Cancelled"
                                }
                                onChange={(e) =>
                                  updateStatus(
                                    order._id,
                                    e.target.value
                                  )
                                }
                                className={`status-select ${order.status
                                  ?.toLowerCase()
                                  .replace(
                                    " ",
                                    "-"
                                  )}`}
                              >

                                <option value="Placed">
                                  Placed
                                </option>

                                <option value="Confirmed">
                                  Confirmed
                                </option>

                                <option value="Preparing">
                                  Preparing
                                </option>

                                <option value="Delivered">
                                  Delivered
                                </option>

                                <option value="Cancelled">
                                  Cancelled
                                </option>

                              </select>

                            </div>

                            {/* CANCEL */}

                            {order.status !==
                              "Cancelled" &&
                              order.status !==
                                "Delivered" && (
                                <button
                                  className="cancel-btn"
                                  onClick={() =>
                                    cancelOrder(
                                      order._id
                                    )
                                  }
                                  disabled={
                                    updatingId ===
                                    order._id
                                  }
                                >
                                  {updatingId ===
                                  order._id
                                    ? "..."
                                    : "Cancel"}
                                </button>
                              )}

                          </div>
                        )
                      )}

                    </div>

                  </div>
                );
              }
            )}

          </section>
        )}

      </main>

      <Footer />
    </>
  );
};

export default AdminOrders;