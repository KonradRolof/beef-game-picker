import clsx from 'clsx';
import React from 'react';
import Game from '../interfaces/Game.interface';
import '../scss/PoolItem.scss';

type PoolItemProps = {
  game: Game;
  onChange: Function;
};

function PoolItem(props: PoolItemProps) {
  const { game, onChange } = props;
  const { title, genre, platforms, multiDeviceNeeded, isActive } = game;

  const handleChange = () => onChange(game);

  return (
    <article className={clsx('PoolItem', !isActive && 'PoolItem--disabled')}>
      <label>
        <header className="PoolItem__header">
          <h3>{title}</h3>
          <div className="PoolItem__genre">{genre}</div>
          {multiDeviceNeeded && (
            <span className="PoolItem__device-label">
              Needs multiple devices
            </span>
          )}
          {!game.owners && (
            <span className="PoolItem__owner-flag">No owners</span>
          )}
        </header>
        <div className="PoolItem__body">
          {platforms.map((platform) => (
            <span
              className={clsx(
                'PoolItem__platform-label',
                'PoolItem__platform-label--' + platform.slug,
              )}
              key={platform.slug}>
              {platform.name}
            </span>
          ))}
        </div>
        <footer className="PoolItem__footer">
          <input
            type="checkbox"
            checked={isActive}
            onChange={() => handleChange()}
          />
        </footer>
      </label>
    </article>
  );
}

export default PoolItem;
