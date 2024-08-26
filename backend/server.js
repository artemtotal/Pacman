const express = require('express'); // Express-Framework importieren
const mysql = require('mysql2'); // MySQL-Client importieren
const cors = require('cors'); // CORS für Cross-Origin-Anfragen importieren
require('dotenv').config(); // dotenv für Umgebungsvariablen

const gameRoutes = require('./routes/gameRoutes'); // Die Game-Routen importieren

const app = express(); // Eine Express-App instanziieren
const PORT = process.env.PORT || 5000; // Port festlegen

// Verbindung zur MySQL-Datenbank herstellen
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME // Datenbankname aus Umgebungsvariablen
});

db.connect((err) => {
    if (err) {
        console.error('Fehler bei der Verbindung zur Datenbank:', err);
        process.exit(1);
    }
    console.log('Mit MySQL-Datenbank verbunden');
});

// Middleware
app.use(cors()); // CORS aktivieren
app.use(express.json()); // JSON-Parsing für eingehende Requests

// Routen
app.use('/api/game', gameRoutes(db)); // Die Game-Routen unter /api/game einbinden

// Server starten
app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`);
});
