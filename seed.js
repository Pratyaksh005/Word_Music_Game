const mongoose = require('mongoose');
const Word = require('./models/Word');
const https = require('https');

mongoose.connect('mongodb://localhost:27017/antakshari')
  .then(() => {
    https.get('https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt', (response) => {
      let data = '';
      response.on('data', (chunk) => data += chunk);
      response.on('end', () => {
        const words = data.split('\n')
          .map(word => word.trim().toLowerCase())
          .filter(word => word.length > 0);
        
        const bulkOps = words.map(word => ({
          updateOne: {
            filter: { word },
            update: { $set: { word, length: word.length } },
            upsert: true
          }
        }));
        
        Word.bulkWrite(bulkOps, { ordered: false })
          .then(() => {
            console.log('Database seeded with ~370,000 words!');
            mongoose.disconnect();
          })
          .catch(err => {
            console.error('Error seeding database:', err);
            mongoose.disconnect();
          });
      });
    });
  })
  .catch(err => console.error('MongoDB connection error:', err));