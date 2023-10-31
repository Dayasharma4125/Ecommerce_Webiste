import { MdProductionQuantityLimits } from "react-icons/md";
import { GiAutoRepair } from "react-icons/gi";
import { TbTruckReturn } from "react-icons/tb";
import { RiPriceTag3Line, RiRefund2Fill, RiServiceLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom"
import { useEffect } from "react";
import Footer from "../footer/footer";
function Contactus() {
    useEffect(()=>{
        document.title = "Shop | Contact US"
    },[])
    const navigate = useNavigate()
    const ctusf = [
        { title: "Product's", onclick: () => { navigate("/contactus/product-related") }, image: <MdProductionQuantityLimits className=" md:h-32 h-28 w-full" />, example: "Details, Seller Info, Offer's, Etc" },
        { title: "Warranty", onclick: () => { navigate("/contactus/warranty-related") }, image: <GiAutoRepair className=" md:h-32 h-28 w-full" />, example: "What covers in Warrent, Time Period, Etc" },
        { title: "Return/replcement", onclick: () => { navigate("/contactus/return-related") }, image: <TbTruckReturn className=" md:h-32 h-28 w-full" />, example: "Retrun Policy, Replacement Policy" },
        { title: "Refund", onclick: () => { navigate("/contactus/refund-related") }, image: <RiRefund2Fill className=" md:h-32 h-28 w-full" />, example: "Refund time, Refund policy, Etc" },
        { title: "Service Center", onclick: () => { navigate("/contactus/servic_center-related") }, image: <RiServiceLine className=" md:h-32 h-28 w-full" />, example: "City, Area, Etc" },
        { title: "Price", onclick: () => { navigate("/contactus/price-related") }, image: <RiPriceTag3Line className=" md:h-32 h-28 w-full" />, example: "Offers,Previos price, Etc" }
    ];
    const faql = [{ q: "Avocados are a fruit, not a vegetable", a: "They're technically considered a single-seeded berry, believe it or not." },
    { q: "The Eiffel Tower can be 15 cm taller during the summer", a: " to thermal expansion meaning the iron heats up, the particles gain kinetic energy and take up more space" },
    { q: "Trypophobia is the fear of closely-packed holes", a: "Or more specifically, an aversion to the sight of irregular patterns or clusters of small holes or bumps. No crumpets for them, then" },
    { q: "Allodoxaphobia is the fear of other people's opinions", a: " It's a rare social phobia that's characterised by an irrational and overwhelming fear of what other people think." },
    { q: "Australia is wider than the moon", a: "The moon sits at 3400km in diameter, while Australia’s diameter from east to west is almost 4000km" },
    { q: "The Spice Girls were originally a band called Touch", a: "When we first started [with the name Touch], we were pretty bland,Mel C told The Guardian in 2018. We felt like we had to fit into a mould" }
    ]
    function Faq() {
        return (
            <div className=" w-screen ">
                <h1 className=" text-4xl my-6 text-center underline decoration-solid">Frequently Asked Question</h1>
                <div className=" w-[90%] mx-auto ">
                    {faql.map((e, index) => {
                        return (
                            <div key={index} className=" border-2 border-white rounded-xl mt-3 text-lg p-3"><details className=" p-3" ><span className=" before:content-['👉'] mt-3">{e.a}</span><summary >{e.q}</summary></details></div>

                        )
                    })}

                </div>
            </div>
        )
    }
    function Contact() {
        return (
            <div className=" w-screen ">
                <h1 className="text-4xl text-center underline decoration-solid">Contact Us</h1>
                <div className="  md:w-[80%] grid  md:grid-cols-3 grid-cols-2 w-[98%]  mx-auto gap-2 md:gap-3">
                    {ctusf.map((e, index) => {
                        return (
                            <div className=" border-solid border-2 border-transparent rounded-2xl mt-4 shadow-[4px_4px_20px_#15063f,-4px_-4px_20px_#271259] px-1 md:py-3 py-6" onClick={e.onclick} key={index}>
                                <h2 className=" text-2xl text-center overflow-clip">{e.title}</h2>
                                <span >{e.image}</span>
                                <h3 className=" p-1 my-1 mt-4 text-lg">Like: <span className=" text-base opacity-60">{e.example}</span></h3>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
    return (
        <div className=" w-screen min-h-screen container">
            <Contact />
            <Faq />
            <Footer/>
        </div>
    )
}

export default Contactus;