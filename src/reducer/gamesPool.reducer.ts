import ActionInterface from '../interfaces/Action.interface';
import Game from '../interfaces/Game.interface';
import sortGames from '../util/sortGames';

export const ACTIONS = {
  SET: 'set',
  FILTER: 'filter',
  DISABLE_ALL: 'disable-all',
};

export default function gamePoolReducer(state: Game[], action: ActionInterface): Game[] {
  let newState: Game[];

  switch(action.type) {
    case ACTIONS.SET:
      return sortGames(action.payload as Game[]);

    case ACTIONS.FILTER:
      const { game } = action.payload;
      const item = state.find((item) => item.slug === game.slug);
      if (!item) return state;
      const gameItem = {...item};
      gameItem.isActive = !game.isActive;
      newState = state.filter((item) => item.slug !== game.slug);
      return sortGames([...newState, gameItem]);
  
    case ACTIONS.DISABLE_ALL:
      newState = state.map((game) => {
        game.isActive = false;
        return game;
      });
      return newState;

    default:
      return state;
  }
}
