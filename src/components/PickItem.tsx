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
  const platformSlug = slugify(game.platform, {
    lower: true,
    strict: true,
  }) || "no-platform-defined";

  return (
    <article className={clsx("PickItem", platformSlug )}>
      <div className="PickItem__title">{ game.name }</div>
      <div className="PickItem__info">
        <span>{ game.genre }</span>,
        <span>Players: { game.players }</span>
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