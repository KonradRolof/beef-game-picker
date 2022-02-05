import React, { useEffect, useState } from 'react';
import './App.css';
import Picker from './components/Picker';
import useGames from './hooks/useGames.hook';
import Game from './interfaces/Game.interface';

function sortGames(games: Game[]): Game[] {
  return games.sort((a, b) => a.name.localeCompare(b.name));
}

function App() {
  const games = useGames('./data/games.json');
  const [gamesPool, setGamesPool] = useState<Game[]>([]);

  const handleGameClick = (game: Game) => {
    console.log(game);
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
          <>
          <Picker games={gamesPool} />
            <ul>
              {gamesPool.map((game) => (
              <li key={game.slug}>
                <label>
                  {game.name}
                  <input type="checkbox" defaultChecked={game.isActive} onChange={() => handleGameClick(game)}/>
                </label>
              </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
