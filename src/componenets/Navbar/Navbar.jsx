import "./Navbar.css";
import { FaBars, FaTimes, FaShoppingCart, FaUtensils } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { CartContext } from "../../context/CartContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <header className="navbar">

      <div className="logo">
        <FaUtensils className="logo-icon" />
        <h2>
          Foodie<span>Hub</span>
        </h2>
      </div>

      <ul className={menuOpen ? "nav-links active" : "nav-links"}>
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/about">About</Link>
        </li>

        <li>
          <Link to="/menu">Menu</Link>
        </li>

        <li>
          <Link to="/gallery">Gallery</Link>
        </li>

        <li>
          <Link to="/contact">Contact</Link>
        </li>

        {!user && (
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
        )}
      </ul>

      <div className="nav-right">

        {/* Cart */}
        <div className="cart-wrapper">
          <Link to="/cart" className="cart-link">
            <FaShoppingCart className="cart-icon" />

            {cartItems.length > 0 && (
              <span className="cart-count">
                {cartItems.length}
              </span>
            )}
          </Link>
        </div>

        {/* Login / User */}
        {user ? (
          <div className="user-section">

            <span  className="welcome-user">
              Hi,  {user.name}
            </span>

            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>

          </div>
        ) : (
          <Link to="/login">
            <button className="login-btn">
              Login
            </button>
          </Link>
        )}

        {/* Mobile Menu */}
        <div
          className="menu-icon"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

      </div>

    </header>
  );
};

export default Navbar;