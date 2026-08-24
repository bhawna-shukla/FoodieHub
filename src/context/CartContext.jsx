import { createContext, useState } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Add to Cart
  const addToCart = (food) => {
    setCartItems((previous) => {
      const existingItem = previous.find(
        (item) => item._id === food._id
      );

      if (existingItem) {
        return previous.map((item) =>
          item._id === food._id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...previous,
        {
          ...food,
          quantity: 1,
        },
      ];
    });
  };

  // Remove Item
  const removeFromCart = (id) => {
    setCartItems((previous) =>
      previous.filter((item) => item._id !== id)
    );
  };

  // Increase Quantity
  const increaseQuantity = (id) => {
    setCartItems((previous) =>
      previous.map((item) =>
        item._id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  // Decrease Quantity
  const decreaseQuantity = (id) => {
    setCartItems((previous) =>
      previous
        .map((item) =>
          item._id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Navbar Badge
  // Different food items ka count
  const cartCount = cartItems.length;

  // Clear Cart
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;