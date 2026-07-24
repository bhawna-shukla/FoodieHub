import "./GallerySection.css";
import { motion } from "framer-motion";

const images = [
  "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600",
  "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600",
  "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600",
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600",
  "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600",
  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600",
];

const GallerySection = () => {
  return (
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
  );
};

export default GallerySection;