import { Link } from "react-router-dom"
import Hero1 from "../hero/hero1";
import Products from "./products";
import FeaturedCategories from "./fetured";
import Testimonials from "./testimonial";
import "../../App.css"

const Home = () => {
  return (
    // <main className=" bg-black relative">
      <div className=" w-screen ">
        <Hero1 />
        <FeaturedCategories />
        <Products />
        {/* <Testimonials /> */}
      </div>
      // </main>
  );
};

export default Home;
