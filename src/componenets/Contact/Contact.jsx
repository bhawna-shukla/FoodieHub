import "./Contact.css";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaInstagram, FaFacebook } from "react-icons/fa";

function Contact() {

  return (
    <section className="contact-section" id="contact">

      <div className="contact-title">
        <h2>Contact Me</h2>
        <p>
          Feel free to contact me for projects, opportunities and collaborations.
        </p>
      </div>


      <div className="contact-wrapper">


        {/* Left Side */}
        <div className="contact-info">


          <div className="contact-box">
            <FaEnvelope />
            <div>
              <h4>Email</h4>
              <p>yourmail@gmail.com</p>
            </div>
          </div>


          <div className="contact-box">
            <FaPhone />
            <div>
              <h4>Phone</h4>
              <p>+91 XXXXX XXXXX</p>
            </div>
          </div>


          <div className="contact-box">
            <FaMapMarkerAlt />
            <div>
              <h4>Location</h4>
              <p>Lucknow, Uttar Pradesh</p>
            </div>
          </div>


          <div className="contact-social">

            <a href="#">
              <FaLinkedin />
            </a>

            <a href="#">
              <FaInstagram />
            </a>

           <a href="#">
              <FaFacebook />
            </a> 

            

          </div>


        </div>



        {/* Right Side Form */}

        <form className="contact-form">

          <input 
            type="text"
            placeholder="Your Name"
          />


          <input 
            type="email"
            placeholder="Your Email"
          />


          <input 
            type="text"
            placeholder="Subject"
          />


          <textarea
            placeholder="Your Message"
            rows="5"
          ></textarea>


          <button>
            Send Message
          </button>


        </form>


      </div>

    </section>
  )
}

export default Contact;