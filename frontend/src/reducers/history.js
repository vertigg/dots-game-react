import {
  SAVE_GAME_BEGIN,
  SAVE_GAME_ERROR,
  SAVE_GAME_SUCCESS,
  SAVE_GAME_RESET
} from '../actions/history';

const initialState = {
  data: null,
  loading: false,
  saving: false,
  saved: false,
  error: null
};

const token = (state = initialState, { type, data }) => {
  switch (type) {
    case SAVE_GAME_BEGIN:
      return { ...state, saving: true, saved: false, error: null };
    case SAVE_GAME_SUCCESS:
      return { ...state, saving: false, saved: true, error: null };
    case SAVE_GAME_ERROR:
      return { ...state, saving: false, saved: false, error: data.message };
    case SAVE_GAME_RESET:
      return { ...state, saving: false, saved: false, error: null };
    default:
      return state;
  }
};

export default token;
