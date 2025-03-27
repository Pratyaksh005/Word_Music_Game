const Game = require('../models/Game');
const Song = require('../models/Word');

exports.newGame = async (req, res) => {
  try {
    const randomSong = await Song.aggregate([{ $sample: { size: 1 } }]);
    const game = new Game({
      players: req.body.players,
      currentSong: randomSong[0].title,
      usedSongs: [randomSong[0].title],
      scores: req.body.players.reduce((acc, player) => ({ ...acc, [player]: 0 }), {}),
    });
    await game.save();
    res.status(201).json(game);
  } catch (err) {
    res.status(500).json({ error: 'Could not create game' });
  }
};

exports.submitSong = async (req, res) => {
  const { gameId } = req.params;
  const { songTitle, playerId } = req.body;

  try {
    const game = await Game.findById(gameId);
    if (game.status !== 'ongoing') return res.status(400).json({ error: 'Game completed' });

    const lastLetter = game.currentSong.slice(-1).toLowerCase();
    if (songTitle[0].toLowerCase() !== lastLetter) {
      return res.status(400).json({ error: 'Invalid starting letter' });
    }

    const validSong = await Song.findOne({ title: songTitle });
    if (!validSong) return res.status(400).json({ error: 'Song not valid' });

    if (game.usedSongs.includes(songTitle)) {
      return res.status(400).json({ error: 'Song already used' });
    }

    game.currentSong = songTitle;
    game.usedSongs.push(songTitle);
    game.scores[playerId] = (game.scores[playerId] || 0) + calculateScore(songTitle);
    await game.save();

    res.json(game);
  } catch (err) {
    res.status(500).json({ error: 'Submission failed' });
  }
};

const calculateScore = (songTitle) => {
  // Add scoring logic based on length, category, etc.
  return songTitle.length * 10;
};