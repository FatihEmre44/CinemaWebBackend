const express=require("express");
const router = express.Router();
const { registercheck,logincheck } = require('../controllers/authcontroller');

router.post("/register",registercheck);
router.post('/login',logincheck);

module.exports=router;