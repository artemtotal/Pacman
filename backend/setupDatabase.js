const mysql = require('mysql2');
require('dotenv').config();

// Verbindung zur MySQL-Datenbank herstellen
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
});

// Datenbank erstellen und verwenden
db.connect((err) => {
    if (err) {
        console.error('Fehler bei der Verbindung zur MySQL-Datenbank:', err);
        process.exit(1);
    }
    console.log('Mit MySQL-Datenbank verbunden');

    // Datenbank erstellen
    db.query('CREATE DATABASE IF NOT EXISTS pacman', (err) => {
        if (err) {
            console.error('Fehler beim Erstellen der Datenbank:', err);
            process.exit(1);
        }
        console.log('Datenbank "pacman" erstellt oder existiert bereits');

        // Zu der neuen Datenbank wechseln
        db.changeUser({database: 'pacman'}, (err) => {
            if (err) {
                console.error('Fehler beim Wechseln zur Datenbank:', err);
                process.exit(1);
            }

            // Tabelle erstellen
            const createTableQuery = `
                CREATE TABLE IF NOT EXISTS games (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    playerName VARCHAR(255) NOT NULL,
                    score INT NOT NULL,
                    date DATETIME DEFAULT CURRENT_TIMESTAMP
                );
            `;

            db.query(createTableQuery, (err) => {
                if (err) {
                    console.error('Fehler beim Erstellen der Tabelle:', err);
                    process.exit(1);
                }
                console.log('Tabelle "games" erstellt oder existiert bereits');
                db.end(); // Verbindung schließen
            });
        });
    });
});
