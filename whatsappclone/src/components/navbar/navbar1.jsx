import { useRef, useLayoutEffect, useContext } from 'react'
import './navbar1.css'
import {  useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { accsesstoken, serchbar } from '../../main'
import {BsCart3, BsSearch} from "react-icons/bs"
import Avatar from 'react-avatar';

function Navbar1() {
    const [serch,setserch]=useContext(serchbar)
    const [token, settoken] = useContext(accsesstoken)
    const navigate = useNavigate()
    const ref = useRef(null)
    const mouse = useRef(null)
    function handlechange(e){
        setserch(e.target.value)
    }
    function toggle() {
        const nav = document.getElementById('nav')
        const navitem = document.getElementById('navitem')
        nav.classList.toggle('active')
        navitem.classList.toggle('active')
    }
    useLayoutEffect(() => {
        // const text = new SplitType(".navitemone");
        let cr = document.querySelector(".cr");
        let q = cr.querySelector("#a");
        document.addEventListener("mousemove", function (e) {
            if (e.sourceCapabilities.firesTouchEvents == true) {
                return;
            }
            else {
                q.style.display = "flex"
                q.style.left = e.pageX + "px";
                q.style.top = e.pageY + "px";
                q.style.opacity = "0.6";
            }
        }, false)
    }, [])
    return (<>
        <header className=' w-screen overflow-hidden flex justify-center'>
            <nav ref={ref} className='nav w-[92%] md:w-[94%] lg:w-[97%] px-2  flex items-center rounded-3xl fixed top-2 left-1/2 -translate-x-1/2 z-[100] justify-between ' id="nav">
                <div className="navcircle"><img onClick={()=>navigate("/")} src="/logo.png"></img></div>
                <div className="navitem" id="navitem">
                    <div className=' w-full h-4/5 flex justify-evenly items-start flex-col'>
                        <NavLink to="/" className="navitemone" onClick={() => { toggle() }} ><h2>Home</h2><div className='navhoverunderline'></div></NavLink>
                        <NavLink to="/products" className="navitemone" onClick={() => { toggle() }}><h2>Products</h2><div className='navhoverunderline'></div></NavLink>
                        <NavLink to="/cart" className="navitemone" onClick={() => { toggle() }}><h2>Cart</h2><div className='navhoverunderline'></div></NavLink>
                        <NavLink to="/about" className="navitemone" onClick={() => { toggle() }}><h2>About</h2><div className='navhoverunderline'></div></NavLink>
                        <NavLink to="/contact" className="navitemone" onClick={() => { toggle() }}><h2>Contact us</h2><div className='navhoverunderline'></div></NavLink>
                    </div>
                    <div >
                        <NavLink to="/logout" className="navitemone" onClick={() => { toggle() }}><h2>Logout</h2><div className='navhoverunderline'></div></NavLink>
                    </div>
                </div>
                <div className=' flex justify-between items-center w-1/3 h-full'>
                    <div  >
                        <div className=' w-full h-full text-lg ' onClick={() => { document.getElementById("serchbar").classList.toggle("active") }}><BsSearch color='white'/></div>
                        <input placeholder='Search Here' autoComplete='true' onChange={handlechange} id="serchbar" className='text-white  border-none outline-none text-lg'/>
                    </div>
                    <div className=' text-lg' onClick={()=>navigate("/cart")}><BsCart3 color='white'/></div>
                    <button className=" overflow-hidden"  id="navtoggle" onClick={() => {
                        if (token ||localStorage.getItem("tocken")) {
                            navigate("/userprofile")
                        }
                        else {
                            navigate("/singin")
                        }
                    }}><img  src="/person.jpg" /><Avatar color={Avatar.getRandomColor('sitebase', ['red', 'green', 'blue'])} name="some person" /><div id='userp'></div></button>
                    <button id='navtoggle' onClick={() => toggle()}>
                        <div id="navham" className="navhamburg"></div>
                    </button>
                </div>
            </nav>
        </header>
        <div ref={mouse} className="cr">
            <div id="a"><div></div></div>
        </div>
    </>

    )
}

export default Navbar1