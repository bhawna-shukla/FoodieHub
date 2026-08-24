import { useEffect, useMemo, useState } from "react";
import Navbar from "../componenets/Navbar/Navbar";
import Footer from "../componenets/Footer/Footer";
import "./AdminMenu.css";

import margheritaPizza from "../assets/menu/margherita-pizza.jpg";
import cheesburst from "../assets/menu/cheese-burst-pizza.jpg";
import farmhousePizza from "../assets/menu/farmhouse-pizza.jpg";
import vegPizza from "../assets/menu/veg-supreme-pizza.jpg";
import pepperoni from "../assets/menu/pepperoni-pizza.jpg";

import classicCheeseBurger from "../assets/menu/classic-cheese-burger.jpg";
import crispyChickenBurger from "../assets/menu/crispy-chicken-burger.jpg";
import doublePartyBurger from "../assets/menu/double-party-burger.jpg";
import grilledChickenBurger from "../assets/menu/grilled-chicken-burger.jpg";

import butterMasalaPasta from "../assets/menu/butter-masala-pasta.jpg";
import italianAlfredoPasta from "../assets/menu/italian-alfredo-pasta.jpg";
import paneerTikkaPasta from "../assets/menu/paneer-tikka-pasta.jpg";
import cheeseMasalaPasta from "../assets/menu/cheese-masala-pasta.jpg";

import cucumberSalad from "../assets/menu/cucumber-tomato-salad.jpg";
import paneerTikkaSalad from "../assets/menu/paneer-tikka-salad.jpg";
import cornVeggie from "../assets/menu/corn-veggie-salad.jpg";

import strawberryMilkshake from "../assets/menu/strawberry-milkshake.jpg";
import oreoShake from "../assets/menu/oreo-shake.jpg";
import blueMocktail from "../assets/menu/blue-mocktail.jpg";
import cappuccino from "../assets/menu/cappuccino.jpg";

import chocolateLavaCake from "../assets/menu/chocolate-lava-cake.jpg";
import caramelPudding from "../assets/menu/caramel-pudding.jpg";
import mangoMousse from "../assets/menu/mango-mousse.jpg";
import rasmalai from "../assets/menu/rasmalai.jpg";
import strawberryCake from "../assets/menu/strawberry-cheesecake.jpg";


const foodImages = [
  {
    name: "Margherita Pizza",
    image: margheritaPizza,
  },
  {
    name: "Cheese Burst Pizza",
    image: cheesburst,
  },
  {
    name: "Farmhouse Pizza",
    image: farmhousePizza,
  },
  {
    name: "Veg Supreme Pizza",
    image: vegPizza,
  },
  {
    name: "Pepperoni Pizza",
    image: pepperoni,
  },
  {
    name: "Classic Cheese Burger",
    image: classicCheeseBurger,
  },
  {
    name: "Crispy Chicken Burger",
    image: crispyChickenBurger,
  },
  {
    name: "Double Party Burger",
    image: doublePartyBurger,
  },
  {
    name: "Grilled Chicken Burger",
    image: grilledChickenBurger,
  },
  {
    name: "Butter Masala Pasta",
    image: butterMasalaPasta,
  },
  {
    name: "Italian Alfredo Pasta",
    image: italianAlfredoPasta,
  },
  {
    name: "Paneer Tikka Pasta",
    image: paneerTikkaPasta,
  },
  {
    name: "Cheese Masala Pasta",
    image: cheeseMasalaPasta,
  },
  {
    name: "Cucumber Tomato Salad",
    image: cucumberSalad,
  },
  {
    name: "Paneer Tikka Salad",
    image: paneerTikkaSalad,
  },
  {
    name: "Corn Veggie Salad",
    image: cornVeggie,
  },
  {
    name: "Strawberry Milkshake",
    image: strawberryMilkshake,
  },
  {
    name: "Oreo Shake",
    image: oreoShake,
  },
  {
    name: "Blue Mocktail",
    image: blueMocktail,
  },
  {
    name: "Cappuccino Coffee",
    image: cappuccino,
  },
  {
    name: "Chocolate Lava Cake",
    image: chocolateLavaCake,
  },
  {
    name: "Caramel Pudding",
    image: caramelPudding,
  },
  {
    name: "Mango Mousse",
    image: mangoMousse,
  },
  {
    name: "Rasmalai",
    image: rasmalai,
  },
  {
    name: "Strawberry Cheese Cake",
    image: strawberryCake,
  },
];

