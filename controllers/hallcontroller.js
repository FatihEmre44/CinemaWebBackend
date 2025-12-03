const Hall = require("../models/hall");

// 1. YENİ SALON OLUŞTURMA
const createHall = async (req, res) => {
    try {
        const { name, capacity, features } = req.body;

        // A. Zorunlu alan kontrolü (Manuel)
        if (!name || !capacity) {
            return res.status(400).send({
                success: false,
                message: "Lütfen salon adı ve kapasitesini giriniz."
            });
        }

        const existingHall = await Hall.findOne({ 
            name: { $regex: new RegExp("^" + name.trim() + "$", "i") } 
        });

        if (existingHall) {
            return res.status(409).send({ // 409: Conflict
                success: false,
                message: "Bu isimde bir salon zaten mevcut."
            });
        }

        // C. Kapasite mantık kontrolü
        if (capacity <= 0) {
            return res.status(400).send({
                success: false,
                message: "Kapasite 0'dan büyük olmalıdır."
            });
        }

        // D. Kayıt İşlemi
        const newHall = new Hall({
            name,
            capacity,
            features 
        });

        await newHall.save();

        res.status(201).send({
            success: true,
            message: "Salon başarıyla oluşturuldu.",
            data: newHall
        });

    } catch (error) {
        if (error.name === 'ValidationError') {
             return res.status(400).send({
                success: false,
                message: "Geçersiz veri girişi.",
                error: error.message 
            });
        }
        
        res.status(500).send({
            success: false,
            message: "Salon oluşturulurken sunucu hatası oluştu.",
            error: error.message
        });
    }
};

// 2. TÜM SALONLARI LİSTELEME
const getAllHalls = async (req, res) => {
    try {
        const halls = await Hall.find().sort({ name: 1 }); // İsme göre alfabetik sırala
        
        res.status(200).send({
            success: true,
            count: halls.length,
            data: halls
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Salonlar listelenirken hata oluştu.",
            error: error.message
        });
    }
};

// 3. TEK BİR SALONU GETİRME (ID ile)
const getHallById = async (req, res) => {
    try {
        const { id } = req.params;
        const hall = await Hall.findById(id);

        if (!hall) {
            return res.status(404).send({
                success: false,
                message: "Salon bulunamadı."
            });
        }

        res.status(200).send({
            success: true,
            data: hall
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Salon getirilirken hata oluştu.",
            error: error.message
        });
    }
};

// 4. SALON GÜNCELLEME
const updateHall = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        // Eğer isim güncelleniyorsa, boşlukları temizle
        if (updates.name) {
            updates.name = updates.name.trim();
        }

        const updatedHall = await Hall.findByIdAndUpdate(id, updates, {
            new: true,          // Güncel halini döndür
            runValidators: true 
        });

        if (!updatedHall) {
            return res.status(404).send({
                success: false,
                message: "Güncellenecek salon bulunamadı."
            });
        }

        res.status(200).send({
            success: true,
            message: "Salon başarıyla güncellendi.",
            data: updatedHall
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Güncelleme sırasında hata oluştu.",
            error: error.message
        });
    }
};

// 5. SALON SİLME
const deleteHall = async (req, res) => {
    try {
        const { id } = req.params;
        
        const deletedHall = await Hall.findByIdAndDelete(id);

        if (!deletedHall) {
            return res.status(404).send({
                success: false,
                message: "Silinecek salon bulunamadı."
            });
        }

        res.status(200).send({
            success: true,
            message: "Salon başarıyla silindi.",
            data: deletedHall
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Silme sırasında hata oluştu.",
            error: error.message
        });
    }
};

module.exports = {
    createHall,
    getAllHalls,
    getHallById,
    updateHall,
    deleteHall
};