import { combineReducers } from 'redux';
import token from './auth';
import game from './game';

const appReducer = combineReducers({
  token,
  game
});

const rootReducer = (state, action) => appReducer(state, action);

export default rootReducer;
