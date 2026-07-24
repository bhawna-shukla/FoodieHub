import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import CartProvider from "./context/CartContext";
import Cart from "./pages/Cart";

function App() {
  return (
     <CartProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;