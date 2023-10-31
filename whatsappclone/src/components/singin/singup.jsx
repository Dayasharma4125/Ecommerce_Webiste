import { useEffect, useState } from "react";
import { AiOutlineUnlock } from "react-icons/ai"
import { BiUser } from "react-icons/bi"
import { validate } from "./validate";
import "react-toastify/dist/ReactToastify.css";
import { notify } from "./toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { MdAlternateEmail } from "react-icons/md"
import { BsFillTelephoneFill } from "react-icons/bs"
const SignUp = () => {
  const navigate=useNavigate()
  const [data, setData] = useState({
    name: "",
    email: "",
    phoneno: "",
    password: "",
    cpassword: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setErrors(validate(data, "signUp"));
  }, [data]);

  const changeHandler = (event) => {
    if (event.target.name === "IsAccepted") {
      setData({ ...data, [event.target.name]: event.target.checked });
    } else {
      setData({ ...data, [event.target.name]: event.target.value });
    }
  };


  const submitHandler = async (event) => {
    console.log(data)
    await axios.post("/api/register", { name: data.name, email: data.email, password: data.password, phoneno: data.phoneno }).then(res => {
      if (res.data == "registraion succsesfull") {
        notify("You Register successfully", "success");
        navigate("/singin")
      } else if (res.data == "user alredy exists") {
        notify("You have already registered, log in to your account", "warning");
      }
    })
  };

  return (
    <div style={{ height: "80vh" }} className="  w-screen grid place-items-center">
      <div className="bg-slate-800 border border-slate-600 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-30 relative transition-all duration-200">
        <h1 className="text-4xl font-bold text-center mb-8">Register</h1>
        <div className="relative my-4">
          <input name="email" onChange={changeHandler} type="text" className="block w-72 py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer" placeholder=" " />
          <label className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Your Email</label>
          <MdAlternateEmail className='absolute top-4 right-4 text-slate-400' />
        </div>
        <div className="relative my-4">
          <input name="name" onChange={changeHandler} className="block w-72 py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer" placeholder=" " />
          <label className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">User Name</label>
          <BiUser className='absolute top-4 right-4 text-slate-400' />
        </div>
        <div className="relative my-4">
          <input type="number" name="phoneno" onChange={changeHandler} className="block w-72 py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer" placeholder=" " />
          <label className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone No</label>
          <BsFillTelephoneFill className='absolute top-4 right-4 text-slate-400' />
        </div>
        <div className="relative my-4">
          <input name="password" onChange={changeHandler} type="password" className="block w-72 py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer" placeholder=" " />
          <label className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Your Password</label>
          <AiOutlineUnlock className='absolute top-4 right-4 text-slate-400' />
        </div>
        <div className="relative my-4">
          <input name="cpassword" onChange={changeHandler} type="password" className="block w-72 py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer" placeholder=" " />
          <label className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Your Comfirm Password</label>
          <AiOutlineUnlock className='absolute top-4 right-4 text-slate-400' />
        </div>
        <button className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-emerald-800 hover:bg-emerald-600 hover:text-white py-2 transition-colors duration-300" onClick={submitHandler}>Register</button>
        <div className='mt-2 items-center'>
          <div className="my-4">
            <span>Already Register? <span className="text-blue-500"> <Link to='/singin'>Login</Link></span></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;