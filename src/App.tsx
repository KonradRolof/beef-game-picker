import React, { useEffect, useState } from 'react';
import './App.css';
import useGames from './hooks/useGames.hook';
import slugify from 'slugify';
import Game from './interfaces/Game.interface';

function sortGames(games: Game[]): Game[] {
  return games.sort((a, b) => a.name.localeCompare(b.name));
}

function App() {
  const games = useGames('./data/games.json');
  const [gamesPool, setGamesPool] = useState(games);

  const handleGameClick = (game: Game) => {
    setGamesPool((state) => {
      const item = state.find((item) => item.name === game.name);
      if (!item) return state;
      const gameItem = {...item};
      gameItem.isActive = !game.isActive;
      const newState = state.filter((item) => item.name !== game.name);
      return sortGames([...newState, gameItem]);
    });
  };

  useEffect(() => setGamesPool(sortGames(games)), [games]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Royal Beef:
          <span>Pick the Games</span>
        </h1>
      </header>
      <div>
        { 0 === gamesPool.length ? (
          <p>Loading</p>
        ) : (
          <ul>
            {gamesPool.map((game) => (
            <li key={slugify(game.name)}>
              <label>
                {game.name}
                <input type="checkbox" defaultChecked={game.isActive} onChange={() => handleGameClick(game)}/>
              </label>
            </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
