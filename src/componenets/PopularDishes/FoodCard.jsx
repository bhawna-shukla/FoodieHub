import { FaStar } from "react-icons/fa";

const FoodCard = ({ item }) => {
  return (
    <div className="food-card">

      <img src={item.image} alt={item.name} />

      <h3>{item.name}</h3>

      <p className="rating">
        <FaStar className="star" />
        {item.rating}
      </p>

      <h2>₹ {item.price}</h2>

      <button>Add to Cart</button>

    </div>
  );
};

export default FoodCard;    