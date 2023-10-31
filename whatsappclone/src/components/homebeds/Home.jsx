import { useNavigate } from "react-router";
import { accsesstoken, cartdata, dataf, serchbar } from "../../main";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import { ACTION } from "../../constant";
import Serchf from "../navbar/serch";
import notify from "../singin/toast";
import { ToastContainer } from "react-toastify";

function Homebeds() {
    const navigate = useNavigate();
    const [serch, setserch] = useContext(serchbar)
    const [token, settoken] = useContext(accsesstoken)
    const [data, setData] = useContext(dataf)
    const [final, setfinal] = useState([]);
    const [state, dispath] = useContext(cartdata);
    useEffect(() => {
        console.log("data feched")
        axios.get("/api/data").then(res => { setData(res.data); setfinal(res.data) })
    }, [])
    useEffect(() => {
        setfinal(Serchf(data, serch))
    }, [serch])
    function clickhandler(prop) {
        if (token || localStorage.getItem("tocken")) {
            axios.post("/api/cart", { product_id: prop.product_id }, {
                headers: {
                    authorization: `Bearer ${token ? token : localStorage.getItem("tocken")}`,
                }
            }).then(res => {
                if (res.data) {
                    notify("Added To Cart", "ok")
                }
                else {
                    notify("Error try again", "error")
                }
            })
        }
        else {
            dispath({ type: ACTION.ADD_TO_CART, paylode: prop })
            notify("Added To Cart", "ok")

        }
    }
    return (
        <div className=' container mx-auto '>
            <div className=' grid grid-cols-1 ms:grid-cols-1 medium:grid-cols-2 medium:gap-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4  lg:gap-1 3xl:grid-cols-5 xl:gap-1 gap-3'>
                {final.map((e) => {

                    return (
                        <div className='productcontainer  flex justify-start relative overflow-hidden items-center flex-col p-3 m-3 border-transparent  border-solid border-2 shadow-[-1px_-1px_50px_#272222] text-white rounded-xl' key={e.product_id}>
                            <div onClick={() => { navigate(`/product/${e.product_id}`); }} style={{ maxWidth: "100%", height: "40vh", border: "2px solid transparent", overflow: "hidden", position: "relative", borderRadius: "10px" }}>
                                <img className=' hover:scale-110 transition-all' style={{ contain: "content", height: "100%", width: "auto" }} alt={e?.title} src={e?.image} />
                                <div className=" absolute top-1 left-1 font-bold text-xl bg-red-500 rounded-md">-{e.descount}%</div>
                            </div>
                            <p>{e.brand}</p>
                            <h3 className=' w-full overflow-hidden text-xl h-1/4 p-1'>{e.title}</h3>
                            <h3 className=' text-xl font-semibold text-left'>{`price:- ₹ ${e.price}`}</h3>
                            <button className='Addtocartbtn' onClick={() => clickhandler(e)}><span className="text z-50">Add To Cart</span><span>Thanks!</span></button>
                        </div>
                    )
                })}
            </div>
            <ToastContainer  />
        </div >
    )
}

export default Homebeds;