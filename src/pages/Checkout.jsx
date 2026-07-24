import "./Checkout.css";
import Navbar from "../componenets/Navbar/Navbar";
import Footer from "../componenets/Footer/Footer";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";


const Checkout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { cartItems, clearCart } = useContext(CartContext);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [error, setError] = useState("");

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const delivery = cartItems.length > 0 ? 50 : 0;

  const tax = Math.round(subtotal * 0.05);

  const discount = cartItems.length > 0 ? 100 : 0;

  const total = subtotal + delivery + tax - discount;
  return (
    <>
      <Navbar />

      <section className="checkout">
        <h1 className="checkout-title">Complete Your Order</h1>
        <p className="para">Please enter your delivery details to continue.</p>

        <div className="checkout-container">

          {/* Left Side */}
          <div className="checkout-form">

            <h2>Delivery Address</h2>

            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />

            <input
              type="tel"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />

            <textarea
              placeholder="Address"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />

            
            <input
              type="text"
              placeholder="City"
              value={formData.city}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
            />
            

            <input
              type="text"
              placeholder="State"
              value={formData.state}
              onChange={(e) =>
                setFormData({ ...formData, state: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Pincode"
              value={formData.pincode}
              onChange={(e) =>
                setFormData({ ...formData, pincode: e.target.value })
              }
            />

          </div>

          {/* Right Side */}

          <div className="order-summary">

            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="summary-row">
              <span>Delivery</span>
              <span>₹{delivery}</span>
            </div>

            <div className="summary-row">
              <span>Tax</span>
              <span>₹{tax}</span>
            </div>
            <div className="summary-row">
              <span>Discount</span>
              <span>-₹{discount}</span>
            </div>

            <hr />

            <div className="summary-row total">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <div className="payment-method">
              <h3>Payment Method</h3>

              <label>
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  defaultChecked
                />
                Cash on Delivery
              </label>

              <label>
                <input
                  type="radio"
                  name="payment"
                  value="upi"
                />
                UPI
              </label>

              <label>
                <input
                  type="radio"
                  name="payment"
                  value="card"
                />
                Credit / Debit Card
              </label>
            </div>
            {error && (
              <p className="error-message">
                {error}
              </p>
            )}
            <button
  className="payment-btn"
  disabled={loading}
  onClick={() => {

    if (
      !formData.name ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.pincode
    ) {
      alert("⚠ Please fill all delivery details");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      clearCart();
      navigate("/order-success");
    }, 3000);

  }}
>
  {loading ? "Placing Order..." : "Place Order"}
</button>
          </div>


        </div>

      </section>

      <Footer />
    </>
  );
};

export default Checkout;