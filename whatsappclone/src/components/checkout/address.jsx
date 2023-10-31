import axios from 'axios';
import { useContext, useState } from 'react';
import { AiFillPhone, AiOutlineHome, AiOutlineUnlock } from 'react-icons/ai'
import { TbMapPinCode } from 'react-icons/tb'
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { accsesstoken } from '../../main';

function Address() {
    const navigate = useNavigate();
    const [token, settoken] = useContext(accsesstoken)
    const [data, setData] = useState({
        address: "",
        pincode: "",
        country: "",
        city: "",
        phoneno: ""
    });
    const changeHandler = (event) => {
        if (event.target.name === "IsAccepted") {
            setData({ ...data, [event.target.name]: event.target.checked });
        } else {
            setData({ ...data, [event.target.name]: event.target.value });
        }
    };
    const submitHandler = async (event) => {
        if (token || localStorage.getItem("tocken")) {
            await axios.post("/api/userinfo", { address: data.address, pincode: data.pincode, country: data.country, city: data.city, phoneno: data.phoneno }, {
                headers: {
                    authorization: `Bearer ${token ? token : localStorage.getItem("tocken")}`
                }
            }).then(res => {
                if (res.data) {
                    navigate("/checkout/payment")
                }
                console.log(res.data)
            })
        }
        else {
            toast.warn("Not Logged In")
            setTimeout(() => navigate("/login"), 1000)
        }
    }
    return (
        <div style={{ height: "80vh" }} className=" w-full grid place-items-center">
            <div className="bg-slate-800 border scale-90 small:scale-95 sm:scale-100 md:scale-110 lg:scale-125 border-slate-600 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-30 relative transition-all duration-200">
                <h1 className="text-4xl text-white font-bold  text-center mb-6">Address details</h1>
                <div className="relative my-4">
                    <input required onChange={changeHandler} type="text" name="address" className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer" placeholder="" />
                    <label htmlFor="" className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Address</label>
                    <AiOutlineHome className="absolute top-4 right-4" />
                </div>
                <div className="relative my-4">
                    <input required onChange={changeHandler} name="city" className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer" placeholder="" />
                    <label htmlFor="" className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Your City</label>
                    <AiOutlineUnlock className="absolute top-4 right-4" />
                </div>
                <div className="relative my-4">
                    <input required onChange={changeHandler} name="pincode" type="number" className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer" placeholder="" />
                    <label htmlFor="" className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Pincode</label>
                    <TbMapPinCode className="absolute top-4 right-4" />
                </div>
                <div className="relative my-4">
                    <input required onChange={changeHandler} name="country" className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer" placeholder="" />
                    <label htmlFor="" className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">State</label>
                    <TbMapPinCode className="absolute top-4 right-4" />
                </div>
                <div className="relative my-4">
                    <input required onChange={changeHandler} name="phoneno" className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer" placeholder="" />
                    <label htmlFor="" className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone No</label>
                    <AiFillPhone className="absolute top-4 right-4" />
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                        <input onChange={changeHandler} type="checkbox" name="" id="" />
                        <label htmlFor="Remember Me">Remember Me</label>
                    </div>
                </div>
                <button className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-emerald-800 hover:bg-emerald-600 hover:text-white py-2 transition-colors duration-300" onClick={submitHandler}>Next</button>
            </div>
        </div>
    )
}

export default Address