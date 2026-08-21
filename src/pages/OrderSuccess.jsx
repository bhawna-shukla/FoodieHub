import "./OrderSuccess.css";
import Navbar from "../componenets/Navbar/Navbar";
import Footer from "../componenets/Footer/Footer";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const OrderSuccess = () => {
  const navigate = useNavigate();

  // Temporary Order Number
  const orderNumber = Math.floor(100000 + Math.random() * 900000);
  const orderDate = new Date().toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <>
      <Navbar />

      <section className="success">

        <motion.div
          className="success-card"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >

          <div className="success-icon">🎉</div>

          <h1>Order Placed Successfully!</h1>

          <h3>Order ID: #{orderNumber}</h3>

          <p className="order-date">
            <strong>Date:</strong> {orderDate}
          </p>

          <p className="success-message">
            Thank you for choosing <strong>FoodieHub!</strong><br />
            Your order has been placed successfully and our chefs have started preparing your meal.
            We'll notify you once it's ready for delivery.
          </p>

          <button
  className="continue-btn"
  onClick={() => navigate("/my-orders")}
>
  View My Orders
</button>

        </motion.div>

      </section>

      <Footer />
    </>
  );
};

export default OrderSuccess;