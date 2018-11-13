import {
  FETCH_TOKEN_BEGIN,
  FETCH_TOKEN_ERROR,
  FETCH_TOKEN_SUCCESS,
  REMOVE_TOKEN,
} from '../actions/auth';

const initialTokenState = {
  value: null,
};

const initialAuthState = {
  value: null,
  loading: false,
  error: null,
};

export const token = (state = initialTokenState, { type, data }) => {
  switch (type) {
    case FETCH_TOKEN_SUCCESS:
      return {
        ...state,
        value: data.token,
      };
    case REMOVE_TOKEN:
      return { ...state, value: null };
    default:
      return state;
  }
};

export const authStatus = (state = initialAuthState, { type, data }) => {
  switch (type) {
    case FETCH_TOKEN_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_TOKEN_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case FETCH_TOKEN_ERROR:
      return {
        ...state,
        loading: false,
        error: data,
      };

    case REMOVE_TOKEN:
      return { ...state, value: null, error: null };
    default:
      return state;
  }
};
