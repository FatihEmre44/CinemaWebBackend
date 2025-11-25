const mongoose = require('mongoose');
const chalk = require('chalk');

const connectDB = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGO_URI);
        console.log(chalk.green.bold.underline(`MongoDB Bağlantısı Başarılı: ${con.connection.host}`));
    } catch (error) {
        console.error(chalk.red.bold(`MongoDB Bağlantı Hatası: ${error.message}`));
        process.exit(1);
    }
};

module.exports = connectDB;
