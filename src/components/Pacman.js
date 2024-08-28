import { OBJECT_TYPE, DIRECTIONS } from '../setup/setup';

class Pacman {
  constructor(speed, startPos) {
    // Initialisiert die Pacman-Objekt-Eigenschaften wie Position, Geschwindigkeit und Richtung.
    this.pos = startPos;
    this.speed = speed;
    this.dir = null;
    this.timer = 0;
    this.powerPill = false;
    this.rotation = true;
  }

  shouldMove() {
    // Bestimmt, ob Pacman basierend auf seiner Geschwindigkeit eine Bewegung machen sollte.
    if (!this.dir) return;

    if (this.timer === this.speed) {
      this.timer = 0;
      return true; // Bewegung ist erlaubt, wenn der Timer die Geschwindigkeit erreicht hat.
    }
    this.timer++;
  }

  getNextMove(objectExist) {
    // Berechnet die nächste Position von Pacman und prüft, ob diese Position gültig ist (nicht in eine Wand oder Geisterzone führt).
    let nextMovePos = this.pos + this.dir.movement;
    if (
      objectExist(nextMovePos, OBJECT_TYPE.WALL) ||
      objectExist(nextMovePos, OBJECT_TYPE.GHOSTLAIR)
    ) {
      nextMovePos = this.pos; // Setzt die Position zurück, wenn die nächste Position ungültig ist.
    }

    return { nextMovePos, direction: this.dir }; // Gibt die nächste Position und Richtung zurück.
  }

  makeMove() {
    // Gibt die Klassen zurück, die bei der Bewegung entfernt und hinzugefügt werden sollen.
    const classesToRemove = [OBJECT_TYPE.PACMAN];
    const classesToAdd = [OBJECT_TYPE.PACMAN];

    return { classesToRemove, classesToAdd };
  }

  setNewPos(nextMovePos) {
    // Aktualisiert die Position von Pacman auf die neue Position.
    this.pos = nextMovePos;
  }

  handleKeyInput = (e, objectExist) => {
    // Handhabt die Tasteneingabe und bestimmt die neue Richtung, falls eine gültige Richtungstaste gedrückt wird.
    let dir;

    if (e.keyCode >= 37 && e.keyCode <= 40) {
      dir = DIRECTIONS[e.key]; // Ermittelt die Richtung basierend auf der gedrückten Taste.
    } else {
      return; // Beendet die Funktion, wenn eine ungültige Taste gedrückt wird.
    }

    const nextMovePos = this.pos + dir.movement;
    if (objectExist(nextMovePos, OBJECT_TYPE.WALL)) return; // Stoppt die Bewegung, wenn die nächste Position eine Wand ist.
    this.dir = dir; // Setzt die Richtung auf die neu ermittelte Richtung.
  };

  reset() {
    // Setzt Pacman auf die Startposition und den Anfangszustand zurück.
    this.pos = 287; // Startposition
    this.dir = null;
    this.timer = 0;
    this.powerPill = false;
  }
}

export default Pacman;
