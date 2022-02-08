import React, { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage.hook';
import Game from '../interfaces/Game.interface';
import Counter from './Counter';
import PickItem from './PickItem';
import '../scss/Picker.scss';

const DEFAULT_GAME_COUNT = 12;
const DEFAULT_PICK_DELAY = 5;
const MAX_PICK_DELAY = 10;
const PICK_TIMEOUT = 150;

type PickerProps = {
  games: Game[]
}

function Picker(props: PickerProps) {
  const [picks, setPicks] = useLocalStorage<Game[]>('picks', []);
  const [maxPicks, setMaxPicks] = useState<number>(DEFAULT_GAME_COUNT);
  const [pickDelay, setPickDelay] = useState<number>(DEFAULT_PICK_DELAY);
  const [newPick, setNewPick] = useState<Game|null>(null);

  const getRandomGame = (): Game|null => {
    const { games } = props;
    const randomIndex = Math.floor((Math.random() * (games.length - 1)));
    const game = games[randomIndex];
    if (!game.isActive) return null;
    if (!picks.find((item) => item.slug === game.slug)) return game;
    return null;
  };

  const pickGame = () => {
    let i = 0;
    if (picks.length >= maxPicks) return;
    let game: Game|null = null;
    while (null === game && PICK_TIMEOUT >= i) {
      i++;
      game = getRandomGame();
    }
    if (null !== game) setNewPick(game);
  };

  const onVetoAction = (game: Game) => {
    setPicks((state) => state.filter((item) => item.slug !== game.slug));
  };

  const onCountdownEnd = (game: Game) => {
    setNewPick(null);
    setPicks((state) => {
      if (null !== game) return [...state, game];
      return state;
    });
  };

  const buttonOptions = {} as any;
  if (picks.length === maxPicks) buttonOptions.disabled = 'disabled';

  const picksList: Game[] = [ ...picks ].reverse();

  return (
    <section className="Picker">
      <div className="Picker__form">
        <div className="Picker_settings">
          <div className="form-control">
            <label htmlFor="picker-game-count">How many games should be picked?</label>
            <input
              type="number"
              id="picker-game-count"
              defaultValue={maxPicks}
              min={1}
              step={1}
              onChange={(event) => setMaxPicks(parseInt(event.target.value))}
            />
          </div>
          <div className="form-control">
            <label htmlFor="picker-pick-delay">Surprise delay (seconds)</label>
            <input
              type="number"
              id="picker-pick-delay"
              defaultValue={pickDelay}
              min={0}
              max={MAX_PICK_DELAY}
              step={1}
              onChange={(event) => setPickDelay(parseInt(event.target.value))}
            />
          </div>
        </div>
      </div>
      <div className="Picker__cta">
        <button
          className="btn btn--pick"
          onClick={() => pickGame()}
          { ...buttonOptions }
        >Select game</button>
        <button
          className="btn btn--clear"
          onClick={() => setPicks([])}
        >Clear all</button>
      </div>
      { null !== newPick && (
        <Counter
          game={ newPick }
          delayTime={ pickDelay }
          onCountdownEnd={onCountdownEnd}
        />
      ) }
      { 0 < picks.length ? (
        <>
          <h2 className="Picker__headline">
            The games you play
            { picks.length !== maxPicks ? ` (${picks.length}/${maxPicks})` : ` (${maxPicks})`}:
          </h2>
          <ul className="Picker__picks">
            { picksList.map((game) => (
              <li key={game.slug}>
                <PickItem game={game} onVeto={onVetoAction} />
              </li>
            )) }
          </ul>
        </>
      ) : (
        <div className="Picker__warning">
          <p>No games selected yet.</p>
          <p>This is your last chance to quit.</p>
        </div>
      ) }
    </section>
  );
}

export default Picker;
