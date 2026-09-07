import "./ForgotPassword.css";
import Navbar from "../componenets/Navbar/Navbar";
import Footer from "../componenets/Footer/Footer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSendOTP = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        return;
      }

      // Save email and OTP temporarily
      localStorage.setItem("resetEmail", email);
      // localStorage.setItem("resetOTP", data.otp);

      setMessage("OTP sent successfully!");

      setTimeout(() => {
        navigate("/verify-otp");
      }, 1000);

    } catch (error) {
      console.error("Forgot Password Error:", error);
      setError("Server se connect nahi ho pa raha.");
    }
  };

  return (
    <>
      <Navbar />

      <section className="forgot-password">
        <div className="forgot-card">

          <h2>Forgot Password 🔐</h2>

          <p>
            Enter your registered email address
          </p>

          <form onSubmit={handleSendOTP}>

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button type="submit">
              Send OTP
            </button>

          </form>

          {message && (
            <p className="forgot-success">
              {message}
            </p>
          )}

          {error && (
            <p className="forgot-error">
              {error}
            </p>
          )}

          <button
            className="back-login"
            onClick={() => navigate("/login")}
          >
            ← Back to Login
          </button>

        </div>
      </section>

      <Footer />
    </>
  );
};

export default ForgotPassword;