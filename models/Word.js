const mongoose = require('mongoose');
const wordSchema = new mongoose.Schema({
  word: { type: String, lowercase: true, unique: true, required: true },
  length: { type: Number, required: true }
});
module.exports = mongoose.model('Word', wordSchema);