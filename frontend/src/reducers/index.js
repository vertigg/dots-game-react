import { combineReducers } from 'redux';
import game from './game';
import history from './history';
import { authStatus, token } from './auth';

const appReducer = combineReducers({
  authStatus,
  token,
  game,
  history,
});

const rootReducer = (state, action) => appReducer(state, action);

export default rootReducer;
