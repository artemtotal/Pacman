import React, { useState, useEffect, useRef } from 'react';
import GameBoard from './GameBoard';
import Pacman from './Pacman';
import Ghost from './Ghost';
import { LEVEL, OBJECT_TYPE } from '../setup/setup';
import { randomMovement } from './GhostMoves';

const Game = () => {
  const [gameBoard, setGameBoard] = useState(null);
  const [pacman, setPacman] = useState(null);
  const [ghosts, setGhosts] = useState([]);
  const [score, setScore] = useState(0);
  const [gameWin, setGameWin] = useState(false);
  const [powerPillActive, setPowerPillActive] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const gameBoardRef = useRef();

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
    if (pacman) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [pacman]);

  const handleKeyDown = (e) => {
    if (pacman) {
      pacman.handleKeyInput(e, gameBoard.objectExist.bind(gameBoard));
    }
  };

  const startGame = () => {
    setScore(0);
    setGameWin(false);
    setIsGameOver(false);
    setPowerPillActive(false);

    gameBoard.createGrid(LEVEL);
    pacman.reset();
    ghosts.forEach(ghost => ghost.reset());

    startGameLoop();
  };

  const startGameLoop = () => {
    const gameInterval = setInterval(() => {
      if (!isGameOver) {
        gameLoop();
      } else {
        clearInterval(gameInterval);
      }
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
      setScore(prev => prev + 10);
    }
    
    // 5. Überprüfung, ob Pacman eine Pille (PILL) gegessen hat
    if (gameBoard.objectExist(pacman.pos, OBJECT_TYPE.PILL)) {
      gameBoard.removeObject(pacman.pos, [OBJECT_TYPE.PILL]);
      setPowerPillActive(true);
      pacman.powerPill = true;
      setScore(prev => prev + 50);

      ghosts.forEach(ghost => ghost.isScared = true);

      setTimeout(() => {
        setPowerPillActive(false);
        pacman.powerPill = false;
        ghosts.forEach(ghost => ghost.isScared = false);
      }, 10000);
    }
    
    // 6. Überprüfung, ob alle Punkte (DOTs) gegessen wurden
    if (gameBoard.dotCount === 0) {
      setGameWin(true);
      setIsGameOver(true);
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
          collidedGhost.name
        ]);
        collidedGhost.reset();
        setScore(prev => prev + 100);
      } else {
        gameOver();
      }
    }
  };

  const gameOver = () => {
    setIsGameOver(true);
    setGameWin(false);
  };

  return (
    <div id="wrapper">
      <div id="game" ref={gameBoardRef}></div>
      <div id="score">Score: {score}</div>
      {isGameOver && <div>Game Over</div>}
      {gameWin && <div>You Win!</div>}
      <button onClick={startGame}>Start Game</button>
    </div>
  );
};

export default Game;
