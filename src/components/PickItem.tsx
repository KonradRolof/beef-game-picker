import clsx from 'clsx';
import React from 'react';
import Game from '../interfaces/Game.interface';
import '../scss/PickItem.scss';

type PickItemProps = {
  game: Game;
  onVeto?: Function;
}

function PickItem(props: PickItemProps) {
  const { game, onVeto } = props;
  return (
    <article className={"PickItem"}>
      <div className="PickItem__title">{ game.title }</div>
      <div className="PickItem__info">
        <span>{ game.genre }</span>
        <span className="PickItem__divider">|</span>
        <span>{ game.players } {1 < game.players ? 'Players' : 'Player'}</span>
      </div>
      <div className="PickItem__labels">
        { game.platforms.map((platform) => (
          <span
            className={clsx("PickItem__label PickItem__label--platform", 'PickItem__label--' + platform.slug)}
            key={platform.slug}
          >
            { platform.name }
          </span>
        )) }
        { game.multiDeviceNeeded && (
          <span className="PickItem__label PickItem__label--multi">
            Needs multiple devices
          </span>
        ) }
      </div>
      <div className="PickItem__veto">
        { 'function' === typeof onVeto && (
          <button onClick={() => onVeto(game)}>
            <span>Use veto</span>
          </button>
        ) }
      </div>
    </article>
  );
}

export default PickItem;
