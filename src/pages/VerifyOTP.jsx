import "./VerifyOTP.css";
import Navbar from "../componenets/Navbar/Navbar";
import Footer from "../componenets/Footer/Footer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const email = localStorage.getItem("resetEmail");

  const handleVerifyOTP = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/verify-reset-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            otp,
          }),
        }
      );

      const data = await response.json();

      console.log("OTP Verification:", data);

      if (!response.ok) {
        setError(data.message);
        return;
      }

      setMessage("OTP verified successfully!");

      // OTP verified
      localStorage.setItem("otpVerified", "true");

      setTimeout(() => {
        navigate("/reset-password");
      }, 1000);

    } catch (error) {
      console.error("OTP Error:", error);
      setError("Server se connect nahi ho pa raha.");
    }
  };

  return (
    <>
      <Navbar />

      <section className="verify-otp">
        <div className="verify-card">

          <h2>Verify OTP 🔐</h2>

          <p>
            Enter the OTP sent to your email
          </p>

          <form onSubmit={handleVerifyOTP}>

            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength="6"
              required
            />

            <button type="submit">
              Verify OTP
            </button>

          </form>

          {message && (
            <p className="verify-success">
              {message}
            </p>
          )}

          {error && (
            <p className="verify-error">
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

export default VerifyOTP;