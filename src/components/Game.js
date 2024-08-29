import React, { useState, useEffect, useRef } from 'react';
import GameBoard from './GameBoard';
import Pacman from './Pacman';
import Ghost from './Ghost';
import { LEVEL, OBJECT_TYPE } from '../setup/setup';
import { randomMovement } from './GhostMoves';

// Neue Zeile: Audio-Datei importieren
const deathSound = new Audio('/sounds/Blyat-new.wav'); // blyat vom Artem
const eat_ghost = new Audio('/sounds/Nam_nam_Chris_new.wav'); //  Nam nam vom Christopher
const game_start = new Audio('/sounds/LetsdidIt_Marcel.wav'); // Marcel let did it
const munch = new Audio('/sounds/munch.wav'); // lassen wir so
const pill = new Audio('/sounds/Betablocker.wav'); //betablocker Hamsa




const Game = () => {
  const [gameBoard, setGameBoard] = useState(null);
  const [pacman, setPacman] = useState(null);
  const [ghosts, setGhosts] = useState([]);
  const [score, setScore] = useState(0);
  const [gameWin, setGameWin] = useState(false);
  const [powerPillActive, setPowerPillActive] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [scores, setScores] = useState([]);
  const gameBoardRef = useRef();
  const gameIntervalRef = useRef();

  useEffect(() => {
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
    fetchScores(); // Holen Sie sich die Punktestände, wenn die Komponente geladen wird
  }, []);

  const handleKeyDown = (e) => {
    if (pacman) {
      pacman.handleKeyInput(e, gameBoard.objectExist.bind(gameBoard));
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (pacman) {
        pacman.handleKeyInput(e, gameBoard.objectExist.bind(gameBoard));
      }
    };
  
    document.addEventListener('keydown', handleKeyDown);
  
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [pacman, gameBoard]);
  

  const PlaydeathSound = () => {
    deathSound.play();
  };
  const Playeat_ghost = () => {
    eat_ghost.play();
  };
  
  const Playgame_start = () => {
    game_start.play();
  };
  const Playmunch = () => {
    munch.play();
  };
  const Playpill = () => {
    pill.play();
  };

  const startGame = () => {
    // document.removeEventListener('keydown', handleKeyDown);
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

  const startGameLoop = () => {
    gameIntervalRef.current = setInterval(() => {
      gameLoop();
    }, 80);
  };

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
        console.log('Score saved:', data);
        fetchScores(); // Aktualisieren Sie die Punktestände nach dem Speichern
      })
      .catch(error => console.error('Error:', error));
  };
  const gameOver = () => {
    setIsGameOver(true);
    setGameWin(false);
    PlaydeathSound();
    clearInterval(gameIntervalRef.current); // Stoppt das Spiel
    saveScore('Player1', score); // Speichern des Punktestandes bei Spielende
    document.removeEventListener('keydown', handleKeyDown); // Event-Listener entfernen
    gameBoard.showGameStatus(false); // Zeigt "Game Over" an
    
  };



  const fetchScores = () => {
    fetch('http://localhost:5000/scores')
      .then(response => response.json())
      .then(data => setScores(data))
      .catch(error => console.error('Error:', error));
  };

  return (
    <div id="wrapper">
      <div id="score">Score: {score}</div>
      <button onClick={startGame} style={{ position: 'absolute', top: '70px', left: '10px' }}>Start Game</button>
  
      <div id="game" ref={gameBoardRef} style={{ gridTemplateColumns: 'repeat(20, 20px)' }}>
        {isGameOver && <div>Game Over</div>}
        {gameWin && <div>You Win!</div>}
      </div>
      
      <h2>
        High Scores
        <ul>
          {scores.map((s, index) => (
            <li key={index}>
              {s.name}: {s.score}
            </li>
          ))}
        </ul>
      </h2>
    </div>
  );
  
  
  
};

export default Game;
