const Movie = require("../models/movies");
const Session = require("../models/session");

exports.createSession = async (req, res) => {
    try {
        const { movie, hall, startTime, price } = req.body;

        // Gönderilen ID ile filmi veritabanından bul
        const selectedMovie = await Movie.findById(movie);
        if (!selectedMovie) {
            return res.status(404).send({ message: "Seçilen film bulunamadı." });
        }

        const movietime = selectedMovie.duration;
        const startDateTime = new Date(startTime);
        // Bitiş süresini hesapla (dakika * 60 * 1000 = milisaniye)
        const endDateTime = new Date(startDateTime.getTime() + (movietime * 60 * 1000));

        // Çakışma Kontrolü
        const conflictSession = await Session.findOne({
            hall: hall,
            startTime: { $lt: endDateTime },
            endTime: { $gt: startDateTime }
        });

        if (conflictSession) {
            return res.status(400).send({
                success: false,
                message: "Aynı saatte bu salonda başka bir film oynuyor."
            });
        }

        const newSession = await Session.create({
            movie,
            hall,
            startTime: startDateTime,
            endTime: endDateTime,
            price
        });

        return res.status(201).send({
            success: true,
            message: "Seans başarıyla oluşturuldu.",
            session: newSession
        });

    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: "Seans oluşturma sırasında bir hata oluştu."
        });
    }
};

exports.updateSession = async (req, res) => {
    try {
        const { id } = req.params;
        const { movie, hall, startTime, price } = req.body;

        // Güncellenecek seansı bul
        const session = await Session.findById(id);
        if (!session) {
            return res.status(404).send({ message: "Seans bulunamadı." });
        }

        // Film değişiyorsa kontrol et
        let selectedMovie = null;
        if (movie) {
            selectedMovie = await Movie.findById(movie);
            if (!selectedMovie) {
                return res.status(404).send({ message: "Seçilen film bulunamadı." });
            }
            session.movie = movie;
        } else {
            // Film değişmediyse mevcut filmi veritabanından çek (süre hesabı için)
            selectedMovie = await Movie.findById(session.movie);
        }

        // StartTime veya movie değiştiyse END TIME'ı yeniden hesapla
        const startDateTime = startTime ? new Date(startTime) : session.startTime;
        const movieDuration = selectedMovie.duration;

        const endDateTime = new Date(
            startDateTime.getTime() + movieDuration * 60 * 1000
        );

        // Bu değerler session'a işlenecek
        session.startTime = startDateTime;
        session.endTime = endDateTime;

        // Hall değişiyorsa güncelle
        if (hall) session.hall = hall;

        // Çakışma kontrolü (Kendisi hariç)
        const conflictSession = await Session.findOne({
            hall: session.hall,
            startTime: { $lt: endDateTime },
            endTime: { $gt: startDateTime },
            _id: { $ne: id }
        });

        if (conflictSession) {
            return res.status(400).send({
                success: false,
                message: "Aynı saatte başka bir film oynuyor."
            });
        }

        // Price değişiyorsa güncelle
        if (price) session.price = price;

        // Kaydet
        await session.save();

        return res.status(200).send({
            success: true,
            message: "Seans başarıyla güncellendi.",
            session
        });

    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: "Seans güncelleme sırasında bir hata oluştu."
        });
    }
};
exports.deletesession = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedsession = await Session.findByIdAndDelete(id);

        if (!deletedsession) {
            return res.status(404).send({
                success: false,
                message: "Silinecek seans bulunamadı."
            });
        }

        res.status(200).send({
            success: true,
            message: "Seans başarıyla silindi",
            data: deletedsession // DÜZELTİLDİ: deletedMovie -> deletedsession
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Seans silinirken hata oluştu",
            error: error.message
        });
    }
};

