import "./Cart.css";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import Navbar from "../componenets/Navbar/Navbar";
import Footer from "../componenets/Footer/Footer";
import { useNavigate } from "react-router-dom";


const Cart = () => {

  const navigate = useNavigate();

  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useContext(CartContext);


  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );


  const delivery = cartItems.length > 0 ? 50 : 0;


  const tax = Math.round(subtotal * 0.05);


  const discount = cartItems.length > 0 ? 100 : 0;


  const total = subtotal + delivery + tax - discount;


  // Debug ke liye (optional)
  console.log({
    cartItems,
    subtotal,
    delivery,
    tax,
    discount,
    total
  });


  return (
    <>
      <Navbar />

      <div className="cart-container">

        {/* <h2 className="cart-title">🛒 Your Cart</h2> */}

        {cartItems.length === 0 ? (
          <div className="empty-cart">

            <div className="empty-icon">🍽️</div>

            <h2>Your Cart is Empty</h2>

            <p>
              Looks like you haven't added any delicious food yet.
            </p>

            <button
              className="browse-btn"
              onClick={() => navigate("/menu")}
            >
              Browse Menu
            </button>

          </div>
        ) : (
          cartItems.map((item) => (
            <div className="cart-card" key={item.id}>

              <div className="cart-image">
                <img src={item.image} alt={item.name} />
              </div>


              <div className="cart-details">

                <div className="cart-top">
                  <h3>{item.name}</h3>
                  <span>₹{item.price}</span>
                </div>


                <div className="cart-rating">
                  ⭐ {item.rating}
                </div>


                <div className="cart-bottom">

                  <div className="quantity-box">

                    <button onClick={() => decreaseQuantity(item.id)}>
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button onClick={() => increaseQuantity(item.id)}>
                      +
                    </button>

                  </div>


                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>


                </div>


              </div>


            </div>
          ))
        )}



        {cartItems.length > 0 && (

          <div className="summary-card">

            <h2>Order Summary</h2>


            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>


            <div className="summary-row">
              <span>Delivery Fee</span>
              <span>₹{delivery}</span>
            </div>


            <div className="summary-row">
              <span>Tax (5%)</span>
              <span>₹{tax}</span>
            </div>


            <div className="summary-row">
              <span>Discount</span>
              <span>-₹{discount}</span>
            </div>


            <hr />


            <div className="summary-total">
              <span>Total</span>
              <span>₹{total}</span>
            </div>



            <div className="cart-actions">

              <button
                className="continue-btn"
                onClick={() => navigate("/menu")}
              >
                Continue Shopping
              </button>


              <button
                className="checkout-btn"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </button>


            </div>


          </div>

        )}


      </div>


      <Footer />
    </>
  );
};


export default Cart;