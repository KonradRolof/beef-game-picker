import React from 'react';
import './App.css';
import useGames from './hooks/useGames.hook';
import slugify from 'slugify';

function App() {
  const games = useGames('./data/games.json');

  return (
    <div className="App">
      <header className="App-header">
        <h1>Royal Beef:
          <span>Pick the Games</span>
        </h1>
      </header>
      <div>
        { 0 === games.length ? (
          <p>Loading</p>
        ) : (
          <ul>
            {games.map((game) => (<li key={slugify(game.name)}>{game.name}</li>))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
