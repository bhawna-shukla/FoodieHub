# 🍕 FoodieHub – Online Food Ordering Web Application

FoodieHub is a **full-stack online food ordering web application** built using the **MERN Stack**.
It allows customers to browse food items, add them to cart, place orders, and track their orders. It also includes an **Admin Dashboard** for managing food items, customers, orders, and reports.

## 🌐 Live Demo

👉 **Live Project:** https://foodie-hub-jet.vercel.app/

## 💻 GitHub Repository

👉 **GitHub:** https://github.com/bhawna-shukla/FoodieHub

---

## ✨ Features

### 👤 Customer Features

* User Registration & Login
* Browse Food Menu
* Food Categories
* Add Food Items to Cart
* Update Cart Quantity
* Checkout & Order Placement
* Order Summary
* My Orders
* Order Status
* Forgot Password
* OTP Verification
* Reset Password
* Responsive Design

### 👨‍💼 Admin Features

* Admin Login
* Protected Admin Routes
* Admin Dashboard
* View Customers
* Search & Filter Customers
* Manage Food Items
* Add New Food Items
* Edit Food Items
* Delete Food Items
* Manage Orders
* Update Order Status
* Revenue & Order Reports
* Dashboard Statistics

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router
* JavaScript
* HTML5
* CSS3
* Framer Motion
* React Icons
* Vite

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* REST API
* Nodemailer
* bcrypt
* dotenv
* CORS

### Deployment

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas

---

## 🔐 Authentication

FoodieHub includes authentication for both customers and administrators.

### Customer

* Signup
* Login
* Forgot Password
* OTP Verification
* Password Reset

### Admin

* Separate Admin Login
* Role-based access
* Protected Admin Dashboard

---

## 📸 Project Screenshots

### 🏠 Home Page

*Add screenshot here*

### 🍔 Food Menu

*Add screenshot here*

### 🛒 Cart

*Add screenshot here*

### 💳 Checkout

*Add screenshot here*

### 📦 My Orders

*Add screenshot here*

### 👨‍💼 Admin Dashboard

*Add screenshot here*

---

## 📁 Project Structure

```text
FoodieHub/
│
├── foodiehub/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── config/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/bhawna-shukla/FoodieHub.git
```

### 2. Go to the Project Folder

```bash
cd FoodieHub
```

### 3. Install Frontend Dependencies

```bash
cd foodiehub
npm install
```

### 4. Install Backend Dependencies

```bash
cd ../backend
npm install
```

### 5. Environment Variables

Create a `.env` file inside the `backend` folder.

```env
MONGO_URI=your_mongodb_connection_string
EMAIL_USER=your_email
EMAIL_PASS=your_app_password
PORT=5000
```

**Note:** Never upload your `.env` file or secret credentials to GitHub.

### 6. Run Backend

```bash
cd backend
npm start
```

### 7. Run Frontend

Open another terminal:

```bash
cd foodiehub
npm run dev
```

The frontend will run on:

```text
http://localhost:5173
```

---

## 🔗 API Structure

FoodieHub uses REST APIs for communication between the frontend and backend.

```text
/api/users
/api/foods
/api/orders
```

---

## 📱 Responsive Design

FoodieHub is designed to work across:

* 💻 Desktop
* 💻 Laptop
* 📱 Mobile
* 📟 Tablet

---

## 🎯 Learning Outcomes

While building FoodieHub, I gained practical experience in:

* MERN Stack Development
* React Components & Routing
* REST API Development
* MongoDB Database Integration
* Authentication
* Role-Based Access
* CRUD Operations
* Form Handling
* State Management
* Responsive Web Design
* Frontend & Backend Integration
* Deployment using Vercel and Render

---

## 🚀 Future Improvements

Some features planned for future versions:

* Online Payment Integration
* Food Search
* User Profile Management
* Reviews & Ratings
* Order Notifications
* Improved Admin Analytics

---

## 👩‍💻 Author

### Bhawna Shukla

**BCA Graduate | MERN Stack Developer | Full-Stack Web Development Learner**

I built FoodieHub as a practical full-stack project to strengthen my skills in modern web development.

### ⭐ If you like this project

Feel free to ⭐ star the repository and explore the project!

---

## 📄 License

This project is created for **learning and portfolio purposes**.
