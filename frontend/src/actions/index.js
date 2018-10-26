import * as actionTypes from './types';

export function setToken(data) {
  return {
    type: actionTypes.SET_TOKEN,
    data,
  };
}

export function removeToken() {
  return {
    type: actionTypes.REMOVE_TOKEN,
    data: null,
  };
}
