const jwt = require('jsonwebtoken');

// Bu middleware, kullanıcının giriş yapıp yapmadığını (Token kontrolü) sağlar.
const verifyToken = (req, res, next) => {
    try {
        // 1. Token'ı Header'dan al
        // Genellikle format: "Bearer <token_kodu>" şeklindedir.
        const authHeader = req.headers.authorization;

        // Eğer header yoksa veya boşsa hata dön
        if (!authHeader) {
            return res.status(401).send({
                success: false,
                message: "Erişim reddedildi. Token sağlanmadı."
            });
        }

        // 2. "Bearer " kısmını ayırıp sadece kodu al
        // split(" ")[1] -> Boşluktan sonrasını (token'ı) alır
        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).send({
                success: false,
                message: "Token formatı hatalı."
            });
        }

        // 3. Token'ı Doğrula (Verify)
        // 'GIZLI_ANAHTAR_BURAYA': Login olurken kullandığın gizli anahtarla AYNI olmalı
        // .env dosyası kullanıyorsan: process.env.JWT_SECRET
        const decoded = jwt.verify(token, 'GIZLI_ANAHTAR_BURAYA');

        // 4. Token geçerliyse, içindeki bilgileri (id, role vb.) isteğe ekle
        // Artık sonraki fonksiyonlarda (addmovie gibi) req.user diyerek bu kişiye ulaşabilirsin.
        req.user = decoded;

        // 5. Yola devam et
        next();

    } catch (error) {
        // Token süresi dolmuşsa veya sahteyse buraya düşer
        return res.status(403).send({
            success: false,
            message: "Geçersiz veya süresi dolmuş token.",
            error: error.message
        });
    }
};

module.exports = verifyToken;