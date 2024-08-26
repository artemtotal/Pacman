import React, { useState, useEffect } from 'react';
import './App.css';

const width = 28; // Breite des Spielfelds (28 Felder pro Zeile)
const layout = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1,
  // Rest des Layouts...
];

const Pacman = () => {
  const [squares, setSquares] = useState([]); // Zustand für das Spielfeld
  const [pacmanCurrentIndex, setPacmanCurrentIndex] = useState(490); // Anfangsposition von Pac-Man

  useEffect(() => {
    const grid = []; // Spielfeld initialisieren
    layout.forEach((square, i) => {
      if (square === 0) grid.push('pac-dot'); // Pac-Dot hinzufügen
      else if (square === 1) grid.push('wall'); // Wand hinzufügen
    });
    setSquares(grid); // Spielfeld-Zustand setzen

    document.addEventListener('keyup', movePacman); // Event-Listener für die Tastaturbewegungen

    return () => document.removeEventListener('keyup', movePacman); // Event-Listener entfernen, wenn die Komponente unmountet wird
  }, [pacmanCurrentIndex]);

  const movePacman = (e) => {
    squares[pacmanCurrentIndex] = 'pac-dot';
    setSquares([...squares]);

    switch(e.keyCode) {
      case 37: // Links
        if (pacmanCurrentIndex % width !== 0 && squares[pacmanCurrentIndex - 1] !== 'wall')
          setPacmanCurrentIndex(pacmanCurrentIndex - 1);
        break;
      case 38: // Oben
        if (pacmanCurrentIndex - width >= 0 && squares[pacmanCurrentIndex - width] !== 'wall')
          setPacmanCurrentIndex(pacmanCurrentIndex - width);
        break;
      case 39: // Rechts
        if (pacmanCurrentIndex % width < width - 1 && squares[pacmanCurrentIndex + 1] !== 'wall')
          setPacmanCurrentIndex(pacmanCurrentIndex + 1);
        break;
      case 40: // Unten
        if (pacmanCurrentIndex + width < width * width && squares[pacmanCurrentIndex + width] !== 'wall')
          setPacmanCurrentIndex(pacmanCurrentIndex + width);
        break;
    }

    squares[pacmanCurrentIndex] = 'pac-man';
    setSquares([...squares]);
  };

  return (
    <div className="grid">
      {squares.map((square, index) => (
        <div key={index} className={square}></div>
      ))}
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <Pacman />
    </div>
  );
}

export default App;
