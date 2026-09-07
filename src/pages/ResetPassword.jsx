import "./ResetPassword.css";
import Navbar from "../componenets/Navbar/Navbar";
import Footer from "../componenets/Footer/Footer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const email = localStorage.getItem("resetEmail");
  const otpVerified = localStorage.getItem("otpVerified");

  const handleResetPassword = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (!email || otpVerified !== "true") {
      setError("Please verify OTP first.");
      return;
    }

    try {
     const otp = localStorage.getItem("resetOTP");

if (!otp) {
  setError("OTP session expired. Please verify OTP again.");
  return;
}

      const response = await fetch(
        "http://localhost:5000/api/users/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            otp,
            newPassword,
          }),
        }
      );

      const data = await response.json();

      console.log("Reset Password:", data);

      if (!response.ok) {
        setError(data.message);
        return;
      }

      setMessage("Password reset successfully! 🎉");

      localStorage.removeItem("resetEmail");
      localStorage.removeItem("otpVerified");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {
      console.error("Reset Password Error:", error);
      setError("Server se connect nahi ho pa raha.");
    }
  };

  return (
    <>
      <Navbar />

      <section className="reset-password">
        <div className="reset-card">

          <h2>Reset Password 🔐</h2>

          <p>Create your new password</p>

          <form onSubmit={handleResetPassword}>

            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <button type="submit">
              Reset Password
            </button>

          </form>

          {message && (
            <p className="reset-success">
              {message}
            </p>
          )}

          {error && (
            <p className="reset-error">
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

export default ResetPassword;