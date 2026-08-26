import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CartProvider from "./context/CartContext";
import Cart from "./pages/Cart";
import Contact from "./componenets/Contact/Contact";
import GallerySection from "./componenets/GallerySection/GallerySection";
import About from "./componenets/About/About";
import ProtectedRoute from "./componenets/ProtectedRoute";
import AdminProtectedRoute from "./componenets/ProtectedRoute/AdminProtectedRoute";

import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import MyOrders from "./pages/MyOrders";

import AdminOrders from "./pages/AdminOrders";
import AdminDashboard from "./pages/AdminDashboard";
import AdminCustomers from "./pages/AdminCustomers";
import AdminMenu from "./pages/AdminMenu";
import AdminReports from "./pages/AdminReports";
import AdminLogin from "./pages/AdminLogin";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>

          {/* =========================
              CUSTOMER ROUTES
          ========================= */}

          <Route path="/" element={<Home />} />

          <Route path="/menu" element={<Menu />} />

          <Route path="/login" element={<Login />} />

          <Route path="/signup" element={<Signup />} />

          <Route path="/gallery" element={<GallerySection />} />

          <Route path="/contact" element={<Contact />} />

          <Route path="/cart" element={<Cart />} />

          <Route path="/about" element={<About />} />

          <Route path="/my-orders" element={<MyOrders />} />

          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />

          <Route
            path="/order-success"
            element={<OrderSuccess />}
          />

          {/* =========================
              ADMIN LOGIN
          ========================= */}

          <Route
            path="/admin/login"
            element={<AdminLogin />}
          />

          {/* =========================
              PROTECTED ADMIN ROUTES
          ========================= */}

          <Route
            path="/admin/dashboard"
            element={
              <AdminProtectedRoute>
                <AdminDashboard />
              </AdminProtectedRoute>
            }
          />

          <Route
            path="/admin/orders"
            element={
              <AdminProtectedRoute>
                <AdminOrders />
              </AdminProtectedRoute>
            }
          />

          <Route
            path="/admin/customers"
            element={
              <AdminProtectedRoute>
                <AdminCustomers />
              </AdminProtectedRoute>
            }
          />

          <Route
            path="/admin/menu"
            element={
              <AdminProtectedRoute>
                <AdminMenu />
              </AdminProtectedRoute>
            }
          />

          <Route
            path="/admin/reports"
            element={
              <AdminProtectedRoute>
                <AdminReports />
              </AdminProtectedRoute>
            }
          />

        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;