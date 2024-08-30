import React from 'react';
import Game from './components/Game'; // Importiert die Game-Komponente
import './index.css'; // Importiert die CSS-Datei für globales Styling

// Hauptkomponente der Anwendung
function App() {
  return (
    <div className="App">
      {/* Einfügen der Game-Komponente in die Hauptanwendung */}
      <Game />
    </div>
  );
}

export default App; // Exportiert die App-Komponente als Standardexport
