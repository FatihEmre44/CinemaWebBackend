const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie', // Movie modeline referans
        required: [true, 'Film seçimi zorunludur']
    },
    hall: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hall', // Hall modeline referans
        required: [true, 'Salon seçimi zorunludur']
    },
    startTime: {
        type: Date,
        required: [true, 'Seans saati zorunludur']
    },
    price: {
        type: Number,
        required: [true, 'Bilet fiyatı zorunludur']
    },
    endTime: {
        type: Date,
        required: true
    },
    soldSeats: [{ // Bu seansta satılmış koltuklar
        type: String // ["A1", "A2", "C5"]
    }]
}, { timestamps: true });

module.exports = mongoose.model('Session', sessionSchema);