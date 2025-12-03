const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const chalk = require("chalk");
const connectDB = require('./database/database');
const loginrouter = require("./routers/loginrouter");
const movierouter = require("./routers/movierouters");
const hallrouter = require("./routers/hallrouters");
const sessionrouter = require("./routers/sessionrouter");
const ticketrouter=require("./routers/ticketrouter");

dotenv.config(); // .env dosyasındaki verileri okur
connectDB();
const app = express();
const PORT = process.env.PORT || 5000;

// 2. Middleware (Ara Yazılımlar)
app.use(express.json()); // Gelen JSON verilerini okumayı sağlar (req.body)
app.use(cors()); // Frontend'den gelen isteklere izin verir
app.use(helmet());
app.use(morgan('dev'));


app.get('/', (req, res) => {
    res.json({
        message: 'Sinema Sistemi Backend Çalışıyor!',
        status: 'OK',
        time: new Date()
    });
});

// 4. Rotalar (İleride burayı dolduracağız)
app.use("/api", loginrouter);
app.use("/api", movierouter);
app.use("/api", hallrouter);
app.use("/api", sessionrouter);
app.use("/api", ticketrouter);




// 5. Sunucuyu Başlatma
app.listen(PORT, () => {
    console.log(chalk.bgBlue("Sistem Çalışıyor"));
});