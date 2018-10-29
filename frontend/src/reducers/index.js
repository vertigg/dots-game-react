import { combineReducers } from 'redux';
import token from './auth';
import { player, board } from './game';

const appReducer = combineReducers({
  token,
  player,
  board,
});

const rootReducer = (state, action) => appReducer(state, action);

export default rootReducer;
