import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect } from "react";
import LocomotiveScroll from 'locomotive-scroll';
import "../../index2.scss"

const locomotiveScroll = new LocomotiveScroll({
  lenisOptions: {
    smoothTouch: true,
    smoothWheel: true
  },
  autoResize:true,
  scrollCallback:ScrollTrigger.update(),
  initCustomTicker: (render) => {
    gsap.ticker.add(render);
  },
  destroyCustomTicker: (render) => {
    gsap.ticker.remove(render)
  }
});


const products = [
  { img: "https://in-exstatic-vivofs.vivo.com/gdHFRinHEMrj3yPG/1691577130308/2c56c61431506a0cc079c5de3550048c.jpg", style: " w-full -z-10 h-full hover:scale-105 transition-all duration-300 object-cover", style3: " w-full h-20 transition-all duration-500 -bottom-full absolute left-0 group-hover:bottom-0 backdrop-blur-md z-10", title: "Tws", },
  { img: "https://in-exstatic-vivofs.vivo.com/gdHFRinHEMrj3yPG/1695893560737/4c484c49f9943fc339be8916b2231439.jpg", style: " w-full -z-10 h-full hover:scale-105 transition-all duration-300 object-cover ", style2: " row-span-2", style3: " w-full h-28 transition-all duration-500 -bottom-full absolute left-0 group-hover:bottom-0 backdrop-blur-md z-10", title: "Phone 2" },
  { img: "https://in-exstatic-vivofs.vivo.com/gdHFRinHEMrj3yPG/1691577130308/2c56c61431506a0cc079c5de3550048c.jpg", style: " w-full -z-10 h-full hover:scale-105 transition-all duration-300 object-cover", style3: " w-full h-20 transition-all duration-500 -bottom-full absolute left-0 group-hover:bottom-0 backdrop-blur-md z-10", title: "Tws" },
  { img: "https://in-exstatic-vivofs.vivo.com/gdHFRinHEMrj3yPG/1657192245628/203773b7c46bbb1ba4e7c355fb048842.jpg", style: " w-full -z-10 h-full hover:scale-105 transition-all duration-300 object-cover", style3: " w-full h-20 transition-all duration-500 -bottom-full absolute left-0 group-hover:bottom-0 backdrop-blur-md z-10", title: "Phone 1" },
  { img: "https://in-exstatic-vivofs.vivo.com/gdHFRinHEMrj3yPG/1657192245628/203773b7c46bbb1ba4e7c355fb048842.jpg", style: " w-full -z-10 h-full hover:scale-105 transition-all duration-300 object-cover", style3: " w-full h-20 transition-all duration-500 -bottom-full absolute left-0 group-hover:bottom-0 backdrop-blur-md z-10", title: "Phone 1" },
]
const Products = () => {
  gsap.registerPlugin(ScrollTrigger)
  useLayoutEffect(() => {
    gsap.set(".home_products_componnent", { xPercent: 70, opacity: 0 })
    gsap.to(".home_products_componnent", {
      scrollTrigger: {
        trigger: ".home_product_main",
        start: "top 30%",
        end: "top top",
        scrub: 1,
      }, xPercent: 0, opacity: 1, stagger: 0.3, duration: 1
    })
  })
  return (
    <div className="home_product_main max-w-7xl mx-auto overflow-x-hidden">
      <h2 className="text-5xl font-bold text-center my-7">Products</h2>
      <div className="grid grid-cols-2 grid-rows-2 md:grid-cols-3 gap-2 md:gap-5">
        {products.map((e, index) => {

          return (
            <div key={index} className={"home_products_componnent group relative rounded-xl overflow-hidden read-only:" + `${e.style2 ? e.style2 : ""}`}>
              <img src={e.img} alt="Product" className={e.style} />
              <div className={e.style3} ><h3 className="text-2xl text-center text-black font-bold underline">{e.title}</h3>
                <p className="text-gray-700 text-xl text-center">Buy Now</p></div>
            </div>
          )
        })}
      </div>
    </div>
  );
};

// const Product = () => {
//   return (
//     <div className="bg-white shadow-md rounded-lg p-1 w-auto">

//     </div>
//   );
// };

export default Products;
