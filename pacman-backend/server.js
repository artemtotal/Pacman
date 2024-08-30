const express = require('express');
const mysql = require('mysql2');
const cors = require('cors'); // Importieren Sie das CORS-Modul

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware zum Parsen von JSON-Daten
app.use(express.json());

// CORS aktivieren, um Anfragen von anderen Domains zu erlauben
app.use(cors());

// MySQL-Verbindung einrichten
const db = mysql.createConnection({
  host: 'localhost',
  user: 'pacman_user',
  password: 'securepassword',
  database: 'pacman',
});

// Verbindung zur MySQL-Datenbank herstellen
db.connect(err => {
  if (err) {
    console.error('Verbindung zur Datenbank fehlgeschlagen:', err.stack);
    return;
  }
  console.log('Mit der MySQL-Datenbank verbunden.');
});

// API-Endpunkt zum Speichern eines Scores
app.post('/save-score', (req, res) => {
  // Score-Details aus dem Anfragekörper extrahieren
  const { name, score } = req.body;
  const query = 'INSERT INTO scores (name, score) VALUES (?, ?)';
  
  // SQL-Abfrage zur Speicherung des Scores in der Datenbank ausführen
  db.query(query, [name, score], (err, result) => {
    if (err) {
      console.error('Fehler beim Speichern des Scores:', err);
      res.status(500).send('Fehler beim Speichern des Scores.');
    } else {
      res.status(201).send({ message: 'Score gespeichert!' });
    }
  });
});

// API-Endpunkt zum Abrufen aller Scores
app.get('/scores', (req, res) => {
  const query = 'SELECT * FROM scores ORDER BY score DESC';
  
  // SQL-Abfrage zum Abrufen der Scores aus der Datenbank ausführen
  db.query(query, (err, results) => {
    if (err) {
      console.error('Fehler beim Abrufen der Scores:', err);
      res.status(500).send('Fehler beim Abrufen der Scores.');
    } else {
      res.json(results);
    }
  });
});

// Den Server starten
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
```
