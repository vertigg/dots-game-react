import { combineReducers } from 'redux';
import token from './auth';
import game from './game';
import history from './history';

const appReducer = combineReducers({
  token,
  game,
  history
});

const rootReducer = (state, action) => appReducer(state, action);

export default rootReducer;
