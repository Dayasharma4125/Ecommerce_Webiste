import { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AiOutlineUnlock } from "react-icons/ai"
import { BiUser } from "react-icons/bi";
import { accsesstoken } from "../../main";


const Login = () => {
  const navigate = useNavigate();
  const [token, settoken] = useContext(accsesstoken)
  const [data, setData] = useState({
    email: "",
    password: "",
  });


  const changeHandler = (event) => {
    if (event.target.name === "IsAccepted") {
      setData({ ...data, [event.target.name]: event.target.checked });
    } else {
      setData({ ...data, [event.target.name]: event.target.value });
    }
  };
  const submitHandler = async (event) => {
    await axios.post("/api/login", { email: data.email, password: data.password }).then(res => {
      if (res.data.tocken) {
        settoken(res.data.tocken)
        localStorage.setItem("tocken", res.data.tocken)
        navigate("/profile")
        toast.success("Login sucessful",{
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      }
      else {
        toast.warn("Email Or Password Is Wrong!!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      }
    })

  };

  return (
    <div style={{ height: "80vh" }} className=" w-[95%] mx-auto md:w-full grid place-items-center">
      <div className="bg-slate-800 border  border-slate-600 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-30 relative transition-all duration-200">
        <h1 className="text-4xl text-white font-bold  text-center mb-6">Login</h1>
        <div className="relative my-4">
          <input onChange={changeHandler} type="email" name="email" className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer" placeholder="" />
          <label htmlFor="" className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Your Email</label>
          <BiUser className="absolute top-4 right-4" />
        </div>
        <div className="relative my-4">
          <input onChange={changeHandler} type="password" name="password" className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer" placeholder="" />
          <label htmlFor="" className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Your Password</label>
          <AiOutlineUnlock className="absolute top-4 right-4" />
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <input onChange={changeHandler} type="checkbox" name="" id="" />
            <label htmlFor="Remember Me">Remember Me</label>
          </div>
          <Link to='/forget-password' className="text-blue-500">Forgot Password?</Link>
        </div>
        <button className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-emerald-800 hover:bg-emerald-600 hover:text-white py-2 transition-colors duration-300" onClick={submitHandler}>Login</button>
        <div>
          <span className="m-4">New Here? <Link className="text-blue-500" to='/Register'>Create an Account</Link></span>
        </div>
      </div>
    </div>
  );
};

export default Login;