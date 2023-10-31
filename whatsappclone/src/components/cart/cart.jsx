import { useContext, useEffect, useState } from "react";
import { accsesstoken, cartdata, gcartdata, serchbar } from "../../main";
import { useNavigate } from "react-router";
import axios from "axios";
import { ACTION } from "../../constant";
import Serchf from "../navbar/serch";
import { ToastContainer } from 'react-toastify';
import notify from "../singin/toast";

export default function Cart() {
    const [token, settoken] = useContext(accsesstoken)
    const [serch, setserch] = useContext(serchbar)
    const [cartitems, setCartItems] = useContext(gcartdata);
    const [state, dispath] = useContext(cartdata)
    const navigate = useNavigate();
    let price = 0;
    const [final, setfinal] = useState([]);
    useEffect(() => {
        document.title = "Shop | Cart"
        if (token || localStorage.getItem("tocken")) {
            axios.get("/api/cart", {
                headers: {
                    authorization: `Bearer ${token ? token : localStorage.getItem("tocken")}`,
                }
            }).then(res => {
                setCartItems(() => res.data)
                setfinal(res.data)
            })
        }
        else {
            setCartItems(() => state)
            setfinal(state)
        }
    }, [token, state])
    useEffect(() => {
        setfinal(Serchf(cartitems, serch))
    }, [serch])
    async function clickhandler(prop, item) {
        if (token || localStorage.getItem("tocken")) {
            if (prop == ACTION.DECREMENT) {
                if (item.qantity < 1 || item.qantity == 1) {
                    await await axios.delete("/api/cart", {
                        headers: {
                            authorization: `Bearer ${token ? token : localStorage.getItem("tocken")}`,
                        },
                        data: item,
                    })
                    await axios.get("/api/cart", {
                        headers: {
                            authorization: `Bearer ${token ? token : localStorage.getItem("tocken")}`
                        }
                    }).then(res => { setCartItems(() => res.data); })
                }
                await axios.post("/api/cart", { product_id: item.product_id, decrement: 1 }, {
                    headers: {
                        authorization: `Bearer ${token ? token : localStorage.getItem("tocken")}`,
                    }
                })
                await axios.get("/api/cart", {
                    headers: {
                        authorization: `Bearer ${token ? token : localStorage.getItem("tocken")}`
                    }
                }).then(res => { setCartItems(() => res.data); })

            }
            else if (prop == ACTION.INCREMENT) {
                await axios.post("/api/cart", { product_id: item.product_id }, {
                    headers: {
                        authorization: `Bearer ${token ? token : localStorage.getItem("tocken")}`,
                    }
                })
                await axios.get("/api/cart", {
                    headers: {
                        authorization: `Bearer ${token ? token : localStorage.getItem("tocken")}`
                    }
                }).then(res => { setCartItems(() => res.data); })

            }
            else if (prop == ACTION.DELETE_FROM_CART) {
                await axios.delete("/api/cart", {
                    headers: {
                        authorization: `Bearer ${token ? token : localStorage.getItem("tocken")}`,
                    },
                    data: item,
                })
                await axios.get("/api/cart", {
                    headers: {
                        authorization: `Bearer ${token ? token : localStorage.getItem("tocken")}`
                    }
                }).then(res => { setCartItems(() => res.data); })


            }
        }
        else {
            if (prop == ACTION.DECREMENT) {
                dispath({ type: ACTION.DECREMENT, paylode: item })
            }
            else if (prop == ACTION.INCREMENT) {
                dispath({ type: ACTION.INCREMENT, paylode: item })
            }
            else if (prop == ACTION.DELETE_FROM_CART) {
                dispath({ type: ACTION.DELETE_FROM_CART, paylode: item })
            }
        }
    }
    useEffect(()=>{
        setfinal(cartitems)
    },[cartitems])
    return (
        <div className="container mx-auto mt-10 p-4">
            <h2 className="text-3xl font-semibold mb-6">Your Shopping Cart</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {final[0] && final?.map((item) => {
                    price += item.price * item.quantity
                    return (
                        <div key={item.product_id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                            <div className="p-4">
                                <div className=' w-full h-3/5 object-cover'><img onClick={() => navigate(`/product/${item.product_id}`)} className=' object-contain' src={item.image} /></div>
                                <h3 className=" text-lg font-semibold mb-2 text-black  overflow-hidden">{item.title}</h3>
                                <p className="text-gray-600">₹{item.price}</p>
                                <div className="flex items-center mt-2 justify-evenly">
                                    <button
                                        onClick={() => {clickhandler(ACTION.DECREMENT, item);notify("Quantity Decresed By 1","ok")}}
                                        className="text-red-500 hover:text-red-700 text-2xl focus:outline-none"
                                    > -
                                    </button>
                                    <input
                                        type="number"
                                        value={item.quantity ? item.quantity : item.qantity}
                                        readOnly
                                        className="w-16 text-center border text-white text-2xl bg-slate-950 rounded-md mx-2"
                                    />
                                    <button
                                        onClick={() => {clickhandler(ACTION.INCREMENT, item);notify("Quantity Incresed By 1","ok")}}
                                        className="text-green-500 text-2xl hover:text-green-700 focus:outline-none"
                                    > +
                                    </button>
                                    <button onClick={() => {clickhandler(ACTION.DELETE_FROM_CART, item);notify("Item Removed From Cart","ok")}} className=" text-2xl float-right text-red-600 hover:text-green-700 focus:outline-none">Remove</button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="dark:bg-gray-100 bg-gray-900 p-4 mt-6 rounded-lg">
                <p className="text-xl text-white dark:text-black font-semibold">Total :- ₹{price} </p>
                <button onClick={() => { cartitems[0] ? navigate("/checkout") : navigate("/") }} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full focus:outline-none">
                    Checkout
                </button>
            </div>
            <ToastContainer/>
        </div>
    );
}

//id 306531746316-o5bu39sqjt4tp84jt85ag6esjinj03p6.apps.googleusercontent.com
//secreate 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