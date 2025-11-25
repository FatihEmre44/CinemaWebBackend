const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Kullanıcı adı zorunludur'],
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, 'E-posta adresi zorunludur'],
        unique: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Geçerli bir e-posta adresi giriniz']
    },
    password: {
        type: String,
        required: [true, 'Şifre zorunludur'],
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
