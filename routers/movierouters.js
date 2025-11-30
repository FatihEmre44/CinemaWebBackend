const express = require("express");
const router = express.Router();
const verifyAdmin = require("../middlewares/authmiddle");
const verifyToken = require("../middlewares/loginmiddle");

const { addmovie, updateMovie } = require('../controllers/moviecontroller');

router.post("/addmovie", verifyToken, verifyAdmin, addmovie);
router.put("/update/:id", verifyToken, verifyAdmin, updateMovie);

module.exports = router;