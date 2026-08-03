import "./Login.css";
import Navbar from "../componenets/Navbar/Navbar";
import Footer from "../componenets/Footer/Footer";

const Login = () => {
  return (
    <>
      <Navbar />

      <section className="login">

        <div className="login-card">

          <h2>Welcome Back 👋</h2>
          <p>Login to your FoodieHub account</p>

          <input
            type="email"
            placeholder="Email Address"
          />

          <input
            type="password"
            placeholder="Password"
          />

          <button className="login-btn-main">
            Login
          </button>

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