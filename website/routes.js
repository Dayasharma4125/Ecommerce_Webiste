import express from "express";
import { usercartdataget, userd, userpl, userpr,logoutuser, usercartdatapost, usercartdatadelete, userforgetpassword, userinfo, datamake, fetchsingleproduct } from "./crudf/function.js";

const router = express.Router();

router.route("/data").get(datamake);
router.route("/register").post(userpr);
router.route("/login").post(userpl);
router.route("/logout").post(logoutuser);
router.route('/cart').get(usercartdataget).post(usercartdatapost).delete(usercartdatadelete);
router.route("/fetchproduct/:id").get(fetchsingleproduct)
// router.route("/checkout/payment").post(payment)
router.route("/userinfo").post(userinfo)
router.route('/login/forget-password').put(userforgetpassword)
export default router;