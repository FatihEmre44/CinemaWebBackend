const Ticket = require("../models/ticket");
const Session = require("../models/session");

exports.buyticket = async (req, res) => {
    try {
        const { sessionId, userId, seats
        } = req.body;
        const session = await Session.findById(sessionId);
        if (!session) {
            return res.status(404).send({ message: "Seans bulunamadı" });
        }
        const conflict = seats.some(seat => session.soldSeats.includes(seat));
        if (conflict) {
            return res.status(404).send({ message: "Secilen koltuklar müsait değil" });
        }
        const totalPrice = seats.length * session.price;
        const ticket = await Ticket.create({
            session: sessionId,
            user: userId,
            seats,
            totalPrice
        });
        session.soldSeats.push(...seats);
        await session.save();
        return res.status(201).send({
            success: true,
            message: "Bilet başarıyla alındı",
            ticket
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: "Bilet alma sırasında hata oluştu"
        });
    }
}
exports.refundTicket = async (req, res) => {
    try {
        const { ticketid } = req.body;
        const ticket = await Ticket.findById(ticketid);
        if (!ticket) {
            return res.status(404).send({ message: "Bilet bulunamadı" });
        }
        const { session: sessionId, seats } = ticket;
        const session = await Session.findById(sessionId);
        if (!session) {
            return res.status(404).send({
                success: false,
                message: "Seans bulunamadı."
            });
        }
        session.soldSeats = session.soldSeats.filter(
            seat => !seats.includes(seat)
        );
        await session.save();
        await ticket.deleteOne();
        return res.status(200).send({
            success: true,
            message: "Bilet iadesi başarıyla yapıldı.",
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).send({
            success: false,
            message: "Bilet iade sırasında hata oluştu"
        });
    }
}