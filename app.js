const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/antakshari');

// Routes
// Existing routes
app.use('/games', require('./routes/gameRoutes'));
app.use('/scores', require('./routes/scoreRoutes')); // This now includes the POST route
app.listen(3000, () => console.log('Server running on port 3000'));