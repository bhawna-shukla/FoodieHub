import "./AdminLogin.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
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

      console.log("Admin Login Response:", data);

      if (!response.ok) {
        setMessage(data.message);
        return;
      }

      // Check admin role
      if (data.user.role !== "admin") {
        setMessage("Access denied. Only admin can login here.");
        return;
      }

      // Save admin user
      localStorage.setItem("user", JSON.stringify(data.user));

      // Go to admin dashboard
      navigate("/admin/dashboard");

    } catch (error) {
      console.error("Admin Login Error:", error);
      setMessage("Server se connect nahi ho pa raha.");
    }
  };

  return (
    <section className="admin-login">
      <div className="admin-login-card">

        <div className="admin-login-icon">
          🔐
        </div>

        <h2>Admin Login</h2>

        <p>Login to FoodieHub Admin Panel</p>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="admin-login-btn"
          >
            Login as Admin
          </button>

        </form>

        {message && (
          <p className="admin-login-error">
            {message}
          </p>
        )}

      </div>
    </section>
  );
};

export default AdminLogin;