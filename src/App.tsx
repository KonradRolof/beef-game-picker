import React, { useEffect, useReducer, useState } from 'react';
import './App.css';
import Picker from './components/Picker';
import useGames from './hooks/useGames.hook';
import ActionInterface from './interfaces/Action.interface';
import Game from './interfaces/Game.interface';
import gamePoolReducer, { ACTIONS } from './reducer/gamesPool.reducer';

function App() {
  const games = useGames('./data/games.json');
  const [gamesPool, dispatch] = useReducer(gamePoolReducer, []);
  const [showPool, setShowPool] = useState<boolean>(false);

  const handleGameClick = (game: Game) => {
    dispatch({
      type:ACTIONS.FILTER,
      payload: { game },
    } as ActionInterface);
  };

  const handleUnselectAll = () => {
    dispatch({
      type: ACTIONS.DISABLE_ALL,
      payload: null,
    } as ActionInterface);
  };

  useEffect(() => dispatch({
    type: ACTIONS.SET,
    payload: games,
  } as ActionInterface), [games]);

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
            <section className="games-pool">
              <header className="games-pool__header">
                <button onClick={() => setShowPool((state) => !state)}>
                  { showPool ? 'Hide games pool' : 'Show games pool' }
                </button>
              </header>
              { showPool && (
                <>
                  <div>
                    <button onClick={() => handleUnselectAll()}>Unselect all games</button>
                  </div>
                  <ul>
                    {gamesPool.map((game) => (
                    <li key={game.slug}>
                      <label>
                        {game.name}
                        <input type="checkbox" checked={game.isActive} onChange={() => handleGameClick(game)}/>
                      </label>
                    </li>
                    ))}
                  </ul>
                </>
              ) }
            </section>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
