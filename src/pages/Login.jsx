import "./Login.css";
import Navbar from "../componenets/Navbar/Navbar";
import Footer from "../componenets/Footer/Footer";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 const handleSubmit = (e) => {
  e.preventDefault();

  console.log("Email:", email);
  console.log("Password:", password);

  // Clear form
  setEmail("");
  setPassword("");
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
    </>
  );
};

export default Login;