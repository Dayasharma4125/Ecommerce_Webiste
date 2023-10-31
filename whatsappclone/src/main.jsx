import "./index.css"
import React, { Suspense, createContext, lazy, useReducer, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Reducer } from "./App3";
import SkeletonH from "./components/skeleton/skeleton";
import Home from "./components/home/Home";
import Footer from "./components/footer/footer";


// const SkeletonH = lazy(() => import("./components/skeleton/skeleton"));
const Hero = lazy(() => import("./components/hero/hero"))
const Homebeds = lazy(() => import("./components/homebeds/Home"))
const About = lazy(() => import("./components/about/about"))
const Contact = lazy(() => import("./components/contactus/contactus"))
const Products = lazy(() => import("./App3"))
const PagenotFound = lazy(() => import("./components/skeleton/pagenotfound"))
const Logout = lazy(() => import("./components/singin/logout"))
const Navbar1 = lazy(() => import("./components/navbar/navbar1"))
const Login = lazy(() => import("./components/singin/singin"))
const Register = lazy(() => import("./components/singin/singup"))
const Checkout = lazy(() => import("./components/checkout/checkout"))
const AddressForm = lazy(() => import("./components/checkout/address"))
const PaymentForm = lazy(() => import("./components/checkout/payment"))
const Review = lazy(() => import("./components/checkout/review"))
const Singleproduct = lazy(() => import("./components/singleproduct/singleproduct"))
const Cart = lazy(() => import("./components/cart/cart"))
export const gcartdata = createContext();
export const accsesstoken = createContext()
export const dataf = createContext();
export const cartdata = createContext();
export const serchbar = createContext();
export function App() {
  const [state, dispath] = useReducer(Reducer, []);
  const [data, setdata] = useState([]);
  const [token, settoken] = useState()
  const [gcart, setgcart] = useState([])
  const [serch, setserch] = useState("")
  return (
    <BrowserRouter>
      <serchbar.Provider value={[serch, setserch]}>
        <gcartdata.Provider value={[gcart, setgcart]}>
          <cartdata.Provider value={[state, dispath]}>
            <dataf.Provider value={[data, setdata]}>
              <accsesstoken.Provider value={[token, settoken]}>
                <Navbar1 />
                <Suspense fallback={<SkeletonH />}>
                  <Routes>
                    <Route path="/" element={<><Home /><Footer/></>} />
                    <Route path="/beds" element={<><Hero /><Homebeds /><Footer/></>} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/product/:id" element={<Singleproduct />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/singin" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/*" element={<PagenotFound />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/checkout/address" element={<AddressForm />} />
                    <Route path="/checkout/payment" element={<PaymentForm />} />
                    <Route path="/checkout/review" element={<Review />} />
                  </Routes>
                </Suspense>
              </accsesstoken.Provider>
            </dataf.Provider>
          </cartdata.Provider>
        </gcartdata.Provider>
      </serchbar.Provider>
    </BrowserRouter>

  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
