const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    session: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Session',
        required: [true, 'Seans seçimi zorunludur']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Kullanıcı bilgisi zorunludur']
    },
    seats: [{
        type: String,
        required: true
    }],
    totalPrice: {
        type: Number,
        required: [true, 'Toplam fiyat zorunludur']
    }
}, { timestamps: true });

module.exports = mongoose.model('Ticket', ticketSchema);
