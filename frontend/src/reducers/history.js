import {
  SAVE_GAME_BEGIN,
  SAVE_GAME_ERROR,
  SAVE_GAME_SUCCESS,
  SAVE_GAME_RESET,
  RETRIEVE_HISTORY_BEGIN,
  RETRIEVE_HISTORY_SUCCESS,
  RETRIEVE_HISTORY_ERROR
} from '../actions/history';

const initialState = {
  games: [],
  loading: false,
  saving: false,
  saved: false,
  error: null
};

const history = (state = initialState, { type, data }) => {
  switch (type) {
    case SAVE_GAME_BEGIN:
      return { ...state, saving: true, saved: false, error: null };
    case SAVE_GAME_SUCCESS:
      return { ...state, saving: false, saved: true, error: null };
    case SAVE_GAME_ERROR:
      return { ...state, saving: false, saved: false, error: data.message };
    case SAVE_GAME_RESET:
      return { ...state, saving: false, saved: false, error: null };
    case RETRIEVE_HISTORY_BEGIN:
      return { ...state, loading: true, error: null };
    case RETRIEVE_HISTORY_ERROR:
      return { ...state, loading: false, error: data.message };
    case RETRIEVE_HISTORY_SUCCESS:
      return { ...state, loading: false, error: null, games: data };
    default:
      return state;
  }
};

export default history;
