// middleware/auth.js
const jwt = require('jsonwebtoken');

// Bu fonksiyonun amacı: Gelen istekte "Admin" yetkisi var mı kontrol etmek
const verifyAdmin = async (req, res, next) => {
    try {
        // 1. Token'ı başlık (Header) kısmından al
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).send({
                success: false,
                message: "Giriş yapmanız gerekiyor (Token yok)."
            });
        }

        // 2. "Bearer " kelimesini temizleyip sadece şifreli kodu alalım
        const tokenDizisi = token.split(" ");
        const asilToken = tokenDizisi[1];

        if (!asilToken) {
            return res.status(401).send({
                success: false,
                message: "Geçersiz token formatı."
            });
        }

        const decodedToken = jwt.verify(asilToken, process.env.JWT_SECRET);

        // 3. Kullanıcıyı veritabanından bul (Güncel rolü kontrol etmek için)
        // Model yolunu kontrol et: ../models/User
        const User = require('../models/User');
        const user = await User.findById(decodedToken.id);

        if (!user) {
            return res.status(401).send({
                success: false,
                message: "Kullanıcı bulunamadı."
            });
        }

        // 4. Rol Kontrolü
        if (user.role !== 'admin') {
            return res.status(403).send({ // 403: Forbidden (Yasaklı)
                success: false,
                message: "Bu işlemi yapmak için Admin yetkiniz yok!"
            });
        }

        // 5. Her şey yolundaysa, sıradaki fonksiyona geç
        req.userData = decodedToken;
        req.user = user; // Güncel kullanıcı bilgisini de ekleyelim
        next();

    } catch (error) {
        console.log("Auth Error:", error);
        return res.status(401).send({
            success: false,
            message: "Geçersiz veya süresi dolmuş oturum.",
            error: error.message
        });
    }
};

module.exports = verifyAdmin;