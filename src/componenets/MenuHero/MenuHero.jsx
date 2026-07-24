import "./MenuHero.css";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";

const MenuHero = () => {
  return (
    <section className="menu-hero">

      <div className="menu-hero-content">

        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="menu-left"
        >
          <h1>
            Explore Our <span>Delicious Menu</span>
          </h1>

          <p>
            Fresh ingredients, amazing taste and quick delivery.
            Find your favorite food below.
          </p>

          {/* <div className="search-box">
            <FaSearch className="search-icon" />

            <input
              type="text"
              placeholder="Search your favorite food..."
            />
          </div> */}
        </motion.div>

        <motion.div
          className="menu-right"
          animate={{ y: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          <img
            src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800"
            alt="Burger"
          />
        </motion.div>

      </div>

    </section>
  );
};

export default MenuHero;