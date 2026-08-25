import "./AdminReports.css";
import Navbar from "../componenets/AdminNavbar/AdminNavbar";
import Footer from "../componenets/Footer/Footer";
import { useEffect, useMemo, useState } from "react";

const AdminReports = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [reportPeriod, setReportPeriod] = useState("7");

    // =========================
    // FETCH ORDERS
    // =========================
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(
                    "http://localhost:5000/api/orders"
                );

                const data = await response.json();

                if (response.ok) {
                    setOrders(data.orders || []);
                }
            } catch (error) {
                console.error("Reports Error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    // =========================
    // REPORT STATISTICS
    // =========================
    const stats = useMemo(() => {
        const validOrders = orders.filter(
            (order) => order.status !== "Cancelled"
        );

        const totalRevenue = validOrders.reduce(
            (total, order) =>
                total + Number(order.total || 0),
            0
        );

        const totalOrders = orders.length;

        const totalItemsSold = validOrders.reduce(
            (total, order) =>
                total +
                (order.items || []).reduce(
                    (sum, item) =>
                        sum + Number(item.quantity || 0),
                    0
                ),
            0
        );

        const customers = new Set(
            orders.map(
                (order) =>
                    order.userId ||
                    order.phone ||
                    order.customerName
            )
        );

        return {
            totalRevenue,
            totalOrders,
            totalItemsSold,
            totalCustomers: customers.size,
        };
    }, [orders]);

    // =========================
    // REVENUE GROWTH
    // =========================
    const revenueGrowth = useMemo(() => {
        const validOrders = orders.filter(
            (order) => order.status !== "Cancelled"
        );

        const currentPeriodDays =
            reportPeriod === "all"
                ? null
                : Number(reportPeriod);

        // All Time ke liye comparison nahi
        if (!currentPeriodDays) {
            return 0;
        }

        const today = new Date();

        const currentStart = new Date(today);
        currentStart.setDate(
            today.getDate() - currentPeriodDays + 1
        );
        currentStart.setHours(0, 0, 0, 0);

        const currentEnd = new Date(today);
        currentEnd.setHours(23, 59, 59, 999);

        const previousStart = new Date(currentStart);
        previousStart.setDate(
            currentStart.getDate() - currentPeriodDays
        );
        previousStart.setHours(0, 0, 0, 0);

        const previousEnd = new Date(currentStart);
        previousEnd.setDate(
            currentStart.getDate() - 1
        );
        previousEnd.setHours(23, 59, 59, 999);

        const currentRevenue = validOrders
            .filter((order) => {
                const date = new Date(order.createdAt);

                return (
                    date >= currentStart &&
                    date <= currentEnd
                );
            })
            .reduce(
                (sum, order) =>
                    sum + Number(order.total || 0),
                0
            );

        const previousRevenue = validOrders
            .filter((order) => {
                const date = new Date(order.createdAt);

                return (
                    date >= previousStart &&
                    date <= previousEnd
                );
            })
            .reduce(
                (sum, order) =>
                    sum + Number(order.total || 0),
                0
            );

        if (previousRevenue === 0) {
            return currentRevenue > 0 ? 100 : 0;
        }

        return (
            ((currentRevenue - previousRevenue) /
                previousRevenue) *
            100
        );
    }, [orders, reportPeriod]);

    // =========================
    // ORDER STATUS
    // =========================
    const statusReport = useMemo(() => {
        const statuses = [
            "Placed",
            "Confirmed",
            "Preparing",
            "Delivered",
            "Cancelled",
        ];

        return statuses.map((status) => ({
            status,
            count: orders.filter(
                (order) => order.status === status
            ).length,
        }));
    }, [orders]);

    // =========================
    // BEST SELLING FOODS
    // =========================
    const bestSellingFoods = useMemo(() => {
        const foodMap = {};

        orders
            .filter(
                (order) => order.status !== "Cancelled"
            )
            .forEach((order) => {
                (order.items || []).forEach((item) => {
                    if (!foodMap[item.name]) {
                        foodMap[item.name] = {
                            name: item.name,
                            quantity: 0,
                            revenue: 0,
                        };
                    }

                    foodMap[item.name].quantity +=
                        Number(item.quantity || 0);

                    foodMap[item.name].revenue +=
                        Number(item.price || 0) *
                        Number(item.quantity || 0);
                });
            });

        return Object.values(foodMap)
            .sort(
                (a, b) =>
                    b.quantity - a.quantity
            )
            .slice(0, 5);
    }, [orders]);

    // =========================
    // REVENUE BREAKDOWN
    // =========================
    const revenueBreakdown = useMemo(() => {
        const validOrders = orders.filter(
            (order) => order.status !== "Cancelled"
        );

        const subtotal = validOrders.reduce(
            (sum, order) =>
                sum + Number(order.subtotal || 0),
            0
        );

        const delivery = validOrders.reduce(
            (sum, order) =>
                sum + Number(order.delivery || 0),
            0
        );

        const tax = validOrders.reduce(
            (sum, order) =>
                sum + Number(order.tax || 0),
            0
        );

        const discount = validOrders.reduce(
            (sum, order) =>
                sum + Number(order.discount || 0),
            0
        );

        const totalRevenue = validOrders.reduce(
            (sum, order) =>
                sum + Number(order.total || 0),
            0
        );

        return {
            subtotal,
            delivery,
            tax,
            discount,
            totalRevenue,
        };
    }, [orders]);

    // =========================
    // PAYMENT METHODS
    // =========================
    const paymentReport = useMemo(() => {
        const paymentMap = {};

        orders
            .filter(
                (order) => order.status !== "Cancelled"
            )
            .forEach((order) => {
                const method =
                    order.paymentMethod || "Unknown";

                if (!paymentMap[method]) {
                    paymentMap[method] = {
                        method,
                        count: 0,
                        revenue: 0,
                    };
                }

                paymentMap[method].count += 1;

                paymentMap[method].revenue +=
                    Number(order.total || 0);
            });

        return Object.values(paymentMap);
    }, [orders]);

    // =========================
    // SALES REPORT
    // =========================
    const salesReport = useMemo(() => {
        const sales = [];

        if (reportPeriod === "all") {
            const groupedSales = {};

            orders
                .filter(
                    (order) =>
                        order.status !== "Cancelled"
                )
                .forEach((order) => {
                    const date = new Date(
                        order.createdAt
                    );

                    const key = `${date.getDate()}/${
                        date.getMonth() + 1
                    }/${date.getFullYear()}`;

                    if (!groupedSales[key]) {
                        groupedSales[key] = {
                            day: date.toLocaleDateString(
                                "en-IN",
                                {
                                    weekday: "short",
                                }
                            ),
                            date: key,
                            sales: 0,
                        };
                    }

                    groupedSales[key].sales +=
                        Number(order.total || 0);
                });

            return Object.values(groupedSales).sort(
                (a, b) => {
                    const [ad, am, ay] = a.date
                        .split("/")
                        .map(Number);

                    const [bd, bm, by] = b.date
                        .split("/")
                        .map(Number);

                    return (
                        new Date(
                            ay,
                            am - 1,
                            ad
                        ) -
                        new Date(
                            by,
                            bm - 1,
                            bd
                        )
                    );
                }
            );
        }

        const days = Number(reportPeriod);

        for (let i = days - 1; i >= 0; i--) {
            const date = new Date();

            date.setDate(
                date.getDate() - i
            );

            const day = date.getDate();
            const month = date.getMonth();
            const year = date.getFullYear();

            const daySales = orders
                .filter((order) => {
                    if (
                        order.status ===
                        "Cancelled"
                    ) {
                        return false;
                    }

                    const orderDate = new Date(
                        order.createdAt
                    );

                    return (
                        orderDate.getDate() === day &&
                        orderDate.getMonth() === month &&
                        orderDate.getFullYear() === year
                    );
                })
                .reduce(
                    (total, order) =>
                        total +
                        Number(order.total || 0),
                    0
                );

            sales.push({
                day: date.toLocaleDateString(
                    "en-IN",
                    {
                        weekday: "short",
                    }
                ),
                date: `${day}/${month + 1}`,
                sales: daySales,
            });
        }

        return sales;
    }, [orders, reportPeriod]);

    const maxSales = Math.max(
        ...salesReport.map(
            (item) => item.sales
        ),
        1
    );

    // =========================
    // LOADING
    // =========================
    if (loading) {
        return (
            <>
                <Navbar />

                <main className="admin-reports">
                    <div className="reports-loading">
                        <div className="reports-loader"></div>
                        <p>Loading reports...</p>
                    </div>
                </main>

                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />

            <main className="admin-reports">

                {/* PAGE HEADER */}
                <section className="reports-header">
                    <div>
                        <h1>Admin Reports</h1>

                        <p>
                            Track your FoodieHub sales
                            and business performance.
                        </p>
                    </div>

                    <div className="reports-date">
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

                {/* SUMMARY CARDS */}
                <section className="reports-stats">

                    {/* TOTAL REVENUE */}
                    <div className="report-stat-card">
                        <div className="report-icon green">
                            💰
                        </div>

                        <div>
                            <span>Total Revenue</span>

                            <h2>
                                ₹{stats.totalRevenue}
                            </h2>

                            <small>
                                Excluding cancelled orders
                            </small>

                            <div className="revenue-growth">
                                {reportPeriod === "all" ? (
                                    "All time revenue"
                                ) : (
                                    <>
                                        {revenueGrowth >= 0
                                            ? "↑"
                                            : "↓"}{" "}
                                        {Math.abs(
                                            revenueGrowth
                                        ).toFixed(1)}
                                        % vs previous period
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* TOTAL ORDERS */}
                    <div className="report-stat-card">
                        <div className="report-icon orange">
                            📦
                        </div>

                        <div>
                            <span>Total Orders</span>

                            <h2>
                                {stats.totalOrders}
                            </h2>

                            <small>
                                All orders
                            </small>
                        </div>
                    </div>

                    {/* ITEMS SOLD */}
                    <div className="report-stat-card">
                        <div className="report-icon blue">
                            🍔
                        </div>

                        <div>
                            <span>Items Sold</span>

                            <h2>
                                {stats.totalItemsSold}
                            </h2>

                            <small>
                                Completed sales
                            </small>
                        </div>
                    </div>

                    {/* CUSTOMERS */}
                    <div className="report-stat-card">
                        <div className="report-icon purple">
                            👥
                        </div>

                        <div>
                            <span>Customers</span>

                            <h2>
                                {stats.totalCustomers}
                            </h2>

                            <small>
                                Unique customers
                            </small>
                        </div>
                    </div>

                </section>

                {/* SALES OVERVIEW */}
                <section className="sales-overview-card">

                    <div className="report-card-header">

                        <div>
                            <h2>
                                Sales Overview
                            </h2>

                            <p>
                                {reportPeriod === "7"
                                    ? "Last 7 days sales performance"
                                    : reportPeriod === "30"
                                    ? "Last 30 days sales performance"
                                    : "All time sales performance"}
                            </p>
                        </div>

                        <div className="sales-header-actions">

                            <select
                                className="report-period-select"
                                value={reportPeriod}
                                onChange={(e) =>
                                    setReportPeriod(
                                        e.target.value
                                    )
                                }
                            >
                                <option value="7">
                                    Last 7 Days
                                </option>

                                <option value="30">
                                    Last 30 Days
                                </option>

                                <option value="all">
                                    All Time
                                </option>
                            </select>

                        </div>

                    </div>

                    <div className="sales-chart">

                        {salesReport.map((item) => (
                            <div
                                className="sales-bar-wrapper"
                                key={item.date}
                            >

                                <div className="sales-value">
                                    ₹{item.sales}
                                </div>

                                <div className="sales-bar-container">

                                    <div
                                        className="sales-bar"
                                        style={{
                                            height: `${Math.max(
                                                (item.sales /
                                                    maxSales) *
                                                    100,
                                                item.sales > 0
                                                    ? 8
                                                    : 2
                                            )}%`,
                                        }}
                                    ></div>

                                </div>

                                <div className="sales-day">
                                    {item.day}
                                </div>

                                <small>
                                    {item.date}
                                </small>

                            </div>
                        ))}

                    </div>

                </section>

                {/* MAIN REPORT GRID */}
                <section className="reports-grid">

                    {/* BEST SELLING FOODS */}
                    <div className="report-card">

                        <div className="report-card-header">

                            <div>
                                <h2>
                                    Best Selling Foods
                                </h2>

                                <p>
                                    Top 5 most ordered items
                                </p>
                            </div>

                            <span className="report-card-icon">
                                🍔
                            </span>

                        </div>

                        {bestSellingFoods.length === 0 ? (
                            <div className="no-report-data">
                                No food sales available
                            </div>
                        ) : (
                            <div className="best-food-list">

                                {bestSellingFoods.map(
                                    (food, index) => (
                                        <div
                                            className="best-food-item"
                                            key={food.name}
                                        >

                                            <div className="food-rank">
                                                #{index + 1}
                                            </div>

                                            <div className="best-food-info">

                                                <h3>
                                                    {food.name}
                                                </h3>

                                                <p>
                                                    {food.quantity}{" "}
                                                    items sold
                                                </p>

                                            </div>

                                            <strong>
                                                ₹{food.revenue}
                                            </strong>

                                        </div>
                                    )
                                )}

                            </div>
                        )}

                    </div>

                    {/* ORDER STATUS */}
                    <div className="report-card">

                        <div className="report-card-header">

                            <div>
                                <h2>
                                    Order Status
                                </h2>

                                <p>
                                    Current order performance
                                </p>
                            </div>

                            <span className="report-card-icon">
                                📦
                            </span>

                        </div>

                        <div className="status-report-list">

                            {statusReport.map(
                                (item) => (
                                    <div
                                        className="report-status-row"
                                        key={item.status}
                                    >

                                        <div>

                                            <span
                                                className={`report-status-dot ${item.status
                                                    .toLowerCase()
                                                    .replace(
                                                        " ",
                                                        "-"
                                                    )}`}
                                            ></span>

                                            <span>
                                                {item.status}
                                            </span>

                                        </div>

                                        <strong>
                                            {item.count}
                                        </strong>

                                    </div>
                                )
                            )}

                        </div>

                    </div>

                </section>

                {/* REVENUE BREAKDOWN */}
                <section className="report-card revenue-breakdown-card">

                    <div className="report-card-header">

                        <div>
                            <h2>
                                Revenue Breakdown
                            </h2>

                            <p>
                                Detailed revenue calculation
                            </p>
                        </div>

                        <span className="report-card-icon">
                            💰
                        </span>

                    </div>

                    <div className="revenue-breakdown-list">

                        <div className="revenue-row">
                            <span>
                                Subtotal
                            </span>

                            <strong>
                                ₹{revenueBreakdown.subtotal}
                            </strong>
                        </div>

                        <div className="revenue-row">
                            <span>
                                Delivery Charges
                            </span>

                            <strong>
                                ₹{revenueBreakdown.delivery}
                            </strong>
                        </div>

                        <div className="revenue-row">
                            <span>
                                Tax
                            </span>

                            <strong>
                                ₹{revenueBreakdown.tax}
                            </strong>
                        </div>

                        <div className="revenue-row discount-row">
                            <span>
                                Discount
                            </span>

                            <strong>
                                -₹{revenueBreakdown.discount}
                            </strong>
                        </div>

                        <div className="revenue-divider"></div>

                        <div className="revenue-total-row">
                            <span>
                                Total Revenue
                            </span>

                            <strong>
                                ₹{revenueBreakdown.totalRevenue}
                            </strong>
                        </div>

                    </div>

                </section>

                {/* PAYMENT REPORT */}
                <section className="report-card payment-card">

                    <div className="report-card-header">

                        <div>
                            <h2>
                                Payment Methods
                            </h2>

                            <p>
                                Revenue by payment method
                            </p>
                        </div>

                        <span className="report-card-icon">
                            💳
                        </span>

                    </div>

                    {paymentReport.length === 0 ? (
                        <div className="no-report-data">
                            No payment data available
                        </div>
                    ) : (
                        <div className="payment-list">

                            {paymentReport.map(
                                (payment) => (
                                    <div
                                        className="payment-row"
                                        key={payment.method}
                                    >

                                        <div>

                                            <h3>
                                                {payment.method}
                                            </h3>

                                            <p>
                                                {payment.count}{" "}
                                                orders
                                            </p>

                                        </div>

                                        <strong>
                                            ₹{payment.revenue}
                                        </strong>

                                    </div>
                                )
                            )}

                        </div>
                    )}

                </section>

            </main>

            <Footer />
        </>
    );
};

export default AdminReports;