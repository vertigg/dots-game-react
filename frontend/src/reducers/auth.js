import {
  FETCH_TOKEN_BEGIN,
  FETCH_TOKEN_ERROR,
  FETCH_TOKEN_SUCCESS,
  REMOVE_TOKEN
} from '../actions/auth';

const initialState = {
  value: null,
  loading: false,
  error: null
};

const token = (state = initialState, { type, data }) => {
  switch (type) {
    case FETCH_TOKEN_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_TOKEN_SUCCESS:
      return {
        ...state,
        loading: false,
        value: data.token
      };
    case FETCH_TOKEN_ERROR:
      return {
        ...state,
        loading: false,
        error: data.message
      };

    case REMOVE_TOKEN:
      return { ...state, value: null };
    default:
      return state;
  }
};

export default token;
