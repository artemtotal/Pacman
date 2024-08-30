import React, { useState, useEffect, useRef } from 'react';
import GameBoard from './GameBoard';
import Pacman from './Pacman';
import Ghost from './Ghost';
import { LEVEL, OBJECT_TYPE } from '../setup/setup';
import { randomMovement } from './GhostMoves';

// Neue Zeile: Audio-Dateien importieren
const deathSound = new Audio('/sounds/Blyat-new.wav'); // Todessound vom Artem
const eat_ghost = new Audio('/sounds/Nam_nam_Chris_new.wav'); // Sound für das Essen eines Geistes von Christopher
const game_start = new Audio('/sounds/LetsdidIt_Marcel.wav'); // Startsound von Marcel
const munch = new Audio('/sounds/munch.wav'); // Kauen-Sound
const pill = new Audio('/sounds/Betablocker.wav'); // Pillen-Sound von Hamsa

const Game = () => {
  const [gameBoard, setGameBoard] = useState(null); // Zustand für das Spielfeld
  const [pacman, setPacman] = useState(null); // Zustand für Pacman
  const [ghosts, setGhosts] = useState([]); // Zustand für die Geister
  const [score, setScore] = useState(0); // Zustand für die Punktzahl
  const [gameWin, setGameWin] = useState(false); // Zustand für den Spielgewinn
  const [powerPillActive, setPowerPillActive] = useState(false); // Zustand für die aktive Power-Pille
  const [isGameOver, setIsGameOver] = useState(false); // Zustand für Spielende
  const [scores, setScores] = useState([]); // Zustand für die Highscores
  const gameBoardRef = useRef(); // Referenz für das Spielfeld-Element
  const gameIntervalRef = useRef(); // Referenz für das Spiel-Intervall

  useEffect(() => {
    // Initialisiert das Spielfeld und die Charaktere beim ersten Laden der Komponente
    const board = GameBoard.createGameBoard(document.querySelector('#game'), LEVEL);
    setGameBoard(board);
    const pacmanInstance = new Pacman(2, 287);
    setPacman(pacmanInstance);
    const ghostsArray = [
      new Ghost(5, 188, randomMovement, OBJECT_TYPE.BLINKY),
      new Ghost(4, 209, randomMovement, OBJECT_TYPE.PINKY),
      new Ghost(3, 230, randomMovement, OBJECT_TYPE.INKY),
      new Ghost(2, 251, randomMovement, OBJECT_TYPE.CLYDE),
    ];
    setGhosts(ghostsArray);
  }, []);

  useEffect(() => {
    // Fügt einen Keydown-Event-Listener hinzu, wenn Pacman initialisiert ist
    if (pacman) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown); // Entfernt den Listener beim Demontieren
    }
  }, [pacman]);

  useEffect(() => {
    // Holt die Highscores, wenn die Komponente geladen wird
    fetchScores();
  }, []);

  // Handhabung der Tasteneingaben für Pacman
  const handleKeyDown = (e) => {
    if (pacman) {
      pacman.handleKeyInput(e, gameBoard.objectExist.bind(gameBoard));
    }
  };

  // Spielt den Todessound ab
  const PlaydeathSound = () => {
    deathSound.play();
  };

  // Spielt den Sound für das Essen eines Geistes ab
  const Playeat_ghost = () => {
    eat_ghost.play();
  };

  // Spielt den Startsound ab
  const Playgame_start = () => {
    game_start.play();
  };

  // Spielt den Kauen-Sound ab
  const Playmunch = () => {
    munch.play();
  };

  // Spielt den Pillen-Sound ab
  const Playpill = () => {
    pill.play();
  };

  // Startet das Spiel, setzt alle Zustände zurück und startet die Spielschleife
  const startGame = () => {
    setScore(0);
    setGameWin(false);
    setIsGameOver(false);
    setPowerPillActive(false);

    gameBoard.createGrid(LEVEL);
    pacman.reset();
    ghosts.forEach(ghost => ghost.reset());
    
    startGameLoop();
    Playgame_start();
  };

  // Startet die Hauptspielschleife in einem Intervall
  const startGameLoop = () => {
    gameIntervalRef.current = setInterval(() => {
      gameLoop();
    }, 80);
  };

  // Die Hauptspielschleife
  const gameLoop = () => {
    // 1. Pacman bewegen
    gameBoard.moveCharacter(pacman);

    // 2. Geister bewegen
    ghosts.forEach(ghost => gameBoard.moveCharacter(ghost));

    // 3. Überprüfung der Kollisionen zwischen Pacman und Geistern
    checkCollision();

    // 4. Überprüfung, ob Pacman einen Punkt (DOT) gegessen hat
    if (gameBoard.objectExist(pacman.pos, OBJECT_TYPE.DOT)) {
      gameBoard.removeObject(pacman.pos, [OBJECT_TYPE.DOT]);
      gameBoard.dotCount--;
      Playmunch();
      setScore(prev => prev + 10);
    }

    // 5. Überprüfung, ob Pacman eine Pille (PILL) gegessen hat
    if (gameBoard.objectExist(pacman.pos, OBJECT_TYPE.PILL)) {
      gameBoard.removeObject(pacman.pos, [OBJECT_TYPE.PILL]);
      setPowerPillActive(true);
      pacman.powerPill = true;
      Playpill();
      setScore(prev => prev + 50);

      // Alle Geister in den Schreckensmodus versetzen
      ghosts.forEach(ghost => ghost.isScared = true);

      setTimeout(() => {
        // Power-Pill-Effekt beenden
        setPowerPillActive(false);
        pacman.powerPill = false;
        ghosts.forEach(ghost => (ghost.isScared = false)); // Alle Geister wieder gefährlich machen
      }, 10000);
    }

    // 6. Überprüfung, ob alle Punkte (DOTs) gegessen wurden
    if (gameBoard.dotCount === 0) {
      setGameWin(true);
      gameOver();
    }
  };

  // Überprüft Kollisionen zwischen Pacman und den Geistern
  const checkCollision = () => {
    const collidedGhost = ghosts.find(ghost => pacman.pos === ghost.pos);

    if (collidedGhost) {
      if (pacman.powerPill) {
        // Geist essen und von der Karte entfernen
        gameBoard.removeObject(collidedGhost.pos, [
          OBJECT_TYPE.GHOST,
          OBJECT_TYPE.SCARED,
          collidedGhost.name,
        ]);
        collidedGhost.reset();
        Playeat_ghost();
        setScore(prev => prev + 100);
      } else {
        gameOver(); // Spiel beenden, wenn keine Power-Pill aktiv ist
      }
    }
  };

  // Beendet das Spiel
  const gameOver = () => {
    setIsGameOver(true);
    setGameWin(false);
    PlaydeathSound();
    clearInterval(gameIntervalRef.current); // Stoppt das Spiel
    document.removeEventListener('keydown', handleKeyDown); // Event-Listener entfernen
    gameBoard.showGameStatus(false); // Zeigt "Game Over" an
    saveScore('Player1', score); // Speichern des Punktestandes bei Spielende
  };

  // Speichert den Punktestand auf dem Server
  const saveScore = (name, score) => {
    fetch('http://localhost:5000/save-score', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, score }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Score gespeichert:', data);
        fetchScores(); // Aktualisieren Sie die Punktestände nach dem Speichern
      })
      .catch(error => console.error('Fehler:', error));
  };

  // Holt die gespeicherten Punktestände vom Server
  const fetchScores = () => {
    fetch('http://localhost:5000/scores')
      .then(response => response.json())
      .then(data => setScores(data))
      .catch(error => console.error('Fehler:', error));
  };

  return (
    <div id="wrapper">
      <div id="game" ref={gameBoardRef}></div>
      <div id="score">Score: {score}</div>
      {isGameOver && <div>Game Over</div>}
      {gameWin && <div>You Win!</div>}
      <button onClick={startGame}>Start Game</button>
  
      {/* High Scores Titel */}
      <h2 className="h2">High Scores</h2>
  
      {/* High Scores Liste */}
      <div className="h3">
        <ul>
          {scores.map((s, index) => (
            <li key={index}>
              {s.name}: {s.score}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Game;
