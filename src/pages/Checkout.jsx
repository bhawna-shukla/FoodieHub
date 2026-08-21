import "./Checkout.css";
import Navbar from "../componenets/Navbar/Navbar";
import Footer from "../componenets/Footer/Footer";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";


const Checkout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const user = JSON.parse(localStorage.getItem("user"));
  const { cartItems, clearCart } = useContext(CartContext);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
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
  const handlePlaceOrder = async () => {
    if (
      !formData.name ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.pincode
    ) {
      setError("⚠ Please fill all delivery details");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user || !user._id) {
        setError("Please login again.");
        setLoading(false);
        return;
      }

      const orderData = {
        userId: user._id,

        customerName: formData.name,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,

        items: cartItems.map((item) => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),

        subtotal,
        delivery,
        tax,
        discount,
        total,

        paymentMethod: paymentMethod,
      };

      const response = await fetch(
        "http://localhost:5000/api/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );

      const data = await response.json();

      console.log("Order Response:", data);

      if (!response.ok) {
        setError(data.message || "Order failed");
        setLoading(false);
        return;
      }

      clearCart();
      navigate("/order-success");

    } catch (error) {
      console.error("Order Error:", error);
      setError("Unable to connect to server");
      setLoading(false);
    }
  };
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
                  checked={paymentMethod === "cod"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Cash on Delivery
              </label>

              <label>
                <input
                  type="radio"
                  name="payment"
                  value="upi"
                  checked={paymentMethod === "upi"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                UPI
              </label>

              <label>
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
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
              onClick={handlePlaceOrder}
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