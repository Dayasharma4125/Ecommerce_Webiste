import { BrowserRouter, useNavigate, Route, Routes } from "react-router-dom";
import { imgsrc } from "./assets/datao";
import './index2.scss';
import { createContext, useContext, useState } from "react";
import Navbar1 from "./components/navbar/navbar1";
import Hero from "./components/hero/hero";
const dataproductg = createContext();
const App2 = () => {
    const [pdata, setpdata] = useState([])
    return (
        <>
            <BrowserRouter>
                <dataproductg.Provider value={{ pdata, setpdata }}>
                    <Navbar1 />
                    <Routes>
                        <Route path="/" element={<Hompage />} />
                        <Route path="/product/:id" element={<Product />} />
                    </Routes>
                </dataproductg.Provider>
            </BrowserRouter>
        </>
    )
}

export default App2

function Hompage() {
    const navigate = useNavigate()
    const dataproduct = useContext(dataproductg);
    const { pdata, setpdata } = dataproduct;

    function Mapingitem() {
        return (
            <main className="producthome">
                <Hero />
                <>
                    {imgsrc.map((i) => {
                        return (
                            <div key={i.id} className="productdiv">
                                <h1 className=" w-full h-1/5 overflow-hidden">{i.id}</h1>
                                <img src={i.imgsrc} onClick={() => { setpdata(i); navigate(`/product/${i.id}`); }} />
                                <h1>{i.name}</h1>
                                <h2>{i.id}</h2>
                            </div>
                        )
                    })}</>

            </main>);
    }
    return (
        <Mapingitem />
    );
}
function Product() {
    const dataproduct = useContext(dataproductg);
    const { pdata, setpdata } = dataproduct;
    return (
        <>
        </>
    );
}