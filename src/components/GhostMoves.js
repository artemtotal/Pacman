import { DIRECTIONS, OBJECT_TYPE } from '../setup/setup';

// Primitive zufällige Bewegung für Geister.
export function randomMovement(position, direction, objectExist) {
  let dir = direction; // Aktuelle Richtung des Geistes
  let nextMovePos = position + dir.movement; // Berechnet die nächste Position basierend auf der aktuellen Richtung
  const keys = Object.keys(DIRECTIONS); // Erhält alle möglichen Richtungen

  // Schleife, die nach einer gültigen Bewegung sucht
  while (
    objectExist(nextMovePos, OBJECT_TYPE.WALL) || // Überprüft, ob sich die nächste Position in einer Wand befindet
    objectExist(nextMovePos, OBJECT_TYPE.GHOST) // Überprüft, ob sich die nächste Position in einem anderen Geist befindet
  ) {
    const key = keys[Math.floor(Math.random() * keys.length)]; // Wählt zufällig eine neue Richtung
    dir = DIRECTIONS[key]; // Setzt die neue Richtung
    nextMovePos = position + dir.movement; // Berechnet die neue Position basierend auf der zufällig gewählten Richtung
  }

  // Gibt die nächste gültige Position und Richtung des Geistes zurück
  return { nextMovePos, direction: dir };
}
