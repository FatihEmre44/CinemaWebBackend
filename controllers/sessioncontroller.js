const Movie = require("../models/movies"); 
const Session = require("../models/Session"); 

const createSession = async (req, res) => {
    try {
        const { movie, hall, startTime, price } = req.body;

        // ADIM 1: Gönderilen ID ile filmi veritabanından bul
        const selectedMovie = await Movie.findById(movie);
        if (!selectedMovie) {
            return res.status(404).send({ message: "Seçilen film bulunamadı." });
        }
        const movietime=selectedMovie.duration;
        const finish=movietime+startTime;
        
    }
    catch(error){

    };


}