

# Pacman Game
# Our Game

Ein klassisches Pacman-Spiel, entwickelt mit modernen Web-Technologien wie JavaScript, HTML, React, CSS und MySQL.

## Inhaltsverzeichnis

- [Über das Projekt](#über-das-projekt)
- [Technologien](#technologien)
- [Installation](#installation)
- [Nutzung](#nutzung)
- [Features](#features)
- [Datenbank-Setup](#datenbank-setup)
- [Bekannte Probleme](#bekannte-probleme)
- [Mitwirken](#mitwirken)
- [Lizenz](#lizenz)
- [Kontakt](#kontakt)

## Über das Projekt

Dieses Pacman-Spiel ist eine moderne Umsetzung des klassischen Spiels mit einer Web-Frontend- und Datenbank-Backend-Integration. Es ist sowohl für Einzelspieler als auch für Multiplayer-Spielmodi geeignet und speichert Highscores in einer MySQL-Datenbank.

## Technologien

- **Frontend**: HTML, CSS, JavaScript, React
- **Backend**: Node.js, Express
- **Datenbank**: MySQL
- **Build-Tools**: Webpack, Babel

## Installation

### Voraussetzungen

Stelle sicher, dass Node.js und MySQL auf deinem System installiert sind.

### Lokale Installation

1. Repository klonen:
    ```bash
    git clone https://github.com/dein-username/pacman-game.git
    cd pacman-game
    ```

2. Abhängigkeiten installieren:
    ```bash
    npm install
    ```

3. MySQL-Datenbank konfigurieren (siehe [Datenbank-Setup](#datenbank-setup)).

4. Projekt starten:
    ```bash
    npm start
    ```

5. Öffne deinen Browser und gehe zu `http://localhost:3000`.

## Nutzung

- Verwende die Pfeiltasten auf deiner Tastatur, um Pacman zu steuern.
- Sammle alle Punkte auf dem Spielfeld, um das Level abzuschließen.
- Vermeide die Geister, oder esse eine Power-Pille, um sie zu jagen.

## Features

- **Responsive Design**: Spielbar auf verschiedenen Gerätetypen.
- **Multiplayer-Modus**: Spiele gegen Freunde oder andere Online-Spieler.
- **Highscore-Tabelle**: Speichert und zeigt die besten Spielergebnisse.

## Datenbank-Setup

1. Erstelle eine MySQL-Datenbank:
    ```sql
    CREATE DATABASE pacman_game;
    ```

2. Importiere das Datenbankschema:
    ```bash
    mysql -u yourusername -p pacman_game < database/schema.sql
    ```

3. Konfiguriere die Datenbankverbindung in `config/database.js`:
    ```javascript
    module.exports = {
        host: "localhost",
        user: "yourusername",
        password: "yourpassword",
        database: "pacman_game"
    };
    ```

## Bekannte Probleme

- **Geister-KI**: Die Bewegungsmuster der Geister sind manchmal unvorhersehbar.
- **Performance**: Bei älteren Geräten kann es zu Performance-Problemen kommen.

## Mitwirken

Beiträge sind willkommen! Bitte folge diesen Schritten:

1. Forke das Repository
2. Erstelle einen neuen Branch (`git checkout -b feature/DeinFeature`)
3. Committe deine Änderungen (`git commit -am 'Füge neues Feature hinzu'`)
4. Push den Branch (`git push origin feature/DeinFeature`)
5. Erstelle einen Pull Request

## Lizenz

Dieses Projekt steht unter der MIT-Lizenz. Weitere Informationen findest du in der [LICENSE-Datei](LICENSE).

## Kontakt

Erstellt von [Dein Name](https://github.com/dein-username) - kontaktiere mich gerne bei Fragen!

---

Diese Vorlage sollte dir als Ausgangspunkt dienen. Du kannst sie anpassen, um zusätzliche Informationen oder spezifische Details zu deinem Projekt hinzuzufügen.

