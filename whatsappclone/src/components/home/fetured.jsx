import gsap from "gsap/all";
import { useLayoutEffect } from "react";
import ScrollTrigger from "gsap/ScrollTrigger";

const catogry = [
  { img: "https://assets.tatacliq.com/medias/sys_master/images/49145817694238.jpg", onclick:()=>{} ,title: "A", style: " w-full h-full scale-110 object-cover",style2:" col-span-2" },
  { img: "https://assets.tatacliq.com/medias/sys_master/images/49211697233950.jpg", onclick:()=>{} ,title: "B", style: " w-full h-full scale-110 object-cover transition-all duration-300 group-hover:scale-125" },
  { img: "https://assets.tatacliq.com/medias/sys_master/images/49199604793374.jpg", onclick:()=>{} ,title: "C", style: " w-full h-full scale-110 object-cover transition-all duration-300 group-hover:scale-125" },
  { img: "https://assets.tatacliq.com/medias/sys_master/images/49199605907486.jpg", onclick:()=>{} ,title: "D", style: " w-full h-full scale-110 object-cover transition-all duration-300 group-hover:scale-125" },
  { img: "https://assets.tatacliq.com/medias/sys_master/images/49200041721886.jpg", onclick:()=>{} ,title: "E", style: " w-full h-full scale-110 object-cover transition-all duration-300 group-hover:scale-125"  },

]
const FeaturedCategories = () => {
  gsap.registerPlugin(ScrollTrigger)
  useLayoutEffect(()=>{
    gsap.set(".home_fetured",{yPercent:30})
    gsap.to(".home_fetured",{scrollTrigger:{
      trigger:".home_fetured_product",
      start:"top center",
      end:"top 10%",
      scrub:1,
    },yPercent:0,stagger:0.5})
  })
  return (
    <div className="home_fetured_product mx-auto w-screen">
      <h2 className="text-3xl font-bold text-center my-5">Featured Categories</h2>
      <div className=" grid grid-cols-2 gap-3 md:gap-6 p-0 w-[96%] md:w-4/5 mx-auto  ">
        {catogry.map((e, index) => {
          return (
            <div className={"home_fetured group rounded-xl  overflow-hidden  relative pb-8"+`${e.style2?e.style2:""}`} key={index}>
              <img src={e.img} className={e.style} onClick={e.onclick} alt="img here" />
              <div className=" bg-slate-300 absolute  bottom-0 w-full h-8 ">
                <h2 className=" text-black  text-center text-2xl ">{e.title}</h2>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
};



export default FeaturedCategories;
