import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { accsesstoken, cartdata } from "../../main";
import { ACTION } from "../../constant";
import { Carousel } from "react-responsive-carousel";

export default function Singledataforp() {
    const param = useParams();
    const [dataforp, setdataforp] = useState()
    const [token, settoken] = useContext(accsesstoken)
    const [state, dispath] = useContext(cartdata)
    useEffect(() => {
        document.title = "Shop | Product"
        axios.get(`/api/fetchproduct/${param.id}`).then(res => {
            setdataforp(res.data[0])
            // const imges=Object.values(res.data[0])
        })
    }, [])
    return (
        <div className="container mx-auto mt-10 p-4 ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <Carousel autoPlay="true" statusFormatter={()=>""} stopOnHover="true" infiniteLoop="true" interval={"5000"}  showArrows="true" className=" sm:w-11/12 w-full  m-auto rounded-xl overflow-x-hidden" >
                        <div>
                            <img src={dataforp?.image} />
                        </div>
                        <div>
                            <img src={dataforp?.image} />
                        </div>
                        <div>
                            <img src={dataforp?.image} />
                        </div>
                        <div>
                            <img src={dataforp?.image} />
                        </div>
                    </Carousel>
                </div>
                <div>
                    <h2 className="text-3xl font-semibold mb-4">{dataforp?.title}</h2>
                    <p className=" text-white ">Price:- <span>${dataforp?.price}</span></p>
                    <p className="text-red-700  text-3xl mt-4"><span>-{dataforp?.descount}%</span></p>
                    <div className=" w-full h-1/4">
                        <div>Offers</div>
                        <div className=" flex justify-start items-center">
                            <div>  1</div>
                            <div>  2</div>
                            <div>  3</div>
                            <div>  4</div>
                        </div>
                    </div>
                    <div className=" text-xl">
                        Rating:- {dataforp?.rating}
                    </div>
                    <p className=" text-2xl">Discounted price:- $<span>{dataforp?.price_you_pay}</span></p>
                    <button
                        onClick={() => {
                            if (token || localStorage.getItem("tocken")) {
                                axios.post("/api/cart", { product_id: dataforp?.product_id }, {
                                    headers: {
                                        authorization: `Bearer ${token ? token : localStorage.getItem("tocken")}`,
                                    }
                                })
                            }
                            else {
                                dispath({ type: ACTION.ADD_TO_CART, paylode: dataforp })
                            }
                        }}
                        className="mt-6 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full focus:outline-none" >
                        Add to Cart
                    </button>

                </div>
            </div>
        </div>
    )
}

