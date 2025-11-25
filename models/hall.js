const mongoose = require('mongoose');

const hallSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Salon adı zorunludur'], // Örnek: "Salon 1", "IMAX Salonu"
        trim: true
    },
    capacity: {
        type: Number,
        required: [true, 'Salon kapasitesi zorunludur']
    },
    features: [{ // Salonun özellikleri (Opsiyonel)
        type: String,
        enum: ['2D', '3D', 'IMAX', 'Dolby Atmos', 'VIP'],
        default: '2D'
    }]
}, { timestamps: true });

module.exports = mongoose.model('Hall', hallSchema);
