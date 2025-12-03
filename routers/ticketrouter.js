const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/loginmiddle");
const {buyticket,refundTicket}=require('../controllers/ordercontroller');


router.post("/buyticket",verifyToken,buyticket);
router.post("/refund/:id",verifyToken,refundTicket);


module.exports=router;