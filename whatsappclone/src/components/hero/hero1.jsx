import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect } from "react";
import { useNavigate } from "react-router";
import SplitType from 'split-type'
import "./hero.css"

const Hero = () => {
  const navigate=useNavigate()

  gsap.registerPlugin(ScrollTrigger);
  useLayoutEffect(()=>{
    
    gsap.fromTo(".Home_hero_img",{yPercent:30,opacity:.5,borderRadius:"20%"},{yPercent:0,opacity:.9,delay:.2,duration:0.8,borderRadius:0})
    const text1= new SplitType(".hero_h1")
    const text2= new SplitType(".hero_p")
    
    gsap.fromTo([text1.chars,text2.words],{y:"50px",opacity:0.3},{duration:.5,stagger:0.1,opacity:1,y:0})
  })
  return (
    <div className="Hero_main h-[90vh] flex flex-col w-full justify-center  items-start first-line: relative">
      <div className=" h-[20vh] w-screen bg-white opacity-80 brightness-75 absolute -top-[22%] left-0"></div>
      <img src="https://in-exstatic-vivofs.vivo.com/gdHFRinHEMrj3yPG/1697448254641/c5bb587febffd490700ae9b37f1378a5.jpg" alt="img"  className="Home_hero_img absolute top-0 left-0 -z-0 w-full brightness-75 h-full object-cover"/>
      <h1 className="hero_h1 text-black md:text-8xl text-4xl font-bold my-5 ml-6">Elevate your style</h1>
      <p className="hero_p textblack ml-6 my-2 text-xl md:text-4xl">Discover the latest trends and express your unique style</p>
      <button className=" bg-black mx-auto text-purple-500 z-10 font-bold py-2 px-4 my-3 rounded-full" onClick={()=>navigate("/beds")}>Shop Now</button>
      <div className=" animate-bounce text-2xl absolute bottom-[3%] left-[42%] md:left-1/2 hover:scale-125 cursor-pointer border-2 rounded-2xl p-3 "> ↓ ↓</div>
    </div>
  );
};

export default Hero;

