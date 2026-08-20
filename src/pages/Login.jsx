import "./Login.css";
import Navbar from "../componenets/Navbar/Navbar";
import Footer from "../componenets/Footer/Footer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      console.log("Login Response:", data);

      if (!response.ok) {
        setMessage(data.message);
        return;
      }

      // Success popup
      setShowSuccess(true);

      localStorage.setItem("user", JSON.stringify(data.user));

      // Clear form
      setEmail("");
      setPassword("");

    } catch (error) {
      console.error("Login Error:", error);
      setMessage("Server se connect nahi ho pa raha.");
    }
  };

  return (
    <>
      <Navbar />

      <section className="login">
        <div className="login-card">

          <h2>Welcome Back 👋</h2>

          <p>Login to your FoodieHub account</p>

          <form onSubmit={handleSubmit}>

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              className="login-btn-main"
            >
              Login
            </button>

          </form>

          {message && (
            <p className="login-error">
              {message}
            </p>
          )}

          <span className="forgot">
            Forgot Password?
          </span>

          <p className="signup-text">
            Don't have an account?
            <span> Sign Up</span>
          </p>

        </div>
      </section>

      <Footer />

      {/* Success Popup */}
      {showSuccess && (
        <div className="success-overlay">
          <div className="success-popup">

            <div className="success-icon">
              ✓
            </div>

            <h2>Login Successful!</h2>

            <p>
              Welcome back to FoodieHub 🎉
            </p>

            <button
              className="success-continue-btn"
              onClick={() => navigate("/")}
            >
              Continue
            </button>

          </div>
        </div>
      )}
    </>
  );
};

export default Login;