const AdminMenu = () => {
  const [foods, setFoods] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [showForm, setShowForm] = useState(false);
  const [editingFood, setEditingFood] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "Pizza",
    price: "",
    rating: "",
    image: "",
  });

  const categories = [
    "All",
    "Pizza",
    "Burger",
    "Pasta",
    "Salad",
    "Drinks",
    "Dessert",
  ];

  const foodCategories = categories.filter(
    (item) => item !== "All"
  );

  // =========================
  // GET ALL FOODS
  // =========================
  useEffect(() => {
    fetch("http://localhost:5000/api/foods")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch foods");
        }

        return response.json();
      })
      .then((data) => {
        if (data.success) {
          setFoods(data.foods);
        }
      })
      .catch((error) => {
        console.error("Error fetching foods:", error);
      });
  }, []);

  // =========================
  // SEARCH + CATEGORY FILTER
  // =========================
  const filteredFood = useMemo(() => {
    return foods.filter((food) => {
      const matchesSearch = food.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || food.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [foods, search, category]);

  // =========================
  // INPUT CHANGE
  // =========================
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =========================
  // OPEN ADD FORM
  // =========================
  const openAddForm = () => {
    setEditingFood(null);

    setFormData({
      name: "",
      category: "Pizza",
      price: "",
      rating: "",
      image: "",
    });

    setShowForm(true);
  };

  // =========================
  // OPEN EDIT FORM
  // =========================
  const openEditForm = (food) => {
    setEditingFood(food);

    setFormData({
      name: food.name,
      category: food.category,
      price: food.price,
      rating: food.rating || "",
      image: food.image,
    });

    setShowForm(true);
  };

  // =========================
  // ADD / UPDATE FOOD
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.price ||
      !formData.rating ||
      !formData.image
    ) {
      alert("Please fill all fields.");
      return;
    }

    const foodData = {
      name: formData.name,
      category: formData.category,
      price: Number(formData.price),
      rating: Number(formData.rating),
      image: formData.image,
    };

    try {
      // =========================
      // UPDATE
      // =========================
      if (editingFood) {
        const response = await fetch(
          `http://localhost:5000/api/foods/${editingFood._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(foodData),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to update food");
        }

        setFoods((previous) =>
          previous.map((food) =>
            food._id === editingFood._id ? data.food : food
          )
        );

        alert("Food updated successfully!");
      }

      // =========================
      // ADD
      // =========================
      else {
        const response = await fetch(
          "http://localhost:5000/api/foods",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(foodData),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to add food");
        }

        setFoods((previous) => [
          data.food,
          ...previous,
        ]);

        alert("Food added successfully!");
      }

      closeForm();
    } catch (error) {
      console.error("Food operation error:", error);
      alert(error.message);
    }
  };

  // =========================
  // CLOSE FORM
  // =========================
  const closeForm = () => {
    setShowForm(false);
    setEditingFood(null);

    setFormData({
      name: "",
      category: "Pizza",
      price: "",
      rating: "",
      image: "",
    });
  };

  // =========================
  // DELETE FOOD
  // =========================
  const handleDelete = async (food) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${food.name}"?`
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/foods/${food._id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete food"
        );
      }

      setFoods((previous) =>
        previous.filter((item) => item._id !== food._id)
      );

      alert("Food deleted successfully!");
    } catch (error) {
      console.error("Delete error:", error);
      alert(error.message);
    }
  };

  return (
    <>
      <Navbar />

      <main className="admin-menu">

        {/* Header */}
        <div className="admin-menu-header">
          <div>
            <h1>Manage Menu</h1>
            <p>Add, edit and manage all food items</p>
          </div>

          <button
            className="add-food-btn"
            onClick={openAddForm}
          >
            + Add Food
          </button>
        </div>

        {/* Search & Filter */}
        <div className="menu-controls">

          <div className="menu-search">
            <span>🔍</span>

            <input
              type="text"
              placeholder="Search food items..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            className="menu-category-filter"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item === "All"
                  ? "All Categories"
                  : item}
              </option>
            ))}
          </select>

          {(search || category !== "All") && (
            <button
              className="clear-menu-filter"
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
            >
              Clear
            </button>
          )}

        </div>

        {/* Result */}
        <div className="menu-result-info">
          <span>
            Showing <strong>{filteredFood.length}</strong>{" "}
            food items
          </span>
        </div>

        {/* Table */}
        <div className="admin-menu-table-container">

          <table className="admin-menu-table">

            <thead>
              <tr>
                <th>#</th>
                <th>Food</th>
                <th>Category</th>
                <th>Price</th>
                <th>Rating</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {filteredFood.length > 0 ? (

                filteredFood.map((food, index) => (

                  <tr key={food._id}>

                    <td>{index + 1}</td>

                    <td>
                      <div className="admin-food-info">

                        <img
                          src={food.image}
                          alt={food.name}
                          className="admin-food-image"
                        />

                        <span>{food.name}</span>

                      </div>
                    </td>

                    <td>
                      <span className="food-category">
                        {food.category}
                      </span>
                    </td>

                    <td className="food-price">
                      ₹{food.price}
                    </td>

                    <td>
                      <span className="food-rating">
                        ⭐ {food.rating}
                      </span>
                    </td>

                    <td>
                      <span className="food-status active">
                        {food.available
                          ? "Available"
                          : "Unavailable"}
                      </span>
                    </td>

                    <td>
                      <div className="food-actions">

                        <button
                          className="edit-food-btn"
                          onClick={() =>
                            openEditForm(food)
                          }
                        >
                          Edit
                        </button>

                        <button
                          className="delete-food-btn"
                          onClick={() =>
                            handleDelete(food)
                          }
                        >
                          Delete
                        </button>

                      </div>
                    </td>

                  </tr>

                ))

              ) : (

                <tr>
                  <td
                    colSpan="7"
                    className="no-food-items"
                  >
                    No food items found
                  </td>
                </tr>

              )}

            </tbody>

          </table>

        </div>

        {/* Add / Edit Modal */}
        {showForm && (

          <div
            className="food-modal-overlay"
            onClick={closeForm}
          >

            <div
              className="food-modal"
              onClick={(e) =>
                e.stopPropagation()
              }
            >

              <div className="food-modal-header">

                <div>
                  <h2>
                    {editingFood
                      ? "Edit Food"
                      : "Add New Food"}
                  </h2>

                  <p>
                    {editingFood
                      ? "Update food item details"
                      : "Add a new item to your menu"}
                  </p>
                </div>

                <button
                  className="close-modal"
                  onClick={closeForm}
                >
                  ×
                </button>

              </div>

              <form onSubmit={handleSubmit}>

                <div className="form-group">

                  <label>Food Name</label>

                  <input
                    type="text"
                    name="name"
                    placeholder="e.g. Paneer Pizza"
                    value={formData.name}
                    onChange={handleInputChange}
                  />

                </div>

                <div className="form-row">

                  <div className="form-group">

                    <label>Category</label>

                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                    >
                      {foodCategories.map(
                        (item) => (
                          <option
                            key={item}
                            value={item}
                          >
                            {item}
                          </option>
                        )
                      )}
                    </select>

                  </div>

                  <div className="form-group">

                    <label>Price</label>

                    <input
                      type="number"
                      name="price"
                      min="1"
                      placeholder="299"
                      value={formData.price}
                      onChange={handleInputChange}
                    />

                  </div>

                </div>

                <div className="form-row">

                  <div className="form-group">

                    <label>Rating</label>

                    <input
                      type="number"
                      name="rating"
                      min="0"
                      max="5"
                      step="0.1"
                      placeholder="4.8"
                      value={formData.rating}
                      onChange={handleInputChange}
                    />

                  </div>

                  {/* <div className="form-group">

                    <label>Image URL</label>

                    <input
                      type="text"
                      name="image"
                      placeholder="https://..."
                      value={formData.image}
                      onChange={handleInputChange}
                    />

                  </div> */}



                  <div className="form-group">

                    <label>Food Image</label>

                    <select
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Food Image</option>

                      {foodImages.map((item) => (
                        <option key={item.name} value={item.image}>
                          {item.name}
                        </option>
                      ))}

                    </select>

                  </div>
                </div>

                <div className="modal-actions">

                  <button
                    type="button"
                    className="cancel-food-btn"
                    onClick={closeForm}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="save-food-btn"
                  >
                    {editingFood
                      ? "Update Food"
                      : "Add Food"}
                  </button>

                </div>

              </form>

            </div>

          </div>

        )}

      </main>

      <Footer />
    </>
  );
};

export default AdminMenu;