import "./WhyChooseUs.css";
import { FaTruckFast, FaLeaf, FaStar } from "react-icons/fa6";
import { MdRestaurant } from "react-icons/md";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <FaTruckFast />,
      title: "Fast Delivery",
      desc: "Get your favorite food delivered within 30 minutes.",
    },
    {
      icon: <MdRestaurant />,
      title: "Expert Chefs",
      desc: "Our professional chefs prepare every meal with love.",
    },
    {
      icon: <FaLeaf />,
      title: "Fresh Ingredients",
      desc: "Only fresh and healthy ingredients are used every day.",
    },
    {
      icon: <FaStar />,
      title: "Best Quality",
      desc: "Premium quality food with amazing taste.",
    },
  ];

  return (
    <section className="choose">
      <h2>Why Choose FoodieHub</h2>
      <p>We provide quality food with excellent service.</p>

      <div className="choose-container">
        {features.map((item, index) => (
          <div key={index} className="choose-card">
            <div className="icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;