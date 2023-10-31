import "./hero.css"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel"
function Hero() {
  return (
    <div className=" w-full overflow-x-hidden h-fit mt-4 mb-4">
    <Carousel autoPlay="true" stopOnHover="true"   infiniteLoop="true" interval={"1500"} renderThumbs={()=>false} showArrows="true" className=" sm:w-11/12 w-full  m-auto rounded-xl overflow-x-hidden" >
      <div>
        <img src="https://rukminim2.flixcart.com/fk-p-flap/1080/300/image/155a500756ae5995.jpg?q=60" />
      </div>
      <div>
        <img src="https://rukminim2.flixcart.com/fk-p-flap/1080/300/image/155a500756ae5995.jpg?q=60" />
      </div>
      <div>
        <img src="https://rukminim2.flixcart.com/fk-p-flap/1080/300/image/155a500756ae5995.jpg?q=60" />
      </div>
      <div>
        <img src="https://rukminim2.flixcart.com/fk-p-flap/1080/300/image/155a500756ae5995.jpg?q=60" />
      </div>
      <div>
        <img src="https://rukminim2.flixcart.com/fk-p-flap/1080/300/image/155a500756ae5995.jpg?q=60" />
      </div>
    </Carousel></div>
  )
}
export default Hero
