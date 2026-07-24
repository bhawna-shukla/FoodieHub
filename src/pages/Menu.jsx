import { useState } from "react";

import Navbar from "../componenets/Navbar/Navbar";
import MenuHero from "../componenets/MenuHero/MenuHero";
import Categories from "../componenets/Category/Categories";
import FoodCard from "../componenets/FoodCard/FoodCard";
import MenuSearch from "../componenets/MenuSearch/MenuSearch";
import Footer from "../componenets/Footer/Footer";

import foodData from "../data/foodData";

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");

  const categories = [
    "All",
    "Pizza",
    "Burger",
    "Pasta",
    "Salad",
    "Drinks",
    "Dessert",
  ];

  const filteredFood = foodData.filter((item) => {
    const matchCategory =
      selectedCategory === "All" ||
      item.category === selectedCategory;

    const matchSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <>
      <Navbar />

      <MenuHero />

      <MenuSearch
        search={search}
        setSearch={setSearch}
      />

      <Categories
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <section className="food-section">
        <div className="food-grid">
          {filteredFood.map((food) => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Menu;