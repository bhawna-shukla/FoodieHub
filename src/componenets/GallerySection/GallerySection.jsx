import Navbar from "../Navbar/Navbar";
import "./GallerySection.css";
import { motion } from "framer-motion";


const images = [
  "https://plus.unsplash.com/premium_photo-1745946640161-01dda3002d48?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHJlc3R1cmFudCUyMHRhYmxlfGVufDB8fDB8fHww",
  "https://plus.unsplash.com/premium_photo-1661434796182-a411d8782d68?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHJlc3R1cmFudCUyMHRhYmxlfGVufDB8fDB8fHww",
  "https://plus.unsplash.com/premium_photo-1670984939638-01d1854a5d12?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cmVzdHVyYW50JTIwdGFibGV8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1724426057815-a12b34f027c1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdHVyYW50JTIwdGFibGV8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1576867757603-05b134ebc379?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZvb2QlMjB0YWJsZXxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600",
];

const GallerySection = () => {
  return (
    <>
    <Navbar />
      
    <section className="gallery">
      {/* <h2>Food Gallery</h2> */}

      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: .8 }}
        viewport={{ once: true }}
      >
        Our Gallery
      </motion.h2>


      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: .8, delay: .2 }}
        viewport={{ once: true }}
      >
        Discover our delicious dishes
      </motion.p>

      <div className="gallery-grid">
        {images.map((img, index) => (
          <motion.div
            className="gallery-item"
            key={index}
            whileHover={{ scale: 1.05 }}
          >
            <img src={img} alt="Food" />
          </motion.div>
        ))}
      </div>
    </section>
    
     
   </>
  );
};

export default GallerySection;