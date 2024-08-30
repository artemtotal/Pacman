import { DIRECTIONS, OBJECT_TYPE } from '../setup/setup';

class Ghost {
  constructor(speed = 5, startPos, movement, name) {
    this.name = name; // Name des Geistes (z.B. Blinky, Pinky)
    this.movement = movement; // Bewegungslogik des Geistes
    this.startPos = startPos; // Startposition des Geistes auf dem Spielfeld
    this.pos = startPos; // Aktuelle Position des Geistes
    this.dir = DIRECTIONS.ArrowRight; // Anfangsrichtung des Geistes
    this.speed = speed; // Geschwindigkeit des Geistes (Anzahl der Züge pro Timer-Tick)
    this.timer = 0; // Timer zur Steuerung der Bewegungsgeschwindigkeit
    this.isScared = false; // Status, ob der Geist erschreckt ist (durch Power-Pille)
    this.rotation = false; // Status, ob der Geist rotiert
  }

  // Überprüft, ob sich der Geist bewegen sollte basierend auf seiner Geschwindigkeit
  shouldMove() {
    if (this.timer === this.speed) {
      this.timer = 0; // Reset des Timers
      return true; // Bewegung zulassen
    }
    this.timer++; // Timer erhöhen
  }

  // Berechnet den nächsten Zug des Geistes
  getNextMove(objectExist) {
    const { nextMovePos, direction } = this.movement(
      this.pos,
      this.dir,
      objectExist
    );
    return { nextMovePos, direction }; // Gibt die nächste Position und Richtung zurück
  }

  // Bestimmt die Klassen, die hinzugefügt oder entfernt werden müssen, wenn sich der Geist bewegt
  makeMove() {
    const classesToRemove = [OBJECT_TYPE.GHOST, OBJECT_TYPE.SCARED, this.name]; // Zu entfernende Klassen
    let classesToAdd = [OBJECT_TYPE.GHOST, this.name]; // Zu hinzuzufügende Klassen

    if (this.isScared) classesToAdd = [...classesToAdd, OBJECT_TYPE.SCARED]; // Fügt die Klasse "SCARED" hinzu, wenn der Geist erschreckt ist

    return { classesToRemove, classesToAdd }; // Gibt die zu entfernenden und hinzuzufügenden Klassen zurück
  }

  // Setzt die neue Position und Richtung des Geistes
  setNewPos(nextMovePos, direction) {
    this.pos = nextMovePos; // Aktualisiert die Position
    this.dir = direction; // Aktualisiert die Richtung
  }

  // Setzt den Geist auf seine Anfangswerte zurück
  reset() {
    this.pos = this.startPos; // Zurücksetzen auf die Startposition
    this.dir = DIRECTIONS.ArrowRight; // Zurücksetzen auf die Anfangsrichtung
    this.timer = 0; // Zurücksetzen des Timers
    this.isScared = false; // Entfernt den erschreckten Status
  }
}

export default Ghost;
