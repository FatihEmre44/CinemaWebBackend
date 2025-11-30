const Movie = require("../models/movies");

const addmovie = async (req, res) => {
    try {
        const {
            title, description, duration, genre, director, cast,
            backdropImage, rating, releaseDate, status
        } = req.body;

        // Zorunlu alanların kontrolü 
        if (!title || !description || !duration || !director || !releaseDate) {
            return res.status(400).send({ // 500 yerine 400 (Bad Request) daha doğrudur
                success: false,
                message: "Lütfen zorunlu alanları (Ad, Özet, Süre, Yönetmen, Vizyon Tarihi) doldurun."
            });
        }
        const newMovie = new Movie({
            title, description, duration, genre, director, cast,
            backdropImage, rating, releaseDate, status
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
const updateMovie = async (req, res) => {
    try {
        // ID'yi URL'den alıyoruz (örn: /api/movies/65a1b2c3...)
        const { id } = req.params;

        // Güncellenecek veriyi body'den alıyoruz
        const updateData = req.body;

        // findByIdAndUpdate(id, data, options)
        // { new: true } -> Güncellenmiş halini döndürmesi için gereklidir.
        const updatedMovie = await Movie.findByIdAndUpdate(id, updateData, { new: true });

        // Eğer bu ID'ye sahip film yoksa
        if (!updatedMovie) {
            return res.status(404).send({
                success: false,
                message: "Güncellenecek film bulunamadı."
            });
        }

        res.status(200).send({
            success: true,
            message: "Film başarıyla güncellendi",
            data: updatedMovie
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Film güncellenirken hata oluştu",
            error: error.message
        });
    }
}
const deleteMovie = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedMovie = await Movie.findByIdAndDelete(id);

        if (!deletedMovie) {
            return res.status(404).send({
                success: false,
                message: "Silinecek film bulunamadı."
            });
        }

        res.status(200).send({
            success: true,
            message: "Film başarıyla silindi",
            data: deletedMovie // İsteğe bağlı: silinen veriyi geri dönebilirsin
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Film silinirken hata oluştu",
            error: error.message
        });
    }
}

module.exports = {
    addmovie,
    updateMovie,
    deleteMovie
};