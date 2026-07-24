import margheritaPizza from "../assets/menu/margherita-pizza.jpg";
import cheesburst from "../assets/menu/cheese-burst-pizza.jpg";
import farmhousePizza from "../assets/menu/farmhouse-pizza.jpg";
import vegPizza from "../assets/menu/veg-supreme-pizza.jpg";
import pepperoni from "../assets/menu/pepperoni-pizza.jpg";
// BURGER
import classicCheeseBurger from "../assets/menu/classic-cheese-burger.jpg";
import crispyChickenBurger from "../assets/menu/crispy-chicken-burger.jpg";
import doublePartyBurger from "../assets/menu/double-party-burger.jpg";
import grilledChickenBurger from "../assets/menu/grilled-chicken-burger.jpg";
// PASTA
import butterMasalaPasta from "../assets/menu/butter-masala-pasta.jpg";
import italianAlfredoPasta from "../assets/menu/italian-alfredo-pasta.jpg";
import paneerTikkaPasta  from "../assets/menu/paneer-tikka-pasta.jpg";
import cheeseMasalaPasta  from "../assets/menu/cheese-masala-pasta.jpg";

// SALAD
import cucumberSalad from "../assets/menu/cucumber-tomato-salad.jpg";
// import freshSalad from "../assets/menu/fresh-garden-salad.jpg";
import paneenTikka from "../assets/menu/paneer-tikka-salad.jpg";
import cornVeggie from "../assets/menu/corn-veggie-salad.jpg";
// DRINKS
import strawberryMilkshake from "../assets/menu/strawberry-milkshake.jpg";
import oreoShake from "../assets/menu/oreo-shake.jpg";
import blueMocktail from "../assets/menu/blue-mocktail.jpg";
import cappuccino from "../assets/menu/cappuccino.jpg";
//DESSERTS 
import chocolateLavaCake from "../assets/menu/chocolate-lava-cake.jpg";
import caramelPudding from "../assets/menu/caramel-pudding.jpg";
import mangoMousse from "../assets/menu/mango-mousse.jpg";
import rasmalai from "../assets/menu/rasmalai.jpg"
import strawberryCake from "../assets/menu/strawberry-cheesecake.jpg";













const foodData = [
  {
    id: 1,
    name: "Cheese Burger",
    category: "Burger",
    price: 199,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600",
  },
  {
    id: 2,
    name: "Pepperoni Pizza",
    category: "Pizza",
    price: 299,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600",
  },
  {
    id: 3,
    name: "White Sauce Pasta",
    category: "Pasta",
    price: 249,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600",
  },
  {
    id: 4,
    name: "Fresh Salad",
    category: "Salad",
    price: 149,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600",
  },
  {
    id: 5,
    name: "Cold Coffee",
    category: "Drinks",
    price: 129,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600",
  },
  {
    id: 6,
    name: "Chocolate Cake",
    category: "Dessert",
    price: 179,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600",
  },

  {
    id: 7,
    name: "Margherita Pizza",
    category: "Pizza",
    price: 299,
    rating: 4.8,
    image: margheritaPizza,
  },
  {
    id: 8,
    name: "Pepperoni Pizza",
    category: "Pizza",
    price: 399,
    rating: 4.8,
    image: pepperoni,
  },

  {
    id: 9,
    name: "Farmhouse Pizza",
    category: "Pizza",
    price: 349,
    rating: 4.7,
    image: farmhousePizza,
  },
  {
    id: 10,
    name: "Veg Pizza",
    category: "Pizza",
    price: 299,
    rating: 4.6,
    image: vegPizza,
  },
  {
    id: 11,
    name: "Cheese burst Pizza",
    category: "Pizza",
    price: 399,
    rating: 4.8,
    image: cheesburst,
  },
 {
  id: 12,
  name: "Classic Cheese Burger",
  category: "Burger",
  price: 399,
  rating: 4.8,
  image: classicCheeseBurger,
},
{
  id: 13,
  name: "Crispy Chicken Burger",
  category: "Burger",
  price: 499,
  rating: 4.9,
  image: crispyChickenBurger,
},
{
  id: 14,
  name: "Double Party Burger",
  category: "Burger",
  price: 599,
  rating: 4.8,
  image: doublePartyBurger,
}
,
{
  id: 15,
  name: "Grilled Chicken Burger",
  category: "Burger",
  price: 579,
  rating: 4.8,
  image: grilledChickenBurger,
}
,
{
  id: 16,
  name: "Butter Masala Pasta",
  category: "Pasta",
  price: 249,
  rating: 4.7,
  image: butterMasalaPasta,
}
,
{
  id: 17,
  name: "Italian Alfredo Pasta",
  category: "Pasta",
  price: 299,
  rating: 4.8,
  image: italianAlfredoPasta,
}
,
{
  id: 18,
  name: "Paneer Tikka Pasta",
  category: "Pasta",
  price: 349,
  rating: 4.7,
  image: paneerTikkaPasta,
}
,
{
  id: 19,
  name: "Cheese Masala Pasta",
  category: "Pasta",
  price: 299,
  rating: 4.6,
  image: cheeseMasalaPasta,
},
{
  id: 20,
  name: "Cucumber Tomato Salad",
  category: "Salad",
  price: 149,
  rating: 4.6,
  image: cucumberSalad,
},

{
  id: 22,
  name: "Paneer Tikka Salad",
  category: "Salad",
  price: 199,
  rating: 4.7,
  image: paneenTikka,
},

{
  id: 23,
  name: "Corn Veggie Salad",
  category: "Salad",
  price: 179,
  rating: 4.6,
  image: cornVeggie,
},
{
  id: 24,
  name: "Strawberry Milkshake",
  category: "Drinks",
  price: 129,
  rating: 4.8,
  image: strawberryMilkshake,
},
{
  id: 25,
  name: "Oreo Shake",
  category: "Drinks",
  price: 149,
  rating: 4.7,
  image: oreoShake,
},
{
  id: 26,
  name: "Blue Mocktail",
  category: "Drinks",
  price: 139,
  rating: 4.6,
  image: blueMocktail,
},
{
  id: 27,
  name: "Cappuccino Coffee",
  category: "Drinks",
  price: 159,
  rating: 4.7,
  image: cappuccino,
},
{
  id: 28,
  name: "Rasmalai ",
  category: "Dessert",
  price: 149,
  rating: 4.7,
  image: rasmalai,
},
{
  id: 29,
  name: "Caramel Pudding",
  category: "Dessert",
  price: 199,
  rating: 4.7,
  image: caramelPudding,
},
{
  id: 30,
  name: "Mango Mousse",
  category: "Dessert",
  price: 189,
  rating: 4.7,
  image: mangoMousse,
},
{
  id: 31,
  name: "Strawberry Cheese Cake",
  category: "Dessert",
  price: 299,
  rating: 4.7,
  image: strawberryCake,
},
{
  id: 32,
  name: "Chocolate Lava ",
  category: "Dessert",
  price: 169,
  rating: 4.7,
  image: chocolateLavaCake,
},


];

export default foodData;