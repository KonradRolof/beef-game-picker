import React, { useEffect, useReducer, useState } from 'react';
import './scss/App.scss';
import Picker from './components/Picker';
import useGames from './hooks/useGames.hook';
import ActionInterface from './interfaces/Action.interface';
import Game from './interfaces/Game.interface';
import gamePoolReducer, { ACTIONS } from './reducer/gamesPool.reducer';
import PoolItem from './components/PoolItem';

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
    <div className="BeefGamePicker">
      <div className="BeefGamePicker__container">
        <header className="BeefGamePicker__header">
          <h1>Royal Beef
            <span>Pick your Games</span>
          </h1>
        </header>
        <div>
          { 0 === gamesPool.length ? (
            <p>Loading ...</p>
          ) : (
            <>
              <Picker games={gamesPool} />
              <section className="games-pool">
                <header className="games-pool__header">
                  <button
                    className="btn"
                    onClick={() => setShowPool((state) => !state)}
                  >
                    { showPool ? 'Hide games pool' : 'Show games pool' }
                  </button>
                </header>
                { showPool && (
                  <>
                    <div className="games-pool__control">
                      <button
                        className="btn"
                        onClick={() => handleUnselectAll()}
                      >Unselect all games</button>
                    </div>
                    <div className="games-pool__body">
                      <ul>
                        { gamesPool.map((game) => (
                          <li key={ game.slug }>
                            <PoolItem
                              game={ game }
                              onChange={(game: Game) => handleGameClick(game)}
                            />
                          </li>
                        )) }
                      </ul>
                    </div>
                  </>
                ) }
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
