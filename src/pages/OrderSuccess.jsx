import "./OrderSuccess.css";
import Navbar from "../componenets/Navbar/Navbar";
import Footer from "../componenets/Footer/Footer";
import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();

  // Temporary Order Number
  const orderNumber = Math.floor(100000 + Math.random() * 900000);

  return (
    <>
      <Navbar />

      <section className="success">

        <div className="success-card">

          <div className="success-icon">🎉</div>

          <h1>Order Placed Successfully!</h1>

          <p>
            Thank you for choosing FoodieHub.
            Your delicious meal is being prepared.
          </p>

          <h3>Order No. #{orderNumber}</h3>

          <button
            onClick={() => navigate("/menu")}
            className="continue-btn"
          >
            Continue Shopping
          </button>

        </div>

      </section>

      <Footer />
    </>
  );
};

export default OrderSuccess;