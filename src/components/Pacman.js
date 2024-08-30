import { OBJECT_TYPE, DIRECTIONS } from '../setup/setup';

class Pacman {
  constructor(speed, startPos) {
    // Initialisiert die Pacman-Objekt-Eigenschaften wie Position, Geschwindigkeit und Richtung.
    this.pos = startPos; // Startposition von Pacman
    this.speed = speed; // Geschwindigkeit von Pacman
    this.dir = null; // Anfangsrichtung von Pacman (keine Bewegung)
    this.timer = 0; // Timer zur Steuerung der Bewegungsgeschwindigkeit
    this.powerPill = false; // Status, ob Pacman eine Power-Pille aktiv hat
    this.rotation = true; // Status, ob Pacman rotiert
  }

  // Bestimmt, ob Pacman basierend auf seiner Geschwindigkeit eine Bewegung machen sollte.
  shouldMove() {
    if (!this.dir) return; // Keine Bewegung, wenn keine Richtung gesetzt ist

    if (this.timer === this.speed) {
      this.timer = 0; // Timer zurücksetzen
      return true; // Bewegung ist erlaubt, wenn der Timer die Geschwindigkeit erreicht hat.
    }
    this.timer++; // Timer erhöhen
  }

  // Berechnet die nächste Position von Pacman und prüft, ob diese Position gültig ist (nicht in eine Wand oder Geisterzone führt).
  getNextMove(objectExist) {
    let nextMovePos = this.pos + this.dir.movement; // Berechnet die nächste Position basierend auf der aktuellen Richtung
    if (
      objectExist(nextMovePos, OBJECT_TYPE.WALL) || // Überprüft, ob die nächste Position eine Wand ist
      objectExist(nextMovePos, OBJECT_TYPE.GHOSTLAIR) // Überprüft, ob die nächste Position eine Geisterzone ist
    ) {
      nextMovePos = this.pos; // Setzt die Position zurück, wenn die nächste Position ungültig ist
    }

    return { nextMovePos, direction: this.dir }; // Gibt die nächste Position und Richtung zurück
  }

  // Gibt die Klassen zurück, die bei der Bewegung entfernt und hinzugefügt werden sollen.
  makeMove() {
    const classesToRemove = [OBJECT_TYPE.PACMAN]; // Zu entfernende Klassen
    const classesToAdd = [OBJECT_TYPE.PACMAN]; // Zu hinzuzufügende Klassen

    return { classesToRemove, classesToAdd }; // Gibt die Klassen zurück, die entfernt und hinzugefügt werden sollen
  }

  // Aktualisiert die Position von Pacman auf die neue Position.
  setNewPos(nextMovePos) {
    this.pos = nextMovePos; // Setzt die neue Position von Pacman
  }

  // Handhabt die Tasteneingabe und bestimmt die neue Richtung, falls eine gültige Richtungstaste gedrückt wird.
  handleKeyInput = (e, objectExist) => {
    let dir;

    if (e.keyCode >= 37 && e.keyCode <= 40) {
      dir = DIRECTIONS[e.key]; // Ermittelt die Richtung basierend auf der gedrückten Taste
    } else {
      return; // Beendet die Funktion, wenn eine ungültige Taste gedrückt wird
    }

    const nextMovePos = this.pos + dir.movement;
    if (objectExist(nextMovePos, OBJECT_TYPE.WALL)) return; // Stoppt die Bewegung, wenn die nächste Position eine Wand ist
    this.dir = dir; // Setzt die Richtung auf die neu ermittelte Richtung
  };

  // Setzt Pacman auf die Startposition und den Anfangszustand zurück.
  reset() {
    this.pos = 287; // Startposition
    this.dir = null; // Keine Richtung (keine Bewegung)
    this.timer = 0; // Timer zurücksetzen
    this.powerPill = false; // Power-Pille zurücksetzen
  }
}

export default Pacman;
