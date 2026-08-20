import "./Signup.css";
import { Link } from "react-router-dom";
import Navbar from "../componenets/Navbar/Navbar";
import signupImg from "../assets/signup.png";
import { useState } from "react";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("🔥 SIGNUP BUTTON CLICKED");
    console.log("Form Data:", formData);

    // Check password
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match ❌");
      console.log("❌ Passwords do not match");
      return;
    }

    try {
      console.log("📡 Sending signup request...");

      const response = await fetch(
        "http://localhost:5000/api/users/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
          }),
        }
      );

      console.log("📡 Response Status:", response.status);

      const data = await response.json();

      console.log("📦 Server Response:", data);

      if (response.ok) {
        setMessage("Account created successfully! 🎉");

        setFormData({
          name: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
        });
      } else {
        setMessage(data.message || "Signup failed ❌");
      }
    } catch (error) {
      console.error("❌ Signup Error:", error);
      setMessage("Unable to connect to server ❌");
    }
  };

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

            <p>
              Join FoodieHub and order your favorite food.
            </p>

            <form onSubmit={handleSubmit}>

              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />

              <button type="submit">
                Create Account
              </button>

            </form>

            {message && (
              <p className="signup-message">
                {message}
              </p>
            )}

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