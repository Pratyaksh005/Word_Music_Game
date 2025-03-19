# Word Antakshari Game

## Project Overview
This is a **web-based Word Antakshari game** built using **Node.js, Express.js, and MongoDB**. The game allows players to input words starting with the last letter of the previous word, ensuring they exist in a predefined word database.

## Features
- Random word starts the game.
- Players submit words that must start with the last letter of the previous word.
- Score tracking based on word length and streaks.
- Leaderboard to display top players.
- User authentication with JWT (Register/Login system).
- Multiplayer mode (optional feature).
- Difficulty levels (Easy, Medium, Hard).

##  Project Structure
word-antakshari-game/
│── public/                # Frontend files (HTML, CSS, JS)
│   ├── css/
│   │   ├── styles.css     # Game styling
│   ├── js/
│   │   ├── script.js      # Frontend logic
│   ├── index.html         # Main game UI
│
│── models/
│   ├── word.js            # MongoDB model for words
│   ├── user.js            # MongoDB model for users
│
│── routes/
│   ├── gameRoutes.js      # API routes for game logic
│   ├── authRoutes.js      # API routes for authentication
│
│── scripts/
│   ├── importWords.js     # Script to import words from word list
│
│── server.js              # Main backend server
│── package.json           # Node.js dependencies & scripts
│── .env                   # Environment variables
│── README.md              # Documentation

## Setup Instructions

1. Clone the Repository

sh
git clone https://github.com/your-repo/word-antakshari-game.git
cd word-antakshari-game


2. Install Dependencies
sh
npm install

3. Configure `.env` File
Create a `.env` file in the root directory and add:

MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/word-antakshari
JWT_SECRET=your_secret_key
PORT=5000

Replace `<username>` and `<password>` with your MongoDB credentials.

4. Import Words into MongoDB
Run the following script to import the word list into your MongoDB database:
sh
node scripts/importWords.js

5. Start the Server
sh
npm start

To run in **development mode** with automatic restarts:
sh
npm run dev



## How to Play
1. Open your browser and go to: `http://localhost:5000/`
2. A **random word** will appear to start the game.
3. Enter a **valid word** that starts with the last letter of the given word.
4. The game will verify if the word exists in the database and continue.
5. Scores are based on **word length and streaks**.
6. Check the **leaderboard** for top players.

## API Endpoints
| Method | Endpoint        | Description |
|--------|---------------|-------------|
| GET    | `/game/start` | Start game with a random word |
| POST   | `/game/submit` | Submit a word (validates it) |
| POST   | `/auth/register` | Register a new user |
| POST   | `/auth/login` | Login and get JWT token |


## Future Enhancements
- Real-time multiplayer mode using **Socket.io**.
- Timed rounds for faster gameplay.
- More difficulty-based challenges.

## Credits
Developed by Pratyaksh Bhandari
Sap ID: 590018654


## GITHUB LINK
Repo link---> https://github.com/Pratyaksh005/Word_Music_Game
