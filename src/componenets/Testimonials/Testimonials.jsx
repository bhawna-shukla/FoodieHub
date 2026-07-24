import "./Testimonials.css";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

const reviews = [
  {
    id: 1,
    name: "Sarah",
    review: "The food was amazing and delivery was super fast.",
  },
  {
    id: 2,
    name: "Rahul",
    review: "Best burger I've ever had. Highly recommended!",
  },
  {
    id: 3,
    name: "Priya",
    review: "Fresh food, great service and affordable prices.",
  },
];

const Testimonials = () => {
  return (
    <section className="testimonials">
      <h2>What Our Customers Say</h2>

      <div className="testimonial-container">
        {reviews.map((item) => (
          <motion.div
            className="testimonial-card"
            key={item.id}
            whileHover={{ y: -10 }}
          >
            <div className="stars">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>

            <p>"{item.review}"</p>

            <h3>{item.name}</h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;