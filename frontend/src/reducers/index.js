import { combineReducers } from 'redux';
import { SET_TOKEN, REMOVE_TOKEN } from '../actions/types';

const tokenInitialState = null;

const token = (state = tokenInitialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return action.data;
    case REMOVE_TOKEN:
      return action.data;
    default:
      return state;
  }
};

const appReducer = combineReducers({
  token,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
