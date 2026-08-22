import "./PopularDishes.css";
import foodData from "../../data/FoodData";
import { Link } from "react-router-dom";
import burger  from "../../assets/menu/grilled-chicken-burger.jpg";
import pizza  from "../../assets/menu/veg-supreme-pizza.jpg";
import salad  from "../../assets/menu/paneer-tikka-salad.jpg";
import coffee from "../../assets/menu/oreo-shake.jpg";
import mocktail from "../../assets/menu/blue-mocktail.jpg";
import cake from "../../assets/menu/strawberry-cheesecake.jpg";

const PopularDishes = () => {
  const popularItems = [
    
      { id: 1, name: "Grilled Chicken Burger", image: burger },
      { id: 2, name: "Supreme Pizza", image: pizza },
      { id: 3, name: "Paneer Tikka Salad", image: salad },
      { id: 4, name: "Oreo-Shake", image:coffee},
      { id: 5, name: "Blue Mocktail", image:mocktail},
      { id: 6, name: "Strawberry Cake", image:cake},
    
    
   
  ];
  return (
    <section className="popular">

      <h2>Our Popular Dishes</h2>

      <div className="popular-grid">
        {popularItems.map((item) => (
          <div className="popular-card" key={item.id}>
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
          </div>
        ))}
      </div>

      <Link to="/menu" className="menu-btn">
        Explore Full Menu →
      </Link>

    </section>
  );
};

export default PopularDishes;