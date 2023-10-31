import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"
import { accsesstoken, gcartdata } from "../../main";

function Checkout() {
    const [token, settoken] = useContext(accsesstoken)
    const navigate = useNavigate();
    const [gcart, setgcart] = useContext(gcartdata)
    let lquantity=0,ltotal=0;
    // if(token ||localStorage.getItem("tocken")){
    //     navigate("/checkout/address")
    // }
    // else{
    //     navigate("/singin")
    // }
    return (
        <div className=" w-[96%]  md:w-4/5 min-h-[80vh] mx-auto mt-3 rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-xl overflow-hidden">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Product name
                        </th>
                        {/* <th scope="col" className="px-6 py-3">
                            Color
                        </th> */}
                        <th scope="col" className=" w-5 md:px-6 py-3">
                            Quantity
                        </th>
                        <th scope="col" className="px-1 md:px-6 py-3">
                            Price
                        </th>
                    </tr>
                </thead>
                <tbody className=" w-full ">
                    {gcart && gcart.map((e, index) => {
                        ltotal+= e.price * e.quantity
                        lquantity+=e.quantity
                        return (
                            <tr  key={e.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className=" w-full px-1 py-4 md:px-6 font-medium whitespace-pre-line text-gray-900  dark:text-white">
                                    <p className=" w-full break-words ">{e.title}</p>
                                </th>
                                <td className="px-3 md:px-6 py-4">
                                    {e.quantity}
                                </td>
                                <td className="px-2 py-4 md:px-6">
                                    {e.price}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
                <tfoot className=" text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr className="font-semibold text-gray-900 dark:text-white">
                        <th scope="row" className="px-6 py-3 text-base">Total</th>
                        <td className="px-6 py-3">{lquantity}</td>
                        <td className="px-6 py-3">{ltotal}</td>
                    </tr>
                </tfoot>
            </table>
            <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full focus:outline-none mx-5" onClick={()=>navigate("/checkout/address")}>Next</button>
            <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full focus:outline-none" onClick={()=>navigate("/cart")}>Edit</button>
        </div>
    )
}

export default Checkout