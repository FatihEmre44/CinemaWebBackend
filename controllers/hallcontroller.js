const Hall = require('../models/hall');

exports.createHall = async (req, res) => {
    try {
        const hall = new Hall(req.body);
        await hall.save();
        res.status(201).json({ success: true, data: hall });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.getAllHalls = async (req, res) => {
    try {
        const halls = await Hall.find();
        res.status(200).json({ success: true, data: halls });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getHallById = async (req, res) => {
    try {
        const hall = await Hall.findById(req.params.id);
        if (!hall) {
            return res.status(404).json({ success: false, error: 'Hall not found' });
        }
        res.status(200).json({ success: true, data: hall });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.updateHall = async (req, res) => {
    try {
        const hall = await Hall.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!hall) {
            return res.status(404).json({ success: false, error: 'Hall not found' });
        }
        res.status(200).json({ success: true, data: hall });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.deleteHall = async (req, res) => {
    try {
        const hall = await Hall.findByIdAndDelete(req.params.id);
        if (!hall) {
            return res.status(404).json({ success: false, error: 'Hall not found' });
        }
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
