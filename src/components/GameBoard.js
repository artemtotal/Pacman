import { GRID_SIZE, CELL_SIZE, OBJECT_TYPE, CLASS_LIST } from '../setup/setup';

class GameBoard {
  constructor(DOMGrid) {
    this.dotCount = 0; // Anzahl der Punkte (DOTs) auf dem Spielfeld
    this.grid = []; // Array, das das Spielfeld repräsentiert
    this.DOMGrid = DOMGrid; // DOM-Element, das das Spielfeld enthält
  }

  // Zeigt den Spielstatus an, je nachdem, ob der Spieler gewonnen hat oder nicht
  showGameStatus(gameWin) {
    const div = document.createElement('div');
    div.classList.add('game-status');
    div.innerHTML = `${gameWin ? 'WIN!' : 'GAME OVER!'}`; // Text je nach Spielergebnis
    this.DOMGrid.appendChild(div);
  }

  // Erstellt das Spielfeld basierend auf dem gegebenen Level
  createGrid(level) {
    this.dotCount = 0; // Setzt die Anzahl der Punkte (DOTs) zurück
    this.grid = []; // Setzt das Spielfeld zurück
    this.DOMGrid.innerHTML = ''; // Löscht das aktuelle Spielfeld
    this.DOMGrid.style.cssText = `grid-template-columns: repeat(${GRID_SIZE}, ${CELL_SIZE}px);`; // Definiert das Gitterlayout des Spielfelds

    level.forEach(square => {
      const div = document.createElement('div');
      div.classList.add('square', CLASS_LIST[square]); // Fügt die entsprechende Klasse zum Quadrat hinzu
      div.style.cssText = `width: ${CELL_SIZE}px; height: ${CELL_SIZE}px;`; // Setzt die Größe des Quadrats
      this.DOMGrid.appendChild(div); // Fügt das Quadrat zum DOM hinzu
      this.grid.push(div); // Fügt das Quadrat zum internen Gitter-Array hinzu

      if (CLASS_LIST[square] === OBJECT_TYPE.DOT) this.dotCount++; // Erhöht die Anzahl der Punkte, wenn ein DOT hinzugefügt wird
    });
  }

  // Fügt einem bestimmten Quadrat auf dem Spielfeld Klassen hinzu
  addObject(pos, classes) {
    this.grid[pos].classList.add(...classes);
  }

  // Entfernt Klassen von einem bestimmten Quadrat auf dem Spielfeld
  removeObject(pos, classes) {
    this.grid[pos].classList.remove(...classes);
  }

  // Überprüft, ob ein Objekt an einer bestimmten Position existiert
  objectExist(pos, object) {
    return this.grid[pos].classList.contains(object);
  }

  // Rotiert ein Quadrat auf dem Spielfeld um einen bestimmten Winkel
  rotateDiv(pos, deg) {
    this.grid[pos].style.transform = `rotate(${deg}deg)`;
  }

  // Bewegt eine Spielfigur auf dem Spielfeld
  moveCharacter(character) {
    if (character.shouldMove()) {
      const { nextMovePos, direction } = character.getNextMove(
        this.objectExist.bind(this)
      );
      const { classesToRemove, classesToAdd } = character.makeMove();
  
      if (character.rotation && nextMovePos !== character.pos) {
        // Rotiert die Figur zur neuen Position
        this.rotateDiv(nextMovePos, character.dir.rotation);
        // Setzt die Rotation des vorherigen Quadrats zurück
        this.rotateDiv(character.pos, 0);
      }
  
      this.removeObject(character.pos, classesToRemove); // Entfernt alte Klassen
      this.addObject(nextMovePos, classesToAdd); // Fügt neue Klassen hinzu
  
      character.setNewPos(nextMovePos, direction); // Aktualisiert die Position der Figur
    }
  }

  // Statische Methode zum Erstellen eines neuen Spielfelds
  static createGameBoard(DOMGrid, level) {
    const board = new this(DOMGrid);
    board.createGrid(level);
    return board;
  }
}

export default GameBoard;
