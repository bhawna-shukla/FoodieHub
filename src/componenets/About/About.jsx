import "./About.css";
import { motion } from "framer-motion";

const About = () => {
  return (
    <section className="about" id="about">

      <motion.div
        className="about-left"
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <img
          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800"
          alt="Restaurant"
        />
      </motion.div>

      <motion.div
        className="about-right"
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2>About FoodieHub</h2>

        <p>
          At FoodieHub, we believe that great food brings people together.
          Our chefs prepare every meal with fresh ingredients, authentic
          recipes, and lots of love.
        </p>

        <p>
          Whether you're craving a juicy burger, cheesy pizza, creamy pasta,
          or healthy salads, we've got something delicious for everyone.
        </p>

        <button>Learn More</button>
      </motion.div>

    </section>
  );
};

export default About;