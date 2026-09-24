
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

  return (
    <>
      <Navbar />

      <div className="cart-container">

        {/* Empty Cart */}

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

            <div className="cart-card" key={item._id}>

              <div className="cart-image">

                <img
                  src={item.image}
                  alt={item.name}
                />

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

                    <button
                      onClick={() => decreaseQuantity(item._id)}
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() => increaseQuantity(item._id)}
                    >
                      +
                    </button>

                  </div>


                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item._id)}
                  >
                    Remove
                  </button>

                </div>

              </div>

            </div>

          ))

        )}


        {/* Order Summary */}

        {cartItems.length > 0 && (

        

           


            <div className="cart-actions">

              <button
                className="continue-btn"
                onClick={() => navigate("/menu")}
              >
                Add More Items
              </button>


              <button
                className="checkout-btn"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </button>

            </div>

          

        )}

      </div>


      <Footer />

    </>
  );
};

export default Cart;

