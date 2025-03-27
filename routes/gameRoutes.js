const express = require('express');
const router = express.Router();
const Word = require('../models/Word');
const Game = require('../models/Game');
const Score = require('../models/Score');

// Start new game
router.get('/new', async (req, res) => {
  const randomWord = await Word.aggregate([{ $sample: { size: 1 } }]);
  const game = new Game({ 
    currentWord: randomWord[0].word,
    usedWords: [randomWord[0].word]
  });
  await game.save();
  res.redirect(`/games/${game._id}`);
});

// Display game
router.get('/:id', async (req, res) => {
  const game = await Game.findById(req.params.id);
  res.render('game', { game });
});

// Submit word
router.post('/:id/submit', async (req, res) => {
  const { id } = req.params;
  const submittedWord = req.body.word.trim().toLowerCase();
  const game = await Game.findById(id);

  if (game.status !== 'ongoing') return res.status(400).send('Game completed');

  const lastLetter = game.currentWord.slice(-1);
  if (submittedWord[0] !== lastLetter) {
    game.status = 'completed';
    await game.save();
    return res.render('gameover', { message: 'Incorrect starting letter!', game });
  }

  const wordExists = await Word.exists({ word: submittedWord });
  if (!wordExists) {
    game.status = 'completed';
    await game.save();
    return res.render('gameover', { message: 'Word not valid!', game });
  }

  if (game.usedWords.includes(submittedWord)) {
    game.status = 'completed';
    await game.save();
    return res.render('gameover', { message: 'Word already used!', game });
  }

  game.currentWord = submittedWord;
  game.usedWords.push(submittedWord);
  game.score += submittedWord.length;
  game.streak += 1;
  if (game.streak % 3 === 0) game.score += 10;
  await game.save();

// After game ends, just render the game over page
  if (game.status === 'completed') {
  return res.render('gameover', { message: '...', game }); // Keep this
  }

  res.redirect(`/games/${id}`);
});

module.exports = router;