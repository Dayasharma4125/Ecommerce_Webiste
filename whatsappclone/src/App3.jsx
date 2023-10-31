import { useContext, useEffect } from 'react'
// import "./index2.scss";
import axios from 'axios'
import Hero from './components/hero/hero'
import { accsesstoken, dataf } from './main';
import { ACTION } from './constant';

function Product() {
    return <Hero />
}
function Products() {
    return <div className="main"></div>
}
function Datafecther() {
    const [data, setdata] = useContext(dataf)
    useEffect(()=>{
        console.log("data feched")
        axios.get("/api/data").then(res => setdata(res.data))
    },[])
}




function Reducer(state, action) {
    let isincart;
    switch (action.type) {
        case ACTION.ADD_TO_CART:
            isincart = state.find(e => e.product_id == action.paylode.product_id);
            return isincart ? state.map(e => e.product_id == action.paylode.product_id ? e = { ...e, qantity: e.qantity + 1 } : e) : [...state, { ...action.paylode, qantity: 1 }];
        case ACTION.DELETE_FROM_CART:
            isincart = state.find(e => e.product_id == action.paylode.product_id)
            return isincart ? state.filter(e => e.product_id !== action.paylode.product_id) : alert("Not in Cart");
        case ACTION.INCREMENT:
            isincart = state.find(e => e.product_id == action.paylode.product_id)
            return isincart ? state.map(e => e.product_id == action.paylode.product_id ? e = { ...e, qantity: e.qantity + 1 } : e) : alert("Not present in Cart");
        case ACTION.DECREMENT:
            isincart = state.find(e => e.product_id == action.paylode.product_id)
            if (action.paylode.qantity == 1) {
                return state.filter(e => e.product_id !== action.paylode.product_id)
            }
            return isincart ? state.map(e => e.product_id == action.paylode.product_id ? e = { ...e, qantity: e.qantity - 1 } : e) : alert("Not in Cart");
    }
}
export {  Reducer, Datafecther, Products, Product };