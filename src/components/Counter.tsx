import React, { useCallback, useEffect, useRef } from 'react';
import { useState } from 'react';
import Game from '../interfaces/Game.interface';

const DELAY_SECOND = 1000;
const CLOSE_DELAY = 3000;

type CounterProps = {
  game: Game|null;
  delayTime: number;
  onCountdownEnd: Function;
}

function Counter(props: CounterProps) {
  const { game, delayTime, onCountdownEnd } = props;
  const isMounted = useRef(0); // https://www.akashmittal.com/cant-perform-react-state-update-unmounted-component/
  const [stepLeft, setStepLeft] = useState<number>(delayTime);
  const counterAction = useCallback(() => {
    if (0 < stepLeft) {
      setTimeout(() => {
        setStepLeft((state) => state - 1);
      }, DELAY_SECOND);
    }
    if (0 === stepLeft) {
      setTimeout(() => {
        onCountdownEnd(game);
        setStepLeft(delayTime);
      }, CLOSE_DELAY);
    };
  }, [game, delayTime, stepLeft, onCountdownEnd]);

  useEffect(() => {
    isMounted.current = 1;
    counterAction();
    return () => { isMounted.current = 0 };
  }, [counterAction]);

  return (
    <section className="Counter">
      { 0 < stepLeft ? (
        <div className="Counter__counter">
          <div className="Counter__step">
            { stepLeft }
          </div>
        </div>
      ) : (
        <div className="Counter__pick">
          { null !== game && game.title }
        </div>
      ) }
    </section>
  );
}

export default Counter;
