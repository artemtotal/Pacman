const mongoose = require('mongoose');

// Mongoose-Schema für einen Spielstand definieren
const gameSchema = new mongoose.Schema({
    playerName: { type: String, required: true },
    score: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Game', gameSchema);
