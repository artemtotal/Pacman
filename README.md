
# Pacman Game

This is a Pacman game built with React and JavaScript, featuring a backend server for saving and retrieving high scores. The game is hosted on an AWS EC2 instance with the domain name `macht.top`.

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Backend Server](#backend-server)
- [Game Controls](#game-controls)
- [High Scores](#high-scores)
- [Customization](#customization)
- [Troubleshooting](#troubleshooting)

## Getting Started

To run this project locally, follow the instructions below.

### Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/) (v14 or later)
- [npm](https://www.npmjs.com/) (Node Package Manager)
- [MySQL](https://www.mysql.com/) database server

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/artemtotal/Pacman.git
   cd pacman-game
   ```

2. **Install the dependencies:**

   ```bash
   npm install
   ```

3. **Set up the MySQL Database:**

   - Create a database named `pacman`.
   - Run the following SQL commands to set up the `scores` table:

   ```sql
   CREATE TABLE scores (
       id INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       score INT NOT NULL
   );
   ```

   - Update the `server.js` file with your MySQL credentials.

### Running the Application

1. **Start the backend server:**

   In the root directory of your project, run:

   ```bash
   node server.js
   ```

   This will start the Express server on `http://localhost:5000`.

2. **Start the React frontend:**

   Open another terminal window in the root directory and run:

   ```bash
   npm start
   ```

   This will start the React development server on `http://localhost:3000`.

### Backend Server

The backend server (`server.js`) is built using Express and is responsible for handling high score storage and retrieval. It connects to a MySQL database and provides the following API endpoints:

- `POST /save-score`: Saves a player's score to the database.
- `GET /scores`: Retrieves all high scores, sorted in descending order.

### Game Controls

- **Arrow Keys**: Move Pacman in the respective direction.


### High Scores

The high scores are displayed on the right side of the game screen. They are fetched from the backend server each time the game loads or a new score is saved.

### Customization

You can customize various aspects of the game, including:

- **Game Board**: Modify the `GameBoard.js` file to change the grid and object behaviors.
- **Ghost AI**: Adjust ghost behaviors in the `Ghost.js` and `GhostMoves.js` files.
- **Sounds**: Change the audio files located in the `/sounds` directory and update their references in `Game.js`.

### Troubleshooting

- **Game not loading**: Ensure both the frontend (`npm start`) and backend (`node server.js`) servers are running.
- **Database errors**: Double-check your MySQL connection settings in `server.js` and ensure the database and `scores` table are correctly set up.

## Acknowledgments

This project is inspired by the classic Pacman game and serves as an educational example for building a full-stack application with React and Node.js.


