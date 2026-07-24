import "./Navbar.css"
import { FaBars, FaTimes, FaShoppingCart } from "react-icons/fa";
import { FaUtensils } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { CartContext } from "../../context/CartContext";


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartItems } = useContext(CartContext);

  return (
    <header className="navbar">

      <div className="logo">
        <FaUtensils className="logo-icon" />
        <h2>
          Foodie<span>Hub</span>
        </h2>
      </div>
      <ul className={menuOpen ? "nav-links active" : "nav-links"}>
        <li><Link to="/">Home</Link></li>
        <li><a href="#about">About</a></li>
        <li><Link to="/menu">Menu</Link></li>
        <li><a href="#gallery">Gallery</a></li>
        <li><a href="#contact">Contact</a></li>
        {/* <li>
          <Link to="/cart" className="mobile-cart-link">
            <FaShoppingCart />
          </Link>
        </li> */}
      </ul>

      <div className="nav-right">

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
        <button
          className="login-btn"
          onClick={() => alert("Login page coming soon 🚀")}
        >
          Login
        </button>

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