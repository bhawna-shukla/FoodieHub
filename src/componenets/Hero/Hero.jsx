import "./Hero.css";
import { motion } from "framer-motion";
// import HeroImage from "../../assets/images/hero_food.png";
import { Link } from "react-router-dom";


const Hero = () => {
  return (
    <section className="hero">

      

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

        <div className="hero-buttons">
          <div className="hero-buttons">

  <Link to="/menu" className="order-btn">
    Order Now 
  </Link>

  <Link to="/menu" className="explore-btn">
    Explore Menu
  </Link>

</div>
        </div>

      </div>

       <div className="hero-right">
  <motion.img
    src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800"
    alt="Pizza"
    animate={{ y: [0, -15, 0] }}
    transition={{ repeat: Infinity, duration: 3 }}
  />
</div>
{/* 
<div className="hero-left">
  <motion.div
  className="hero-left"
  initial={{ opacity: 0, x: -80 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 1 }}
></motion.div>
</div> */}
<p>
  <motion.p
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.8, delay: 0.5 }}
></motion.p>
</p>


<h1>
  <motion.h1
  initial={{ opacity: 0, y: -50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.2 }}
></motion.h1>
</h1>


{/* 
      <img src={HeroImage} alt="Hero Food" /> */}

    </section>
  );
};

export default Hero;