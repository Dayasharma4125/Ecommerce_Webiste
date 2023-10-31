import express, { query } from "express";
import expressAsyncHandler from "express-async-handler";
import { config } from "../model/model.js";
import pkg from "jsonwebtoken";
import bcrypt, { hash } from 'bcrypt';
import { data1 } from "../data/data.js";

const bcryptl = bcrypt;
const jwt = pkg;
const userd = expressAsyncHandler(async (req, res) => {
    let query = "SELECT * FROM  userdata";
    config.query(query, (err, result, fields) => {
        if (!err) { } else { res.send(err) }
        if (result) {
            res.send(result);
        }
    })

})
const userpr = expressAsyncHandler(async (req, res) => {
    const { name, email, phoneno, password } = req.body;
    const hashpass = await bcryptl.hash(password, 10)
    config.query(`SELECT * FROM userdata WHERE email = '${email}'`, (err, result) => {
        if (err) res.send(err);
        if (!result[0]) {
            let query = `INSERT INTO userdata(name,email,phoneno,password) VALUES('${name}','${email}', '${phoneno}' , '${hashpass}')`;
            config.query(query, (err, result) => {
                if (!err || result) {
                    res.send("registraion succsesfull")
                }
                else {
                    res.send(err)
                }
            })
        }
        else {
            res.send("user alredy exists").redirect("/login");
        }
    })
})
const userforgetpassword = expressAsyncHandler(async (req, res) => {
    const { name, email, phoneno, password } = req.body;
    const hashpass = await bcryptl.hash(password, 10)
    config.query(`UPDATE userdata SET password=? where email="${email}" and phoneno="${phoneno}"`, [hashpass], function (error, results) {
        if (!results || error) { res.send(err) } else { }
    })
})
const logoutuser = expressAsyncHandler(async (req, res) => {

})
const userpl = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    config.query(`SELECT * FROM userdata WHERE email = '${email}'`, (err, result) => {
        if (!err) { } else { res.send(err) }
        if (result[0]) {
            bcryptl.compare(password, result[0].password, (err, result1) => {
                if (err) res.send("error");
                else if (result1 == true) {
                    const tocken = jwt.sign({ "JWT": { "alg": "HS256", "typ": "JWT" }, "user": { "email": email, "user_id": result[0].user_id } }, "k849ut58irh84y5302", { expiresIn: "10h" })
                    res.json({ "tocken": tocken })
                }
                else (
                    res.send("unautrised")
                )
            })
        }
        else {
            res.send("no such user found")
        }
    })
})
const usercartdataget = expressAsyncHandler(async (req, res) => {
    const token = tk(req);
    if (!token) { res.send("login first").redirect("/login") }
    const user_id = jwt.decode(token)
    const query = `SELECT * FROM usercart WHERE user_id =${user_id?.user.user_id}`

    config.query(`${query}`, async (err, results) => {
        if (results && !err) {
            const data = results.map(e => { return (e.product_id) })
            config.query(`SELECT * FROM beddata WHERE product_id IN (${data})`, (err, result) => {
                if (!err || result) {
                    const resdata = result.map(e => {
                        const product = results.filter(f => f.product_id == e.product_id)
                        return { ...e, quantity: product[0].quantity }
                    })
                    res.send([...resdata])
                }
                else {
                    res.send(err)
                }
            })

        }
        else { res.send(err) }
    })
})
const usercartdatapost = expressAsyncHandler(async (req, res) => {
    const token = tk(req);
    if (!token) { res.send("login first").redirect("/login") }
    const user_id = jwt.decode(token)
    const { product_id } = req.body;
    config.query(`SELECT * FROM usercart WHERE product_id="${product_id}" AND user_id='${user_id.user.user_id}'`, (err, result) => {
        if (!result[0]) {
            const query = `INSERT INTO usercart(product_id,user_id) values('${product_id}','${user_id.user.user_id}')`;
            config.query(query, (err, result, fields) => {
                if (!err) {
                    res.send(result);
                }
                else if (err) {
                    res.send(err)
                }
            })
        }
        else if (result[0] && !req.body.decrement) {
            config.query(`UPDATE usercart SET quantity=${result[0].quantity + 1} WHERE product_id="${product_id}" AND user_id='${user_id.user.user_id}'`, (err, reslut1) => {
                res.send(reslut1)
            })
        }
        else if (result[0] && req.body.decrement) {
            config.query(`UPDATE usercart SET quantity=${result[0].quantity - 1} WHERE product_id="${product_id}" AND user_id='${user_id.user.user_id}'`, (err, reslut1) => {
                res.send(reslut1)
            })
        }
    })
})
const usercartdatadelete = expressAsyncHandler(async (req, res) => {
    const token = tk(req);
    if (!token) { res.send("login first").redirect("/login") }
    const user_id = jwt.decode(token)
    const product_id = req.body?.product_id;
    config.query(`SELECT * FROM usercart WHERE product_id="${product_id}" AND user_id='${user_id.user.user_id}'`, (err, result) => {
        if (!result[0]) {
            res.send("not exsits in your cart")
        }
        else if (result[0]) {
            config.query(`DELETE FROM usercart WHERE product_id="${product_id}" AND user_id='${user_id.user.user_id}'`, (err, reslut1) => {
                res.send("removed from cart")
            })
        }
    })
})
const userinfo = expressAsyncHandler(async (req, res) => {
    if (req.headers.authorization.startsWith("Bearer")) {
        const token = await tk(req)
        const { address, pincode, country, city, phoneno } = req.body;
        if (!token) {
            return await res.json({ message: "please login" }).redirect('/login')
        }
        else {
            const user_id = jwt.decode(token)?.user.user_id
            if (!user_id) {
                res.send("login error")
            }
            config.query(`INSERT INTO userinfo(user_id,address,pincode,country,city,phoneno) VALUES  (${user_id},'${address}',${pincode},'${country}','${city}',${phoneno})`, function (error, results, fields) {
                if (error) {
                    res.send(error)
                }
                else if (results) {
                    res.send("data stored")
                }
            })
        }
    }
    else {
        res.send("not valid user")
    }
})

