import "./Categories.css";
import {
  FaPizzaSlice,
  FaHamburger,
  FaCheese,
  FaLeaf,
  FaGlassWhiskey,
  FaIceCream,
} from "react-icons/fa";
import { motion } from "framer-motion";

const categoryIcons = {
  Pizza: <FaPizzaSlice />,
  Burger: <FaHamburger />,
  Pasta: <FaCheese />,
  Salad: <FaLeaf />,
  Drinks: <FaGlassWhiskey />,
  Dessert: <FaIceCream />,
};

const Categories = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <section className="categories">

      <h2>Browse Categories</h2>

      <div className="category-grid">

        {categories.map((item, index) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className={
              selectedCategory === item
                ? "category-card active"
                : "category-card"
            }
            onClick={() => setSelectedCategory(item)}
          >
            <div className="icon">
              {item === "All" ? "🍽️" : categoryIcons[item]}
            </div>

            <h4>{item}</h4>

          </motion.div>
        ))}

      </div>

    </section>
  );
};

export default Categories;