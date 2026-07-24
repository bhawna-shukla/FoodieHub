import "./PopularDishes.css";
import foodData from "../../data/foodData";
import FoodCard from "./FoodCard";

const PopularDishes = () => {
  return (
    <section className="popular">

      <h2>Our Popular Dishes</h2>

      <p>
        Freshly prepared with premium ingredients and delivered with love.
      </p>

      <div className="food-container">

        {foodData.map((item) => (
          <FoodCard key={item.id} item={item} />
        ))}

      </div>

    </section>
  );
};

export default PopularDishes;