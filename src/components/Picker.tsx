import React, { useState } from "react";
import Game from "../interfaces/Game.interface";

const DEFAULT_GAME_COUNT = 12;

type PickerProps = {
  games: Game[]
}

function Picker(props: PickerProps) {
  const [picks, setPicks] = useState<Game[]>([]);
  const [maxPicks, setMaxPicks] = useState<number>(DEFAULT_GAME_COUNT);

  const getRandomGame = (): Game|null => {
    const { games } = props;
    const randomIndex = Math.floor((Math.random() * games.length));
    const game = games[randomIndex];
    if (!picks.find((item) => item.slug === game.slug)) return game;
    return null;
  };

  const pickGame = () => {
    if (picks.length >= maxPicks) return;
    let game: Game|null = null;
    while (null === game) {
      game = getRandomGame();
    }
    setPicks((state) => {
      if (null !== game) return [...state, game];
      return state;
    });
  };

  const buttonOptions = {} as any;
  if (picks.length === maxPicks) buttonOptions.disabled = 'disabled';

  return (
    <section className="picker">
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
        <button
          className="btn"
          onClick={() => pickGame()}
          { ...buttonOptions }
        >Select game</button>
      </div>
      { 0 < picks.length && (
        <>
          <h2>The games you play:</h2>
          <ul>
            { picks.map((game) => (
              <li key={game.slug}>{game.name}</li>
            )) }
          </ul>
        </>
      ) }
    </section>
  );
}

export default Picker;
