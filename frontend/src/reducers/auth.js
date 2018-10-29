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

export default token;
