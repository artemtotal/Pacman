const express = require('express');

module.exports = (db) => {
    const router = express.Router();

    // Route für das Speichern eines neuen Spielstands
    router.post('/save', (req, res) => {
        const { playerName, score } = req.body;
        const sql = 'INSERT INTO games (playerName, score, date) VALUES (?, ?, NOW())';

        db.query(sql, [playerName, score], (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Fehler beim Speichern des Spielstands' });
            }
            res.status(201).json({ id: result.insertId, playerName, score });
        });
    });

    // Route für das Abrufen aller Spielstände
    router.get('/', (req, res) => {
        const sql = 'SELECT * FROM games';

        db.query(sql, (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Fehler beim Abrufen der Spielstände' });
            }
            res.status(200).json(results);
        });
    });

    return router;
};
