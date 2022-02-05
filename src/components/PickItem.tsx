import clsx from 'clsx';
import React from 'react';
import slugify from 'slugify';
import Game from '../interfaces/Game.interface';

type PickItemProps = {
  game: Game;
  onVeto?: Function;
}

function PickItem(props: PickItemProps) {
  const { game, onVeto } = props;
  const platformSlugs: string[] = game.platform.map((platform) => slugify(platform, {
    lower: true,
    strict: true,
  }));
  if (0 === platformSlugs.length) platformSlugs.push("undefined platform");

  return (
    <article className={clsx("PickItem", platformSlugs )}>
      <div className="PickItem__title">{ game.title }</div>
      <div className="PickItem__info">
        <span>{ game.genre }</span>{ ', ' }
        <span>{ game.players } {1 < game.players ? 'Players' : 'Player'}</span>
      </div>
      <div className="PickItem__labels">
        { game.platform.map((platform) => (
            <span className={clsx("PickItem__label PickItem__label--platform", slugify(platform, {
              lower: true,
              strict: true,
            }))} key={platform}>
              { platform }
            </span>
          ))
        }
        { game.multiDeviceNeeded && (
          <span className="PickItem__label PickItem__label--multi">
            Needs multiple devices
          </span>
        ) }
      </div>
      <div className="PickItem__veto">
        { 'function' === typeof onVeto && (
          <button onClick={() => onVeto(game)}>Use veto</button>
        ) }
      </div>
    </article>
  );
}

export default PickItem;
