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

import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";


function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/gallery" element={<GallerySection />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;