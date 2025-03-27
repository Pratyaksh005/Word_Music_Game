const mongoose = require('mongoose');
const gameSchema = new mongoose.Schema({
  currentWord: { type: String, required: true },
  usedWords: { type: [String], default: [] },
  score: { type: Number, default: 0 },
  streak: { type: Number, default: 0 },
  status: { type: String, enum: ['ongoing', 'completed'], default: 'ongoing' }
});
module.exports = mongoose.model('Game', gameSchema);