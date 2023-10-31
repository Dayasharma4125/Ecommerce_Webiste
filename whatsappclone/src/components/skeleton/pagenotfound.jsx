import { useEffect } from "react";
import { useNavigate } from "react-router";

function PagenotFound() {
    useEffect(()=>{
        document.title = "Shop | Page not found"
    })
    const navigate=useNavigate()
    return (
        <div className='w-screen flex h-[80vh] justify-evenly items-center flex-col relative'>
            <h1 className=' text-4xl font-bold'>Oops.. Looks Like You Entered The Wrong Url !!!</h1>
            <img className=" max-h-min" src="/img/pngwing.com.png" />
            <button className="  w-auto py-2  px-6 mb-4 text-[18px] mt-6 rounded-full bg-white text-emerald-800 hover:bg-emerald-600 hover:text-white transition-colors duration-300" onClick={() => navigate("/")}>Home</button>
        </div>
    )
}
export default PagenotFound;