const Movie = require("../models/movies");

const addmovie = async (req, res) => {
    try {
        const {
            title,
            description,
            duration,
            genre,
            director,
            cast,
            backdropImage,
            rating,
            releaseDate,
            status
        } = req.body;

        // Zorunlu alanların kontrolü 
        if (!title || !description || !duration || !director || !releaseDate) {
            return res.status(500).send({
                success: false,
                message: "Lütfen zorunlu alanları (Ad, Özet, Süre, Yönetmen, Vizyon Tarihi) doldurun."
            });
        }
        const newMovie = new Movie({
            title,
            description,
            duration,
            genre,         // Array olarak gelecek ["Aksiyon", "Dram"]
            director,
            cast,          // Array olarak gelecek ["Oyuncu 1", "Oyuncu 2"]
            backdropImage,
            rating,
            releaseDate,
            status         // 'vizyonda', 'gelecek' veya 'arsiv'
        });
        await newMovie.save();

        res.status(201).send({
            success: true,
            message: 'Film başarıyla oluşturuldu',
            data: newMovie
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Film oluşturulurken hata çıktı',
            error: error.message
        });
    }
}

module.exports = { addmovie };