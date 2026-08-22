import { useMemo, useState } from "react";
import Navbar from "../componenets/Navbar/Navbar";
import Footer from "../componenets/Footer/Footer";
import foodData from "../data/FoodData";
import "./AdminMenu.css";

const AdminMenu = () => {
  const [foods, setFoods] = useState(foodData);

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

  // Input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Open Add Form
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

  // Open Edit Form
  const openEditForm = (food) => {
    setEditingFood(food);

    setFormData({
      name: food.name,
      category: food.category,
      price: food.price,
      rating: food.rating,
      image: food.image,
    });

    setShowForm(true);
  };

  // Add / Update Food
  const handleSubmit = (e) => {
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

    // UPDATE
    if (editingFood) {
      setFoods((previous) =>
        previous.map((food) =>
          food.id === editingFood.id
            ? {
                ...food,
                name: formData.name,
                category: formData.category,
                price: Number(formData.price),
                rating: Number(formData.rating),
                image: formData.image,
              }
            : food
        )
      );
    }

    // ADD
    else {
      const newFood = {
        id: Date.now(),
        name: formData.name,
        category: formData.category,
        price: Number(formData.price),
        rating: Number(formData.rating),
        image: formData.image,
      };

      setFoods((previous) => [...previous, newFood]);
    }

    closeForm();
  };

  // Close Form
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

  // Delete Food
  const handleDelete = (food) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${food.name}"?`
    );

    if (!confirmDelete) {
      return;
    }

    setFoods((previous) =>
      previous.filter((item) => item.id !== food.id)
    );
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

                  <tr key={food.id}>

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
                        Available
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

                  <div className="form-group">

                    <label>Image URL</label>

                    <input
                      type="text"
                      name="image"
                      placeholder="https://..."
                      value={formData.image}
                      onChange={handleInputChange}
                    />

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