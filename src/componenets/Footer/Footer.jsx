import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import "./Footer.css";
import { FaUtensils } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Restaurant Info */}
        
        <div className="footer-box">
              <div className="logo">
                <FaUtensils className="logo-icon" />
        Foodie<span>Hub</span> 
      </div>

          
          <p>
            Delicious food made with fresh ingredients.
            Enjoy your favorite meals with great taste and quality.
          </p>

        </div>


        {/* Quick Links */}
        <div className="footer-box">
          <h3>Quick Links</h3>
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Menu</li>
            <li>Contact</li>
          </ul>
        </div>


        {/* Contact */}
        <div className="footer-box">
          <h3>Contact</h3>
          <p>📍 Lucknow, India</p>
          <p>📞 +91 9876543210</p>
          <p>✉️ foodiehub@gmail.com</p>
        </div>


        {/* Social Media */}
        <div className="footer-box">
          <h3>Follow Us</h3>

          <div className="social-icons">
            <FaFacebook />
            <FaInstagram />
            <FaTwitter />
            <FaYoutube />
          </div>

        </div>

      </div>


      <div className="footer-bottom">
        <p>
          © 2026 Foodie Hub | All Rights Reserved
        </p>
      </div>

    </footer>
  );
}

export default Footer;