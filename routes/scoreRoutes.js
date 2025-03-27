const express = require('express');
const router = express.Router();
const Score = require('../models/Score');

// GET leaderboard (existing)
router.get('/', async (req, res) => {
  const scores = await Score.find().sort({ score: -1 }).limit(10);
  res.render('leaderboard', { scores });
});

// NEW: POST route to save scores with names
router.post('/', async (req, res) => {
  const { playerName, gameId, score } = req.body;
  try {
    const newScore = new Score({ playerName, gameId, score: parseInt(score) });
    await newScore.save();
    res.redirect('/scores');
  } catch (err) {
    res.status(500).send('Error saving score');
  }
});

module.exports = router;