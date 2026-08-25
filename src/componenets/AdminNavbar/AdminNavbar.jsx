import "./AdminNavbar.css";
import { FaBars, FaTimes, FaUtensils } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const AdminNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

const [user, setUser] = useState(() => {
  const savedUser = localStorage.getItem("user");
  return savedUser ? JSON.parse(savedUser) : null;
});

  const navigate = useNavigate();

  // =========================
  // ADMIN LOGOUT
  // =========================

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setMenuOpen(false);
    navigate("/");
  };

  // =========================
  // CLOSE MOBILE MENU
  // =========================

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <header className="navbar">

      {/* =========================
          LOGO
      ========================= */}

      <div className="logo">
        <FaUtensils className="logo-icon" />

        <h2>
          Foodie<span>Hub</span>
        </h2>

        <span className="admin-badge">
          ADMIN
        </span>
      </div>

      {/* =========================
          ADMIN NAVIGATION
      ========================= */}

      <ul
        className={
          menuOpen
            ? "nav-links active"
            : "nav-links"
        }
      >

        <li>
          <Link
            to="/admin/dashboard"
            onClick={handleLinkClick}
          >
            Dashboard
          </Link>
        </li>

        <li>
          <Link
            to="/admin/orders"
            onClick={handleLinkClick}
          >
            Orders
          </Link>
        </li>

        <li>
          <Link
            to="/admin/customers"
            onClick={handleLinkClick}
          >
            Customers
          </Link>
        </li>

        <li>
         <Link
  to="/admin/menu"
  onClick={handleLinkClick}
>
  Menu
</Link>
        </li>

        <li>
          <Link
            to="/admin/reports"
            onClick={handleLinkClick}
          >
            Reports
          </Link>
        </li>

      </ul>

      {/* =========================
          ADMIN USER SECTION
      ========================= */}

      <div className="nav-right">

        {user && (
          <div className="user-section">

            <span className="welcome-user">
              Hi, {user.name}
            </span>

            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>

          </div>
        )}

        {/* =========================
            MOBILE MENU
        ========================= */}

        <div
          className="menu-icon"
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
        >
          {menuOpen ? (
            <FaTimes />
          ) : (
            <FaBars />
          )}
        </div>

      </div>

    </header>
  );
};

export default AdminNavbar;