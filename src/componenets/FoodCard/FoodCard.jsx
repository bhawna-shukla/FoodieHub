import "./FoodCard.css";
import { motion } from "framer-motion";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

const FoodCard = ({ food }) => {
  const { addToCart } = useContext(CartContext);
  return (
    <motion.div
      className="food-card"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -12 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
    >
      <img src={food.image} alt={food.name} />

      <div className="food-info">

        <div className="food-top">
          <h3>{food.name}</h3>

          <span className="food-price">
            ₹{food.price}
          </span>
        </div>

        <p className="food-rating">
          ⭐ {food.rating}
        </p>

        <button
          className="add-btn"
          onClick={() => addToCart(food)}
        >
          🛒 Add to Cart
        </button>

      </div>
    </motion.div>
  );
};

export default FoodCard;