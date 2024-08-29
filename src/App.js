import React, { useState, useEffect } from 'react';
import Game from './components/Game'; 
import './index.css';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 3000);

    return () => clearTimeout(timer); // Clean up the timer on component unmount
  }, []);

  return (
    <div className="App">
      {!isLoaded ? (
        <div className="loading-screen">
         
        </div>
      ) : (
        <Game />
      )}
    </div>
  );
}

export default App;