function tk(prop) {
    return prop.headers.authorization.split(" ")[1] || prop.headers.Authorization.split(" ")[1]
}
const datamake = expressAsyncHandler(async (req, res) => {
    let datam = []
    await data1.forEach((e, index) => {
        // config.query(`INSERT INTO beddata(product_id,title,price,image,price_you_pay,rating,spcial_price,brand,descount) VALUES  (${index},'${e.name}',${e.price},'https://ii1.pepperfry.com/media/catalog/product/${e.image}',${e.you_pay_price},${e.product_rating},${e.special_price},'${e.brands_name}','${e.total_discount_percentage}')`,(err,result)=>{
        //     if(err) console.log(err)
        //     else{console.log(result)}
        // })
        datam = [...datam, { product_id: index, title: e.name, price: e.price, price_you_pay: e.you_pay_price, image: `https://ii1.pepperfry.com/media/catalog/product/${e.image}`, rating: e.product_rating, spcial_price: e.special_price, brand: e.brands_name, descount: e.total_discount_percentage, }]
    })
    await res.send(datam)
})
const fetchsingleproduct = expressAsyncHandler(async (req, res) => {
    const id = req.params.id
    // config.query(`SELECT * FROM productdata WHERE product_id=${id}`,(err,result)=>{
    //     if(err) res.send(err);
    //     else{
    //         res.send(res)
    //     }
    // }) 
    let datam = []
    await data1.forEach((e, index) => {
        datam = [...datam, { product_id: index, title: e.name, price: e.price, price_you_pay: e.you_pay_price, image: `https://ii1.pepperfry.com/media/catalog/product/${e.image}`, rating: e.product_rating, spcial_price: e.special_price, brand: e.brands_name, descount: e.total_discount_percentage, }]
    })
    const data = await datam.filter(e => {
        if (e.product_id == id) {
            return e
        }
    })
    res.send(data)

})

export { datamake, userd, fetchsingleproduct, userpr, userpl, usercartdataget, logoutuser, usercartdatapost, usercartdatadelete, userforgetpassword, userinfo };

