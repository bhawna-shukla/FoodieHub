import "./Signup.css";
import { Link } from "react-router-dom";
import Navbar from "../componenets/Navbar/Navbar";
import signupImg from "../assets/signup.png";   // apni image yahan import karna

const Signup = () => {
  return (
    <>
      <Navbar />

      <section className="signup">

        <div className="signup-container">

          {/* Left Side */}
          <div className="signup-left">
            <img src={signupImg} alt="Food" />
          </div>

          {/* Right Side */}
          <div className="signup-right">

            <h2>Create Account</h2>
            <p>Join FoodieHub and order your favorite food.</p>

            <form>

              <input
                type="text"
                placeholder="Full Name"
              />

              <input
                type="email"
                placeholder="Email Address"
              />

              <input
                type="tel"
                placeholder="Phone Number"
              />

              <input
                type="password"
                placeholder="Password"
              />

              <input
                type="password"
                placeholder="Confirm Password"
              />

              <button type="submit">
                Create Account
              </button>

            </form>

            <p className="login-link">
              Already have an account?
              <Link to="/login"> Login</Link>
            </p>

          </div>

        </div>

      </section>
    </>
  );
};

export default Signup;