const express = require('express');
const router = express.Router();
const { createHall, getAllHalls, getHallById, updateHall, deleteHall } = require('../controllers/hallController');
const verifyAdmin = require("../middlewares/authmiddle");
// Sadece Adminler yapabilmeli (Middleware varsa ekleyebilirsin)
// const { verifyAdmin } = require('../middleware/auth');

router.post('/addhall', verifyAdmin, createHall);       // Ekle
router.get('/gethall', verifyAdmin, getAllHalls);       // Listele
router.get('/:id', verifyAdmin, getHallById);    // Detay Gör
router.put('/:id', verifyAdmin, updateHall);     // Güncelle
router.delete('/:id', verifyAdmin, deleteHall);  // Sil

module.exports = router;