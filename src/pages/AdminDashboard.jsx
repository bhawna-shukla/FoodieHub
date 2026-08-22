import "./AdminDashboard.css";
import Navbar from "../componenets/Navbar/Navbar";
import Footer from "../componenets/Footer/Footer";
import { useEffect, useMemo, useState } from "react";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/orders"
      );

      const data = await response.json();

      console.log("Dashboard Orders:", data);

      if (response.ok) {
        setOrders(data.orders || []);
      }
    } catch (error) {
      console.error("Dashboard Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // DASHBOARD STATISTICS
  // =========================

  const stats = useMemo(() => {
    const totalOrders = orders.length;

    const totalRevenue = orders
      .filter((order) => order.status !== "Cancelled")
      .reduce(
        (total, order) =>
          total + Number(order.total || 0),
        0
      );

    const cancelledOrders = orders.filter(
      (order) => order.status === "Cancelled"
    ).length;

    const pendingOrders = orders.filter(
      (order) =>
        order.status === "Placed" ||
        order.status === "Confirmed" ||
        order.status === "Preparing"
    ).length;

    const deliveredOrders = orders.filter(
      (order) => order.status === "Delivered"
    ).length;

    const customers = new Set(
      orders.map(
        (order) =>
          order.userId ||
          order.phone ||
          order.customerName
      )
    );

    return {
      totalOrders,
      totalRevenue,
      cancelledOrders,
      pendingOrders,
      deliveredOrders,
      totalCustomers: customers.size,
    };
  }, [orders]);

  // =========================
  // RECENT ORDERS
  // =========================

  const recentOrders = useMemo(() => {
    return [...orders]
      .sort(
        (a, b) =>
          new Date(b.createdAt) -
          new Date(a.createdAt)
      )
      .slice(0, 6);
  }, [orders]);

  // =========================
  // TODAY'S ORDERS
  // =========================

  const todayOrders = useMemo(() => {
    const today = new Date();

    return orders.filter((order) => {
      const orderDate = new Date(order.createdAt);

      return (
        orderDate.getDate() === today.getDate() &&
        orderDate.getMonth() === today.getMonth() &&
        orderDate.getFullYear() === today.getFullYear()
      );
    });
  }, [orders]);

  // =========================
  // TODAY'S SALES
  // =========================

  const todaySales = todayOrders
    .filter((order) => order.status !== "Cancelled")
    .reduce(
      (total, order) =>
        total + Number(order.total || 0),
      0
    );

  // =========================
  // STATUS PERCENTAGE
  // =========================

  const deliveredPercentage =
    stats.totalOrders > 0
      ? Math.round(
          (stats.deliveredOrders /
            stats.totalOrders) *
            100
        )
      : 0;

  const cancelledPercentage =
    stats.totalOrders > 0
      ? Math.round(
          (stats.cancelledOrders /
            stats.totalOrders) *
            100
        )
      : 0;

  return (
    <>
      <Navbar />

      <main className="admin-dashboard">

        {/* =========================
            PAGE HEADER
        ========================= */}

        <section className="dashboard-header">

          <div>
            <h1>Admin Dashboard</h1>

            <p>
              Welcome back! Here's what's happening
              with FoodieHub today.
            </p>
          </div>

          <div className="dashboard-date">
            📅{" "}
            {new Date().toLocaleDateString(
              "en-IN",
              {
                day: "numeric",
                month: "long",
                year: "numeric",
              }
            )}
          </div>

        </section>

        {/* =========================
            LOADING
        ========================= */}

        {loading ? (
          <div className="dashboard-loading">
            <div className="dashboard-loader"></div>
            <p>Loading dashboard...</p>
          </div>
        ) : (
          <>
            {/* =========================
                STAT CARDS
            ========================= */}

            <section className="dashboard-stats">

              <div className="dashboard-stat-card">

                <div className="stat-icon orange">
                  📦
                </div>

                <div>
                  <span>Total Orders</span>
                  <h2>
                    {stats.totalOrders}
                  </h2>
                  <small>
                    All time orders
                  </small>
                </div>

              </div>

              <div className="dashboard-stat-card">

                <div className="stat-icon green">
                  💰
                </div>

                <div>
                  <span>Total Revenue</span>
                  <h2>
                    ₹{stats.totalRevenue}
                  </h2>
                  <small>
                    Excluding cancelled
                  </small>
                </div>

              </div>

              <div className="dashboard-stat-card">

                <div className="stat-icon blue">
                  👥
                </div>

                <div>
                  <span>Total Customers</span>
                  <h2>
                    {stats.totalCustomers}
                  </h2>
                  <small>
                    Unique customers
                  </small>
                </div>

              </div>

              <div className="dashboard-stat-card">

                <div className="stat-icon red">
                  ❌
                </div>

                <div>
                  <span>Cancelled Orders</span>
                  <h2>
                    {stats.cancelledOrders}
                  </h2>
                  <small>
                    {cancelledPercentage}% of orders
                  </small>
                </div>

              </div>

            </section>

            {/* =========================
                TODAY OVERVIEW
            ========================= */}

            <section className="today-section">

              <div className="today-card">

                <div className="today-icon">
                  📅
                </div>

                <div>
                  <span>Today's Orders</span>

                  <strong>
                    {todayOrders.length}
                  </strong>
                </div>

              </div>

              <div className="today-card">

                <div className="today-icon">
                  💵
                </div>

                <div>
                  <span>Today's Sales</span>

                  <strong>
                    ₹{todaySales}
                  </strong>
                </div>

              </div>

              <div className="today-card">

                <div className="today-icon">
                  🚚
                </div>

                <div>
                  <span>Pending Orders</span>

                  <strong>
                    {stats.pendingOrders}
                  </strong>
                </div>

              </div>

              <div className="today-card">

                <div className="today-icon">
                  ✅
                </div>

                <div>
                  <span>Delivered</span>

                  <strong>
                    {stats.deliveredOrders}
                  </strong>
                </div>

              </div>

            </section>

            {/* =========================
                MAIN DASHBOARD GRID
            ========================= */}

            <section className="dashboard-grid">

              {/* RECENT ORDERS */}

              <div className="recent-orders-card">

                <div className="section-heading">

                  <div>
                    <h2>Recent Orders</h2>
                    <p>
                      Latest customer orders
                    </p>
                  </div>

                  <span className="order-count">
                    {stats.totalOrders} Orders
                  </span>

                </div>

                {recentOrders.length === 0 ? (
                  <div className="no-dashboard-orders">
                    📦
                    <p>
                      No orders available
                    </p>
                  </div>
                ) : (
                  <div className="recent-orders-list">

                    {recentOrders.map(
                      (order) => (

                        <div
                          className="recent-order"
                          key={order._id}
                        >

                          <div className="recent-order-icon">
                            🍔
                          </div>

                          <div className="recent-order-info">

                            <h3>
                              {order.customerName}
                            </h3>

                            <p>
                              #
                              {order._id.slice(
                                -6
                              )}{" "}
                              •{" "}
                              {order.items
                                ?.length || 0}{" "}
                              item
                              {order.items
                                ?.length !== 1
                                ? "s"
                                : ""}
                            </p>

                          </div>

                          <div className="recent-order-price">

                            <strong>
                              ₹{order.total}
                            </strong>

                            <span
                              className={`dashboard-status ${order.status
                                ?.toLowerCase()
                                .replace(
                                  " ",
                                  "-"
                                )}`}
                            >
                              {order.status}
                            </span>

                          </div>

                        </div>

                      )
                    )}

                  </div>
                )}

              </div>

              {/* ORDER STATUS */}

              <div className="order-status-card">

                <div className="section-heading">

                  <div>
                    <h2>Order Overview</h2>
                    <p>
                      Current order status
                    </p>
                  </div>

                </div>

                <div className="status-overview">

                  <div className="status-row">

                    <div>
                      <span className="status-dot pending"></span>
                      Pending
                    </div>

                    <strong>
                      {stats.pendingOrders}
                    </strong>

                  </div>

                  <div className="status-bar">
                    <div
                      className="status-bar-pending"
                      style={{
                        width: `${
                          stats.totalOrders > 0
                            ? (stats.pendingOrders /
                                stats.totalOrders) *
                              100
                            : 0
                        }%`,
                      }}
                    ></div>
                  </div>

                  <div className="status-row">

                    <div>
                      <span className="status-dot delivered"></span>
                      Delivered
                    </div>

                    <strong>
                      {stats.deliveredOrders}
                    </strong>

                  </div>

                  <div className="status-bar">
                    <div
                      className="status-bar-delivered"
                      style={{
                        width: `${deliveredPercentage}%`,
                      }}
                    ></div>
                  </div>

                  <div className="status-row">

                    <div>
                      <span className="status-dot cancelled"></span>
                      Cancelled
                    </div>

                    <strong>
                      {stats.cancelledOrders}
                    </strong>

                  </div>

                  <div className="status-bar">
                    <div
                      className="status-bar-cancelled"
                      style={{
                        width: `${cancelledPercentage}%`,
                      }}
                    ></div>
                  </div>

                </div>

              </div>

            </section>

          </>
        )}

      </main>

      <Footer />
    </>
  );
};

export default AdminDashboard;