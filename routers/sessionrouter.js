const express = require('express');
const router = express.Router();
const {deletesession,updateSession,createSession}=require("../controllers/sessioncontroller");
const verifyAdmin = require("../middlewares/authmiddle");

router.post("/addsession",verifyAdmin,createSession);
router.put("/updatesession/:id", verifyAdmin, updateSession);
router.delete("/deletesession/:id", verifyAdmin, deletesession);

module.exports = router;