import "./Hero.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="hero">

      {/* =========================
          HERO LEFT CONTENT
      ========================= */}
      <div className="hero-left">

        <h1>
          Delicious Food
          <br />
          Delivered To
          <span> Your Door</span>
        </h1>

        <p>
          Enjoy fresh, healthy and delicious meals prepared by our expert chefs.
          Fast delivery, premium quality and unforgettable taste.
        </p>

        {/* =========================
            HERO BUTTONS
        ========================= */}
        <div className="hero-buttons">

          <Link to="/menu" className="order-btn">
            Order Now
          </Link>

          <Link to="/menu" className="explore-btn">
            Explore Menu
          </Link>

        </div>

      </div>

      {/* =========================
          HERO RIGHT IMAGE
      ========================= */}
      <div className="hero-right">

        <motion.img
          src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800"
          alt="Food"
          animate={{ y: [0, -15, 0] }}
          transition={{
            repeat: Infinity,
            duration: 3,
          }}
        />

      </div>

    </section>
  );
};

export default Hero;