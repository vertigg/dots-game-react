import { combineReducers } from 'redux';
import token from './auth';
import { player, game } from './game';

const appReducer = combineReducers({
  token,
  player,
  game,
});

const rootReducer = (state, action) => appReducer(state, action);

export default rootReducer;
