const express = require('express');
const mysql = require('mysql2');
const cors = require('cors'); // Importieren Sie das CORS-Modul

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());

// CORS aktivieren
app.use(cors());

// MySQL connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'pacman_user',
  password: 'securepassword',
  database: 'pacman',
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL database.');
});

// API endpoint to save a score
app.post('/save-score', (req, res) => {
  const { name, score } = req.body;
  const query = 'INSERT INTO scores (name, score) VALUES (?, ?)';
  db.query(query, [name, score], (err, result) => {
    if (err) {
      console.error('Failed to save score:', err);
      res.status(500).send('Error saving score.');
    } else {
      res.status(201).send({ message: 'Score saved!' });
    }
  });
});

// API endpoint to get all scores
app.get('/scores', (req, res) => {
  const query = 'SELECT * FROM scores ORDER BY score DESC';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Failed to fetch scores:', err);
      res.status(500).send('Error fetching scores.');
    } else {
      res.json(results);
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
