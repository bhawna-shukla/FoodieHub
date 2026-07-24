import "./SpecialOffer.css";
import { motion } from "framer-motion";

const SpecialOffer = () => {
  return (
    <section className="offer">

      <motion.div
        className="offer-content"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >

        <h4>🔥 Limited Time Offer</h4>

        <h2>Get 30% OFF</h2>

        <h3>On Your First Order</h3>

        <p>
          Fresh food, fast delivery and unforgettable taste.
        </p>

        <button>Order Now</button>

      </motion.div>

    </section>
  );
};

export default SpecialOffer;