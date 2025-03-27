const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  playerName: { type: String, required: true },
  gameId: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true },
  score: { type: Number, required: true }
});

module.exports = mongoose.model('Score', scoreSchema);