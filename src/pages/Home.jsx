import Navbar from "../componenets/Navbar/Navbar";
import Hero from "../componenets/Hero/Hero";
import About from "../componenets/About/About";
import PopularDishes from "../componenets/PopularDishes/PopularDishes";
import WhyChooseUs from "../componenets/WhyChooseUs/WhyChooseUs";
import SpecialOffer from "../componenets/SpecialOffer/SpecialOffer";
import Testimonials from "../componenets/Testimonials/Testimonials";
import GallerySection from "../componenets/GallerySection/GallerySection";
import Contact from "../componenets/Contact/Contact";
import Footer from "../componenets/Footer/Footer";
import MenuHero from "../componenets/MenuHero/MenuHero";
import Categories from "../componenets/Category/Categories";
// import MenuSearch from "../componenets/MenuSearch/MenuSearch";


const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
        <About />
         <PopularDishes />
         <WhyChooseUs />
         <SpecialOffer />
         <Testimonials />
         <GallerySection />
         {/* <MenuSearch /> */}
          <Contact />
          <Footer />
          
          
          
    </>
  );
};

export default Home;