const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: [true, 'Film adı zorunludur'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Film özeti zorunludur'],
    },
    duration: {
        type: Number,
        required: [true, 'Film süresi (dakika) zorunludur']
    },
    genre: [{
        type: String,
        required: true
    }], // Örnek: ["Aksiyon", "Bilim Kurgu"]

    director: {
        type: String,
        required: true
    },
    cast: [{
        type: String
    }], // Oyuncular array olarak tutulur
    backdropImage: { // Detay sayfasındaki büyük arka plan resmi
        type: String
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    releaseDate: {
        type: Date,
        required: true
    },
    // EN ÖNEMLİ KISIM: FİLMİN DURUMU
    status: {
        type: String,
        enum: ['vizyonda', 'gelecek', 'arsiv'], // Sadece bu değerleri kabul eder
        default: 'gelecek'
    }
}, { timestamps: true }); // createdAt ve updatedAt otomatik eklenir

module.exports = mongoose.model('Movie', movieSchema);